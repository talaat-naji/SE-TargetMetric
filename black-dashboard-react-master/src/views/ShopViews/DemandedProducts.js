import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductList from "./ProductList"

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Input
} from "reactstrap";
import apiClient from "../../services/api";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#1e1e2e",
        width: 500,
    },
}));

export default function ProductsTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const [barcode, setBarcode] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 1) {
            fetchProducts();
        }
    };

    const handleChangeIndex = (index) => {
        setValue(index);

    };
    const fetchProducts = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('../api/getDemandedProductsInDistrict')
                .then(response => {

                    setProducts(response.data);

                })
                .catch(error => console.error(error))

        }
    }

    return (
        <div className="content">
            <AppBar position="static" color="default">
                <Tabs
                    style={{ backgroundColor: "#2b6af5",  color: "white" }}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab style={{  color: "white" }} label="search a product among all retailers" {...a11yProps(0)} />
                    <Tab style={{  color: "white" }} label="Demanded products @ur district" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProductList barcode={barcode} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Row>
                        <Col md="12">

                            <Card>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead>
                                            <tr>
                                                <th>Barcode</th>
                                                <th>Qty sold (in last 12 Months)</th>
                                                <th>View in Retailers</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map(product => {

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{product.barcode}</td>
                                                                <td>{product.qtySold}</td>
                                                                <td><Button variant="contained" color="info" onClick={(e) => { setBarcode(product.barcode); handleChange(e, 0) }}>Get Product</Button></td>

                                                            </tr>
                                                        </>
                                                    );
                                                })

                                            }

                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </TabPanel>

            </SwipeableViews>
        </div>
    );
}
