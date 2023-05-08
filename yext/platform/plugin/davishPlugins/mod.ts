import { z } from "https://deno.land/x/zod/mod.ts";

const ChatFunctionPayloadSchema = z.object({
  messages: z.array(
    z.object({
      text: z.string(),
      // TODO: Add source enum once it's fixed in the back-end
      timestamp: z.string(),
    })
  ),
  notes: z
    .object({
      current_goal: z.string().optional(),
      current_step_indices: z.array(z.number()).optional(),
      search_query: z.string().optional(),
      query_result: z.any(),
      collected_data: z.record(z.string()).optional(),
      goal_first_msg_index: z.number().optional(),
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
  const parsedCity = z.string().safeParse(notes?.collected_data?.city);
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
    query_result: data,
  };
};
