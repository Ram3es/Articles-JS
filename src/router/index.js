import { ROUTES_PATH, ROUTES_LABEL } from "./constants";
import React from "react";

import { Articles } from "../containers/Articles/containers";
import { Article } from "../containers/Articles/components";
import {
  SignIn,
  SignUp,
  ResetPassword,
  ForgotPassword,
  AccountActivation,
  AccountLinkSend,
  ForgotPassLinkSend,
} from "../containers/Auth/components";

export const privateRouter = (userRole) =>
  [
    {
      path: ROUTES_PATH.ARTICLES,
      component: Articles,
      exact: true,
      children: [
        {
          path: "/:id",
          component: Article,
          exact: true,
          children: [],
          accessLevel: [],
          label: ROUTES_LABEL.ARTICLE,
          icon: null,
        },
      ],
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
    component: SignIn,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.SIGN_UP,
    component: SignUp,
    exact: true,
    children: [],
  },
  {
    path: `${ROUTES_PATH.RESET}/:token`,
    component: ResetPassword,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.FORGOT,
    component: ForgotPassword,
    exact: true,
    children: [],
  },
  {
    path: `${ROUTES_PATH.ACTIVATION}/:token`,
    component: AccountActivation,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.ACCOUNT_LINK_SEND,
    component: AccountLinkSend,
    exact: true,
    children: [],
  },
  {
    path: ROUTES_PATH.FORGOT_PASS_LINK_SEND,
    component: ForgotPassLinkSend,
    exact: true,
    children: [],
  },
];
