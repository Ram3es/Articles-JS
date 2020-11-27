import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ArticleShort } from "../../components";
import { getAllArticles } from "../../store/selectors";
import { actions } from "../../../../store/actions";

import { v4 as uuidv4 } from "uuid";

import { useTranslation } from "react-i18next";

import "./index.scss";

export default () => {
  const dispatch = useDispatch();
  const articles = useSelector(getAllArticles());
  const { t } = useTranslation();

  const hangeAddArticle = () => {
    dispatch(
      actions.ARTICLE_ADD.REQUESTED({
        id: uuidv4(),
        title: `Article title ${uuidv4()}`,
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis odio cupiditate minima corporis blanditiis ducimus, libero eaque ea deleniti velit odit laborum non molestias voluptate pariatur iure magnam iste sunt.",
        image: "https://picsum.photos/id/395/200/300?grayscale",
      })
    );
  };

  return (
    <div>
      <button onClick={hangeAddArticle}>{t("Add new Article")}</button>
      <div className="articles-list">
        {articles.map((article) => (
          <ArticleShort key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
