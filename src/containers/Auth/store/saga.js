import { call, put, takeLatest } from "redux-saga/effects";
import { constants, api } from "../../../store/constants";
import { actions } from "../../../store/actions";
//import * as selectors from "./selectors";
import { sagaAssessor } from "../../../utils";
import { ROUTES_PATH } from "../../../router/constants";
import { push } from "connected-react-router";

const URL_PREFIX = "/auth";

const SignIn = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = URL_PREFIX + ROUTES_PATH.SIGN_IN;
        const {
          data: { token, user },
        } = yield call(() => api.post(URL, payload));
        yield put(actions.SIGN_IN.SUCCEEDED(token));
        yield put(actions.USER_FETCH.SUCCEEDED(user));

        localStorage.setItem("token", token);

        yield put(push(ROUTES_PATH.ARTICLES));
      },
    actions.SIGN_IN.FAILED,
    callback
  );

const SignUp = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        try {
          const URL = URL_PREFIX + ROUTES_PATH.SIGN_UP;
          yield call(() => api.post(URL, payload));
          yield put(push(ROUTES_PATH.ACCOUNT_LINK_SEND));
        } catch (e) {
          alert(e);
        }
      },
    actions.SIGN_UP.FAILED,
    callback
  );

const Activation = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = URL_PREFIX + ROUTES_PATH.ACTIVATION;
        yield call(() => api.post(URL, payload));
        yield put(push(ROUTES_PATH.SIGN_IN));
      },
    actions.ACTIVATION.FAILED,
    callback
  );

const SignOut = ({ _, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        localStorage.removeItem("token");
        yield put(actions.SIGN_OUT.CLEARED());
        yield put(actions.USER_FETCH.CLEARED());
        yield put(push(ROUTES_PATH.SIGN_IN));
      },
    actions.SIGN_OUT.FAILED,
    callback
  );

const ForgotPassword = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = URL_PREFIX + ROUTES_PATH.FORGOT;
        yield call(() => api.post(URL, payload));
        yield put(push(ROUTES_PATH.FORGOT_PASS_LINK_SEND));
      },
    actions.FORGOT.FAILED,
    callback
  );

const ResetPassword = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = URL_PREFIX + ROUTES_PATH.RESET_PASSWORD;
        yield call(() => api.post(URL, payload));
        yield put(actions.USER_FETCH.CLEARED());
        yield put(push(ROUTES_PATH.SIGN_IN));
      },
    actions.RESET.FAILED,
    callback
  );

export default function* authWatcher() {
  yield takeLatest(constants.SIGN_IN.REQUESTED, SignIn);
  yield takeLatest(constants.SIGN_UP.REQUESTED, SignUp);
  yield takeLatest(constants.ACTIVATION.REQUESTED, Activation);
  yield takeLatest(constants.SIGN_OUT.REQUESTED, SignOut);
  yield takeLatest(constants.FORGOT.REQUESTED, ForgotPassword);
  yield takeLatest(constants.RESET.REQUESTED, ResetPassword);
}
