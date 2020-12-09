import React from "react";

import { Switch } from "react-router";

import routeAssessor from "router/routeAssessor";
import { privateRouter, publicRouter } from "router";

import { Main } from "containers/Main/containers";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "styles/styles";

export default () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      {publicRouter.map((route) => routeAssessor(null, route))}
      <Main>{privateRouter().map((route) => routeAssessor(null, route))}</Main>
    </Switch>
  </MuiThemeProvider>
);
