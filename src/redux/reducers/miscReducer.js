import { TYPE_UPDATED } from "./../actions/miscActions";

const initialState = {
  currType: "cases",
};

const miscReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_UPDATED:
      return {
        ...state,
        currType: action.payload.type,
      };
    default:
      return state;
  }
};

export default miscReducer;
