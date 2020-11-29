import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ArticleShort } from "../../components";
import { getAllArticles } from "../../store/selectors";
// import { actions } from "../../../../store/actions";

// import { v4 as uuidv4 } from "uuid";

import { useTranslation } from "react-i18next";

import "./index.scss";
import { Button } from "@material-ui/core";
import useStyles from "./styles";
import { push } from "connected-react-router";
import { ROUTES_PATH } from "../../../../router/constants";

export default () => {
  const dispatch = useDispatch();
  const articles = useSelector(getAllArticles());
  const { t } = useTranslation();
  const classes = useStyles();

  const handleAddArticle = () => {
    // dispatch(
    //   actions.ARTICLE_ADD.REQUESTED({
    //     title: `Article title ${uuidv4()}`,
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis odio cupiditate minima corporis blanditiis ducimus, libero eaque ea deleniti velit odit laborum non molestias voluptate pariatur iure magnam iste sunt.",
    //     image_url: "https://picsum.photos/id/395/200/300?grayscale",
    //   })
    // );
    dispatch(push(`${ROUTES_PATH.ARTICLES}/new`));
  };

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} onClick={handleAddArticle}>
        {t("Add new Article")}
      </Button>
      <div className="articles-list">
        {articles.map((article) => (
          <ArticleShort key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};
