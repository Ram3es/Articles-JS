import { constants, initialState } from "store/constants";

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case constants.SIGN_IN.REQUESTED:
    case constants.SIGN_UP.REQUESTED:
    case constants.ACTIVATION.REQUESTED:
    case constants.SIGN_OUT.REQUESTED:
    case constants.FORGOT.REQUESTED:
    case constants.RESET.REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.SIGN_IN.SUCCEEDED:
      return {
        ...state,
        isAuth: action.payload !== null,
        token: action.payload,
        loading: false,
        error: null,
      };
    case constants.SIGN_UP.SUCCEEDED:
    case constants.ACTIVATION.SUCCEEDED:
    case constants.SIGN_OUT.SUCCEEDED:
    case constants.FORGOT.SUCCEEDED:
    case constants.RESET.SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case constants.SIGN_IN.FAILED:
    case constants.SIGN_UP.FAILED:
    case constants.ACTIVATION.FAILED:
    case constants.SIGN_OUT.FAILED:
    case constants.FORGOT.FAILED:
    case constants.RESET.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case constants.SIGN_IN.CLEARED:
    case constants.SIGN_UP.CLEARED:
    case constants.ACTIVATION.CLEARED:
    case constants.SIGN_OUT.CLEARED:
    case constants.FORGOT.CLEARED:
    case constants.RESET.CLEARED:
      return {
        ...initialState.auth,
        loading: false,
      };

    default:
      return { ...state };
  }
};
