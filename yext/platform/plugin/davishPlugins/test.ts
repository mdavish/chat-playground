import { getBrooklynWeather } from "./mod.ts";

Deno.test("Get the Weather in Brooklyn", async () => {
  const data = await getBrooklynWeather();
  console.log({ data });
});
