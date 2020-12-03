import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../store/actions";
import { Header } from "../../../Header/containers";
import { SideBar } from "../../../SideBar/containers";
import "./index.scss";
import useStyles from "./stylels";
import { CssBaseline, Grid } from "@material-ui/core";
import { getAuth } from "../../../Auth/store/selectors";
import jwt from "jsonwebtoken";
import { ROUTES_PATH } from "../../../../router/constants";
import { push } from "connected-react-router";

const Main = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isAuth } = useSelector(getAuth());

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwt.decode(token);

        if (decoded.exp < new Date().getTime()) {
          localStorage.removeItem("token");
          dispatch(push(ROUTES_PATH.SIGN_IN));
        } else {
          dispatch(actions.SIGN_IN.SUCCEEDED(token));
          dispatch(actions.USER_FETCH.SUCCEEDED(decoded.user));
          localStorage.setItem("token", token);
        }
      } else {
        dispatch(push(ROUTES_PATH.SIGN_IN));
      }
    }
  }, [isAuth, dispatch]);

  return isAuth ? (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </main>
    </div>
  ) : null;
};

export default Main;
