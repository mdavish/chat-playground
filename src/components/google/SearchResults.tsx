import { useChatState } from "@yext/chat-headless-react";
import { SearchResultsSchema, ProductDataSchema } from "../../schema/SearchResults";
import { motion } from "framer-motion";

export default function SearchResults() {
  const queryResult = useChatState(s => s.conversation.notes?.queryResult);
  const isLoading = useChatState(s => s.conversation.isLoading);

  const parsedResults = SearchResultsSchema.safeParse(queryResult)

  if ((queryResult && !parsedResults.success)) {
    console.log(parsedResults.error)
  }

  return (
    <div className="w-full flex flex-col gap-y-6">
      {
        (!queryResult && isLoading) && Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            // Expand from 0 to 100% width, slightly slower for each subsequent bar
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-md to animate-pulse p-4 w-full flex flex-col gap-y-4">
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse" />
            <div className="h-8 w-2/3 bg-gray-200 animate-pulse" />
            <div className="h-8 w-1/2 bg-gray-200 animate-pulse" />
          </motion.div>
        ))
      }
      {
        (queryResult && parsedResults.success) && (
          <div>
            {parsedResults.data.modules.map((module, index) => {
              return (
                <div className="px-4 grid grid-cols-2 gap-x-4 gap-y-6">
                  {
                    module.results.map((result, rindex) => {
                      switch (module.verticalConfigId) {
                        case "products": {
                          const parsedResult = ProductDataSchema.parse(result.data);
                          const abilityLevel = parsedResult.c_abilityLevel[0];
                          const terrain = parsedResult.c_terrain[0];
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              // Delay increases slightly for each result
                              transition={{ duration: 0.5, delay: rindex * 0.1 }}
                              key={`result-${index}-${rindex}`}
                              className="flex flex-row gap-x-6 rounded-lg overflow-hidden">
                              <div className="shrink-0 relative w-44 h-44 rounded-lg border border-gray-200">
                                <img
                                  className="w-full h-full rounded-lg"
                                  src={parsedResult.photoGallery[0].image.url}
                                />
                                <div
                                  className="opacity-25 rounded-lg absolute w-full h-full bottom-0 right-0 bg-white bg-gradient-to-b from-white/0  to-black via-white/0" />
                              </div>
                              <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col">
                                  <a
                                    target="_blank"
                                    href={`https://commerce.skiware.us/${parsedResult.slug}`} className="text-slate-800 hover:underline">
                                    {result.data.name}
                                  </a>
                                  {abilityLevel && (
                                    <div className="flex items-center">
                                      {abilityLevel.c_icon &&
                                        <img
                                          src={abilityLevel.c_icon.image.url}
                                        />
                                      }
                                      <p className="ml-1 text-sm text-slate-500 text-left">
                                        {abilityLevel.name}
                                      </p>
                                    </div>
                                  )}
                                  {terrain && (
                                    <div className="flex items-center">
                                      {terrain.c_icon && (
                                        <img src={terrain.c_icon.image.url} />
                                      )}
                                      <p className="ml-1 text-sm text-slate-500 text-left">
                                        {terrain.name}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )
                        }
                      }
                    })
                  }
                </div>
              )
            })}
          </div>
        )
      }
      {
        (queryResult && !parsedResults.success) && (
          <div>
            There was an error parsing the search results.
          </div>
        )
      }
    </div>
  )
}