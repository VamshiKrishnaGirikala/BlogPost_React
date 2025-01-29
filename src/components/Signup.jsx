import React from 'react';
import { useFormik } from 'formik';
import UserForm from './UserForm';

const Signup = () => {

  // const validate = values => {
  //   const errors = {};
  //   if (!values.firstName) {
  //     errors.firstName = 'Required';
  //   }
  //   if (!values.lastName) {
  //     errors.lastName = 'Required';
  //   }
  //   if (!values.email) {
  //     errors.email = 'Required';
  //   }
  //   if (!values.phone) {
  //     errors.phone = 'Required';
  //   }
  //   if (!values.street) {
  //     errors.street = 'Required';
  //   }
  //   if (!values.city) {
  //     errors.city = 'Required';
  //   }
  //   if (!values.zipcode) {
  //     errors.zipcode = 'Required';
  //   }
  //   if (!values.password) {
  //     errors.password = 'Required';
  //   }
  //   if (!values.confirmPassword) {
  //     errors.confirmPassword = 'Required';
  //   }
  //   return errors;
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     phone: '',
  //     company: '',
  //     address: {
  //       street: '',
  //       suite: '',
  //       city: '',
  //       zipcode: ''
  //     },
  //     password: '',
  //     confirmPassword: ''
  //   },
  //   validate,
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
    <div className='container'>
      <h3 className='text-center'>Sign-up</h3>
      <UserForm />
    </div>
  )
}

export default Signup