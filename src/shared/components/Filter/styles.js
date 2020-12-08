import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  filterWrap: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  gridSelect: {
    textAlign: "right",
    [theme.breakpoints.down(600)]: {
      textAlign: "left",
    },
  },
  formControl: {
    margin: `0 0 0 ${theme.spacing(2)}px`,
    minWidth: 120,
    textAlign: "left",
    [theme.breakpoints.down(600)]: {
      minWidth: "auto",
      width: `calc(50% - ${theme.spacing(2)}px)`,
    },
  },
  selectSortBy: {
    [theme.breakpoints.down(600)]: {
      margin: "0",
      width: "50%",
    },
  },
  formControlSearch: {
    width: "100%",
  },
}));
