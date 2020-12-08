import React from "react";
import "./index.scss";
import "./styles";
import { Container } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { ROUTES_PATH } from "../../../router/constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";

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
            // renderItem={(item) => (
            //   <PaginationItem
            //     component={Link}
            //     to={`${ROUTES_PATH.ARTICLES}${item.page === 1 ? '' : `?page=${item.page}`}`}
            //     {...item}
            //   />
            // )}
            onChange={handleChangePagination}
          ></Pagination>
        </Container>
      ) : null}
    </>
  );
};
