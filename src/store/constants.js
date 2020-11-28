import { actionConstantsCreator } from "../utils";

const ARTICLES = ["ARTICLES_FETCH", "ARTICLE_FETCH", "ARTICLE_EDIT", "ARTICLE_REMOVE", "ARTICLE_ADD"];

const USER = ["USER_FETCH"];

const AUTH = ["SIGN_IN", "SIGN_UP", "SIGN_OUT", "RESET", "FORGOT", "ACTIVATION"];

export const compose = [...ARTICLES, ...USER, ...AUTH];
export const constants = actionConstantsCreator(compose);
