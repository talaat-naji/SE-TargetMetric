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
import { Paper, TextField, Tooltip, Typography, withStyles } from "@material-ui/core";
import { Label, SettingsInputComponentSharp, Title } from "@material-ui/icons";
import Products from "views/Products";
import TodayData from "./TodayData";
import Stock from "./StockManagment";
import ReportsTabs from "./ReportsTabs";
import Button2 from '@material-ui/core/Button';
import Fieldset, { withFieldset, withFullName } from 'react-fieldset';

function PosMain() {
    const [open, setOpen] = React.useState(false);
    const [productList, setProductList] = React.useState([]); //list of products in an invoice
    const [open2, setOpen2] = React.useState(false); //in case of debt
    const [open3, setOpen3] = React.useState(false); //add products that dont have barcode
    const [open4, setOpen4] = React.useState(false); //reports
    const [total, setTotal] = React.useState(0); //invoice total
    const [recieved, setRecieved] = React.useState(0); //money recieved
    const [cost, setCost] = React.useState(0); //invoice total
    const [totalCost, setTotalCost] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [customer, setCustomer] = React.useState("");
    const [name, setName] = React.useState("");
    const [favProds, setFavProds] = React.useState([]);
    const [prdId, setPrdId] = React.useState(null);
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);

    };
    const handleClose2 = () => {
        setOpen2(false);

    };

    const saveInv = () => {
        if (recieved >= total && customer === "") {
            if (sessionStorage.getItem('loggedIn')) {

                apiClient.post('../api/saveInv', { customer: customer, total: total, totalCost: totalCost, recieved: recieved, invoice: productList })
                    .then(response => {
                        if (response.status == 200) {
                            setProductList([]);
                            setCustomer("");
                            setRecieved(0);
                            setOpen2(false);
                        }
                    }).catch(error => console.error(error))
            }
        } else if (recieved < total && customer !== "") {
            if (sessionStorage.getItem('loggedIn')) {

                apiClient.post('../api/saveInv', { customer: customer, total: total, totalCost: totalCost, recieved: recieved, invoice: productList })
                    .then(response => {
                        if (response.status == 200) {
                            setProductList([]);
                            setCustomer("");
                            setRecieved(0);
                            setOpen2(false);
                        }
                    }).catch(error => console.error(error))
            }
        } else { setOpen2(true); }
    }

    const addProd = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/addProd', { id: prdId, barcode: name, cost: cost, price: price, })
                .then(response => {
                    setOpen3(false);
                    fetchProds();
                    setPrdId(null);
                }).catch(error => console.error(error))
        }
    }
    const addToList = (prod) => {


        let test = true;
        let temp = productList;
        temp.forEach(element => {

            if (element.barcode === prod.barcode) {
                element.qty = element.qty + 1;
                test = false;

            }

        });
        setTotal(total + prod.price);
        setTotalCost(totalCost + prod.cost);

        if (test) {
            temp.push({
                barcode: prod.barcode,
                description: prod.barcode,
                qty: 1,
                price: prod.price,
                cost: prod.cost
            });


            setProductList(temp);
        }
    }
    const fetchProds = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.get('../api/getFavProds')
                .then(response => {
                    setFavProds(response.data);

                }).catch(error => console.error(error))
        }
    }
    React.useEffect(() => {
        fetchProds();
    }, [])
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
        
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
    }))(Tooltip);
    
