import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signup } from '../auth'
import './Form.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        phonenumber: '',
        success: false
    });
    const { name, email, password, phonenumber, success, error } = values;


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, phonenumber }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };
    const login = () => (
        <div className="mt-5">
            <Link to="/signin" className="text-warning">
                Already have an account? Login

            </Link>
        </div>
    );
    const signUpForm = () => (
        <form className="form-center">
            <h1> Sign Up </h1>
            <h3>Please fill in this form to create an account.</h3>
            <div className="form-inputs">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control center" value={name} placeholder="Enter Your Name" />
            </div>

            <div className="form-inputs">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control center" value={email} placeholder="Enter Your Email" />
            </div>

            <div className="form-inputs">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control center" value={password} placeholder="Enter Your Password" />
            </div>
            <button onClick={clickSubmit} className="form-input-btn">
                Register
            </button>
            {login()}
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );



    return (
        <Layout
            title="Signup"
            description="Signup to E-commerce Coffee App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;