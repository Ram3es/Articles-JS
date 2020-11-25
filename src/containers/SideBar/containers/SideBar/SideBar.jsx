import React from "react";
import "./index.scss";
import { privateRouter } from "../../../../router";
import { SideBarLink } from "../../components/SideBarLink";

export default () => {
  //console.log(props)
  const nav = privateRouter().map((route) => {
    return <SideBarLink key={route.path} route={route} />;
  });

  return (
    <aside className="sidebar">
      <nav className="nav">{nav}</nav>
    </aside>
  );
};
