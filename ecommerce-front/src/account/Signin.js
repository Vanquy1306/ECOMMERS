import React, {useState} from 'react';
import Layout from '../core/Layout';
import {  Redirect  } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth'
import { Link } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });
    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };
    const register = () => (
        <div className="mt-5">
            <Link to="/signup" className="text-warning">
                Already have an account? Signup

            </Link>
        </div>
    );
    const signUpForm = () => (
        <form className="form-center">
            <h1> Sign In </h1>
            <h3>Please fill in this form to create an account.</h3>
            <div className="form-inputs">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control center" value={email} placeholder="Enter Email" />
            </div>

            <div className="form-inputs">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control center" value={password} placeholder="Enter Password" />
            </div>
            <button onClick={clickSubmit} className="form-input-btn">
                Login
            </button>
            {register()}

        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => 
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };
    return (
        <Layout
            title="Signin"
            description="Signin to E-commerce Coffee App"
            className="container col-md-8 offset-md-2"
        >
          {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;