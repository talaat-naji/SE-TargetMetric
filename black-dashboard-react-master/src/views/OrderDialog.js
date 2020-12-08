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
export default function OrderDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [qty, setQty] = React.useState(props.order.qty_ordered);
  const [alert, setAlert] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
   
  };

   React.useEffect(() => {console.log(open,"2") }, [open]);
  const Deliver = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/deliverOrder', {
        qty: qty,
        qty_ordered: props.order.qty_ordered,
        oId: props.order.id,
        shop_id: props.order.shop_id,
        product_id: props.order.product.id
      })
          
          .catch(error => console.error(error))
  }
}

  const handleClose = () => {
    setOpen(false);
  
  };
  
  const handleDeliver = () => {
    if (props.order.stock.qty - qty <= 0) {
      setAlert(<Alert color='danger'>you dont have enough qty of this product</Alert>)
    } else {
      setAlert('');
      Deliver();
      setOpen(false);
      setQty(props.order.qty_ordered)
      props.onDeliver();
    }
  }

  return (

    <div>
<MenuItem onClick={handleClickOpen}>
          {props.order.shop.name} ordered {props.order.qty_ordered} pcs of {props.order.product.name}
         </MenuItem>
      {/* <li style={{ color: 'black' }} onClick={handleClickOpen}>{props.order.shop.name} ordered {props.order.qty_ordered} pcs of {props.order.product.name}</li> */}





      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Have {props.order.stock.qty} Pcs Of {props.order.product.name} In your Stock.
            if you deliver this qty {props.order.stock.qty - qty} pcs will remain.
          </DialogContentText>
          <Input Max={props.order.qty_ordered} style={{ color: 'black' }} type="number" value={qty} onChange={(e) => { setQty(e.target.value) }} />
          {alert}
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
    </div>
  );
}
