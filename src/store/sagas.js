import { all } from "redux-saga/effects";

import { ArticlesSaga } from "../containers/Articles/store";
import { AuthSaga } from "../containers/Auth/store";
import { UserSaga } from "../containers/User/store";

export default function* rootSaga() {
  yield all([ArticlesSaga(), AuthSaga(), UserSaga()]);
}
