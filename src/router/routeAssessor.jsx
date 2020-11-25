import React from "react";
import { Route } from "react-router";

const routeAssessor = (parentRoutePath, route) => {
  const { children, component, exact, path } = route;

  const fullPath = parentRoutePath ? `${parentRoutePath}${path}` : path;

  if (!children.length) {
    return <Route key={fullPath} path={fullPath} exact={exact} component={component} />;
  } else {
    return children.map((childRoute) => routeAssessor(path, childRoute));
  }
};

export default routeAssessor;
