import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from "moment";
import apiClient from "../services/api";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {
    Table,
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Input,
    Row,
    Col,

} from "reactstrap";

import AutoOrder from "./AutoOrder";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#f5f6fa",
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const [name, setName] = React.useState('data1');
    const [description, setDescription] = React.useState(0);
    const [product_id, setProduct_id] = React.useState();
    const [price, setPrice] = React.useState();
    const [cost, setCost] = React.useState();
    const [min_qty, setQtyMin] = React.useState();
    const [max_orderQty, setQtyMax] = React.useState();
    const [orderHistory, setOrderHistory] = React.useState([]);
    const [orderContent, setOrderContent] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [editId, setEditId] = React.useState();
    const [detail, setDetail] = React.useState(false);
    const [recieved, setRecieved] = React.useState(false);
    const fetchProducts = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getSupplierProducts', { id: props.supplier.id })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.error(error))

        }
    }
    const fetchOrderContent = (id) => {
        if (sessionStorage.getItem('loggedIn')) {
    
            apiClient.post('../api/getContent', {
                supplier_id: props.supplier.id,
                order_id: id
            })
                .then((response) => {
                   
                        setOrderContent(response.data)
                   
                })
                .catch(error => console.error(error))
        }
    }
    const fetchOrders = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/autoGenerateOrder',
                { id: props.supplier.id })
                .then(response => {
                    setOrder(response.data);
                    console.log(response.data);
                })
                .catch(error => console.error(error))

        }
    }
    const fetchOrdersHistory = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/OrderHistory',
                { id: props.supplier.id })
                .then(response => {
                    setOrderHistory(response.data);
                })
                .catch(error => console.error(error))

        }
    }
    const editProduct = (id) => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/EditSupplierProduct', {
                product_id: id,
                name: name,
                desc: description,
                cost: cost,
                price: price,
                min_qty: min_qty,
                max_orderQty: max_orderQty
            }).then(() => {
                setName('');
                setDescription('');
                setCost();
                setPrice();
                fetchProducts();
            })

                .catch(error => console.error(error))

        }
    }
    const addProduct = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/addSupplierProduct', {
                supplier_id: props.supplier.id,
                product_id: product_id,
                name: name,
                desc: description,
                cost: cost,
                price: price,
                min_qty: min_qty,
                max_orderQty: max_orderQty
            })

                .catch(error => console.error(error))

        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setDetail(false);
        if (newValue === 1) {
            fetchProducts();
        }
        if (newValue === 2) {
            fetchOrders();
        }
        if (newValue === 3) {
            fetchOrdersHistory();
        }

    };

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
        
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }))(Tooltip);
    // React.useEffect(() => {
    //     fetchOrders();
    // }, [])
    return (

        <div className={classes.root} >

            <Tabs
                style={{ backgroundColor: "#2b6af5", borderRadius: "15px", color: "white" }}
                orientation="vertical"
                variant="standard"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Supplier info" {...a11yProps(0)} />
                <HtmlTooltip placement="right"
            title={
              <React.Fragment>
                <Typography color="inherit">Add or Edit supplier products </Typography>
    
              </React.Fragment>
            }
          >
                
                    <Tab label="Supplier Products" {...a11yProps(1)} /></HtmlTooltip>
                    <HtmlTooltip placement="right"
            title={
              <React.Fragment>
                <Typography color="inherit">Send supplier an order containing your deficiet products </Typography>
    
              </React.Fragment>
            }
          >
                    <Tab label="Issue Order" {...a11yProps(2)} /></HtmlTooltip>
                    <HtmlTooltip placement="right"
            title={
              <React.Fragment>
                <Typography color="inherit">Review supplier order history </Typography>
    
              </React.Fragment>
            }
          >
                <Tab label="Orders History" {...a11yProps(3)} /></HtmlTooltip>
                {detail ? <Tab label="order details" {...a11yProps(4)} /> : <></>}

            </Tabs>
            <TabPanel value={value} index={0} style={{ width: "80%", hieght: "80%" }}>
                <Card>
                    <CardBody>
                        <Table className="tablesorter">
                            <tbody>

                               <tr><td><Typography>Supplier Name : </Typography> </td><td> {props.supplier.name}  </td>  </tr>  {/**<Input defaultValue={ */}
                               <tr><td><Typography>Supplier Email :</Typography> </td><td> {props.supplier.email}  </td> </tr>  {/**<Input defaultValue={ */}
                               <tr><td><Typography>Supplier Phone :</Typography> </td><td> {props.supplier.phone}  </td> </tr>  {/**<Input defaultValue={ */}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </TabPanel>

            <TabPanel  value={value} index={1} style={{ width: "90%"}}>
                <Card>
                    <CardTitle>ADD/Edit {props.supplier.name} Products</CardTitle>
                    <CardBody>


                        <Table className="tablesorter" style={{overflow:"auto"}}>
                            <thead className="text-primary">

                                <tr>
                                    <th>#Barcode</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Cost</th>
                                    <th>Selling Price</th>
                                    <th>Min.Qty</th>
                                    <th>Max.Qty</th>
                                    <th>Action</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Input type="text" onChange={(e) => { setProduct_id(e.target.value) }} /></td>
                                    <td><Input type="text" onChange={(e) => { setName(e.target.value) }} /></td>
                                    <td><Input type="text" onChange={(e) => { setDescription(e.target.value) }} /></td>
                                    <td><Input type="text" onChange={(e) => { setCost(e.target.value) }} /></td>
                                    <td><Input type="text" onChange={(e) => { setPrice(e.target.value) }} /></td>
                                    <td><Input type="number" onChange={(e) => { setQtyMin(e.target.value) }} /></td>
                                    <td><Input type="number" onChange={(e) => { setQtyMax(e.target.value) }} /></td>
                                    <td><Button color="info" onClick={() => { addProduct(); fetchProducts() }}><i className="tim-icons icon-simple-add"/></Button></td>
                                </tr>
                                {products.map((product) => {

                                    return (

                                        product.products.map((prod) => {
                                            const editing = prod.id !== editId;


                                            const test = () => {
                                                setName(prod.name);
                                                setDescription(prod.description);
                                                setCost(prod.cost);
                                                setPrice(prod.price);
                                                setQtyMin(prod.stock.min_qty);
                                                setQtyMax(prod.stock.max_orderQty);
                                            }




                                            return (
                                                <tr >
                                                    <td>{editing ? prod.barcode : <Input value={prod.barcode} type="text" disabled={true} />}</td>
                                                    <td>{editing ? prod.name : <Input defaultValue={prod.name} type="text" onChange={(e) => { setName(e.target.value) }} />}</td>
                                                    <td>{editing ? prod.description : <Input defaultValue={prod.description} type="text" onChange={(e) => { setDescription(e.target.value) }} />}</td>
                                                    <td>{editing ? prod.cost.toLocaleString() : <Input defaultValue={prod.cost} type="number" onChange={(e) => { setCost(e.target.value) }} />}</td>
                                                    <td>{editing ? prod.price.toLocaleString() : <Input defaultValue={prod.price} type="number" onChange={(e) => { setPrice(e.target.value) }} />}</td>
                                                    <td>{editing ? prod.stock.min_qty : <Input defaultValue={prod.stock.min_qty} type="number" onChange={(e) => { setQtyMin(e.target.value) }} />}</td>
                                                    <td>{editing ? prod.stock.max_orderQty : <Input defaultValue={prod.stock.max_orderQty} type="number" onChange={(e) => { setQtyMax(e.target.value) }} />}</td>
                                                    <td>{editing ? <Button color="warning" onClick={() => { { setEditId(prod.id); test() } }}><i className="tim-icons icon-pencil"/></Button> : <><Button color="info" onClick={() => { { editProduct(editId); setEditId(0); } }}><i className="tim-icons icon-check-2"/></Button> <Button color="danger" onClick={() => { {  setEditId(0); } }}><i className="tim-icons icon-simple-remove"/></Button></>}</td>

                                                </tr>
                                            );
                                        })


                                    );
                                }
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={2} style={{ width: "80%", hieght: "80%" }}>


                {order.length >0 ? <AutoOrder orders={order} supplier={props.supplier} /> : "you have enough qty of products from this supplier"}

            </TabPanel>
            <TabPanel value={value} index={3} style={{ width: "80%", hieght: "80%" }}>

            <Card>
                    <CardBody>


                        <Table className="tablesorter" style={{overflow:"auto"}}>
                            <thead className="text-primary">

                                <tr>
                                    <th>Order ID</th>
                                    <th>Status</th>
                                    <th>Recieved at</th>
                                    <th>Issued at</th>
                                    
                                    
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {orderHistory.map((order) => {
                                    return (
                                        <tr style={{ cursor: 'pointer'}} onClick={() => { fetchOrderContent(order.id); setDetail(true); setValue(4);setRecieved(order.status)}}>
                                            <td>{order.id}</td>
                                            <td>{order.status?"Recieved":"Not recieved yet!!"}</td>
                                            <td>{order.status?moment(order.updated_at).format("LLL"):""}</td>
                                            <td>{moment(order.created_at).format("LLL")}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
             </Card>


</TabPanel>
<TabPanel value={value} index={4} style={{ width: "80%", hieght: "80%" }}>

<Card>
        <CardBody>


            <Table className="tablesorter" style={{overflow:"auto"}}>
                <thead className="text-primary">

                    <tr>
                        <th>Barcode</th>
                        <th>description</th>
                        <th>Qty ordered</th>
                        <th>Qty recieved</th>
                        
                        
                      
                    </tr>
                </thead>
                <tbody>
                    {orderContent.map((order) => {
                        return (
                            <tr>
                                <td>{order.product.barcode}</td>
                                <td>{order.product.description}</td>
                                <td>{order.qty}</td>
                                <td>{recieved?order.recieved!==null?order.recieved.qty:"0":""}</td>
                             
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </CardBody>
 </Card>


</TabPanel>
        </div>

    );
}