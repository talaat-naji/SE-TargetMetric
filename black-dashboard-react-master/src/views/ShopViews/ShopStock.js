import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import apiClient from "../../services/api";
import { TextField } from "@material-ui/core";
import {
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

import Tooltip from '@material-ui/core/Tooltip';

import ProductOrder from "./ProductOrder";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { setScrollbarWidth } from 'reactstrap/lib/utils';
import CardImg from 'reactstrap/lib/CardImg';
import CardFooter from 'reactstrap/lib/CardFooter';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    text: {
        fontWeight: "bold",
        fontFamily: "timesNewRoman",
        fontSize: "18px",

    },
    textField: {
        fontWeight: "bold",
        fontFamily: "timesNewRoman",
        fontSize: "16px",
        color: "#cfc99e"
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function ShopStock(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // const [sales, setSales] = React.useState();
    // const [bigChartData, setBgChartData] = React.useState('data1');
    const [lastPage, setLastPage] = React.useState();
    const [pageNb, setPageNb] = React.useState(1);
    const [products, setProducts] = React.useState([]);

    const [cost, setCost] = React.useState(0); //invoice total
    const [price, setPrice] = React.useState(0);
    const [barcode, setbarcode] = React.useState(0);
    const [qty, setQty] = React.useState(0);
    const [description, setDescription] = React.useState("");



    const fetchProducts = (nb) => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getShopProducts?page=' + nb)
                .then(response => {
                    setProducts(response.data.data);
                    setLastPage(response.data.last_page)
                })
                .catch(error => console.error(error))

        }
    }
    React.useEffect(() => {
        fetchProducts(pageNb);
    }, [])

    const addToStock = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/addToStock', {
                barcode: barcode,
                cost: cost,
                price: price,
                description: description,
                qty: qty,
            })
                .catch(error => console.error(error))
        }
    }
    return (
        <div className="content">
            <Row><Col>
                <TextField
                    InputProps={{ className: classes.textField }}
                    InputLabelProps={{ className: classes.textField }}
                    label="barcode"
                    onChange={(e) => setbarcode(e.target.value)}
                />
                <TextField
                    InputProps={{ className: classes.textField }}
                    InputLabelProps={{ className: classes.textField }}
                    label="cost"
                    onChange={(e) => setCost(e.target.value)}
                />
                <TextField
                    InputProps={{ className: classes.textField }}
                    InputLabelProps={{ className: classes.textField }}
                    label="price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    InputProps={{ className: classes.textField }}
                    InputLabelProps={{ className: classes.textField }}
                    label="qty"
                    onChange={(e) => setQty(e.target.value)}
                />
                <TextField
                    InputProps={{ className: classes.textField }}
                    InputLabelProps={{ className: classes.textField }}
                    label="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={addToStock} color="info">add</Button>
            </Col>
            </Row>
            <Row>

                <Col md="12">
                    <Card responsive>
                        <CardHeader>

                            <Row>

                                <Col><span className="title" style={{ float: "center" }}>Products</span><div>Page: {pageNb + " / " + lastPage}</div></Col>

                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">

                            {products.map((prod) => {


                                return (
                                    <Row>

                                        <Col
                                            className="font-icon-list col-xs-auto col-xs-auto"
                                            lg="2"
                                            md="5"
                                            sm="6"
                                        >
                                            <Card>
                                                {prod.pic_path != "" ? <CardImg
                                                    top style={{ width: "100%", height: "40%" }}
                                                    src="/img/095333-unnamed.png" /> : <CardImg
                                                        top style={{ width: "100%", height: "40%" }}
                                                        src="/img/095333-unnamed.png" />}

                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardHeader tag="h4">
                                                    <Typography color="inherit">{prod.description}({prod.barcode})</Typography>

                                                </CardHeader>
                                                <CardBody className={classes.text}>
                                                    <Row>

                                                        <Col >
                                                            <p>Price: {prod.price}</p><br />
                                                            <p>Cost: {prod.cost}</p>

                                                        </Col>
                                                        <Col>
                                                            <p>Qty: {prod.qty}  </p>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                            {/* </div> */}

                                        </Col>

                                    </Row>
                                );

                            })}







                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col><Button style={{ float: "right" }}  //  PREVIOS PAGE
                                    onClick={() => {
                                        if (pageNb - 1 >= 1) { fetchProducts(pageNb - 1); setPageNb(pageNb - 1) }
                                    }
                                    }><i className="tim-icons icon-minimal-left" /></Button></Col>
                                <Col><span className="title" style={{ color: "#c2d0d4", marginLeft: "43%" }}>Products</span><div style={{ color: "#c2d0d4", marginLeft: "43%" }}>Page: {pageNb + " / " + lastPage}</div></Col>
                                <Col><Button style={{ float: "left" }} //NEXT PAGE
                                    onClick={() => {

                                        if (pageNb + 1 <= lastPage) {
                                            fetchProducts(pageNb + 1); setPageNb(pageNb + 1)
                                        }
                                    }}>
                                    <i className="tim-icons icon-minimal-right" />
                                </Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
        /* </TabPanel> */
        /* <TabPanel value={value} index={1} style={{ width: "80%", hieght: "80%" }}>
            Comming soon...
          </TabPanel> */



    );
}