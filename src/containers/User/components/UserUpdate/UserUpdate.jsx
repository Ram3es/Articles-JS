import React from "react";
import "./index.scss";
//import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
//import { ROUTES_PATH } from "../../../../router/constants";
//import { getUser } from "../../store/selectors";
import { withRouter } from "react-router";
//import { actions } from "../../../../store/actions";
// import { Formik, Form } from "formik";
// import { FORMS } from "../../constants/forms";
// import { Grid, Container, TextField, FormHelperText, Button } from "@material-ui/core";
//import useStyles from "./styles";

export default withRouter(
  ({
    match: {
      params: { id },
    },
  }) => {
    //const classes = useStyles();
    //const dispatch = useDispatch();
    // const [article, setArticle] = useState(null);

    // useEffect(() => {
    //   if (id !== "new") {
    //     dispatch(actions.ARTICLE_FETCH.REQUESTED(Number(id)));
    //   }
    // }, [dispatch, id]);

    // const selectedArticle = id !== "new" ? useSelector(getArticleById(Number(id))) : null;

    // useEffect(() => {
    //   setArticle(selectedArticle);
    // }, [selectedArticle]);

    // const handleChangeArticle = (data) => {
    //   //console.log(data);
    //   dispatch(actions.ARTICLE_EDIT.REQUESTED(data));
    //   dispatch(push(ROUTES_PATH.ARTICLES));
    // };

    // const handleRemoveArticle = () => {
    //   dispatch(actions.ARTICLE_REMOVE.REQUESTED(Number(id)));
    //   dispatch(push(ROUTES_PATH.ARTICLES));
    // };

    // const handleCancelArticle = () => {
    //   dispatch(push(ROUTES_PATH.ARTICLES));
    // };

    // const handleSubmit = (data) => {
    //   const payload = {
    //     ...data,
    //     image_url: "https://picsum.photos/id/395/200/300?grayscale",
    //   };

    //   //console.log(payload);

    //   delete payload.image;

    //   // if (selectedArticle) {
    //   //   handleChangeArticle(payload);
    //   // } else {
    //   //   dispatch(actions.ARTICLE_ADD.REQUESTED(payload));
    //   //   dispatch(push(ROUTES_PATH.ARTICLES));
    //   // }
    // };

    // const fileReaderToBase64 = (file) =>
    //   new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);

    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = (error) => reject(error);
    //   });

    // const getError = (errors, touched, name) => {
    //   if (errors[name] && touched[name]) {
    //     return <div>{errors[name]}</div>;
    //   } else {
    //     return null;
    //   }
    // };

    //const handleChangeCKEditor = (data) => {};

    return (
      <></>
      // <Formik
      //   enableReinitialize={true}
      //   initialValues={selectedArticle ? { ...selectedArticle, image: selectedArticle.image_url } : FORMS.ARTICLE.INIT}
      //   validationSchema={FORMS.ARTICLE.SCHEME}
      //   onSubmit={handleSubmit}
      // >
      //   {({ errors, touched, handleChange, setFieldValue, setFieldTouched, values: { title, description, image } }) => {
      //     // console.log('errors', errors)
      //     // console.log('touched', touched)

      //     return (
      //       <Form>
      //         <div className={classes.heroContent}>
      //           <Container>
      //             <div className={classes.heroButtons}>
      //               <Grid container spacing={2}>
      //                 <Grid item>
      //                   <Button
      //                     className={classes.button}
      //                     onClick={() => dispatch(push(ROUTES_PATH.ARTICLES))}
      //                     variant="contained"
      //                   >
      //                     &larr; Back
      //                   </Button>
      //                   <Button type="submit" className={classes.button} variant="contained" color="primary">
      //                     {id !== "new" ? "Save changes" : "Create new Article"}
      //                   </Button>
      //                   {id !== "new" ? (
      //                     <Button
      //                       className={classes.button}
      //                       variant="contained"
      //                       color="secondary"
      //                       onClick={handleRemoveArticle}
      //                     >
      //                       Remove
      //                     </Button>
      //                   ) : null}
      //                 </Grid>
      //               </Grid>
      //             </div>
      //           </Container>
      //         </div>
      //         <Container className={classes.cardGrid}>
      //           <div className={classes.formFieldWrapper}>
      //             <Grid container spacing={3}>
      //               <Grid item xs={12}>
      //                 <TextField
      //                   id="title"
      //                   name="title"
      //                   label="Title"
      //                   value={title}
      //                   margin="dense"
      //                   variant="outlined"
      //                   fullWidth
      //                   helperText={touched.name && errors.name}
      //                   error={touched.title && Boolean(errors.title)}
      //                   onChange={(e) => {
      //                     setFieldValue("title", e.target.value);
      //                     setFieldTouched("title", true, false);
      //                   }}
      //                 />
      //                 <FormHelperText error={Boolean(errors.title)}>{touched.title && errors.title}</FormHelperText>
      //               </Grid>
      //             </Grid>
      //           </div>
      //         </Container>
      //       </Form>
      //     );
      //   }}
      // </Formik>
    );
  }
);
