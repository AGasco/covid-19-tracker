import React, { useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { fetchCurrCountryData } from "./../redux/actions/fetchActions";
import { updateMapData } from "../redux/actions/countriesActions";
import { defaultMapCenter } from "./../utilities";
import { connect } from "react-redux";

const Header = ({
  currCountry,
  countries,
  fetchCurrCountry,
  updateMapData,
}) => {
  // useEffect(() => {
  //   console.log("currCountry", currCountry);
  // }, [currCountry]);

  useEffect(() => {
    const mapCoords = currCountry.country
      ? { lat: currCountry.countryInfo.lat, lng: currCountry.countryInfo.long }
      : defaultMapCenter;
    const mapZoom = currCountry.country ? 4 : 3;
    updateMapData(mapCoords, mapZoom);
  }, [currCountry, updateMapData]);

  const onCountryChange = (e) => {
    console.log("changing country");
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetchCurrCountry(url);
  };

  return (
    <div className="app__header">
      <h1>REACT-REDUX COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={currCountry.country ? currCountry.country : "worldwide"}
          onChange={(e) => onCountryChange(e)}
        >
          <MenuItem key="worldwide" value="worldwide">
            Worldwide
          </MenuItem>
          {countries.countries?.map((country) => (
            <MenuItem
              key={country.country ? country.country : "worldwide"}
              value={country.country ? country.country : "worldwide"}
            >
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currCountry: state.countries.currCountry,
    countries: state.countries.countries,
  };
};

const mapDispatchToProps = {
  fetchCurrCountry: fetchCurrCountryData,
  updateMapData: updateMapData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
