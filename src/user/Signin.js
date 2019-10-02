import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';
import { Link, Redirect } from 'react-router-dom';
import { SignInMethod, authenticate } from '../auth';
const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: '',
        redirectToReferer : false
    });

    const {email, password, error, loading, redirectToReferer} = values;


    const handleSubmitButton = event => {
        event.preventDefault();
        setValues({ ...values, error:false, loading:true})
        SignInMethod({email, password})
        .then(data => {
            if(data.error){
                setValues({ ...values, error:data.error, loading:false})
            }else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferer: true
                    })
                })
            }
        });
    }


    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )


    const showLoading = () => (
        loading && (<div className="alert alert-info" >
        Loading ...
    </div>)
    )

    const handleChange = name => event => {
        setValues({ ...values, error:false, [name]: event.target.value})
    }

    const redirectUser = () => {
        if(redirectToReferer){
            return (<Redirect to="/" /> )
        }
    }


    const SignInForm = () => (
        <form>
            {showError()}
            {showLoading()}
            <div className="form-group">
                <label for="exampleInputEmail1" className="text-muted">Email address</label>
                <input type="email" onChange={handleChange('email')} value={email} className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1" className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} value={password} className="form-control" required id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={handleSubmitButton} className="btn btn-primary">Submit</button>
        </form>
    )
    return (
        <div>
            <Layout title="Sign In " description="Sign in page" className="container col-md-8 offset-md-2">
            {SignInForm()}
            {redirectUser()}
            </Layout>
            
        </div>
    )
    
}


export default Signin;