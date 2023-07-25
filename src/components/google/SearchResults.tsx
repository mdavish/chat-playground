import { useChatState } from "@yext/chat-headless-react";
import { SearchResultsSchema, ProductDataSchema } from "../../schema/SearchResults";
import { motion } from "framer-motion";
import { Stars } from "./Stars";
import { CheckIcon } from "@heroicons/react/20/solid";
import Map, { Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MdDirections } from "react-icons/md";

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
            className="bg-gray-50 border border-gray-200 rounded-md to animate-pulse p-4 w-full flex flex-col gap-y-4 max-w-2xl">
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
              switch (module.verticalConfigId) {
                case "products": {
                  return (
                    <div className="px-4 grid grid-cols-2 gap-x-4 gap-y-6">
                      {
                        module.results.map((result, rindex) => {
                          const parsedResult = ProductDataSchema.parse(result.data);
                          const abilityLevel = parsedResult.c_abilityLevel[0];
                          const terrain = parsedResult.c_terrain ? parsedResult.c_terrain[0] : null;
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
                              <div className="flex flex-col gap-y-1">
                                <a
                                  target="_blank"
                                  href={`https://commerce.skiware.us/${parsedResult.slug}`} className="text-slate-800 font-medium hover:underline">
                                  {parsedResult.name}
                                </a>
                                <div className="flex flex-row divide-gray-400">
                                  {
                                    <span className="my-auto text-sm">${parsedResult.c_price} |   </span>
                                  }
                                  <Stars rating={5} />
                                </div>
                                <div className="mt-3 flex items-center">
                                  <CheckIcon
                                    className="h-5 w-5 flex-shrink-0 text-green-500"
                                    aria-hidden="true"
                                  />
                                  <p className="ml-2 text-sm text-gray-500">
                                    In stock and ready to ship
                                  </p>
                                </div>
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
                                    {(terrain && terrain.c_icon) && (
                                      <img src={terrain.c_icon.image.url} />
                                    )}
                                    <p className="ml-1 text-sm text-slate-500 text-left">
                                      {terrain.name}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )
                        })
                      }
                    </div>
                  )
                }
                case "locations": {
                  return (
                    <div className="flex flex-row gap-x-10">
                      <div className="flex flex-col divide-y divide-gray-200 w-full">
                        {
                          module.results.map((result, rindex) => {
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                // Delay increases slightly for each result
                                transition={{ duration: 0.5, delay: rindex * 0.1 }}
                                className="flex flex-row">
                                <div
                                  key={`map-res-${rindex}`}
                                  className="py-6 flex flex-col gap-y-2 w-full">
                                  <a
                                    target="_blank"
                                    className="text-slate-800 font-medium hover:underline"
                                    href={result.data.c_deployedURL ?? "/"}>
                                    {result.data.name}
                                  </a>
                                  <div className="text-sm text-slate-800">
                                    {result.data.address.line1}
                                  </div>
                                  <div className="text-sm text-slate-800">
                                    {result.data.address.city}, {result.data.address.region} {result.data.address.postalCode}
                                  </div>
                                </div>
                                <a
                                  target="_blank"
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${result.data.yextDisplayCoordinate.latitude},${result.data.yextDisplayCoordinate.longitude}`}
                                  className="my-auto mx-auto flex flex-col gap-y-2">
                                  <div className="mx-auto rounded-full p-1 border border-blue-800/50">
                                    <MdDirections className="h-7 w-7 text-blue-900" />
                                  </div>
                                  <div className="text-sm text-blue-900">Directions</div>
                                </a>
                              </motion.div>
                            )
                          })
                        }
                      </div>
                      <Map
                        mapLib={import('mapbox-gl')}
                        mapboxAccessToken="pk.eyJ1IjoibWRhdmlzaCIsImEiOiJja3pkNzZ4cDYydmF6MnZtemZrNXJxYmtvIn0.9CYfaiw9PB90VlQEqt3dRQ"
                        initialViewState={{
                          longitude: -100,
                          latitude: 40,
                          zoom: 3.5
                        }}
                        style={{
                          color: "blue",
                          width: "45vw",
                          height: "66vh",
                          flexShrink: 0
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                      >
                        {
                          module.results.map((result) => {
                            return (
                              <Marker
                                latitude={result.data.yextDisplayCoordinate.latitude}
                                longitude={result.data.yextDisplayCoordinate.longitude}
                              />
                            )
                          })
                        }
                      </Map>
                    </div>
                  )
                }
              }
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