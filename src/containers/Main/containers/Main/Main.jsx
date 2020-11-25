import React from "react";
import "./index.scss";

import { Header } from "../../../Header/containers";
import { SideBar } from "../../../SideBar/containers";

export default ({ children }) => {
  console.log(children);
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
