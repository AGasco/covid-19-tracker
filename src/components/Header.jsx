import React, { useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

const Header = ({
  countries,
  currCountry,
  defaultMapCenter,
  setCountries,
  setCurrCountry,
  setCountryInfo,
  setTableData,
  setMapCenter,
  setMapZoom,
  setMapCountries,
}) => {
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, [setCountryInfo]);

  //REACT HOOK
  useEffect(() => {
    //async -> send a request to a server, wait for it, do something with the data
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
          setTableData(data);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, [setCountries, setTableData, setMapCountries]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCurrCountry(countryCode);
        setCountryInfo(data);
        setMapCenter(
          countryCode === "worldwide"
            ? defaultMapCenter
            : [data.countryInfo.lat, data.countryInfo.long]
        );
        setMapZoom(countryCode === "worldwide" ? 3 : 4);
      });
  };

  return (
    <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={currCountry}
          onChange={onCountryChange}
        >
          <MenuItem key="worldwide" value="worldwide">
            Worldwide
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.name} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
