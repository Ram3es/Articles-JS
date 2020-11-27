import React, { useEffect, useState } from "react";
import "./index.scss";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { getArticleById } from "../../store/selectors";
import { withRouter } from "react-router";
import { actions } from "../../../../store/actions";

export default withRouter(
  ({
    match: {
      params: { id },
    },
  }) => {
    const dispatch = useDispatch();
    const [article, setArticle] = useState(null);

    useEffect(() => {
      dispatch(actions.ARTICLE_FETCH.REQUESTED(Number(id)));
    }, [dispatch, id]);

    const selectedArticle = useSelector(getArticleById(Number(id)));

    useEffect(() => {
      setArticle(selectedArticle);
    }, [selectedArticle]);

    const handleChangeArticle = () => {
      dispatch(actions.ARTICLE_EDIT.REQUESTED(article));

      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleRemoveArticle = () => {
      dispatch(actions.ARTICLE_REMOVE.REQUESTED(article.id));

      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleCancelArticle = () => {
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    return article ? (
      <article className="article article--full">
        <div className="article__img-wrap">
          <img src={article.image} alt={article.title} />
        </div>
        <h3 className="article__title">{article.title}</h3>
        <p className="article__desc">{article.description}</p>
        <div>
          <button type="button" onClick={handleCancelArticle}>
            Cancel
          </button>
          <button type="button" onClick={handleChangeArticle}>
            Save Changes
          </button>
          <button type="button" onClick={handleRemoveArticle}>
            Remove
          </button>
        </div>
      </article>
    ) : null;
  }
);
