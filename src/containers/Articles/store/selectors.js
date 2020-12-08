import { createSelector } from "reselect";

export const selectArticlesState = (state) => state.articlesReducer;

export const getAllArticles = () => createSelector(selectArticlesState, (state) => state);

export const getArticleById = (id) =>
  createSelector(selectArticlesState, (state) => state.articles.find((article) => article.id === id));
