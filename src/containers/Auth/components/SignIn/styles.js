import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(),
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  actionsItem: {
    display: "flex",
    flexBasis: "50%",
    margin: "5px",
    marginBottom: 0,
  },
  actionsItemLast: {
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
  },
  icon: {
    margin: `0 0 ${theme.spacing(2)}px`,
    padding: "15px",
    borderRadius: "50%",
    boxShadow: "0 0 15px rgba(0, 0, 0, .1)",
    backgroundColor: "#f6d946",
  },
}));
