import axios from "axios";

import { actionConstantsCreator } from "utils";

const ARTICLES = [
  "ARTICLES_FETCH",
  "ARTICLES_UPDATE",
  "ARTICLE_FETCH",
  "ARTICLE_EDIT",
  "ARTICLE_REMOVE",
  "ARTICLE_ADD",
  "ARTICLE_VIEWED",
];

const USER = ["USER_FETCH"];

const AUTH = ["SIGN_IN", "SIGN_UP", "SIGN_OUT", "RESET", "FORGOT", "ACTIVATION"];

export const compose = [...ARTICLES, ...USER, ...AUTH];
export const constants = actionConstantsCreator(compose);

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
    isAuth: true,
    loading: false,
    error: null,
  },
};

export const api = axios.create({
  baseURL: "http://localhost:4001/api",
});
