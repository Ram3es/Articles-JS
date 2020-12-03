import * as Yup from "yup";

export const FORMS = {
  USER: {
    INIT: {
      first_name: "",
      last_name: "",
    },
    SCHEME: Yup.object().shape({
      first_name: Yup.string().min(3).required("This field is required"),
      last_name: Yup.string().min(3).required("This field is required"),
    }),
  },
};
