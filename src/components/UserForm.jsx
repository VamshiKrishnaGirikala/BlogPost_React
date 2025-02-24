import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { createUser } from '../store/usersSlice';
import { useDispatch } from 'react-redux';
const UserForm = ({ userInfo, saveUserDetails, isSignUp = false }) => {
    const dispatch = useDispatch();
    const validate = values => {
        const errors = {};
        if (!values.firstname) {
            errors.firstname = 'Required';
        }
        if (!values.lastname) {
            errors.lastname = 'Required';
        }
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.phone) {
            errors.phone = 'Required';
        }
        if (!values.address1) {
            errors.address1 = 'Required';
        }
        if (!values.city) {
            errors.city = 'Required';
        }
        if (!values.zipcode) {
            errors.zipcode = 'Required';
        }
        if (isSignUp) {
            if (!values.password) {
                errors.password = 'Required';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            }
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            phone: '',
            companyName: '',
            address1: '',
            address2: '',
            city: '',
            zipcode: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            if (isSignUp) {
                handleUserSignUp(values);
            } else {
                saveUserDetails(values);
            }
        },
    });

    const handleUserSignUp = (userPayload) => {
        dispatch(createUser(userPayload));
    }

    useEffect(() => {
        if (userInfo) {
            const values = {
                firstname: userInfo.firstName,
                lastname: userInfo.lastName,
                username: userInfo.userName,
                email: userInfo.email,
                phone: userInfo.phone,
                companyName: userInfo.companyName,
                address1: userInfo.address1,
                address2: userInfo.address2,
                city: userInfo.city,
                zipcode: userInfo.zipcode,
                password: '',
                confirmPassword: ''
            };
            if (isSignUp) {
                formik.resetForm({ values });
            } else {
                const { password, confirmPassword, ...userAccountValues } = values;
                formik.resetForm({ values: userAccountValues });
            }
        }
    }, [userInfo, isSignUp]);

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="row mb-3">
                <label htmlFor="firstname" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="firstname"
                        name="firstname"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                    />
                    {formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="lastname" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="lastname"
                        name="lastname"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                    />
                    {formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}
                </div>
            </div>
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
                <label htmlFor="email" className="col-sm-2 col-form-label">Email Address</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="phone" className="col-sm-2 col-form-label">Phone number</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="company" className="col-sm-2 col-form-label">Company</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="company"
                        name="companyName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="street" className="col-sm-2 col-form-label">Street</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="street"
                        name="address1"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address1}
                    />
                    {formik.errors.address1 ? <div>{formik.errors.address1}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="suite" className="col-sm-2 col-form-label">Suite</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="suite"
                        name="address2"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address2}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="city"
                        name="city"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                    {formik.errors.city ? <div>{formik.errors.city}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="zipcode" className="col-sm-2 col-form-label">Zip code</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="zipcode"
                        name="zipcode"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.zipcode}
                    />
                    {formik.errors.zipcode ? <div>{formik.errors.zipcode}</div> : null}
                </div>
            </div>
            {isSignUp && (<>
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
                <div className="row mb-3">
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input
                            className='form-control'
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        />
                        {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                    </div>
                </div>
            </>)}
            <div className='text-center'>
                <button type="submit" className='btn btn-primary w-100'>Submit</button>
            </div>
        </form>
    )
}

export default UserForm