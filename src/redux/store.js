import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import fetchReducer from "./reducers/fetchReducer";
import countriesReducer from "./reducers/countriesReducer";
import miscReducer from "./reducers/miscReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    fetch: fetchReducer,
    countries: countriesReducer,
    misc: miscReducer,
  }),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
