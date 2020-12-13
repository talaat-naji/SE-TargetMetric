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
                retailer_id: props.retailer_id,

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

        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="standard"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Products" {...a11yProps(0)} />
                <Tab label="Ofers" {...a11yProps(1)} />
                {/* <Tab label="Product quantity sold" {...a11yProps(2)} /> */}

            </Tabs>
            <TabPanel value={value} index={0} style={{ width: "80%", hieght: "80%" }}>
                {/* <Input placeholder="search by name/barcode" type="text" onChange={(e) => { fetchProducts(e.target.value) }} /> */}
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col><Button style={{float:"right"}}  //  PREVIOS PAGE
                                            onClick={() =>
                                            {
                                                if (pageNb - 1 >= 1)
                                                { fetchProducts(pageNb - 1); setPageNb(pageNb - 1) }
                                            }
                                            }><i className="tim-icons icon-minimal-left" /></Button></Col>
                                        <Col><span className="title" style={{ float: "center" }}>Products</span><div>Page:{pageNb + "/" + lastPage}</div></Col>
                                        <Col><Button   style={{float:"left"}} //NEXT PAGE
                                            onClick={() => {
                                               
                                                if (pageNb + 1 <= lastPage)
                                                {
                                                    fetchProducts(pageNb + 1); setPageNb(pageNb + 1)
                                                }
                                            }}>
                                            <i className="tim-icons icon-minimal-right" />
                                        </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <Row>
                                        {products.map((prod) => {
                                            // return (
                                            //     product.products.map((prod) => {

                                            return (
                                                        
                                                        <Col
                                                            className="font-icon-list col-xs-6 col-xs-6"
                                                            lg="2"
                                                            md="3"
                                                            sm="4"
                                                        >
                                                            <HtmlTooltip
                                                                title={
                                                                    <React.Fragment>
                                                                        <Typography color="inherit">{prod.description}</Typography>

                                                                    </React.Fragment>
                                                                }
                                                            >
                                                                <div className="font-icon-detail" >
                                                                    <i className="tim-icons icon-alert-circle-exc" />
                                                                    <p>{prod.name}</p>
                                                                    <p>U.price: {prod.price}</p>
                                                                    <ProductOrder product={prod}/>
                                                                </div>
                                                            </HtmlTooltip>
                                                            {/* <ViewProd product={prod} onEditProduct={this.handleEditProduct} /> */}
                                                        </Col>
                                                    );
                                                // }));
                                        })}






                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: "80%", hieght: "80%" }}>
                Comming soon...
              </TabPanel>


        </div>
    );
}