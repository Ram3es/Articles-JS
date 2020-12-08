import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticleShort } from "../../components";
import { getAllArticles } from "../../store/selectors";
import { actions } from "../../../../store/actions";
// import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { push } from "connected-react-router";
import { ROUTES_PATH } from "../../../../router/constants";
import { Pagination } from "../../../../shared/components/Pagination";
import { Filter } from "../../../../shared/components/Filter";

export default () => {
  const dispatch = useDispatch();
  const { articles, loading, advancedSearch, count } = useSelector(getAllArticles());

  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    dispatch(actions.ARTICLES_FETCH.REQUESTED());
  }, [dispatch]);

  const handleAddArticle = () => {
    dispatch(push(`${ROUTES_PATH.ARTICLES}/new`));
  };

  return (
    <div>
      <Container>
        <div className={classes.heroButtons}>
          <Grid container spacing={2}>
            <Grid item>
              <Button onClick={handleAddArticle} variant="contained" color="primary">
                {t("Add new article")}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      {!loading ? (
        <>
          <Filter filter={advancedSearch} />
          {articles.length > 0 ? (
            <>
              <Container className={classes.cardGrid}>
                <Grid container spacing={4}>
                  {articles.map((article) => (
                    <Grid item key={article.id} xs={12} sm={6} md={4}>
                      <ArticleShort {...article} key={article.id} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
              <Pagination countObj={count} filter={advancedSearch} />
            </>
          ) : (
            <Container className={classes.cardGrid}>
              <Typography align="center" variant="h5" component="h5">
                No result. Change request
              </Typography>
            </Container>
          )}
        </>
      ) : (
        <Container className={classes.cardGrid}>
          <div>Preloading...</div>
        </Container>
      )}
    </div>
  );
};
