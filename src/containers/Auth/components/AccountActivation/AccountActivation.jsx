import React, { useEffect, useState } from "react";
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
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { Auth } from "../../containers/Auth";
import { actions } from "../../../../store/actions";
import { getUser } from "../../../User/store/selectors";

const AccountActivation = ({
  match: {
    params: { token },
  },
}) => {
  const classes = useStyles();
  const [isExpiredToken, setIsExpiredToken] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(getUser());
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token);

      if (decoded) {
        setIsExpiredToken(decoded.exp < new Date().getTime());
        fetchUserBeforeActivation(decoded.data);
      } else {
        dispatch(push(ROUTES_PATH.SIGN_IN));
      }
    } else {
      dispatch(push(ROUTES_PATH.SIGN_IN));
    }
  }, [dispatch, fetchUserBeforeActivation, token]);

  const fetchUserBeforeActivation = (id) => {
    dispatch(actions.USER_FETCH.REQUESTED(id));
  };

  const handleSubmit = (data) => {
    dispatch(actions.ACTIVATION.REQUESTED({ id: user.id, ...data }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Auth>
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
      ) : user && user.is_active ? (
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
      ) : (
        <Formik
          initialValues={FORMS.ACTIVATION.INIT}
          validationSchema={FORMS.ACTIVATION.SCHEME}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            values: { first_name, last_name, password },
            handleChange,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <Form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    helperText={touched.first_name ? errors.first_name : ""}
                    error={touched.first_name && Boolean(errors.first_name)}
                    value={first_name}
                    onChange={(e) => {
                      setFieldValue("first_name", e.target.value);
                      setFieldTouched("first_name", true, false);
                    }}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    helperText={touched.last_name ? errors.last_name : ""}
                    error={touched.last_name && Boolean(errors.last_name)}
                    value={last_name}
                    onChange={(e) => {
                      setFieldValue("last_name", e.target.value);
                      setFieldTouched("last_name", true, false);
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
                  <FormHelperText error={Boolean(errors.password)}>
                    {touched.password && errors.password}
                  </FormHelperText>
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
      )}
    </Auth>
  );
};

export default AccountActivation;
