import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.users);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/posts');
    }
  }, [isLoggedIn]);
  const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      console.log("values", values);
      dispatch(userLogin(values));
    },
  });
  return (
    <div className='container'>
      <h3 className='text-center'>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input
              className='form-control'
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              className='form-control'
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          </div>
        </div>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default Login;