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

export default function ProductOrder(props) {
    const [open, setOpen] = React.useState(false);
    const [qtyToOrder, setQtyToOrder] = React.useState();
   // const [price, setPrice] = React.useState();
    const [productId, setProductId] = React.useState();

    // const editProduct = () => {
    //     if (sessionStorage.getItem('loggedIn')) {
    //         apiClient.post('/api/editProduct',
    //             {
    //                     productId:productId,
    //                     productDesc: productDesc,
    //                     price: price
    //                 })
               
    //                 .catch(error => console.error(error)
    //                 )

    //     }
    // }
  const handleClickOpen = () => {
      setOpen(true);
   // setProductId(props.product.id)
   
  };

  const handleClose = () => {
      setOpen(false);
   
  };
  const handleSubmit = () => {
      setOpen(false);
    //   editProduct();
    //   props.onEditProduct();
      
  };
    
    
  return (
      <>
         
       
        <Button onClick={handleClickOpen}>Order Now</Button>  
            
    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                  <MapLocation/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}