import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config'

const Signup = () => {

    const [values, setValues] = useState({
        name : '',
        email: '',
        password: '',
        error: '',
        success: ''
    })

    const {name, email, password} = values;


    const handleSubmitButton = (event) => {
        event.preventDefault();
        SignUp({name, email, password});
    }

    const SignUp = (user) => {
        console.log(name, email, password)
        fetch(`${API}/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'mode': 'no-cors'
            },
            body : JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, error:false, [name]: event.target.value})
    }

    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label for="exampleInputEmail1" className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" required aria-describedby="emailHelp" placeholder="Full Name" />
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1" className="text-muted">Email address</label>
                <input type="email" onChange={handleChange('email')} className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1" className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" required id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={handleSubmitButton} className="btn btn-primary">Submit</button>
        </form>
    )

    return(
        <Layout title="Sign Up Form" description="Please Sign Up to place order" className="container col-md-8 offset-md-2">
            {SignUpForm()}
            
        </Layout>
        
    )
}


export default Signup;