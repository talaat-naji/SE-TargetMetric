import React from 'react';
import Button from '@material-ui/core/Button';
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
import { Link, Redirect } from 'react-router-dom';
import MapLocation from './ShopViews/MapLocation';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import { Typography } from '@material-ui/core';
export default function OrderDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [qty, setQty] = React.useState(props.order.qty_ordered);
  const [open2, setOpen2] = React.useState(false);
  
  const [alert, setAlert] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
   
  };

  const Deliver = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/deliverOrder', {
        qty: qty,
        qty_ordered: props.order.qty_ordered,
        oId: props.order.id,
        shop_id: props.order.shop_id,
        product_id: props.order.product.id
      }).then((response) => {
        
        if (response.data === "deficiet") {
          setOpen2(true);
        } else {
          setQty(props.order.qty_ordered)
          props.onDeliver();
        }
      })
          
          .catch(error => console.error(error))
  }
}

  const handleClose = () => {
    setOpen(false);
  
  };
  const handleClose2 = () => {
    setOpen2(false);
    setQty(props.order.qty_ordered)
    props.onDeliver();
  };
  const handleDeliver = () => {
    if (qty <= 0) { setAlert(<Alert color='danger'>you Cant deliver an empty order !!!</Alert>) }
    else if (props.order.stock.qty - qty < 0) {
      setAlert(<Alert color='danger'>you dont have enough qty of this product</Alert>)
    } else {
      setAlert('');
      Deliver();
      setOpen(false);
      
    }
  }

  return (

    <div>
       {/* <ListGroupItem className="content"> */}
      <MenuItem onClick={handleClickOpen} >
      
     
        <Typography style={{color:"#1e1e2e"}}>{props.order.shop.name} ordered {props.order.qty_ordered} pcs of {props.order.product.name}</Typography>  
         
     
    
      </MenuItem>
      {/* </ListGroupItem> */}
      {/* <li style={{ color: 'black' }} onClick={handleClickOpen}>{props.order.shop.name} ordered {props.order.qty_ordered} pcs of {props.order.product.name}</li> */}





      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Have {props.order.stock.qty} Pcs Of {props.order.product.name} In your Stock.
            if you deliver this qty {props.order.stock.qty - qty} pcs will remain.
          </DialogContentText>
          <Input max={props.order.qty_ordered} style={{ color: 'black' }} type="number" value={qty} onChange={(e) => { setQty(e.target.value) }} />
          {alert}

          <MapLocation xValue={props.order.lat} yValue={props.order.lng}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleDeliver} color="primary">
            Deliver
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Have a deficiet in product: {props.order.product.name} 
            {/* specify the quantity you want to order from {props.order.product.supplier_email} or just click cancel. */}
          </DialogContentText>
          {/* <Input style={{ color: 'black' }} type="number"  onChange={(e) => { setOrderQty(e.target.value) }} /> */}
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
      </Dialog>
    </div>
  );
}
