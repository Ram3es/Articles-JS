import React, { useEffect, useState } from "react";
import "./index.scss";
import useStyles from "./styles";
import { withRouter } from "react-router";
import { privateRouter } from "../../../../router";
import { Toolbar, IconButton, Typography, Button, AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import { actions } from "../../../../store/actions";

const Header = ({ location: { pathname }, open, setOpen }) => {
  const classes = useStyles();
  const [headerTitle, setTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const activeRoute = privateRouter().find((route) => route.path === pathname || route.path.includes(pathname));

    if (activeRoute) setTitle(activeRoute.label);
  }, [pathname]);

  return (
    <AppBar color="secondary" position="absolute" className={classnames(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar} variant="dense">
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          className={classnames(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {headerTitle ? `Header: ${headerTitle}` : ""}
        </Typography>
        <Button size="small" variant="contained" color="default" onClick={() => dispatch(actions.SIGN_OUT.REQUESTED())}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
