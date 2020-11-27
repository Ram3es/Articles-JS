import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { ArticlesReducer } from "../containers/Articles/store";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    articlesReducer: ArticlesReducer,
  });
