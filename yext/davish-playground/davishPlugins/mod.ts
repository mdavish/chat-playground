import { z } from "https://deno.land/x/zod/mod.ts";

const ChatFunctionPayloadSchema = z.object({
  messages: z.array(
    z.object({
      text: z.string(),
      source: z.enum(["USER", "BOT"]),
      timestamp: z.string(),
    })
  ),
  notes: z
    .object({
      currentGoal: z.string().optional(),
      currentStepIndices: z.array(z.number()).optional(),
      searchQuery: z.string().optional(),
      queryResult: z.any(),
      collectedData: z.record(z.string()).optional(),
      goalFirstMsgIndex: z.number().optional(),
    })
    .optional(),
});

export type ChatFunctionPayload = z.infer<typeof ChatFunctionPayloadSchema>;

export type ChatFunctionReturn = Partial<ChatFunctionPayload["notes"]>;

export type ChatFunction = (
  payload: ChatFunctionPayload
) => Promise<ChatFunctionReturn>;

export const getBrooklynWeather = async () => {
  const params = {
    // Brooklyn NY
    lat: 40.65,
    lon: -73.95,
    part: "minutely,hourly",
    apiKey: "1ccf45d1a1c47111ace6f290a4ee2685",
  };
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${params.lat}&lon=${params.lon}&exclude=${params.part}&appid=${params.apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const geocodeCity = async (city: string) => {
  const params = {
    city,
    apiKey: "1ccf45d1a1c47111ace6f290a4ee2685",
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${params.apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Note: In the future this can be a simple REST API instruction
// But right now we don't support dynamic URLs based on collected data
export const getWeather: ChatFunction = async ({ notes }) => {
  const parsedCity = z.string().safeParse(notes?.collectedData?.city);
  if (!parsedCity.success) {
    throw new Error(
      "No city was collected. Make sure to add a `city` field first."
    );
  }
  const city = parsedCity.data;
  const data = await geocodeCity(city);
  // The geocode response actually contains the weather data
  // So no need to make a follow up request
  return {
    queryResult: data,
  };
};
