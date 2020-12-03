import { createSelector } from "reselect";

const authState = (state) => state.authReducer;

export const getAuth = () => createSelector(authState, (state) => state);
