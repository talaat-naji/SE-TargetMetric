import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from "reactstrap";
import RetailerTabs  from "./RetailerTabs";
export default function RetailerRow(props) {
    const [open, setOpen] = React.useState(false);
    const [retailerId, setRetailerId] = React.useState();
    // React.useEffect(() => {
    //     console.log(props, "hyyyyyy");
    // }, [])
   
    const handleClickOpen = (id) => {
        setOpen(true);
        setRetailerId(id);
      
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    

    return (<>
        <tr onClick={()=>handleClickOpen(props.retailer.id)}>
            <td>{props.retailer.name}</td>
            <td>{props.retailer.email}</td>
            <td>{props.retailer.governorate !== null ? props.retailer.governorate.gov_name : null}</td>
            <td>{props.retailer.district !== null ? props.retailer.district.district_name : null}</td>
        </tr>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true} >
            <DialogTitle id="form-dialog-title"></DialogTitle>
            <DialogContent>
                <RetailerTabs retailer_id={retailerId} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
     </Button>
    
            </DialogActions>
        </Dialog>
    </>
    );
}