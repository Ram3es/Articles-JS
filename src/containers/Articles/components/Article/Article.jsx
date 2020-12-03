import React, { useEffect } from "react";
import "./index.scss";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { getArticleById } from "../../store/selectors";
import { withRouter } from "react-router";
import { actions } from "../../../../store/actions";
import { Formik, Form } from "formik";
import { FORMS } from "../../constants/forms";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Grid, Container, TextField, FormControl, OutlinedInput, FormHelperText, Button } from "@material-ui/core";
import useStyles from "./styles";

export default withRouter(
  ({
    match: {
      params: { id },
    },
  }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [article, setArticle] = useState(null);

    useEffect(() => {
      if (id !== "new") {
        dispatch(actions.ARTICLE_FETCH.REQUESTED(Number(id)));
      }
    }, [dispatch, id]);

    const selectedArticle = id !== "new" ? useSelector(getArticleById(Number(id))) : null;

    // useEffect(() => {
    //   setArticle(selectedArticle);
    // }, [selectedArticle]);

    const handleChangeArticle = (data) => {
      //console.log(data);
      dispatch(actions.ARTICLE_EDIT.REQUESTED(data));
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleRemoveArticle = () => {
      dispatch(actions.ARTICLE_REMOVE.REQUESTED(Number(id)));
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    // const handleCancelArticle = () => {
    //   dispatch(push(ROUTES_PATH.ARTICLES));
    // };

    const handleSubmit = (data) => {
      const payload = {
        ...data,
        image_url: "https://picsum.photos/id/395/200/300?grayscale",
      };

      //console.log(payload);

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

    // const getError = (errors, touched, name) => {
    //   if (errors[name] && touched[name]) {
    //     return <div>{errors[name]}</div>;
    //   } else {
    //     return null;
    //   }
    // };

    //const handleChangeCKEditor = (data) => {};

    return (
      <Formik
        enableReinitialize={true}
        initialValues={selectedArticle ? { ...selectedArticle, image: selectedArticle.image_url } : FORMS.ARTICLE.INIT}
        validationSchema={FORMS.ARTICLE.SCHEME}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, setFieldValue, setFieldTouched, values: { title, description, image } }) => {
          // console.log('errors', errors)
          // console.log('touched', touched)

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
                        <FormHelperText error={Boolean(errors.image)}>{touched.image && errors.image}</FormHelperText>
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
      // <Formik
      //   enableReinitialize={true}
      //   initialValues={article ? article : FORMS.ARTICLE.INIT}
      //   validateOnChange={true}
      //   validateOnBlur={true}
      //   validationSchema={FORMS.ARTICLE.SCHEME}
      //   onSubmit={handleSubmit}
      // >
      //   {(props) => {
      //     const {
      //       errors,
      //       touched,
      //       values: { title, description },
      //     } = props;
      //     return (
      //       <Form>
      //         <Field name="title" id="title" type="text" value={title} />
      //         {getError(errors, touched, "title")}
      //         <Field
      //           name="description"
      //           id="description"
      //           type="text"
      //           value={description}
      //         />
      //         <Field
      //           name="description"
      //           id="description"
      //           component={() => (
      //             <CKEditor
      //               name="description"
      //               id="description"
      //               editor={ClassicEditor}
      //               data={description}
      //               onChange={handleChangeCKEditor}
      //             />
      //           )}
      //         />
      //         {getError(errors, touched, "description")}
      //         <div>
      //           <button type="submit">Save</button>
      //         </div>
      //       </Form>
      //     );
      //   }}
      // </Formik>
    );
  }
);