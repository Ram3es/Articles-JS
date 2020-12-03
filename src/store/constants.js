import { actionConstantsCreator } from "../utils";
import axios from "axios";

const ARTICLES = ["ARTICLES_FETCH", "ARTICLE_FETCH", "ARTICLE_EDIT", "ARTICLE_REMOVE", "ARTICLE_ADD"];

const USER = ["USER_FETCH"];

const AUTH = ["SIGN_IN", "SIGN_UP", "SIGN_OUT", "RESET", "FORGOT", "ACTIVATION"];

export const compose = [...ARTICLES, ...USER, ...AUTH];
export const constants = actionConstantsCreator(compose);

//console.log(constants);

export const initialState = {
  article: {
    articles: [],
    selectedArticle: null,
    loading: false,
    error: null,
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
