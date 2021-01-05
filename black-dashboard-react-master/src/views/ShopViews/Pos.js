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
import TodayData from "./TodayData";
import Stock from "./StockManagment";
import ReportsTabs from "./ReportsTabs";
import Button2 from '@material-ui/core/Button';

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
    const [prdId,setPrdId]=React.useState(null); 
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

                apiClient.post('../api/saveInv', { customer: customer,total: total ,totalCost:totalCost, recieved: recieved, invoice: productList })
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

                apiClient.post('../api/saveInv', { customer: customer, total: total,totalCost:totalCost, recieved: recieved, invoice: productList })
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

            apiClient.post('../api/addProd', {id:prdId, barcode: name, cost: cost, price: price, })
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

    return (
        <>
            <div className="content">
             
                <Row>
                    <Col>
                    <Button color="info" onClick={handleClickOpen} style={{ height: '175px', width: "95%" , fontWeight:"bolder" ,fontSize:"22px"}}>Sales Entry</Button>
                    </Col>
                    <Col>
                    <TodayData/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button color="success" onClick={()=>setOpen4(true)} style={{ height: '175px', width: "95%", fontWeight:"bolder",fontSize:"22px"}}>reports</Button>
                    </Col>
                    <Col>
                    <Stock />
                    </Col>
                </Row>
                
                <Dialog open={open4} fullScreen={true} onClose={()=>setOpen4(false)} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#1e1e2e" ,color:"#cbd0d5"}}><Button2 style={{color:"#cbd0d5"}} onClick={()=>setOpen4(false)} color="primary">
            <i className="tim-icons icon-minimal-left"/>
              </Button2>
                   Reports</DialogTitle>
                    <DialogContent style={{ backgroundColor: "#252537"}}>
                   <ReportsTabs/>
                    </DialogContent>
              
                </Dialog>
               
                
                
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

                <Dialog open={open3} onClose={() => setOpen3(false)} fullWidth={false} aria-labelledby="form-dialog-title" >
                    <DialogTitle style={{ backgroundColor: "#cbd0d5" ,color:"#1e1e25"}} id="form-dialog-title">Add/Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField label="Product Name" onChange={(e) => setName(e.target.value)} />
                          <br></br>  
                        <TextField label="Product Cost" onChange={(e) => setCost(e.target.value)} />
                        <br></br> 
                        <TextField label="Product Price" onChange={(e) => setPrice(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpen3(false)}>cancel</Button>
                        <Button onClick={addProd}>save</Button>
                    </DialogActions>
                </Dialog>
               
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={true}>
                    {/* <DialogTitle id="form-dialog-title">
                        <Button onClick={handleClose}><i className="tim-icons icon-minimal-left" /></Button>
                    </DialogTitle> */}
                    <DialogContent style={{ backgroundColor: "#cbd0d5" }}>

                        <Row>

                            <Col md="8">
                                <Card style={{ backgroundColor: "#ffffff", color: "black", fontSize: "10px" }}>
                                    <CardBody>
                                        <Row>
                                            <ItemTable onAddProd={(e, c) => { setTotal(e);setTotalCost(c)}} onAdd={(e) => { setProductList(e) }} clear={productList} />
                                        </Row>

                                    </CardBody>

                                </Card>
                            </Col>

                            <Col>
                                <Card style={{ backgroundColor: "#cbd0d5" }}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                
                                                <Paper className="text-center" elevation={3} >
                                                <br />
                                                <h4 style={{color:"#1e1e24",fontWeight:"bolder"}}>Invoice Total <br />{total}</h4>
                                                <hr />
                                                </Paper>
                                            </Col>
                                            <Col>
                                               
                                                <Paper className="text-center" elevation={3} >
                                                    {recieved - total < 0 ?<> <br /><h4 style={{ color: "red",fontWeight:"bolder" }}> Change  <br />
                                                        {recieved - total}
                                                        </h4>
                                                        <hr /> </>:
                                                        <><br /><h4 style={{ color: "green",fontWeight:"bolder" }}>Change  <br />{recieved - total} </h4>
                                                        <hr /></>}
                                                </Paper>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <br />
                                                
                                                <Paper className="text-center" elevation={3} >
                                                <h4 style={{color:"#1e1e24",fontWeight:"bolder"}}>Amount Recieved </h4>
                                                    <Input style={{color:"#1e1e24"}} value={recieved} onChange={(e) => { setRecieved(e.target.value) }} />
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
                                {favProds.map((prod) => {
                                    return (
                                        <Button
                                            onDoubleClick={(e) => { setPrdId(prod.id); setOpen3(true);setProductList([]) }}
                                            onClick={(e) => { addToList( prod ) }}
                                            key={prod.barcode}
                                            style={{ height: '80Px', width: "10%" }}>
                                            {prod.barcode}
                                        </Button>
                                    )
                                })}
                                 {favProds.length<17?<Button onClick={(e)=>{setOpen3(true)}} id="11" style={{ height: '80Px', width: "auto" }}>Add Product</Button>:<></>}
                                <Button  onClick={handleClose} style={{ height: '80Px', width: "10%", color: "red", fontWeight: "bolder" }}>EXIT</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: "10px" }}>
                            <Col>
                               
                            </Col>
                        </Row>
                    </DialogContent>

                </Dialog>
            </div>
        </>
    );

}

export default PosMain;
