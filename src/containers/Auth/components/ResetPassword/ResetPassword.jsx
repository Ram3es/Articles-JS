import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Typography, FormControl, TextField, Button } from "@material-ui/core";
import "./index.scss";
import { Formik, Form } from "formik";
import { FORMS } from "../../constants/forms";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../router/constants";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";

const ResetPassword = ({
  match: {
    params: { token },
  },
}) => {
  const classes = useStyles();
  const [isExpiredToken, setIsExpiredToken] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token, false);

      if (decoded) {
        setIsExpiredToken(decoded.exp < new Date().getTime());
      } else {
        dispatch(push(ROUTES_PATH.SIGN_IN));
      }
    } else {
      dispatch(push(ROUTES_PATH.SIGN_IN));
    }
  }, [dispatch, token]);

  const handleSubmit = (data) => {};

  return (
    <>
      <img src="/assets/icons/login.svg" alt="Reset Password" className={classes.icon} />
      <Typography variant="button">Reset Password</Typography>
      {isExpiredToken ? (
        <>
          <Typography variant="body1" display="block" gutterBottom align="center">
            Link for change password is expired
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => dispatch(push(ROUTES_PATH.FORGOT))}
          >
            Go To Forgot Password
          </Button>
        </>
      ) : (
        <Formik initialValues={FORMS.RESET.INIT} validationSchema={FORMS.RESET.SCHEME} onSubmit={handleSubmit}>
          {({ errors, touched, values: { password, confirmationPassword }, handleChange }) => {
            return (
              <Form className={classes.form}>
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
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="confirmationPassword"
                    name="confirmationPassword"
                    label="Confirmation Password"
                    variant="outlined"
                    helperText={touched.confirmationPassword ? errors.confirmationPassword : ""}
                    error={touched.confirmationPassword && Boolean(errors.confirmationPassword)}
                    value={confirmationPassword}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Reset
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
      )}
    </>
  );
};
export default ResetPassword;
