import { constants, initialState } from "store/constants";

export default (state = initialState.user, action) => {
  switch (action.type) {
    case constants.USER_FETCH.REQUESTED:
      return {
        ...state,
      };
    case constants.USER_FETCH.SUCCEEDED:
      return {
        ...action.payload,
      };
    case constants.USER_FETCH.FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    case constants.USER_FETCH.CLEARED:
      return {
        ...initialState.user,
      };

    default:
      return { ...state };
  }
};
