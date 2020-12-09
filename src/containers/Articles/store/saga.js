import { call, put, takeLatest, select } from "redux-saga/effects";

import { ROUTES_PATH } from "router/constants";
import { constants, api } from "store/constants";
import { actions } from "store/actions";
import * as selectors from "./selectors";
import { sagaAssessor } from "utils";

const fetchArticles = ({ _, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const { searchStr, order, limit, skip } = yield select((state) => state.articlesReducer.advancedSearch);

        let query = "";
        let URL = `${ROUTES_PATH.ARTICLES}?`;

        URL += `search=${searchStr}&`;
        URL += `order=${order}&`;
        URL += `limit=${limit}&`;
        URL += `skip=${skip}`;

        const { data } = yield call(() => api.get(`${URL}${query}`));
        yield put(actions.ARTICLES_FETCH.SUCCEEDED(data));
      },
    actions.ARTICLES_FETCH.FAILED,
    callback
  );

const fetchArticleById = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const article = yield select(selectors.getArticleById(payload));
        yield put(actions.ARTICLE_FETCH.SUCCEEDED(article));
      },
    actions.ARTICLE_FETCH.FAILED,
    callback
  );

const editArticle = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const { id, ...rest } = payload;
        const URL = `${ROUTES_PATH.ARTICLES}/${id}`;
        const { data } = yield call(() => api.put(URL, rest));

        yield put(actions.ARTICLE_EDIT.SUCCEEDED(data));
        yield put(actions.ARTICLE_EDIT.CLEARED());
      },
    actions.ARTICLE_EDIT.FAILED,
    callback
  );

const removeArticleById = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = `${ROUTES_PATH.ARTICLES}/${payload}`;
        const { data } = yield call(() => api.delete(URL));

        yield put(actions.ARTICLE_REMOVE.SUCCEEDED(data.id));
      },
    actions.ARTICLE_REMOVE.FAILED,
    callback
  );

const addArticle = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = ROUTES_PATH.ARTICLES;
        const { data } = yield call(() => api.post(URL, payload));
        yield put(actions.ARTICLE_ADD.SUCCEEDED(data));
      },
    actions.ARTICLE_ADD.FAILED,
    callback
  );

const updateArticles = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        yield put(actions.ARTICLES_UPDATE.SUCCEEDED(payload));

        //if (payload.searchStr.length < 5) return;

        yield put(actions.ARTICLES_FETCH.REQUESTED());
      },
    actions.ARTICLES_UPDATE.FAILED,
    callback
  );

const updateViewedArticle = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const { id, ...rest } = payload;
        console.log(payload);
        const URL = `${ROUTES_PATH.ARTICLES}/${id}`;
        const { data } = yield call(() => api.put(URL, rest));

        yield put(actions.ARTICLE_VIEWED.SUCCEEDED(data));
      },
    actions.ARTICLE_VIEWED.FAILED,
    callback
  );

export default function* articlesWatcher() {
  yield takeLatest(constants.ARTICLES_FETCH.REQUESTED, fetchArticles);
  yield takeLatest(constants.ARTICLE_FETCH.REQUESTED, fetchArticleById);
  yield takeLatest(constants.ARTICLE_EDIT.REQUESTED, editArticle);
  yield takeLatest(constants.ARTICLE_REMOVE.REQUESTED, removeArticleById);
  yield takeLatest(constants.ARTICLE_ADD.REQUESTED, addArticle);
  yield takeLatest(constants.ARTICLES_UPDATE.REQUESTED, updateArticles);
  yield takeLatest(constants.ARTICLE_VIEWED.REQUESTED, updateViewedArticle);
}
