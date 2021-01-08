import React from 'react';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Alert,
  Button,
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

import apiClient from "../../services/api";
import { Link, Redirect } from 'react-router-dom';
// import MapLocation from './ShopViews/MapLocation';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import { Typography } from '@material-ui/core';
import moment from "moment"

export default function OrderList(props) {
  const [open, setOpen] = React.useState(false);
  const [qty, setQty] = React.useState(props.order.qty_ordered);
  const [price, setPrice] = React.useState();
  
  const [alert, setAlert] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
   
  };

  const Deliver = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/recieveOrder', {
        qty: qty,
        price: price,
        oId: props.order.id,
        user_id: props.order.user_id,
        cost: props.order.product.price,
        barcode: props.order.product.barcode,
        description:props.order.product.description
      }).then((response) => {
        
          setQty(props.order.qty_ordered)
          props.onDeliver();
        
      })
          
          .catch(error => console.error(error))
  }
}

  const handleClose = () => {
    setOpen(false);
  
  };
  const handleClose2 = () => {
    // setOpen2(false);
    setQty(props.order.qty_ordered)
    props.onDeliver();
  };
  const handleDeliver = () => {
    if (qty <= 0) { setAlert(<Alert color='danger'>you Cant recieve an empty order !!!</Alert>) }
    else if (props.order.qty_ordered< qty) {
      setAlert(<Alert color='danger'>you cant recieve a qty greater than the ordered qty</Alert>)
    } else {
      setAlert('');
      Deliver();
      setOpen(false);
      
    }
  }

  return (

    <div>
      {/* <ListGroupItem className="content"> */}
      {props.order.status==="1" ?
       <MenuItem onClick={handleClickOpen} >
      
     
       <Typography style={{ color: "green",fontWeight:"bold" }}>you have ordered {props.order.qty_ordered} pcs of {props.order.product.name} from {props.order.user.name}</Typography>
      
  
 
        </MenuItem>
        :props.order.status==="0" ?
        <MenuItem  >
      
     
          <Typography style={{ color: "red" ,fontWeight:"bold"}}>you have ordered {props.order.qty_ordered} pcs of {props.order.product.name} from {props.order.user.name}</Typography>
         
     
    
          </MenuItem> :
          <MenuItem >
      
     
      <Typography style={{ color: "black" ,fontWeight:"bold"}}>you have ordered {props.order.qty_ordered} pcs of {props.order.product.name} from {props.order.user.name} (recieved at {moment(props.order.updated_at).format("LLL")})</Typography>
     
 

      </MenuItem>
        }
      {/* </ListGroupItem> */}
      {/* <li style={{ color: 'black' }} onClick={handleClickOpen}>{props.order.shop.name} ordered {props.order.qty_ordered} pcs of {props.order.product.name}</li> */}





      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Have ordered {props.order.qty_ordered} Pcs Of {props.order.product.name} .<br />
            Product Cost: {props.order.product.price} .

          </DialogContentText>
          <Input max={props.order.qty_ordered} style={{ color: 'black' }} type="number" value={qty} onChange={(e) => { setQty(e.target.value) }} />
          <br />
          
          <Input placeholder="price" style={{ color: 'black' }} type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} />
          {alert}
          {/* <MapLocation xValue={props.order.lat} yValue={props.order.lng}/> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>

          <Button onClick={handleDeliver} color="info">
            Recieve
          </Button>
        </DialogActions>
      </Dialog>
{/* 
      <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Have a deficiet in product: {props.order.product.name} 
            
          </DialogContentText>
          
          {alert}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Cancel
          </Button>

          <Button onClick={()=>setOpen2(false)}color="primary">
           <Link to="/admin/suppliers"> Go to suppliers</Link>
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
