import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from "reactstrap";
import VerticalTabs  from "./Tabs";
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
export default function CustomerTable(props) {
    const [open, setOpen] = React.useState(false);
  const [customerId, setCustomerId] = React.useState();
  const [customerName, setCustomerName] = React.useState();
// React.useEffect(() => {
//     console.log(props, "hyyyyyy");
// }, [])
   
  const handleClickOpen = (id,name) => {
      setOpen(true);
    setCustomerId(id);
    setCustomerName(name);
      
  };

  const handleClose = () => {
      setOpen(false);
  };

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      display: "inline-block",
      mode: "nearest",
      position: "nearest",
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}))(Tooltip);
    

  return (
    <div>
     
          <Table className="tablesorter" >
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Governorate</th>
                      <th>District</th>
                      <th className="text-center">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.customersData.map((customer) => {
                      return (
                        <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Click on the shop row for more detailed statistics</Typography>
                
                          </React.Fragment>
                        }>
                      <tr style={{ cursor: 'pointer'}} onClick={() => { handleClickOpen(customer.shop_id,customer.name) }}>
                        <td ><Row><Col xs="auto"><img className="avatar" src={customer.profile_url}/></Col><Col>{customer.name}</Col></Row></td>
                        <td>{customer.govName!=null?customer.govName:"--"}</td>
                        <td>{customer.distName!=null?customer.distName:"--"}</td>
                        <td className="text-center">{customer.total.toLocaleString()} L.L</td>
                          </tr>
                          </HtmlTooltip>);
                    })}


                  </tbody>
                </Table>    
            
    
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true} >
        <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#c9d0b6" }}>
          <Button onClick={handleClose} color="primary">
            <i className="tim-icons icon-minimal-left"/>
          </Button>{customerName}</DialogTitle>
        <DialogContent style={{ backgroundColor: "#f5f6fa" }}>
                  <VerticalTabs shopId={customerId}/>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
