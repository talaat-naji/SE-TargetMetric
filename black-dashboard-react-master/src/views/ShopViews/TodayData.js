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
import { Label, SettingsInputComponentSharp } from "@material-ui/icons";
import Products from "views/Products";

function TodayData() {
    const [open, setOpen] = React.useState(false);
    // const [productList, setProductList] = React.useState([]); //list of products in an invoice
    // const [open2, setOpen2] = React.useState(false); //in case of debt
    // const [open3, setOpen3] = React.useState(false); //add products that dont have barcode
    const [totalSales, setTotalSales] = React.useState(0); //current day total sales
    const [totalCredit, setTotalCredit] = React.useState(0); //current day credit sales
    const [profit, setProfit] = React.useState(0); //Today Profits
    const [color, setColor] = React.useState("orange");
    const [color2, setColor2] = React.useState("red");
    //invoice total
    // const [price, setPrice] = React.useState(0);
    // const [customer, setCustomer] = React.useState("");
    // const [name, setName] = React.useState("");
    // const [favProds, setFavProds] = React.useState([]);
    const handleClickOpen = () => {
        setOpen(true);
        fetchProds();
    };

    const handleClose = () => {
        setOpen(false);


    };



    const fetchProds = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.get('../api/getTodaySales')
                .then(response => {
                    setTotalCredit(response.data[0][0].CreditSales);
                    setTotalSales(response.data[1][0].totalSales);
                    setProfit(response.data[1][0].totalSales - response.data[2][0].totalCosts);
                    if (response.data[1][0].totalSales - response.data[2][0].totalCosts > 0) { setColor2("green") } //profit
                    if (response.data[1][0].totalSales - response.data[0][0].CreditSales > response.data[0][0].CreditSales) { setColor("green") }

                }).catch(error => console.error(error))
        }

    }


    return (
        <>
            {/* <div className="content"> */}

            <Button color="info" onClick={handleClickOpen} style={{ height: '175px', width: "95%", fontWeight: "bolder", fontSize: "22px" }}>Today Sales</Button>

            <Dialog open={open} fullWidth={true} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title"><p style={{ color: 'black' }}>Daily Results</p></DialogTitle>
                <DialogContent >
                    <Row><Col>
                        <Paper className="text-center" elevation={3} >
                            <br /><h4 style={{ color: "black", fontWeight: "bolder" }}> Total Sales <br />
                                {totalSales}
                            </h4>
                            <hr />
                        </Paper>
                    </Col> <Col>
                            <Paper className="text-center" elevation={3} >
                                <br /><h4 style={{ color: "black", fontWeight: "bolder" }}> Total Credit Sales <br />
                                    {totalCredit}
                                </h4>
                                <hr />
                            </Paper>
                        </Col>
                    </Row>
                    <Row><Col>
                        <Paper className="text-center" elevation={3} >

                            <br /><h4 style={{ color: color, fontWeight: "bolder" }}> Total Cash Sales <br />
                                {totalSales - totalCredit}
                            </h4>
                            <hr />
                        </Paper>
                    </Col> <Col>
                            <Paper className="text-center" elevation={3} >

                                <br /><h4 style={{ color: color2, fontWeight: "bolder" }}> Total Profit <br />
                                    {profit}
                                </h4>
                                <hr />
                            </Paper>
                        </Col>
                    </Row>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>

                </DialogActions>
            </Dialog>



            {/* </div> */}
        </>
    );

}

export default TodayData;
