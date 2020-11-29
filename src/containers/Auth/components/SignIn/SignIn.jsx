import React from "react";
import useStyles from "./styles";
import { Typography, FormControl, TextField, Button } from "@material-ui/core";
import "./index.scss";
import { Formik, Form } from "formik";
import { FORMS } from "../../constants/forms";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../router/constants";

const SignIn = () => {
  const classes = useStyles();

  const handleSubmit = (data) => {};

  return (
    <>
      <img src="/assets/icons/login.svg" alt="Sign In" className={classes.icon} />
      <Typography variant="button">Login</Typography>
      <Formik initialValues={FORMS.SIGN_IN.INIT} validationSchema={FORMS.SIGN_IN.SCHEME} onSubmit={handleSubmit}>
        {({ errors, touched, values: { email, password }, handleChange }) => {
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
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                  value={password}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Login
              </Button>
              <div className={classes.actions}>
                <div className={classes.actionsItem}>
                  <Link to={ROUTES_PATH.SIGN_UP} className={classes.link}>
                    <Typography variant="caption" color="primary">
                      Registration
                    </Typography>
                  </Link>
                </div>
                <div className={`${classes.actionsItem} ${classes.actionsItemLast}`}>
                  <Link to={ROUTES_PATH.FORGOT} className={classes.link}>
                    <Typography variant="caption" color="primary">
                      Forgot Password
                    </Typography>
                  </Link>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default SignIn;
