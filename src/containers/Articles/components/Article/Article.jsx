import React, { useEffect, useState } from "react";
import "./index.scss";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { getArticleById } from "../../store/selectors";
import { withRouter } from "react-router";
import { actions } from "../../../../store/actions";
import { Formik, Form, Field } from "formik";
import { FORMS } from "../../constants/forms";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default withRouter(
  ({
    match: {
      params: { id },
    },
  }) => {
    const dispatch = useDispatch();
    const [article, setArticle] = useState(null);

    useEffect(() => {
      if (id !== "new") {
        dispatch(actions.ARTICLE_FETCH.REQUESTED(Number(id)));
      }
    }, [dispatch, id]);

    const selectedArticle = id !== "new" ? useSelector(getArticleById(Number(id))) : null;

    useEffect(() => {
      setArticle(selectedArticle);
    }, [selectedArticle]);

    const handleRemoveArticle = () => {
      dispatch(actions.ARTICLE_REMOVE.REQUESTED(article.id));

      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleCancelArticle = () => {
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleSubmit = (data) => {
      if (id !== "new") {
        dispatch(actions.ARTICLE_EDIT.REQUESTED(data));
      } else {
        dispatch(
          actions.ARTICLE_ADD.REQUESTED({
            ...data,
            image_url: "https://picsum.photos/id/395/200/300?grayscale",
          })
        );
      }

      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const getError = (errors, touched, name) => {
      if (errors[name] && touched[name]) {
        return <div>{errors[name]}</div>;
      } else {
        return null;
      }
    };

    const handleChangeCKEditor = (data) => {};

    return (
      <article className="article article--full">
        {/* <div className="article__img-wrap">
          <img src={article.image_url} alt={article.title} />
        </div>
        <h3 className="article__title">{article.title}</h3>
        <p className="article__desc">{article.description}</p>
        <div>
          <button type="button" onClick={handleCancelArticle}>
            Cancel
          </button>
          <button type="button" onClick={handleRemoveArticle}>
            Remove
          </button>
        </div> */}
        <Formik
          enableReinitialize={true}
          initialValues={article ? article : FORMS.ARTICLE.INIT}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={FORMS.ARTICLE.SCHEME}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const {
              errors,
              touched,
              values: { title, description },
            } = props;
            return (
              <Form>
                <Field name="title" id="title" type="text" value={title} />
                {getError(errors, touched, "title")}
                <Field name="description" id="description" type="text" value={description} />
                {/* <Field
                  name="description"
                  id="description"
                  component={() => (
                    <CKEditor
                      name="description"
                      id="description"
                      editor={ClassicEditor}
                      data={description}
                      onChange={handleChangeCKEditor}
                    />
                  )}
                /> */}
                {getError(errors, touched, "description")}
                <div>
                  <button type="submit">Save</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </article>
    );
  }
);
