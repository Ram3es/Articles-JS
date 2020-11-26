import React from "react";
import "./index.scss";

export default ({ article: { id, title, description, image } }) => {
  return (
    <article className="article">
      <div className="article__img-wrap">
        <img src={image} alt={title} />
      </div>
      <h3 className="article__title">{title}</h3>
      <p className="article__desc">{description}</p>
      <div>
        <button type="button">View</button>
        <button type="button">Edit</button>
        <button type="button">Remove</button>
      </div>
    </article>
  );
};
