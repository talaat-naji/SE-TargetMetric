import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from '../services/api';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export default function ViewProd(props) {
    const [open, setOpen] = React.useState(false);
    const [productDesc, setDesc] = React.useState();
    const [price, setPrice] = React.useState();
    const [productId, setProductId] = React.useState();

    const editProduct = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('/api/editProduct',
                {
                        productId:productId,
                        productDesc: productDesc,
                        price: price
                    })
               
                    .catch(error => console.error(error)
                    )

        }
    }
  const handleClickOpen = () => {
      setOpen(true);
      setProductId(props.product.product.id)
  };

  const handleClose = () => {
      setOpen(false);
     // setName(null);
     // setDeadline(null);
  };
  const handleSubmit = () => {
      setOpen(false);
      editProduct();
      props.onEditProduct();
      
  };
    
    
const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
  return (
      <div>
         
       
              <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{props.product.product.description}</Typography>
                     
          </React.Fragment>
        }
      >
        <div className="font-icon-detail" onClick={handleClickOpen}>
                        <i className="tim-icons icon-alert-circle-exc" />
                            <p>{props.product.product.name}</p>
                            <p>{props.product.price}</p>
              </div>
      </HtmlTooltip>     
            
    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.product.product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText >
                     
          </DialogContentText>
                  <TextField
                      defaultValue={props.product.product.description}
                      placeholder={props.product.product.description}
                      onChange={(e)=>setDesc(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Product Description"
            type="text"
            fullWidth
          />
                  <TextField
                      defaultValue={props.product.price}
                     placeholder={props.product.price}
                      onChange={(e)=>setPrice(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="number"
            fullWidth
          />
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
    </div>
  );
}
