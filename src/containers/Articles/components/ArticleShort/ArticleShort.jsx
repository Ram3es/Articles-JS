import React from "react";
import "./index.scss";
import useStyles from "./styles";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { actions } from "../../../../store/actions";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";

export default ({ id, title, description, image_url }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemoveArticle = () => {
    dispatch(actions.ARTICLE_REMOVE.REQUESTED(id));
  };

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
        <Button size="small" color="primary">
          View
        </Button>
        <Button onClick={() => dispatch(push(`${ROUTES_PATH.ARTICLES}/${id}`))} size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={handleRemoveArticle}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
