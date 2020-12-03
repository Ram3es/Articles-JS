import React, { useEffect } from "react";
import useStyles from "./styles";
import { CssBaseline, Paper } from "@material-ui/core";
import { actions } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../../Auth/store/selectors";
import jwt from "jsonwebtoken";
import { ROUTES_PATH } from "../../../../router/constants";
import { push } from "connected-react-router";

const Auth = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuth } = useSelector(getAuth());

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwt.decode(token);

        if (decoded.exp < new Date().getTime()) {
          localStorage.removeItem("token");
          //dispatch(push(ROUTES_PATH.SIGN_IN));
        } else {
          dispatch(actions.SIGN_IN.SUCCEEDED(token));
          dispatch(actions.USER_FETCH.SUCCEEDED(decoded.user));
          localStorage.setItem("token", token);
        }
      }
    } else {
      dispatch(push(ROUTES_PATH.ARTICLES));
    }
  }, [isAuth, dispatch]);

  return !isAuth ? (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>{children}</Paper>
    </main>
  ) : null;
};

export default Auth;
