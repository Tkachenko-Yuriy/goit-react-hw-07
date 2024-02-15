import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Must be in 123-456-7890 format")
    .required("Required"),
});

const initialValues = {
  name: "",
  phone: "",
};

export default function ContactFotm({ onChange }) {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, actions) => {
    onChange(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.wrapper}>
          <label htmlFor={nameFieldId}>Username</label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage name="name" as="span" />
        </div>

        <div className={css.wrapper}>
          <label htmlFor={phoneFieldId}>Phone number</label>
          <Field
            className={css.input}
            type="tel"
            name="phone"
            id={phoneFieldId}
          />
          <ErrorMessage name="phone" as="span" />
        </div>
        <Button text="Submit" type="submit" />
      </Form>
    </Formik>
  );
}
