/*import React from 'react';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';

const ValidatedLoginForm = () => {
    <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log('Logging in', values);
                setSubmitting(false);
              }, 500);
            }}
            validate={(values) => {
              let errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!EmailValidator.validate(values.email)) {
                errors.email = 'Invalid email address';
              }

              const passwordRegex = /(?=.*[0-9])/;
              if (!values.password) {
                errors.password = 'Required';
              } else if (values.password.length < 8) {
                errors.password = 'Password must be 8 characters long.';
              } else if (!passwordRegex.test(values.password)) {
                errors.password = 'Invalida password. Must contain one number';
              }

              return errors;
              }}>
        {
            (props) => {
                const { values, errors, isSubmitting } = props;
                return (
                    <div>
                        <h1>Validated Form Component</h1>
                    </div>
                );
            }}
              </Formik>
      };

export default ValidatedLoginForm;*/
