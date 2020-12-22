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
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
export default function RetailerRow(props) {
    const [open, setOpen] = React.useState(false);
    const [retailer, setRetailer] = React.useState('');
    
   
    const handleClickOpen = (retailer) => {
        setOpen(true);
        setRetailer(retailer);
      
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    

    return (<>
        <tr onClick={()=>handleClickOpen(props.retailer)}>
            <td><Row><Col xs="auto"><img className="avatar" src={props.retailer.profile_url}/></Col><Col>{props.retailer.name}</Col></Row></td>
            <td><Row><Col>{props.retailer.email}</Col></Row></td>
            <td><Row><Col>{props.retailer.governorate !== null ? props.retailer.governorate.gov_name : null}</Col></Row></td>
            <td><Row><Col>{props.retailer.district !== null ? props.retailer.district.district_name : null}</Col></Row></td>
        </tr>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true} >
            <DialogTitle id="form-dialog-title" ><h3 style={{ color: "black" }}>{retailer.name}</h3></DialogTitle>
            <DialogContent>
                {/* <RetailerTabs retailer_id={retailerId} /> */}
                <RetailerTabs retailer={retailer} />
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