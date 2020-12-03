import React, { useState } from "react";
import useStyles from "./styles";
import {
  Typography,
  FormControl,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./index.scss";
import { Formik, Form } from "formik";
import { FORMS } from "../../constants/forms";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../router/constants";
import { Auth } from "../../containers/Auth";
//import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { actions } from "../../../../store/actions";

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (data) => {
    dispatch(actions.SIGN_IN.REQUESTED(data));
    //dispatch(push(ROUTES_PATH.SIGN_IN));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Auth>
      <img src="/assets/icons/login.svg" alt="Sign In" className={classes.icon} />
      <Typography variant="button">Login</Typography>
      <Formik
        enableReinitialize={true}
        initialValues={FORMS.SIGN_IN.INIT}
        validationSchema={FORMS.SIGN_IN.SCHEME}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values: { email, password }, handleChange, setFieldValue, setFieldTouched }) => {
          return (
            <Form className={classes.form}>
              <FormControl margin="normal" fullWidth>
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
              <FormControl
                margin="normal"
                fullWidth
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                    setFieldTouched("password", true, false);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={75}
                />
                <FormHelperText error={Boolean(errors.password)}>{touched.password && errors.password}</FormHelperText>
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
    </Auth>
  );
};

export default SignIn;
