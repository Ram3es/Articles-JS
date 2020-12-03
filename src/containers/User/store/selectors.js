import { createSelector } from "reselect";

const userState = (state) => state.userReducer;

export const getUser = () => createSelector(userState, (state) => state);
