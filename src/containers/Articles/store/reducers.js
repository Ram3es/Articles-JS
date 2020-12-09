import { constants, initialState } from "../../../store/constants";

export default (state = initialState.article, action) => {
  switch (action.type) {
    case constants.ARTICLES_FETCH.REQUESTED:
    case constants.ARTICLE_FETCH.REQUESTED:
    case constants.ARTICLE_EDIT.REQUESTED:
    case constants.ARTICLE_REMOVE.REQUESTED:
    case constants.ARTICLE_ADD.REQUESTED:
    case constants.ARTICLES_UPDATE.REQUESTED:
    case constants.ARTICLE_VIEWED.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case constants.ARTICLES_FETCH.SUCCEEDED:
      return {
        ...state,
        articles: action.payload.articles,
        count: action.payload.count[0].count,
        loading: false,
        error: null,
      };
    case constants.ARTICLE_FETCH.SUCCEEDED:
      return {
        ...state,
        selectedArticle: action.payload,
        loading: false,
        error: null,
      };
    case constants.ARTICLE_EDIT.SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        selectedArticle: null,
        articles: [...state.articles].map((article) => {
          if (article.id === action.payload.id) {
            return action.payload;
          } else {
            return article;
          }
        }),
      };
    case constants.ARTICLE_VIEWED.SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        selectedArticle: null,
        articles: [...state.articles].map((article) => {
          if (article.id === action.payload.id) {
            return action.payload;
          } else {
            return article;
          }
        }),
      };
    case constants.ARTICLE_REMOVE.SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        articles: [...state.articles].filter((article) => article.id !== action.payload),
      };
    case constants.ARTICLE_ADD.SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        articles: [...state.articles].concat(action.payload),
      };
    case constants.ARTICLES_UPDATE.SUCCEEDED:
      return {
        ...state,
        advancedSearch: {
          ...action.payload,
        },
        loading: false,
        error: null,
      };
    case constants.ARTICLES_FETCH.FAILED:
    case constants.ARTICLE_FETCH.FAILED:
    case constants.ARTICLE_EDIT.FAILED:
    case constants.ARTICLE_REMOVE.FAILED:
    case constants.ARTICLE_ADD.FAILED:
    case constants.ARTICLES_UPDATE.FAILED:
    case constants.ARTICLE_VIEWED.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case constants.ARTICLES_FETCH.CLEARED:
      return {
        ...state,
        articles: null,
      };
    case constants.ARTICLE_FETCH.CLEARED:
      return {
        ...state,
        selectedArticle: null,
      };
    case constants.ARTICLE_EDIT.CLEARED:
      return {
        ...state,
        selectedArticle: null,
      };
    case constants.ARTICLE_VIEWED.CLEARED:
      return {
        ...state,
        selectedArticle: action.payload,
      };
    case constants.ARTICLES_UPDATE.CLEARED:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};
