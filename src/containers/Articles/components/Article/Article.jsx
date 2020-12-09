import React, { useEffect, useState } from "react";

import { withRouter } from "react-router";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES_PATH } from "router/constants";
import { actions } from "store/actions";
import { getArticleById } from "containers/Articles/store/selectors";
import { FORMS } from "containers/Articles/constants/forms";

import {
  Grid,
  Container,
  TextField,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Button,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import useStyles from "./styles";
import "./index.scss";

export default withRouter(
  ({
    match: {
      params: { id, action },
    },
  }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isViewed, setIsViewed] = useState(false);

    useEffect(() => {
      if (id !== "new") {
        dispatch(actions.ARTICLE_FETCH.REQUESTED(Number(id)));
      }
    }, [dispatch, id]);

    const selectedArticle = id !== "new" ? useSelector(getArticleById(Number(id))) : null;

    const isEdit = action && action === "edit" ? true : false;

    useEffect(() => {
      if (!isEdit && selectedArticle && !isViewed) {
        dispatch(
          actions.ARTICLE_VIEWED.REQUESTED({
            id: Number(id),
            viewed: selectedArticle.viewed + 1,
          })
        );
        setIsViewed(true);
      }
    }, [dispatch, id, isEdit, selectedArticle, isViewed]);

    // if (!isEdit && selectedArticle) {
    //   const { title, description, viewed, image_url } = selectedArticle;
    // }
    console.log(selectedArticle);
    console.log("edit", isEdit);

    const handleChangeArticle = (data) => {
      dispatch(actions.ARTICLE_EDIT.REQUESTED(data));
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleRemoveArticle = () => {
      dispatch(actions.ARTICLE_REMOVE.REQUESTED(Number(id)));
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleSubmit = (data) => {
      const payload = {
        ...data,
        image_url: "https://picsum.photos/id/395/200/300?grayscale",
      };

      delete payload.image;

      if (selectedArticle) {
        handleChangeArticle(payload);
      } else {
        dispatch(actions.ARTICLE_ADD.REQUESTED(payload));
        dispatch(push(ROUTES_PATH.ARTICLES));
      }
    };

    const fileReaderToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    return (
      <>
        {!isEdit && selectedArticle ? (
          <>
            <Container>
              <div className={classes.heroButtons}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      className={classes.button}
                      onClick={() => dispatch(push(ROUTES_PATH.ARTICLES))}
                      variant="contained"
                    >
                      &larr; Back
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
            <Container className={classes.cardGrid}>
              <div>
                <img src={selectedArticle.image_url} alt="" />
              </div>
              <Typography variant="h4" component="h4">
                {selectedArticle.title}
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: selectedArticle.description,
                }}
              ></Typography>
              <Typography variant="body1">Viewed: {selectedArticle.viewed}</Typography>
            </Container>
          </>
        ) : (
          <Formik
            enableReinitialize={true}
            initialValues={
              selectedArticle ? { ...selectedArticle, image: selectedArticle.image_url } : FORMS.ARTICLE.INIT
            }
            validationSchema={FORMS.ARTICLE.SCHEME}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleChange,
              setFieldValue,
              setFieldTouched,
              values: { title, description, image },
            }) => {
              return (
                <Form>
                  <div className={classes.heroContent}>
                    <Container>
                      <div className={classes.heroButtons}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Button
                              className={classes.button}
                              onClick={() => dispatch(push(ROUTES_PATH.ARTICLES))}
                              variant="contained"
                            >
                              &larr; Back
                            </Button>
                            <Button type="submit" className={classes.button} variant="contained" color="primary">
                              {id !== "new" ? "Save changes" : "Create new Article"}
                            </Button>
                            {id !== "new" ? (
                              <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                onClick={handleRemoveArticle}
                              >
                                Remove
                              </Button>
                            ) : null}
                          </Grid>
                        </Grid>
                      </div>
                    </Container>
                  </div>
                  <Container className={classes.cardGrid}>
                    <div className={classes.formFieldWrapper}>
                      <Grid container spacing={3}>
                        <Grid item xs={3}>
                          {image ? <img className={classes.image} src={image} alt="" /> : null}
                          <FormControl fullWidth margin="dense">
                            <OutlinedInput
                              fullWidth
                              error={touched.image && Boolean(errors.image)}
                              onChange={async (e) => {
                                e.persist();
                                const [image] = e.target.files;

                                if (image) {
                                  const base64ImageUrl = await fileReaderToBase64(image);
                                  setFieldValue("image", base64ImageUrl);
                                  setFieldTouched(e.target.name, true, false);
                                }
                              }}
                              id="image"
                              inputProps={{ name: "image" }}
                              type="file"
                            />
                            <FormHelperText error={Boolean(errors.image)}>
                              {touched.image && errors.image}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            id="title"
                            name="title"
                            label="Title"
                            value={title}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            helperText={touched.name && errors.name}
                            error={touched.title && Boolean(errors.title)}
                            onChange={(e) => {
                              setFieldValue("title", e.target.value);
                              setFieldTouched("title", true, false);
                            }}
                          />
                          <FormHelperText error={Boolean(errors.title)}>{touched.title && errors.title}</FormHelperText>
                          <FormControl className={classes.editor}>
                            <CKEditor
                              name="description"
                              id="description"
                              editor={ClassicEditor}
                              data={description}
                              onChange={(e, editor) => {
                                const data = editor.getData();
                                setFieldValue("description", data);
                                setFieldTouched("description", true, false);
                              }}
                            />
                          </FormControl>
                          <FormHelperText error={Boolean(errors.description)}>
                            {touched.description && errors.description}
                          </FormHelperText>
                        </Grid>
                      </Grid>
                    </div>
                  </Container>
                </Form>
              );
            }}
          </Formik>
        )}
      </>
    );
  }
);
