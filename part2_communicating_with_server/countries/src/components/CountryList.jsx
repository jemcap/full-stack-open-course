import React, { useEffect, useState } from "react";
import countrySearchService from "../services/countries";

const CountryList = ({ countries, filterCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  const filtered = countries.filter((c) =>
    (c.name.common || "Country")
      .toLowerCase()
      .includes(filterCountry.toLowerCase())
  );

  if (filtered.length === 0) return <p>No matches found</p>;

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  const Information = ({ country }) => {
    if (!country) return null;

    const {
      name: { common: name = "Unknown" } = {},
      capital = ["No capital"],
      area = "Unknown area",
      flags: { png: flag = "" } = {},
      languages = {},
    } = country;

    const languageList = Object.values(languages);

    useEffect(() => {
      if (!name || weatherData[name]) return;
      countrySearchService
        .getWeather(name)
        .then((weather) =>
          setWeatherData((prev) => ({
            ...prev,
            [name]: {
              temp: weather.main.temp,
              wind: weather.wind.speed,
              icon: weather.weather[0].icon,
            },
          }))
        )
        .catch((error) => console.log(error.message));
    }, [name, weatherData]);

    const weather = weatherData[name] || {};

    // .weather[0]?.id || "Weather Unknown"
    return (
      <div>
        <figure>
          <img src={flag} alt={`Flag of ${name}`} />
        </figure>
        <h1>{name}</h1>
        <h3>Capital City: {capital[0]}</h3>
        <h3>Area: {area}</h3>
        <h4>Languages spoken:</h4>
        <ul>
          {languageList.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <div>
          <h1>Weather in {name}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt=""
          />
          <h3>
            Temperature (Celsius): <span>{weather.temp}</span>
          </h3>
          <h3>
            Wind speed: <span>{weather.wind} m/s</span>
          </h3>
        </div>
      </div>
    );
  };

  return (
    <div>
      {filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length === 1 ? (
        <Information country={filtered[0]} />
      ) : (
        <div>
          {filtered.map((c) => (
            <div key={c.name.common}>
              <p>
                {c.name.common}
                <button onClick={() => handleShow(c)}>show</button>
              </p>
            </div>
          ))}
          {selectedCountry && <Information country={selectedCountry} />}
        </div>
      )}
    </div>
  );
};

export default CountryList;
