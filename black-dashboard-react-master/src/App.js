import { createBrowserHistory } from "history";
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from "layouts/Admin/Admin.js";
import ShopLayout from "layouts/Shop/Shop.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Register from "layouts/Register/Register";
import Login from "layouts/Register/Login";
import axios from "axios";

const App = () => {

    const hist = createBrowserHistory();

    const [loggedIn, setLoggedIn] = React.useState(
        sessionStorage.getItem('loggedIn') === 'true' || false
    );
    const login = () => {
        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    };
    const logout = () => {
        axios.post('/logout').then(response => {
            if (response.status === 204) {
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
                sessionStorage.setItem('userId', null);
                sessionStorage.setItem('username', "");
                sessionStorage.setItem('userType', "");

            }
            if (!loggedIn) {
                console.log("test"); 
                hist.push('/login');
                setLoggedIn(false);
            }
        })
    };

    return (

        <Router history={hist}>
    <Switch>
                <Route path="/admin" render={props => <AdminLayout {...props} loggedIn={loggedIn} logout={logout}/>} />
      <Route path="/rtl" render={props => <RTLLayout {...props} loggedIn={loggedIn} logout={logout}/>} />
      <Route path="/login" render={props => <Login {...props} login={login}/>} />
      <Route path="/register" render={props => <Register {...props} login={login}/>} />
                {/* <Redirect from="/" to="/admin/dashboard" /> */}
                
                <Route path="/shop" render={props => <ShopLayout {...props} loggedIn={loggedIn} logout={logout}/>} />
    </Switch>
  </Router>
    );
};

export default App;