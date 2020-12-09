import React from "react";

import { useSelector } from "react-redux";

import { getUser } from "containers/User/store/selectors";

import { Typography, Container } from "@material-ui/core";

import "./index.scss";

export default () => {
  const user = useSelector(getUser());

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
