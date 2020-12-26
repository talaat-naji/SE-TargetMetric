import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from '../../services/api';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MapLocation from "./MapLocation";
import db from "../../services/firebase";
export default function ProductOrder(props) {
    const [open, setOpen] = React.useState(false);
    const [qtyToOrder, setQtyToOrder] = React.useState();
  const [x, setX] = React.useState();
  const [y, setY] = React.useState();
    //const [productId, setProductId] = React.useState();

  const orderProduct = () => {
    const a =db.database().ref('Orders/'+props.retailer_id);
    a.push({
      shop_name: sessionStorage.getItem("username"),
      shop_id:sessionStorage.getItem("userId"),
      product_id: props.product.id,
      product_name: props.product.name,
      retailer_id:props.retailer_id,
      qty: qtyToOrder,
      lat: x,
      lng: y,
      status:false
    });
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('/api/orderProduct',
                {
                  product_id: props.product.id,
                  retailer_id:props.retailer_id,
                  qty: qtyToOrder,
                  lat: x,
                  lng: y,
                        
                        
                    })
               
                    .catch(error => console.error(error)
                    )

        }
    }
  const handleClickOpen = () => {
      setOpen(true);
   // setProductId(props.product.id)
   
  };

  const handleClose = () => {
      setOpen(false);
 
  };
  const handleSubmit = () => {
      setOpen(false);
      orderProduct();
    //   props.onEditProduct();
      
  };
    
    
  return (
      <>
         
       
        <Button style={{float:"right"}} variant="contained" color="primary" onClick={handleClickOpen}>Order Now</Button>  
            
    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText >
                     
          </DialogContentText>
                  <TextField
                     
                      placeholder="Enter the Qty you want to order"
                      onChange={(e)=>setQtyToOrder(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Quantity needed"
            type="number"
            fullWidth
          />
          Pin your Location
          <MapLocation x={(e)=>setX(e)} y={(e)=>setY(e)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Send Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
