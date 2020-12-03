import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    height: "auto",
    minHeight: "100%",
    margin: `0 ${theme.spacing(3)}px`,
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      margin: "0 auto",
    },
  },
  paper: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(10)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
}));
