import React from "react";
import { Switch } from "react-router";
import { privateRouter, publicRouter } from "./router";
import routeAssessor from "./router/routeAssessor";
import { Main } from "./containers/Main/containers";
//import { Auth } from "./containers/Auth/containers";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/styles";

export default () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      {publicRouter.map((route) => routeAssessor(null, route))}
      <Main>{privateRouter().map((route) => routeAssessor(null, route))}</Main>
    </Switch>
  </MuiThemeProvider>
);
