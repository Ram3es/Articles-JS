import React from "react";
import "./index.scss";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { actions } from "../../../../store/actions";

export default ({ article: { id, title, description, image } }) => {
  const dispatch = useDispatch();

  const handleRemoveArticle = () => {
    dispatch(actions.ARTICLE_REMOVE.REQUESTED(id));
  };

  return (
    <article className="article">
      <div className="article__img-wrap">
        <img src={image} alt={title} />
      </div>
      <h3 className="article__title">{title}</h3>
      <p className="article__desc">{description}</p>
      <div>
        <button type="button">View</button>
        <button type="button" onClick={() => dispatch(push(`${ROUTES_PATH.ARTICLES}/${id}`))}>
          Edit
        </button>
        <button type="button" onClick={handleRemoveArticle}>
          Remove
        </button>
      </div>
    </article>
  );
};
