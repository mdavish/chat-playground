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
