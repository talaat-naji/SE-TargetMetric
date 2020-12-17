/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";
// import axios from "axios";

// import AdminLayout from "layouts/Admin/Admin.js";
// import RTLLayout from "layouts/RTL/RTL.js";
// import Register from "layouts/Register/Register";
// import Login from "layouts/Register/Login";
import App from './App';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import { PusherProvider } from "@harelpls/use-pusher";
//const hist = createBrowserHistory();

const config = {
  // required config props
  clientKey: "c33af439d6721e7c10a7",
  cluster: "eu",

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  triggerEndpoint: "/pusher/trigger",

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  authEndpoint: "/api/broadcasting/auth",
  auth: {
    headers: { Authorization: "Bearer token" },
  },
};

ReactDOM.render(
  // <PusherProvider {...config}>
    <App />,
   // <PusherProvider />
  document.getElementById("root")
);
