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
import Select from 'react-select';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Table,
    Input,
    Row,
    Col
} from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from "../../services/api"



import ItemTable from "./ItemTable";
import { Paper, TextField } from "@material-ui/core";

function PosMain() {
    const [open, setOpen] = React.useState(false);
    const [productList, setProductList] = React.useState([]); //list of products in an invoice
    const [open2, setOpen2] = React.useState(false); //in case of debt
    const [total, setTotal] = React.useState(0); //invoice total
    const [recieved, setRecieved] = React.useState(0); //money recieved
    const [customer, setCustomer] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        
        // setName(null);
        // setDeadline(null);
    };
    const handleClose2 = () => {
        
        setOpen2(false);
        // setName(null);
        // setDeadline(null);
    };
    const saveInv = () => {
        if (recieved >= total && customer === "") {
            if (sessionStorage.getItem('loggedIn')) {

                apiClient.post('../api/saveInv', { total: total, recieved: recieved, invoice: productList })
                    .then(response => {
                        if (response.status == 200) { setProductList([]); setCustomer("");setOpen2(false); }
                    })
            }
        } else if (recieved < total && customer !== "") {
            if (sessionStorage.getItem('loggedIn')) {

                apiClient.post('../api/saveInv', { customer: customer, total: total, recieved: recieved, invoice: productList })
                    .then(response => {
                        if (response.status == 200) { setProductList([]); setCustomer("");setOpen2(false);}
                    })
            }
        } else { setOpen2(true); }
    }





    return (
        <>
            <div className="content white-content">
                <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">unPaid invoice</DialogTitle>
                    <DialogContent>
                        The costomer didnt pay all the invoice please enter customer name to save it to unpaid invoices:<br/>
                        <TextField label="customer Name" onChange={(e) => setCustomer(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2}>cancel</Button>
                        <Button onClick={saveInv}>save</Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={handleClickOpen} style={{ height: '80Px', width: "10%" }}>Sales Entry</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true}>
                    <DialogTitle id="form-dialog-title">
                        <Button onClick={handleClose}><i className="tim-icons icon-minimal-left" /></Button>
                    </DialogTitle>
                    <DialogContent>

                        <Row>

                            <Col md="8">
                                <Card style={{ backgroundColor: "#ffffff", color: "black", fontSize: "10px" }}>
                                    <CardBody>
                                        <Row>
                                            <ItemTable onAddProd={(e) => { setTotal(e) }} onAdd={(e) => { setProductList(e) }} clear={productList} />
                                        </Row>

                                    </CardBody>

                                </Card>
                            </Col>

                            <Col>
                                <Card style={{ backgroundColor: "#cbd0d5" }}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h4>Invoice Total : </h4>
                                                <Paper className="text-center" elevation={3} >
                                                    <br />
                                                    {total}
                                                    <br /><br />
                                                </Paper>
                                            </Col>
                                            <Col>
                                                <h4>Change : </h4>
                                                <Paper className="text-center" elevation={3} >
                                                    <br />
                                                    {recieved - total}
                                                    <br /><br />
                                                </Paper>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <br />
                                                <h4>Amount Recieved : </h4>
                                                <Paper elevation={3} >

                                                    <Input type="number" onChange={(e) => { setRecieved(e.target.value) }} />
                                                </Paper>
                                            </Col>
                                        </Row> <Row>
                                            <Col>
                                                <br />
                                                <Button onClick={saveInv} style={{ width: "99%" }}>SAVE</Button>

                                            </Col>
                                            <Col>
                                                <br />
                                                <Button onClick={() => setProductList([])} style={{ width: "99%" }}>clear</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>



                        </Row>
                        <Row style={{ marginLeft: "10px" }}>
                            <Col>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 1</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 2</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 3</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 4</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 5</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 6</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 7</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 8</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 9</Button>

                            </Col>
                        </Row>
                        <Row style={{ marginLeft: "10px" }}>
                            <Col>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 1</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 2</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 3</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 4</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 5</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 6</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 7</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 8</Button>
                                <Button style={{ height: '80Px', width: "10%" }}>PROD 9</Button>

                            </Col>
                        </Row>
                    </DialogContent>

                </Dialog>
            </div>
        </>
    );

}

export default PosMain;
