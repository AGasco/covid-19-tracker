export const MAP_DATA_UPDATED = "MAP_DATA_UPDATED";
export const COUNTRIES_UPDATED = "COUNTRIES_UPDATED";
export const CURR_COUNTRY_UPDATED = "CURR_COUNTRY_UPDATED";

export const updateMapData = (coords, zoom) => {
  return {
    type: MAP_DATA_UPDATED,
    payload: { lat: coords.lat, lng: coords.lng, zoom },
  };
};

export const updateCountries = (countries) => {
  return {
    type: COUNTRIES_UPDATED,
    payload: { countries },
  };
};

export const updateCurrCountry = (countryData) => ({
  type: CURR_COUNTRY_UPDATED,
  payload: { countryData },
});
