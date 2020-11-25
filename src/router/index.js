import { ROUTES_PATH, ROUTES_LABEL } from "./constants";
import React from "react";

export const privateRouter = (userRole) =>
  [
    {
      path: ROUTES_PATH.ARTICLES,
      component: <div>Articles</div>,
      exact: true,
      children: [],
      accessLevel: [],
      label: ROUTES_LABEL.ARTICLES,
      icon: null,
    },
    {
      path: ROUTES_PATH.USER,
      component: () => <div>User</div>,
      exact: true,
      children: [],
      accessLevel: [],
      label: ROUTES_LABEL.USER,
      icon: null,
    },
  ].filter((route) => (userRole ? route.accessLevel.includes(userRole) : true));

export const publicRouter = [
  {
    path: ROUTES_PATH.SIGN_IN,
    exact: true,
    component: () => <div>Login</div>,
    children: [],
  },
  {
    path: ROUTES_PATH.SIGN_UP,
    exact: true,
    component: () => <div>Registration</div>,
    children: [],
  },
  {
    path: ROUTES_PATH.RESET,
    exact: true,
    component: () => <div>Reset-password</div>,
    children: [],
  },
  {
    path: ROUTES_PATH.FORGOT,
    exact: true,
    component: () => <div>Forgot-password</div>,
    children: [],
  },
  {
    path: ROUTES_PATH.ACTIVATION,
    exact: true,
    component: () => <div>Activation</div>,
    children: [],
  },
];
