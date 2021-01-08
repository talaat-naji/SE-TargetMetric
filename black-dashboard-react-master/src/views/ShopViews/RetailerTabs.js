import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import apiClient from "../../services/api";
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
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function RetailerTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // const [sales, setSales] = React.useState();
    // const [bigChartData, setBgChartData] = React.useState('data1');
    const [lastPage, setLastPage] = React.useState();
    const [pageNb, setPageNb] = React.useState(1);
    const [products, setProducts] = React.useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
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


    const fetchProducts = (nb) => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getRetailerProducts?page=' + nb, {
                retailer_id: props.retailer.id,

            })
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
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card responsive>
                        <CardHeader>
                            <Row>
                                {/* <Col><Button style={{ float: "right" }}  //  PREVIOS PAGE
                                            onClick={() => {
                                                if (pageNb - 1 >= 1) { fetchProducts(pageNb - 1); setPageNb(pageNb - 1) }
                                            }
                                            }><i className="tim-icons icon-minimal-left" /></Button></Col> */}
                                <Col><span className="title" style={{ float: "center" }}>Products</span><div>Page: {pageNb + " / " + lastPage}</div></Col>
                                {/* <Col><Button style={{ float: "left" }} //NEXT PAGE
                                            onClick={() => {

                                                if (pageNb + 1 <= lastPage) {
                                                    fetchProducts(pageNb + 1); setPageNb(pageNb + 1)
                                                }
                                            }}>
                                            <i className="tim-icons icon-minimal-right" />
                                        </Button>
                                        </Col> */}
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
                                                    src={prod.pic_path} /> : <CardImg
                                                        top style={{ width: "100%", height: "40%" }}
                                                        src="/img/095333-unnamed.png" />}

                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardHeader tag="h4">
                                                    {prod.name}
                                                </CardHeader>
                                                <CardBody>
                                                    <Row>

                                                        <Col>
                                                            <p>Price: {prod.price}</p>
                                                            <Typography color="inherit">{prod.description}</Typography>
                                                        </Col>
                                                        <Col>
                                                            <ProductOrder product={prod} retailer_id={props.retailer.id} />
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
                                <Col><Button color="info" style={{ float: "right" }}  //  PREVIOS PAGE
                                    onClick={() => {
                                        if (pageNb - 1 >= 1) { fetchProducts(pageNb - 1); setPageNb(pageNb - 1) }
                                    }
                                    }><i className="tim-icons icon-minimal-left" /></Button></Col>
                                <Col><span className="title" style={{ marginLeft: "43%" }}>Products</span><div style={{ color: "#c2d0d4", marginLeft: "43%" }}>Page: {pageNb + " / " + lastPage}</div></Col>
                                <Col><Button color="info" style={{ float: "left" }} //NEXT PAGE
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