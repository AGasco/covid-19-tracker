import {
  MAP_DATA_UPDATED,
  COUNTRIES_UPDATED,
  CURR_COUNTRY_UPDATED,
} from "./../actions/countriesActions";

const initialState = {
  currCountry: {},
  countries: [],
  mapLng: null,
  mapLat: null,
  mapZoom: 3,
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_DATA_UPDATED:
      return {
        ...state,
        mapLng: action.payload.lng,
        mapLat: action.payload.lat,
        mapZoom: action.payload.zoom,
      };
    case COUNTRIES_UPDATED:
      return {
        ...state,
        countries: action.payload,
      };
    case CURR_COUNTRY_UPDATED:
      return {
        ...state,
        currCountry: action.payload.countryData,
      };
    default:
      return state;
  }
};

export default countriesReducer;
