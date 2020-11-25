import React from "react";
import "./index.scss";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

import classNames from "classnames";

const SideBarLink = ({ location: { pathname }, route: { label, path } }) => {
  const dispatch = useDispatch();

  let linkClass = classNames({
    nav__link: true,
    "nav__link--active": path === pathname,
  });

  return (
    <div onClick={() => dispatch(push(path))} className={linkClass}>
      {label}
    </div>
  );
};

export default withRouter(SideBarLink);
