import React from "react";

const CountrySearch = ({ country, handleChangeCountry }) => {
  return (
    <div>
      <label htmlFor="search">find countries</label>
      <input
        type="text"
        value={country}
        onChange={(e) => handleChangeCountry(e.target.value)}
      />
    </div>
  );
};

export default CountrySearch;
