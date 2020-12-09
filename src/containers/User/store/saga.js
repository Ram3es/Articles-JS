import { call, put, takeLatest } from "redux-saga/effects";

import { constants, api } from "store/constants";
import { actions } from "store/actions";
import { sagaAssessor } from "utils";

const fetchUser = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = `/auth/${payload}`;
        const { data } = yield call(() => api.get(URL));
        yield put(actions.USER_FETCH.SUCCEEDED(data));
      },
    actions.USER_FETCH.FAILED,
    callback
  );

export default function* userWatcher() {
  yield takeLatest(constants.USER_FETCH.REQUESTED, fetchUser);
}
