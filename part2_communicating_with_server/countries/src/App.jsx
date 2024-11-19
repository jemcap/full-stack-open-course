import { useState, useEffect } from "react";

import countrySearchService from "./services/countries";
import "./App.css";
import CountryList from "./components/CountryList";
import CountrySearch from "./components/CountrySearch";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [weather, setWeather] = useState("");

  console.log(countryName);

  useEffect(() => {
    countrySearchService
      .getAllCountries()
      .then((response) => setCountries(response));
  }, []);

  // let filteredCountry = countries.filter((country) =>
  //   country.toLowerCase().includes(countryName.toLowerCase())
  // );

  return (
    <>
      <CountrySearch
        country={countryName}
        handleChangeCountry={setCountryName}
      />
      <CountryList countries={countries} filterCountry={countryName} />
    </>
  );
}

export default App;
