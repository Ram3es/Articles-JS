import React from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ROUTES_PATH } from "../../../../router/constants";
import { actions } from "store/actions";
import { FORMS } from "containers/Auth/constants/forms";

import { Auth } from "containers/Auth/containers/Auth";
import { Typography, FormControl, TextField, Button } from "@material-ui/core";
import { Formik, Form } from "formik";

import useStyles from "./styles";
import "./index.scss";

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(actions.FORGOT.REQUESTED(data));
  };

  return (
    <Auth>
      <img src="/assets/icons/login.svg" alt="Forgot Password" className={classes.icon} />
      <Typography variant="button">Forgot Password</Typography>
      <Formik initialValues={FORMS.FORGOT.INIT} validationSchema={FORMS.FORGOT.SCHEME} onSubmit={handleSubmit}>
        {({ errors, touched, values: { email }, handleChange, setFieldValue, setFieldTouched }) => {
          return (
            <Form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  value={email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                    setFieldTouched("email", true, false);
                  }}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Send Email
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
    </Auth>
  );
};

export default ForgotPassword;
