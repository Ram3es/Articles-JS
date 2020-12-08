import { actionConstantsCreator } from "../utils";
import axios from "axios";

const ARTICLES = [
  "ARTICLES_FETCH",
  "ARTICLES_UPDATE",
  "ARTICLE_FETCH",
  "ARTICLE_EDIT",
  "ARTICLE_REMOVE",
  "ARTICLE_ADD",
];

const USER = ["USER_FETCH"];

const AUTH = ["SIGN_IN", "SIGN_UP", "SIGN_OUT", "RESET", "FORGOT", "ACTIVATION"];

export const compose = [...ARTICLES, ...USER, ...AUTH];
export const constants = actionConstantsCreator(compose);

//console.log(constants);

//Update_advanced_search.request({ skip: 2 }, () => fetchArticles.request())

export const initialState = {
  article: {
    articles: [],
    selectedArticle: null,
    loading: false,
    error: null,
    advancedSearch: {
      searchStr: "",
      order: "created_at_desc",
      limit: 4,
      skip: 1,
    },
    count: 0,
  },
  user: {},
  auth: {
    token: null,
    isAuth: false,
    loading: false,
    error: null,
  },
};

export const api = axios.create({
  baseURL: "http://localhost:4001/api",
});
