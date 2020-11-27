import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "../../../../store/actions";

import { Header } from "../../../Header/containers";
import { SideBar } from "../../../SideBar/containers";

import "./index.scss";

export default ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.ARTICLES_FETCH.REQUESTED());
  }, [dispatch]);

  return (
    <main className="main">
      <Header />
      <div className="content">
        <SideBar />
        <div className="inner">{children}</div>
      </div>
    </main>
  );
};
