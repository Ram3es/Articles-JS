import React from "react";

import { useDispatch } from "react-redux";

import { actions } from "store/actions";

import { Container } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import useStyles from "./styles";
import "./index.scss";

export default ({ countObj, filter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { limit, skip } = filter;
  const count = Math.ceil(countObj / limit);

  const handleChangePagination = (e, pageNumber) => {
    dispatch(
      actions.ARTICLES_UPDATE.REQUESTED({
        ...filter,
        skip: pageNumber,
      })
    );
  };

  return (
    <>
      {count ? (
        <Container className={classes.paginationWrap}>
          <Pagination
            count={count}
            page={skip}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          ></Pagination>
        </Container>
      ) : null}
    </>
  );
};
