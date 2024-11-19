import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

const weatherAPIKey = import.meta.env.VITE_API_KEY;
console.log(weatherAPIKey);

const getAllCountries = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getWeather = (params) => {
  const request = axios.get(
    `${weatherUrl}q=${params}&units=metric&appid=${weatherAPIKey}`
  );
  return request.then((response) => response.data);
};

export default { getAllCountries, getWeather };
