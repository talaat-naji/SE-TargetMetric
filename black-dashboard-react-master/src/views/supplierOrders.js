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
  Input,
  Table,
  Row,
  Col
} from "reactstrap";
import apiClient from "../services/api";
import SupplierTable from "./SupplierTable";
import { Typography } from "@material-ui/core";
class Suppliers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      suppliersFiltered: [],
      open: false,
      name: '',
      email: '',
      phone: '',

    };
    
  }
  fetchSuppliers = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.get('../api/getSuppliers')
        .then(response => {
          this.setState({
            suppliers: response.data,
            suppliersFiltered: response.data
          });
        })
        .catch(error => console.error(error))

    }

  }
  addSupplier = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/addSupplier', {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      })

        .catch(error => console.error(error))

    }

  }
  filterResults = (value) => {
    if (value === null) {
      this.setState({ suppliersFiltered: this.state.suppliers });
    } else {
      let filter = this.state.suppliers.filter(supplier => supplier.name.toLowerCase().includes(value));
      this.setState({ suppliersFiltered: filter });
      console.log(filter);
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
                  <CardTitle tag="h4"><Row><Col>
                    <Typography variant="h5" component="h5"> My Suppliers </Typography></Col>
                    <Col><Button
                      variant="contained" color="primary"
                      onClick={this.handleClickOpen}
                      style={{ marginRight: "1em", float: "right"}}>NEW Supplier</Button>
                    </Col>
                    
                  </Row>
                    <Row>
                      <Col xs="auto"><br />
                        
                          <i className="tim-icons icon-zoom-split" />
                         
                        </Col>
                        <Col><br />
                    <Input
                          style={{ marginRight: "1em", float: "right"}}
                          type="text"
                          placeholder="Search By Name"
                          onChange={(e) => this.filterResults(e.target.value)} />
                        </Col>
                      </Row>

                  </CardTitle>

                </CardHeader>
                <CardBody>
                  <SupplierTable suppliers={this.state.suppliersFiltered} />
                </CardBody>
              </Card>
            </Col>

          </Row>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" ><Typography variant="h5" component="h5" style={{color:"black",fontWeight:"bolder"}}>Add Supplier</Typography></DialogTitle>
            <DialogContent>
              <TextField

                placeholder="Supplier Name"
                onChange={(e) => this.setState({ name: e.target.value })}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
              />
              <TextField

                placeholder="Email"
                onChange={(e) => this.setState({ email: e.target.value })}
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                fullWidth
              />
              <TextField

                placeholder="Phone"
                onChange={(e) => this.setState({ phone: e.target.value })}
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
