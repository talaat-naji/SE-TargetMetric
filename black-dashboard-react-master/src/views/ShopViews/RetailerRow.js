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
    const [open2, setOpen2] = React.useState(false);
    const [retailer, setRetailer] = React.useState('');
    
   
    const handleClickOpen = (retailer) => {
        setOpen(true);
        setRetailer(retailer);
      
    };
    const handleClickOpen2 = (retailer) => {
        setOpen2(true);
        setRetailer(retailer);
      
    };
    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
    };

    
    

    return (<>
        <tr style={{ cursor: 'pointer'}} >
            <td><Row><Col xs="auto" onClick={()=>handleClickOpen2(props.retailer)}><img className="avatar" src={props.retailer.profile_url}/></Col><Col onClick={()=>handleClickOpen(props.retailer)}>{props.retailer.name}</Col></Row></td>
            <td>{props.retailer.email}</td>
            <td>{props.retailer.governorate !== null ? props.retailer.governorate.gov_name : null}</td>
            <td>{props.retailer.district !== null ? props.retailer.district.district_name : null}</td>
        </tr>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true} >
            <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#1e1e2e" }}><h4 style={{ color: "#c2d0d4",fontWeight:"bolder"}}> <Button onClick={handleClose} color="primary">
            <i className="tim-icons icon-minimal-left" />
     </Button>{retailer.name}</h4></DialogTitle>
            <DialogContent style={{ backgroundColor: "#252537" }}>
             
                <RetailerTabs retailer={retailer} />
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
     </Button>
    
            </DialogActions> */}
        </Dialog>
        <Dialog open={open2} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title" ><h3 style={{ color: "black" }}>{retailer.name}</h3></DialogTitle>
            <DialogContent>
              <img src={props.retailer.profile_url}/>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
     </Button>
    
            </DialogActions> */}
        </Dialog>
   
    </>
    );
}