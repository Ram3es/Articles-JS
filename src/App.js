import React from "react";
import { Switch } from "react-router";
import { privateRouter, publicRouter } from "./router";
import routeAssessor from "./router/routeAssessor";
import { Main } from "./containers/Main/containers";

export default () => (
  <Switch>
    {publicRouter.map((route) => routeAssessor(null, route))}
    <Main>{privateRouter().map((route) => routeAssessor(null, route))}</Main>
  </Switch>
);
