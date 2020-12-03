import * as Yup from "yup";

export const FORMS = {
  SIGN_IN: {
    INIT: {
      email: "",
      password: "",
    },
    SCHEME: Yup.object().shape({
      email: Yup.string().email().required("This field is required"),
      password: Yup.string().min(8).required("This field is required"),
    }),
  },
  SIGN_UP: {
    INIT: {
      email: "",
    },
    SCHEME: Yup.object().shape({
      email: Yup.string().email().required("This field is required"),
    }),
  },
  FORGOT: {
    INIT: {
      email: "",
    },
    SCHEME: Yup.object().shape({
      email: Yup.string().email().required("This field is required"),
    }),
  },
  RESET: {
    INIT: {
      password: "",
      confirmationPassword: "",
    },
    SCHEME: Yup.object().shape({
      password: Yup.string().min(8).required("This field is required"),
      confirmationPassword: Yup.string()
        .min(8)
        .oneOf([Yup.ref("password"), null], "Passwords don't match")
        .required("This field is required"),
    }),
  },
  ACTIVATION: {
    INIT: {
      first_name: "",
      last_name: "",
      password: "",
    },
    SCHEME: Yup.object().shape({
      first_name: Yup.string().min(3).required("This field is required"),
      last_name: Yup.string().min(3).required("This field is required"),
      password: Yup.string().min(8).required("This field is required"),
    }),
  },
};
