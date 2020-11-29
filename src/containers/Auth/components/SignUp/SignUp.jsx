import React from "react";
import useStyles from "./styles";
import { Typography, FormControl, TextField, Button } from "@material-ui/core";
import "./index.scss";
import { Formik, Form } from "formik";
import { FORMS } from "../../constants/forms";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../router/constants";

const SignUp = () => {
  const classes = useStyles();

  const handleSubmit = (data) => {};

  return (
    <>
      <img src="/assets/icons/reg.svg" alt="Sign Up" className={classes.icon} />
      <Typography variant="button">Registration</Typography>
      <Formik initialValues={FORMS.SIGN_UP.INIT} validationSchema={FORMS.SIGN_UP.SCHEME} onSubmit={handleSubmit}>
        {({ errors, touched, values: { email }, handleChange }) => {
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
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Registration
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
    </>
  );
};

export default SignUp;
