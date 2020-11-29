import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Typography, FormControl, TextField, Button } from "@material-ui/core";
import "./index.scss";
import { Formik, Form } from "formik";
import { FORMS } from "../../constants/forms";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../router/constants";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

const AccountActivation = ({
  match: {
    params: { token },
  },
}) => {
  const classes = useStyles();
  const [isExpiredToken, setIsExpiredToken] = useState(false);
  const dispatch = useDispatch();
  //const user = useSelector(getUser());
  const user = null;

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token, false);

      if (decoded) {
        setIsExpiredToken(decoded.exp < new Date().getTime());
        fetchUserBeforeActivation(decoded.data);
      } else {
        dispatch(push(ROUTES_PATH.SIGN_IN));
      }
    } else {
      dispatch(push(ROUTES_PATH.SIGN_IN));
    }
  }, [dispatch, token]);

  const fetchUserBeforeActivation = (id) => {};

  const handleSubmit = (data) => {};

  return (
    <>
      <img src="/assets/icons/reg.svg" alt="Account Activation" className={classes.icon} />
      <Typography variant="button">Account Activation</Typography>

      {isExpiredToken ? (
        <>
          <Typography variant="body1" display="block" gutterBottom align="center">
            Link for account activation is expired
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => dispatch(push(ROUTES_PATH.SIGN_UP))}
          >
            Go To Registration
          </Button>
        </>
      ) : null}

      {user && user.active ? (
        <>
          <Typography variant="body1" display="block" gutterBottom align="center">
            User already active
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
        </>
      ) : null}

      {user && !user.active ? (
        <Formik
          initialValues={FORMS.ACTIVATION.INIT}
          validationSchema={FORMS.ACTIVATION.SCHEME}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values: { firstName, lastName }, handleChange }) => {
            return (
              <Form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    helperText={touched.firstName ? errors.firstName : ""}
                    error={touched.firstName && Boolean(errors.firstName)}
                    value={firstName}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    helperText={touched.lastName ? errors.lastName : ""}
                    error={touched.lastName && Boolean(errors.lastName)}
                    value={lastName}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Activate
                </Button>
                <div className={classes.actions}>
                  <div className={classes.actionsItem}>
                    <Link to={ROUTES_PATH.SIGN_IN} className={classes.link}>
                      <Typography variant="caption" color="primary">
                        Back to Login
                      </Typography>
                    </Link>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </>
  );
};

export default AccountActivation;
