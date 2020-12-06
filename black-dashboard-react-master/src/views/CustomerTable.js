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
export default function CustomerTable(props) {
    const [open, setOpen] = React.useState(false);
    const [customerId, setCustomerId] = React.useState();
// React.useEffect(() => {
//     console.log(props, "hyyyyyy");
// }, [])
   
  const handleClickOpen = (id) => {
      setOpen(true);
      setCustomerId(id);
      console.log(customerId,"kkkkk");
  };

  const handleClose = () => {
      setOpen(false);
  };

    
    

  return (
      <div>
          <Table className="tablesorter" responsive>
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
                      return (<tr>
                          <td onClick={() => { handleClickOpen(customer.id) }}>{customer.name}</td>
                        <td>{customer.govName}</td>
                        <td>{customer.distName}</td>
                        <td className="text-center">{customer.total} L.L</td>
                      </tr>);
                    })}


                  </tbody>
                </Table>    
            
    
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true}fullWidth={true}>
              <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
                  <VerticalTabs shopId={customerId}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
