import {
  DATA_FETCH_BEGAN,
  DATA_FETCH_FAILED,
  DATA_FETCH_SUCCEEDED,
} from "../actions/fetchActions";

const initialState = {
  worldwideData: {},
  loading: false,
  error: null,
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_FETCH_BEGAN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DATA_FETCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        worldwideData: action.payload.data,
      };
    case DATA_FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        worldwideData: {},
      };
    default:
      return state;
  }
};

export default fetchReducer;
