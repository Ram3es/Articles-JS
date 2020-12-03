import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  button: {
    padding: "10px 30px",
    margin: "0 0 30px",
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));
