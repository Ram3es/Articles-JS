import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: {
    paddingRight: 14, // keep right padding when drawer closed
    marginLeft: "0 !important",
    paddingLeft: 14,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 30,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  userInfo: {
    margin: "0",
    marginRight: "20px",
    marginLeft: "10px",
    color: "#fff",
    padding: "5px",
  },
}));
