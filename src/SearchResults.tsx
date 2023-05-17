import { useChatState } from "@yext/chat-headless-react";
import { SearchResultsSchema } from "./schema/SearchResults";

export default function SearchResults() {
  const searchResults = useChatState((state) => state.conversation.notes?.queryResult);
  const parsedResults = SearchResultsSchema.safeParse(searchResults);

  if (!searchResults) {
    return <></>
  }

  return (
    <div className="px-4 py-6 h-full overflow-auto">
      {
        parsedResults.success ? (
          <div className="flex flex-col">
            <h2 className="text-gray-700 font-semibold mb-4">
              Related Search Results
            </h2>
            <div className="flex flex-col gap-y-4 ">
              {
                parsedResults.data.modules[0].results.map(result => {
                  const abilityLevel = result.data.c_abilityLevel[0];
                  const terrain = result.data.c_terrain[0];
                  return (
                    <div className="flex flex-row">
                      {/* <div className="relative rounded-md ">
                        <img
                          src={result.data.}
                        />
                        <div />
                      </div> */}
                      <div className="flex flex-col">
                        <a
                          target="_blank"
                          href={`https://commerce.skiware.us/${result.data.slug}`} className="text-gray-800 hover:underline">
                          {result.data.name}
                        </a>
                        {abilityLevel && (
                          <div className="flex items-center">
                            {abilityLevel.c_icon &&
                              <img
                                src={abilityLevel.c_icon.image.url}
                              />
                            }
                            <p className="ml-1 text-sm text-gray-500 text-left">
                              {abilityLevel.name}
                            </p>
                          </div>
                        )}
                        {terrain && (
                          <div className="flex items-center">
                            {terrain.c_icon && (
                              <img src={terrain.c_icon.image.url} />
                            )}
                            <p className="ml-1 text-sm text-gray-500 text-left">
                              {terrain.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : (
          <div>
            <p>There was an error parsing the search results.</p>
            <p>
              {parsedResults.error.message}
            </p>
          </div>
        )
      }
    </div>
  )
}