import React, { useEffect, useState } from "react";
import "./index.scss";
import { withRouter } from "react-router";
import { privateRouter } from "../../../../router";

const Header = (props) => {
  const [headerTitle, setTitle] = useState("");

  useEffect(() => {
    const {
      location: { pathname },
    } = props;
    const activeRoute = privateRouter().find((route) => route.path === pathname || route.path.includes(pathname));

    if (activeRoute) setTitle(activeRoute.label);
  }, [props]);

  return <header className="header">Header: {headerTitle}</header>;
};

export default withRouter(Header);
