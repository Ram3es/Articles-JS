import React from "react";

import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import { ROUTES_PATH } from "../../../../router/constants";
import { actions } from "../../../../store/actions";

import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";

import useStyles from "./styles";
import "./index.scss";

export default ({ id, title, description, image_url }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={image_url} title={title} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </CardContent>
      <CardActions>
        <Button onClick={() => dispatch(push(`${ROUTES_PATH.ARTICLES}/${id}`))} size="small" color="primary">
          View
        </Button>
        <Button onClick={() => dispatch(push(`${ROUTES_PATH.ARTICLES}/${id}/edit`))} size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => dispatch(actions.ARTICLE_REMOVE.REQUESTED(id))}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
