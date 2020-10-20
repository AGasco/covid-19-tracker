import {
  updateCurrCountry,
  updateCountries,
} from "./../actions/countriesActions";

export const DATA_FETCH_BEGAN = "DATA_FETCH_BEGAN";
export const DATA_FETCH_SUCCEEDED = "DATA_FETCH_SUCCEEDED";
export const DATA_FETCH_FAILED = "DATA_FETCH_FAILED";

export const fetchWorldwideData = () => (dispatch) => {
  dispatch(fetchDataBegin());
  return (
    fetch("https://disease.sh/v3/covid-19/all")
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchDataSuccess(data));
        return data;
      })
      //set worldwide as curr country
      .then((data) => dispatch(updateCurrCountry(data)))
      .catch((error) => dispatch(fetchDataFailure(error)))
  );
};

export const fetchCountriesData = () => (dispatch) => {
  dispatch(fetchDataBegin());
  return fetch("https://disease.sh/v3/covid-19/countries/")
    .then(handleErrors)
    .then((res) => res.json())
    .then((data) => {
      dispatch(fetchDataSuccess(data));
      return data;
    })
    .then((data) => {
      dispatch(updateCountries(data));
      return data;
    })
    .catch((error) => dispatch(fetchDataFailure(error)));
};

export const fetchCurrCountryData = (url) => (dispatch) => {
  dispatch(fetchDataBegin());
  return fetch(url)
    .then(handleErrors)
    .then((res) => res.json())
    .then((data) => {
      dispatch(fetchDataSuccess(data));
      return data;
    })
    .then((data) => {
      dispatch(updateCurrCountry(data));
      return data;
    })
    .catch((error) => dispatch(fetchDataFailure(error)));
};

const fetchDataBegin = () => ({
  type: DATA_FETCH_BEGAN,
});

const fetchDataSuccess = (data) => ({
  type: DATA_FETCH_SUCCEEDED,
  payload: { data },
});

const fetchDataFailure = (error) => ({
  type: DATA_FETCH_FAILED,
  payload: { error },
});

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
