import { useFormik } from 'formik';
import React, { useEffect } from 'react';

const UserForm = () => {
    //  solve the address object issue.

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.phone) {
            errors.phone = 'Required';
        }
        if (!values.address.street) {
            errors.street = 'Required';
        }
        if (!values.address.city) {
            errors.city = 'Required';
        }
        if (!values.address.zipcode) {
            errors.zipcode = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: {
                name: ''
            },
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            },
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        // temporary fix
        setTimeout(() => {
            formik.resetForm();
        }, 1000);
    }, []);

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="row mb-3">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
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
                        name="company.name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.company.name}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="street" className="col-sm-2 col-form-label">Street</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="street"
                        name="address.street"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address.street}
                    />
                    {formik.errors.street ? <div>{formik.errors.street}</div> : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="suite" className="col-sm-2 col-form-label">Suite</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="suite"
                        name="address.suite"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address.suite}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                <div className="col-sm-10">
                    <input
                        className='form-control'
                        id="city"
                        name="address.city"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address.city}
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
                        name="address.zipcode"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address.zipcode}
                    />
                    {formik.errors.zipcode ? <div>{formik.errors.zipcode}</div> : null}
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
            <div className='text-center'>
                <button type="submit" className='btn btn-primary w-100'>Submit</button>
            </div>
        </form>
    )
}

export default UserForm