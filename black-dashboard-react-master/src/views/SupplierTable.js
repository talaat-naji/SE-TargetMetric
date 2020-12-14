import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from "reactstrap";
import SupplierVerticalTabs  from "./SupplierTabs";
export default function SupplierTable(props) {
    const [open, setOpen] = React.useState(false);
    const [supplier, setSupplier] = React.useState([]);
// React.useEffect(() => {
//     console.log(props, "hyyyyyy");
// }, [])
   
  const handleClickOpen = (sup) => {
      setOpen(true);
      setSupplier(sup);
     
  };

  const handleClose = () => {
      setOpen(false);
  };

    
    

  return (
      <div>
 
<Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="text-center">Phone</th>
                      </tr>
                    </thead>
              <tbody>
                  {props.suppliers.map((supplier) => {
                      return (
                          <tr key={supplier.id} onClick={()=>handleClickOpen(supplier)}>
                              <td>{supplier.id}</td>
                              <td>{supplier.name}</td>
                              <td>{supplier.email}</td>
                              <td className="text-center">{supplier.phone}</td>
                          </tr>
                      );
                  })}
                      
                     
                    </tbody>
          </Table>
      
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true} style={{backgroundColor:"#525f7f"}}>
              <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
                  <SupplierVerticalTabs style={{backgroundColor:"#525f7f"}} supplier={supplier}/>
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