//    const Field = withFieldset(Field);
    return (
        <>
            <div className="content">

                <Row>
                    <Col>
                        <HtmlTooltip placement="top"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Register your sales and debts. </Typography>

                                </React.Fragment>
                            }>
                            <Button color="info" onClick={handleClickOpen} style={{ height: '175px', width: "95%", fontWeight: "bolder", fontSize: "22px" }}><i className="tim-icons icon-tap-02"/> Sales Entry</Button>
                        </HtmlTooltip>
                    </Col>
                    <Col>
                        <TodayData />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <HtmlTooltip placement="bottom"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">View your sales and profits and your customer's unpaid invoices </Typography>

                                </React.Fragment>
                            }>
                            <Button color="info" onClick={() => setOpen4(true)} style={{ height: '175px', width: "95%", fontWeight: "bolder", fontSize: "22px" }}><i className="tim-icons icon-sound-wave"/> Reports</Button>
                      </HtmlTooltip>
                    </Col>
                    <Col>
                  
                            <Stock />
                            
                    </Col>
                </Row>

                <Dialog open={open4} fullScreen={true} onClose={() => setOpen4(false)} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#c9d0b6" }}>
                        <h4 style={{ fontWeight: "bolder" }}><Button2 onClick={() => setOpen4(false)} color="primary">
                            <i className="tim-icons icon-minimal-left" />
                        </Button2>
                     Reports</h4></DialogTitle>
                    <DialogContent style={{ backgroundColor: "#f5f6fa" }}>
                        <ReportsTabs />
                    </DialogContent>

                </Dialog>



                <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Unpaid Invoice</DialogTitle>
                    <DialogContent>
                    The customer didn't pay all the invoice please enter the customer name to save it to unpaid invoices:<br />
                        <TextField label="customer Name" onChange={(e) => setCustomer(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="danger" onClick={handleClose2}>cancel</Button>
                        <Button color="info" onClick={saveInv}>save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={open3} onClose={() => setOpen3(false)} fullWidth={false} aria-labelledby="form-dialog-title" >
                    <DialogTitle style={{ backgroundColor: "#cbd0d5", color: "#1e1e25" }} id="form-dialog-title">Add/Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField label="Product Name" onChange={(e) => setName(e.target.value)} />
                        <br></br>
                        <TextField label="Product Cost" onChange={(e) => setCost(e.target.value)} />
                        <br></br>
                        <TextField label="Product Price" onChange={(e) => setPrice(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="danger" onClick={() => setOpen3(false)}>cancel</Button>
                        <Button color="info" onClick={addProd}>save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true}>
                    {/* <DialogTitle id="form-dialog-title">
                        <Button onClick={handleClose}><i className="tim-icons icon-minimal-left" /></Button>
                    </DialogTitle> */}
                    <DialogContent style={{ backgroundColor: "#b0b2bb" }}>

                        <Row>

                            <Col md="8">
                                <Card style={{ backgroundColor: "whitesmoke", color: "black", fontSize: "10px" }}>
                                    <CardBody>
                                        <Row>
                                            <ItemTable onAddProd={(e, c) => { setTotal(e); setTotalCost(c) }} onAdd={(e) => { setProductList(e) }} clear={productList} />
                                        </Row>

                                    </CardBody>

                                </Card>

                            </Col>

                            <Col>

                                <Card style={{ backgroundColor: "whitesmoke" }}>{/*#a4a6b0d6*/}
                                    <CardBody>
                                        <Row>
                                            <Col>

                                                <Paper className="text-center" elevation={3} >
                                                    <br />
                                                    <h4 style={{ color: "#1e1e24", fontWeight: "bolder", fontFamily: "timesnewroman" }}>Invoice Total <br />{total.toLocaleString()} L.L</h4>
                                                    <hr />
                                                </Paper>
                                            </Col>
                                            <Col>

                                                <Paper className="text-center" elevation={3} >
                                                    {recieved - total < 0 ? <> <br /><h4 style={{ color: "red", fontWeight: "bolder", fontFamily: "timesnewroman" }}> Change  <br />
                                                        {(recieved - total).toLocaleString()} L.L
                                                    </h4>
                                                        <hr /> </> :
                                                        <><br /><h4 style={{ color: "green", fontWeight: "bolder", fontFamily: "timesnewroman" }}>Change  <br />{(recieved - total).toLocaleString()} L.L</h4>
                                                            <hr /></>}
                                                </Paper>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {/* <br /> */}

                                                <Paper className="text-center" elevation={3} >
                                                    <h4 style={{ color: "#1e1e24", fontWeight: "bolder", fontFamily: "timesnewroman" }}>Amount Recieved </h4>
                                                    <Input placeholder="Enter Customer Payment in L.L" style={{ color: "#1e1e24", borderColor: "transparent" }} onChange={(e) => { setRecieved(e.target.value) }} />
                                                </Paper>
                                            </Col>
                                        </Row> <Row>
                                            <Col>
                                                <br />
                                                <Button color="info" onClick={saveInv} style={{ width: "99%" }}>Save</Button>

                                            </Col>
                                            <Col>
                                                <br />
                                                <Button color="danger" onClick={() => setProductList([])} style={{ width: "99%" }}>Clear</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>

                            </Col>



                        </Row>

                        
                        
                        <Card style={{ backgroundColor: "whitesmoke" }}>
                        
                            {/* <h4 style={{ fontFamily: "timesnewroman" }}>BarcodeLess products :</h4> */}
                          
                    
                            <CardBody >
                            <legend > <h4 style={{ fontFamily: "timesnewroman" }}>BarcodeLess products :</h4> </legend>
                                <Row style={{ marginLeft: "10px" }}>

                                    <Col >
                                        {favProds.map((prod) => {
                                            return (
                                                <Button
                                                    color="info"
                                                    onDoubleClick={(e) => { setPrdId(prod.id); setOpen3(true); setProductList([]) }}
                                                    onClick={(e) => { addToList(prod) }}
                                                    key={prod.barcode}
                                                    style={{
                                                        height: '78Px', width: "10%", justifyContent: "center",
                                                        alignItems: "center", padding: 0
                                                    }}>
                                                    {prod.barcode}
                                                </Button>
                                            )
                                        })}
                                        {favProds.length <= 17 ? <Button color="info" onClick={(e) => { setOpen3(true) }} id="11" style={{
                                            width: "80px",
                                            height: "80px",
                                            background: "primary",
                                            border: 0,
                                            borderRadius: "50%",

                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 0,
                                        }}><i className="tim-icons icon-simple-add" style={{ fontSize: "25px", fontWeight: "bolder", color: "powderblue" }} /></Button> : <></>}
                                    </Col><Col md="1">
                                        <Button color="danger" onClick={handleClose} style={{
                                           marginRight:"20px",
                                           float: "right", height: '160Px', width: "30px", alignItems: "center",
                                        }}><p style={{ fontSize: "17px",fontWeight: "bolder",justifyContent: "center",color:"#ffffff"}}>E<br/>x<br/>i<br/>t</p></Button>
                                        {/* <img onClick={handleClose} style={{ width: "130px", height: "160px" }} src={require("../../assets/img/exit2.png")} /> */}
                                    </Col>

                                </Row>
                                {/* <Row style={{ marginLeft: "10px" }}>
                            <Col>
E<br />X<br /> I<br />T
                            </Col>

                                </Row> */}
                                </CardBody>
                              
                                </Card>
                               
                    </DialogContent>

                </Dialog>
            </div>
        </>
    );

}

export default PosMain;
