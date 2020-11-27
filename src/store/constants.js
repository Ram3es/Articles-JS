import { actionConstantsCreator } from "../utils";

const ARTICLES = ["ARTICLES_FETCH", "ARTICLE_FETCH", "ARTICLE_EDIT", "ARTICLE_REMOVE", "ARTICLE_ADD"];

const USER = ["USER_FETCH"];

export const compose = [...ARTICLES, ...USER];
export const constants = actionConstantsCreator(compose);
