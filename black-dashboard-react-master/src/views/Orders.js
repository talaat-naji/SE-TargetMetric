// import React from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// //######################
// import { Badge } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
// // reactstrap components
// import {

//     Collapse,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem,
//     UncontrolledDropdown,
//     Input,
//     InputGroup,
//     NavbarBrand,
//     Navbar,
//     NavLink,
//     Nav,
//     Container,
//     Modal,
//     ListGroup
// } from "reactstrap";
// import apiClient from "../services/api";
// import OrderDialog from "./OrderDialog"
// import db from "../services/firebase";
// import ListGroupItem from "reactstrap/lib/ListGroupItem";
// import { Typography } from "@material-ui/core";
// import MenuListComposition from "./menu";

// class Orders extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             orders: [],
//             anchorEl: null
//         };

//     }


//     fetchOrders = () => {
//         if (sessionStorage.getItem('loggedIn')) {
//             apiClient.get('../api/getOrders')
//                 .then(response => {
//                     this.setState({ orders: response.data })
//                 })
//                 .catch(error => console.error(error))
//         }
//     }
//     // componentDidUpdate() {
//     //     console.log("entered");
//     //}

//     componentDidMount() {
       
         
//         // Enable pusher logging - don't include this in production.where("retailer_id","=",sessionStorage.getItem("userId"))
//         db.database().ref("Orders/"+sessionStorage.getItem("userId")).on("value", snapshot => {
//             // let orderList = [];
//             // console.log("testt",snapshot);
//             // snapshot.forEach(snap => {
//                 this.fetchOrders();
//                 // snap.val() is the dictionary with all your keys/values from the 'students-list' path
//             //    orderList.push(snap.val());
//             });
//             // console.log(orderList,"ghghgh");
//             // this.setState({ orders: orderList });
//         //   });

//     }


//     handleClick = (event) => {
//         this.setState({ anchorEl: event.currentTarget });
//     };

//     handleClose = () => {
//         this.setState({ anchorEl: null });
//     };

//     render() {
//         return (
//             <>
//                 <MenuListComposition/>

//                 <Button style={{ backgroundColor: "#1e1e2e" }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
//                     {/* {this.state.orders.length > 0 ? <div className="notification d-none d-lg-block d-xl-block" >
//                  </div> : <></>} */}
//                     <a

//                         className="simple-text "
//                     >
//                         <div className="">
//                             {this.state.orders.length > 0 ? <>
//                                 <Badge badgeContent={this.state.orders.length} color="secondary">
//                                     {/* <i className="tim-icons icon-bell-55" /> */}
//                                     <NotificationsNoneTwoToneIcon style={{color:"#ffffff"}}/>
//                                 </Badge>  </> : <i className="tim-icons icon-bell-55" />}
//                         </div>
//                     </a>

//                     <p className="d-lg-none">Notifications</p>
//                 </Button>
                
//                 <Menu

//                     id="simple-menu"
//                     anchorEl={this.state.anchorEl}
//                     keepMounted
//                     open={Boolean(this.state.anchorEl)}
//                     onClose={this.handleClose}
//                 > <ListGroup >

//                         {this.state.orders.length===0? <ListGroupItem className="content">
//                             <MenuItem><Typography style={{ color: "#1e1e2e" }}>there are 0 undelivered orders</Typography></MenuItem></ListGroupItem>:

//                             this.state.orders.map((order) => {

//                         return (

//                             <OrderDialog key={order.id} order={order} onDeliver={() => { this.fetchOrders() }} />
//                         )
//                     })
//                     }
                         
//                  </ListGroup>
//                 </Menu>
//             </>
//         );
//     }
// }
// export default Orders;