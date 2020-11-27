import { all } from "redux-saga/effects";

import { ArticlesSaga } from "../containers/Articles/store";

export default function* rootSaga() {
  yield all([ArticlesSaga()]);
}
