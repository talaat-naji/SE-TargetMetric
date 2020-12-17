import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [userType, setUserType] = React.useState('');
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    React.useEffect(() => {
        if (sessionStorage.getItem('userType') === "retailer") {
            props.history.push('/admin/dashboard');
        } else if (sessionStorage.getItem('userType') === "shop") {
            props.history.push('/shop');
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/login', {
                    email: email,
                    password: password
                }).then(response => {

                    if (response.status === 204) {
                        props.login();
                        setToHome(true);

                        axios.get('/api/user',{withCredentials:true}).then(response => {
                           
                           
                            sessionStorage.setItem('userType', response.data.userType);
                            sessionStorage.setItem('userId', response.data.id);
                            sessionStorage.setItem('username', response.data.name);
                            setUserType(response.data.userType);
                        });
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 422) {
                        setAuthError(true);
                    } else {
                        setUnknownError(true);
                        console.error(error);
                    }
                });
            });

    }

    const createAccount=()=>{
        
            props.history.push('/register');
        
    }
    
    if (toHome === true) {
        if (userType === "retailer") {
           props.history.push('/admin/dashboard');
        } else if (userType === "shop") {
            console.log("testshop");
            props.history.push('/shop/dashboard');
        }
    }
    return (
      
    <div className="container">

        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        
                        <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{backgroundPosition:"center" ,backgroundSize:"cover"}} >
                                    <img width="100%" height="100%" src={require("assets/img/login3.png")}/>
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
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
                {authError ? <div className="alert alert-danger">Credentials not recognised. Please try again.</div> : null}
                {unknownError ? <div className="alert alert-danger">There was an error submitting your details.</div> : null}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
                                    <hr></hr>
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" onClick={createAccount}>Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
       
    );
};

export default Login;