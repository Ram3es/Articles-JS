import React from "react";
import { useSelector } from "react-redux";

import { getUser } from "../../store/selectors";
// import { actions } from "../../../../store/actions";

//import { useTranslation } from "react-i18next";

import "./index.scss";
import { Typography, Container } from "@material-ui/core";
//import useStyles from "./styles";
// import { push } from "connected-react-router";
// import { ROUTES_PATH } from "../../../../router/constants";

export default () => {
  //const dispatch = useDispatch();
  const user = useSelector(getUser());
  //const { t } = useTranslation();
  //const classes = useStyles();

  return (
    <div>
      <Container>
        {user && user.is_active ? (
          <>
            <Typography>{`First Name: ${user.first_name}`}</Typography>
            <Typography>{`Last Name: ${user.last_name}`}</Typography>
            <Typography>{`Email: ${user.email}`}</Typography>
            <Typography>{`Created date: ${user.created_at}`}</Typography>
          </>
        ) : null}
      </Container>
    </div>
  );
};
