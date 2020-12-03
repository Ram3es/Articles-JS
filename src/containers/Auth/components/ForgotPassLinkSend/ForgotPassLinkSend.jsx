import React from "react";
import useStyles from "./styles";
import { Typography, Button } from "@material-ui/core";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { Auth } from "../../containers/Auth";

const ForgotPassLinkSend = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Auth>
      <img src="/assets/icons/login.svg" alt="Password change request" className={classes.icon} />
      <Typography variant="button">Password change request</Typography>
      <Typography variant="body1" display="block" align="center">
        We sent an email to your mail with instructions for activating account
      </Typography>
      <Typography variant="subtitle2" display="block" align="center">
        Link will be active for 1 hour
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => dispatch(push(ROUTES_PATH.SIGN_IN))}
      >
        Go To Login
      </Button>
    </Auth>
  );
};

export default ForgotPassLinkSend;
