import React from "react";
import useStyles from "./styles";
import { CssBaseline, Paper } from "@material-ui/core";

const Auth = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>{children}</Paper>
    </main>
  );
};

export default Auth;
