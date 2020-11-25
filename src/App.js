import React from "react";
import { Switch } from "react-router";
import { privateRouter, publicRouter } from "./router";
import routeAssessor from "./router/routeAssessor";

export default () => (
  <Switch>
    {publicRouter.map((route) => routeAssessor(null, route))}
    {privateRouter().map((route) => routeAssessor(null, route))}
  </Switch>
);
