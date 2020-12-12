import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Line, Bar } from "react-chartjs-2";
import apiClient from "../services/api";
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
import classNames from "classnames";
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.js";
import { setScrollbarWidth } from 'reactstrap/lib/utils';
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
        backgroundColor: theme.palette.background.paper,
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

    const [Order, setOrder] = React.useState();
    const [editId, setEditId] = React.useState();
    const fetchProducts = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getSupplierProducts', { id: props.supplier.id })
                .then(response => {
                    setProducts(response.data);
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
                max_orderQty:max_orderQty
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
                max_orderQty:max_orderQty
            })

                .catch(error => console.error(error))

        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 1) {
            fetchProducts();
        }
    };

    React.useEffect(() => {
        fetchOrders();
    }, [])
    return (

        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="standard"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Supplier info" {...a11yProps(0)} />
                <Tab label="Supplier Products" {...a11yProps(1)} />
                <Tab label="Supplier Orders" {...a11yProps(2)} />
                {/* <Tab label="Product quantity sold" {...a11yProps(2)} /> */}

            </Tabs>
            <TabPanel value={value} index={0} style={{ width: "80%", hieght: "80%" }}>
                <Input style={{ color: "black" }} value={props.supplier.name} />
                <Input style={{ color: "black" }} value={props.supplier.email} />
                <Input style={{ color: "black" }} value={props.supplier.phone} />
            </TabPanel>

            <TabPanel value={value} index={1} style={{ width: "80%", hieght: "80%" }}>
                <Table className="tablesorter" responsive style={{ backgroundColor: "#525f7f" }}>
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
                            {/* <th className="text-center">Phone</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Input style={{ color: "black" }} type="number" onChange={(e) => { setProduct_id(e.target.value) }} /></td>
                            <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setName(e.target.value) }} /></td>
                            <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setDescription(e.target.value) }} /></td>
                            <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setCost(e.target.value) }} /></td>
                            <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setPrice(e.target.value) }} /></td>
                            <td><Input style={{ color: "black" }} type="number" onChange={(e) => { setQtyMax(e.target.value) }} /></td>
                            <td><Input style={{ color: "black" }} type="number" onChange={(e) => { setQtyMin(e.target.value) }} /></td>
                            <td><Button onClick={() => { addProduct(); fetchProducts() }}>ADD</Button></td>
                        </tr>
                        {products.map((product) => {

                            return (

                                product.products.map((prod) => {
                                    const editing = prod.id !== editId;
                                    
                                    
                                      const test= () => {
                                            setName(prod.name);
                                            setDescription(prod.description);
                                            setCost(prod.cost);
                                            setPrice(prod.price);
                                            setQtyMin(prod.stock.min_qty);
                                            setQtyMax(prod.stock.max_orderQty);
                                       }
                                        
                                       
                                   
                                    
                                    return (
                                        <tr >
                                            <td>{editing ? prod.barcode : <Input value={prod.barcode} style={{ color: "black" }} type="number" disabled={true}/>}</td>
                                            <td>{editing ? prod.name    : <Input defaultValue={prod.name}    style={{ color: "black" }} type="text"   onChange={(e) => { setName(e.target.value) }} />}</td>
                                            <td>{editing ? prod.description : <Input defaultValue={prod.description} style={{ color: "black" }} type="text" onChange={(e) => { setDescription(e.target.value) }} />}</td>
                                            <td>{editing ? prod.cost    : <Input defaultValue={prod.cost}    style={{ color: "black" }} type="number" onChange={(e) => { setCost(e.target.value) }} />}</td>
                                            <td>{editing ? prod.price : <Input defaultValue={prod.price} style={{ color: "black" }} type="number" onChange={(e) => { setPrice(e.target.value) }} />}</td>
                                            <td>{editing ? prod.stock.min_qty    : <Input defaultValue={prod.stock.min_qty}    style={{ color: "black" }} type="number" onChange={(e) => { setQtyMin(e.target.value) }} />}</td>
                                            <td>{editing ? prod.stock.max_orderQty  : <Input defaultValue={prod.stock.max_orderQty }   style={{ color: "black" }} type="number" onChange={(e) => { setQtyMax(e.target.value) }} />}</td>
                                            <td>{editing ? <Button onClick={() => { { setEditId(prod.id); test()} }}>Edit</Button> : <Button onClick={() => { { editProduct(editId); setEditId(0); } }}>submit</Button>}</td>
                                          
                                        </tr>
                                    );
                                })


                            );
                        }
                        )}


                    </tbody>
                </Table>
            </TabPanel>

            <TabPanel value={value} index={2} style={{ width: "80%", hieght: "80%" }}>
            
             
                {Order != [] ? <AutoOrder orders={Order} supplier={props.supplier}/> : <></>}

            </TabPanel>


        </div>
    );
}