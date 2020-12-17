import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//######################
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// reactstrap components
import {

    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Input,
    InputGroup,
    NavbarBrand,
    Navbar,
    NavLink,
    Nav,
    Container,
    Modal
} from "reactstrap";
import apiClient from "../services/api";
import OrderDialog from "./OrderDialog"
import { isNullishCoalesce } from "typescript";
import Pusher from "pusher-js";
import axios from "axios";
import Echo from "laravel-echo";

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            anchorEl: null
        };

    //     window.Pusher = require("pusher-js");
        
    //     window.Echo = new Echo({
    //         broadcaster: "pusher",
    //         cluster: "eu",
    //         encrypted: false,
    //         key: "c33af439d6721e7c10a7",
    //         authEndpoint:'http://localhost:8000/broadcasting/auth',
    //         authorizer: (channel, options) => {
    //             return {
    //                 authorize: (socketId, callback) => {
    //                     console.log("jk", socketId);
    //                     apiClient.post('/api/broadcasting/auth', {
    //                         socket_id: socketId,
    //                         channel_name: channel.name
    //                     })
    //                         .then(response => {
    //                         console.log(response,"testtt")
    //                         callback(false, response.data);
    //                     })
    //                     .catch(error => {
    //                         callback(true, error);
    //                     });
    //                 }
    //             };
    //         },
    //     })
    //     console.log("tytyt", window.Echo);
         // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('c33af439d6721e7c10a7', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('private-shopOrder');
    channel.bind('App/Events/shopOrderedRetailer', function(data) {
      alert(JSON.stringify(data));
    });
    }

    
    fetchOrders = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('../api/getOrders')
                .then(response => {
                    this.setState({ orders: response.data })
                })
                .catch(error => console.error(error))
        }
    }
    // componentDidUpdate() {
    //     console.log("entered");
    //}
    
    componentDidMount() {
        this.fetchOrders();
        // Enable pusher logging - don't include this in production
       

    }


    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        return (
            <>
                {/* <UncontrolledDropdown nav>

                    <DropdownToggle
                        caret
                        color="default"
                        data-toggle="dropdown"
                        nav
                       
                    >
                        <div className="notification d-none d-lg-block d-xl-block" />
                        <i className="tim-icons icon-sound-wave" />
                        <p className="d-lg-none">Notifications</p>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul" >
                        {this.state.orders.map((order) => {
                            return (
                                
                                <OrderDialog order={order}  /> //onDeliver={() => { this.fetchOrders() }}
                            )
                        })
                        }

                    </DropdownMenu>
                </UncontrolledDropdown > */}

                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-sound-wave" />
                    <p className="d-lg-none">Notifications</p>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    {this.state.orders.map((order) => {
                        return (

                            <OrderDialog key={order.id} order={order} onDeliver={() => { this.fetchOrders() }} />
                        )
                    })
                    }

                </Menu>
            </>
        );
    }
}
export default Orders;