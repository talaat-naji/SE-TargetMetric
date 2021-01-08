import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from "reactstrap";
import { Select } from '@material-ui/core';
const Register = (props) => {
    const [userType, setUserType] = React.useState("undefined");
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password_confirmation, setConfirmPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [verified, setVerified] = React.useState('');
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                    userType: userType

                }).then(response => {
                    if (response.status === 201) {
                        sessionStorage.setItem('userType', userType);
                        props.login();
                        setToHome(true);
                        sessionStorage.setItem('loggedIn', true);

                        axios.get('../api/user', {}).then(response => {
                            setVerified(response.data.email_verified_at !== null);
                            sessionStorage.setItem('verified', response.data.email_verified_at !== null);
                            sessionStorage.setItem('userId', response.data.id);
                            sessionStorage.setItem('userProfile', response.data.profile_url);
                            sessionStorage.setItem('username', response.data.name);
                            
                        });
                    }
                });
            });



    }
    if (toHome === true) {
        if (verified === false) {
            console.log("enterdIF in register")
            props.history.push('/verify');
         } else if (userType === "retailer") {
            props.history.push('/admin/dashboard');
         } else if (userType === "shop") {
             console.log("testshop");
             props.history.push('/shop');
         }
    }
    const loginToaccount = () => {
        props.history.push('/login');
    }

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">

                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image">
                        <img width="100%" height="100%" src={require("assets/img/register.jpg")}/>
                        </div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input

                                            type="text"
                                            name="name"
                                            className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input

                                            type="email"
                                            name="email"
                                            className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="password"
                                            className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                            placeholder="Password"
                                            value={password_confirmation}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Select
                                            fullWidth={true}
                                            name="userType"
                                            value={userType}
                                            onChange={e => { setUserType(e.target.value); console.log(e.target.value) }}
                                            required
                                        ><option value={"undefined"}>Retailer/Shop</option>
                                            <option value="retailer">Retailer</option>
                                            <option value="shop">Shop Owner</option>
                                        </Select>
                                    </div>



                                    {authError ? <div className="alert alert-danger">Credentials not recognised. Please try again.</div> : null}
                                    {unknownError ? <div className="alert alert-danger">There was an error submitting your details.</div> : null}
                                    <Button color="info" type="submit" className="btn btn-primary">Register</Button>
                                </form>
                                <hr></hr>
                                <div className="text-center">
                                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                                </div>
                                <div className="text-center">
                                    <a className="small" onClick={loginToaccount}>Already have an account? Login!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;