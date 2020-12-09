/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import apiClient from "../services/api";
import SupplierTable from "./SupplierTable";
class Suppliers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      open: false,
      name: '',
      email: '',
      phone:'',
    };
  }
  fetchSuppliers = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.get('../api/getSuppliers')
        .then(response => {
          this.setState({ suppliers: response.data });
        })
        .catch(error => console.error(error))

    }

  }
  addSupplier = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/addSupplier', {
        name: this.state.name,
        email: this.state.email,
        phone:this.state.phone,
      })
        
        .catch(error => console.error(error))

    }

  }

  handleClickOpen = () => {
    this.setState({ open: true });
   
};

handleClose = () => {
  this.setState({ open: false });
   // setName(null);
   // setDeadline(null);
};
handleSubmit = () => {
  this.setState({ open: false });
  this.addSupplier();
  this.fetchSuppliers();
   // props.onEditProduct();
    
};

  componentDidMount() {
    this.fetchSuppliers();
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">My Suppliers  <button onClick={this.handleClickOpen} style={{ marginRight: "1em", float: "right" }}>NEW Supplier</button></CardTitle>
                  
                </CardHeader>
                <CardBody>
                  <SupplierTable suppliers={this.state.suppliers}/>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Supplier</DialogTitle>
        <DialogContent>
          <DialogContentText >
                     
          </DialogContentText>
                  <TextField
                     
                      placeholder="Supplier Name"
                onChange={(e) => this.setState({name: e.target.value })}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
                  <TextField
                   
                     placeholder="Email"
                onChange={(e) => this.setState({ email:e.target.value })}
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
              />
                        <TextField
                   
                   placeholder="Phone"
              onChange={(e) => this.setState({ phone:e.target.value })}
          autoFocus
          margin="dense"
          id="name"
          label="phone"
          type="text"
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add Supplier
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      </>
    );
  }
}

export default Suppliers;
