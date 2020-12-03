import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  formFieldWrapper: {
    padding: theme.spacing(2),
  },
  editor: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  image: {
    width: "100%",
    borderRadius: "4px",
  },
  button: {
    marginLeft: "10px",
  },
}));
