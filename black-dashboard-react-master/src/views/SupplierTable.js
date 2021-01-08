import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from "reactstrap";
import SupplierVerticalTabs from "./SupplierTabs";
import { createMuiTheme, ThemeProvider} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export default function SupplierTable(props) {
  const [open, setOpen] = React.useState(false);
  const [supplier, setSupplier] = React.useState([]);

  // React.useEffect(() => {
  //     console.log(props, "hyyyyyy");
  // }, [])

  const HtmlTooltip = withStyles((theme) => ({
    
    tooltip: {
      
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const handleClickOpen = (sup) => {
    setOpen(true);
    setSupplier(sup);

  };

  const handleClose = () => {
    setOpen(false);
  };




  return (
    <div>

      <Table className="tablesorter" >
        <thead className="text-primary">
          
          <tr>
            <th><Typography>#ID</Typography></th>
            <th><Typography>Name</Typography></th>
            <th><Typography>Email</Typography></th>
            <th className="text-center"><Typography>Phone</Typography></th>
          </tr>
        </thead>
        <tbody>
          {props.suppliers.map((supplier) => {
            return (
              <HtmlTooltip placement="top-right"
        title={
          <React.Fragment>
            <Typography color="inherit">Click on a supplier row for more actions(change prices,order Products,view order History...)</Typography>

          </React.Fragment>
        }
      >
              <tr style={{ cursor: 'pointer'}} key={supplier.id} onClick={() => handleClickOpen(supplier)}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td className="text-center">{supplier.phone}</td>
                </tr>
                </HtmlTooltip>
            );
          })}


        </tbody>
      </Table>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true}>
        <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#c9d0b6" }}>
        {/* #1e1e2e style={{ color: "#c9d0b6" }}*/}
        <h4 >
          <Button onClick={handleClose} color="primary">
            <i className="tim-icons icon-minimal-left" />

          </Button>{supplier.name}</h4></DialogTitle>
        
        <DialogContent style={{ backgroundColor: "#f5f6fa" }}>

          <SupplierVerticalTabs style={{ backgroundColor: "#f5f6fa" }} supplier={supplier} />
          {/* #252537 */}
        </DialogContent>

      </Dialog>
    </div>
  );
}