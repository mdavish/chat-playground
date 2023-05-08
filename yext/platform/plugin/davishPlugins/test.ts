import { getBrooklynWeather, geocodeCity, getWeather } from "./mod.ts";
import type { ChatFunctionPayload } from "./mod.ts";

Deno.test("Get the Weather in Brooklyn", async () => {
  const data = await getBrooklynWeather();
  console.log({ data });
});

Deno.test("Geocode a few cities", async () => {
  const cityNames = [
    "Brooklyn",
    "New York",
    "San Francisco",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
    "Phoenix",
  ];
  for (const city of cityNames) {
    const data = await geocodeCity(city);
    console.log({ data });
  }
});

Deno.test("Respond to a chat message with the weather", async () => {
  const fakePayload: ChatFunctionPayload = {
    messages: [],
    notes: {
      collected_data: {
        city: "Brooklyn",
      },
    },
  };
  const data = await getWeather(fakePayload);
  console.log({ data });
});
