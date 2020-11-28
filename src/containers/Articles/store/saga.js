import { call, put, takeLatest, select } from "redux-saga/effects";
import { constants } from "../../../store/constants";
import { actions } from "../../../store/actions";
import * as selectors from "./selectors";
import { sagaAssessor } from "../../../utils";
import axios from "axios";
import { ROUTES_PATH } from "../../../router/constants";

const api = axios.create({
  baseURL: "http://localhost:4001/api",
});

const fetchArticles = ({ _, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const URL = ROUTES_PATH.ARTICLES;
        const { data } = yield call(() => api.get(URL));
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

export default function* articlesWatcher() {
  yield takeLatest(constants.ARTICLES_FETCH.REQUESTED, fetchArticles);
  yield takeLatest(constants.ARTICLE_FETCH.REQUESTED, fetchArticleById);
  yield takeLatest(constants.ARTICLE_EDIT.REQUESTED, editArticle);
  yield takeLatest(constants.ARTICLE_REMOVE.REQUESTED, removeArticleById);
  yield takeLatest(constants.ARTICLE_ADD.REQUESTED, addArticle);
}

// function* fetchArticles({ callback }) {
//   try {
//     const data = [
//       {
//         id: 1,
//         title: "Article title 001",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem fugit dicta culpa natus praesentium? Vero, magni neque. Quae, nostrum ratione laborum ab voluptatem minus soluta reiciendis officiis maxime suscipit magnam.",
//         image_url: "https://picsum.photos/id/388/200/300?grayscale",
//       },
//       {
//         id: 2,
//         title: "Article title 002",
//         description:
//           "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id suscipit, placeat laudantium ullam aperiam soluta deserunt tempore porro esse ad doloremque fugit quos, nam consequuntur! Possimus reprehenderit molestias dolores nostrum.",
//         image_url: "https://picsum.photos/id/389/200/300?grayscale",
//       },
//       {
//         id: 3,
//         title: "Article title 003",
//         description:
//           "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat vitae laudantium sequi deserunt numquam dolores minima sit aut quis ducimus ea quod, soluta accusantium sed velit, nemo totam, nobis modi!",
//         image_url: "https://picsum.photos/id/390/200/300?grayscale",
//       },
//       {
//         id: 4,
//         title: "Article title 004",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis cupiditate cumque fugiat officia. Voluptatibus quo voluptatem accusantium voluptate at ducimus eveniet eius, atque saepe! Est perferendis delectus odit voluptatibus eligendi.",
//         image_url: "https://picsum.photos/id/391/200/300?grayscale",
//       },
//       {
//         id: 5,
//         title: "Article title 005",
//         description:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus tenetur neque rerum, iure suscipit laboriosam earum cum sit architecto? Ex incidunt veniam neque, beatae distinctio accusamus hic et laborum!",
//         image_url: "https://picsum.photos/id/392/200/300?grayscale",
//       },
//       {
//         id: 6,
//         title: "Article title 006",
//         description:
//           "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt accusamus soluta fugit facere perspiciatis harum, ea obcaecati esse vero veritatis sint, velit dicta eaque commodi ex eos, vel animi maiores?",
//         image_url: "https://picsum.photos/id/393/200/300?grayscale",
//       },
//       {
//         id: 7,
//         title: "Article title 007",
//         description:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis delectus temporibus commodi provident nostrum ad, aut quod vero eaque animi deserunt dolor nemo amet modi neque voluptate id excepturi dolore?",
//         image_url: "https://picsum.photos/id/395/200/300?grayscale",
//       },
//     ];
//     yield put(actions.ARTICLES_FETCH.SUCCEEDED(data));
//   } catch (e) {
//     yield put(actions.ARTICLES_FETCH.FAILED(e));
//   } finally {
//     callback & (typeof callback === "function") && callback();
//   }
// }

// function* fetchArticleById({ payload, callback }) {
//   try {
//     const article = yield select(selectors.getArticleById(payload));
//     yield put(actions.ARTICLE_FETCH.SUCCEEDED(article));
//   } catch (e) {
//     yield put(actions.ARTICLE_FETCH.FAILED(e));
//   } finally {
//     callback & (typeof callback === "function") && callback();
//   }
// }

// function* editArticle({ payload, callback }) {
//   try {
//     yield put(actions.ARTICLE_EDIT.SUCCEEDED(payload));
//     yield put(actions.ARTICLE_EDIT.CLEARED());
//   } catch (e) {
//     yield put(actions.ARTICLE_EDIT.FAILED(e));
//   } finally {
//     callback & (typeof callback === "function") && callback();
//   }
// }

// function* removeArticleById({ payload, callback }) {
//   try {
//     yield put(actions.ARTICLE_REMOVE.SUCCEEDED(payload));
//   } catch (e) {
//     yield put(actions.ARTICLE_REMOVE.FAILED(e));
//   } finally {
//     callback & (typeof callback === "function") && callback();
//   }
// }

// function* addArticle({ payload, callback }) {
//   try {
//     yield put(actions.ARTICLE_ADD.SUCCEEDED(payload));
//   } catch (e) {
//     yield put(actions.ARTICLE_ADD.FAILED(e));
//   } finally {
//     callback & (typeof callback === "function") && callback();
//   }
// }
