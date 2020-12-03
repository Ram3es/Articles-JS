import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { ArticlesReducer } from "../containers/Articles/store";
import { AuthReducer } from "../containers/Auth/store";
import { UserReducer } from "../containers/User/store";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    articlesReducer: ArticlesReducer,
    authReducer: AuthReducer,
    userReducer: UserReducer,
  });
