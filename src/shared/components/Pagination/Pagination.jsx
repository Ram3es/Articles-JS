import React from "react";

import { Link } from "react-router-dom";

import { ROUTES_PATH } from "router/constants";

import { Container } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";

import useStyles from "./styles";
import "./index.scss";

export default ({ countObj, filter, onUpdateArticles }) => {
  const classes = useStyles();
  const { limit, skip } = filter;
  const count = Math.ceil(countObj / limit);

  return (
    <>
      {count ? (
        <Container className={classes.paginationWrap}>
          <Pagination
            count={count}
            page={skip}
            variant="outlined"
            shape="rounded"
            onChange={onUpdateArticles}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`${ROUTES_PATH.ARTICLES}?${new URLSearchParams({
                  ...filter,
                  skip: item.page,
                }).toString()}`}
                {...item}
                data-page={item.page}
              />
            )}
          ></Pagination>
        </Container>
      ) : null}
    </>
  );
};
