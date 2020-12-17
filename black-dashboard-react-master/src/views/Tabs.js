import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Line, Bar } from "react-chartjs-2";
import apiClient from "../services/api";
import Button1 from '@material-ui/core/Button';
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
import classNames from "classnames";
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.js";
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
        backgroundColor: "dark",
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
    const [sales, setSales] = React.useState();
    const [bigChartData, setBgChartData] = React.useState('data1');
    const [from, setFrom] = React.useState(0);
    const [to, setTo] = React.useState();
    const [products, setProducts] = React.useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fixSales = (data) => {
        let sumArr = [];
        var j = 0;
        for (var i = 1; i <= 12; i++) {

            var fixed = 0;

            if (i == data[j]["month"]) {

                fixed = data[j]["total"]
                if (j + 1 < data.length) {
                    j++;
                }
            }

           
            sumArr.push(fixed);
        }
        setSales(sumArr);
    }
    const fetchSales = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getCustomerSales', { id: props.shopId })
                .then(response => {
                    fixSales(response.data);
                })
                .catch(error => console.error(error))

        }
    }
    const fetchProfits = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getCustomerProfits', { id: props.shopId })
                .then(response => {
                    fixSales(response.data);
                })
                .catch(error => console.error(error))

        }
    }
    const fetchProducts = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getCustomerProducts', {
                id: props.shopId,
                from: from,
                to: to
            })
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => console.error(error))

        }
    }
    React.useEffect(() => {
        fetchSales();
    }, [])
    return (

        <div className={classes.root}>
            <Tabs
                style={{ backgroundColor: "#2b6af5", borderRadius: "15px", color: "white" }}
                orientation="vertical"
                variant="standard"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Sales/Profit" {...a11yProps(0)} />
                <Tab label="Product quantity sold" {...a11yProps(1)} />
                {/* <Tab label="Product quantity sold" {...a11yProps(2)} /> */}

            </Tabs>
            <TabPanel value={value} index={0} style={{ width: "100%", hieght: "80%" }}>
                {/* <Row> */}
                {/* <Col xs="12"> */}
                <Card className="card-chart" >
                    <CardHeader>
                        <Row>
                            <Col className="text-left" sm="6">
                                <h5 className="card-category">Total Sales Per Month</h5>
                                <CardTitle tag="h2">Performance</CardTitle>
                            </Col>
                            <Col sm="6">
                                <ButtonGroup
                                    className="btn-group-toggle float-right"
                                    data-toggle="buttons"
                                >
                                    <Button
                                        tag="label"
                                        className={classNames("btn-simple", {
                                            active:bigChartData === "data1"
                                        })}
                                        color="info"
                                        id="0"
                                        size="sm"
                                       onClick={() => { setBgChartData("data1"); fetchSales() }}
                                    >
                                        <input
                                            defaultChecked
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Sales
                          </span>
                                        <span className="d-block d-sm-none">
                                            <i className="tim-icons icon-single-02" />
                                        </span>
                                    </Button>
                                    <Button
                                        color="info"
                                        id="1"
                                        size="sm"
                                        tag="label"
                                        className={classNames("btn-simple", {
                                            active: bigChartData === "data2"
                                        })}
                                    onClick={() => { setBgChartData("data2"); fetchProfits() }}
                                    >
                                        <input
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Profits
                          </span>
                                        <span className="d-block d-sm-none">
                                            <i className="tim-icons icon-gift-2" />
                                        </span>
                                    </Button>

                                </ButtonGroup>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-area" width="100%">
                            <Line
                                data={{
                                    labels: [
                                        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                                    ],
                                    datasets: [
                                        {
                                            label: "My First dataset",
                                            fill: true,
                                            backgroundColor: "powderblue",
                                            borderColor: "#1f8ef1",
                                            borderWidth: 2,
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            pointBackgroundColor: "#1f8ef1",
                                            pointBorderColor: "rgba(255,255,255,0)",
                                            pointHoverBackgroundColor: "#1f8ef1",
                                            pointBorderWidth: 20,
                                            pointHoverRadius: 4,
                                            pointHoverBorderWidth: 15,
                                            pointRadius: 4,
                                            data: sales
                                        }
                                    ]
                                }
                                }
                                options={chartExample1.options}

                            />

                        </div>

                    </CardBody>
                </Card>
                {/* </Col> */}
                {/* </Row> */}
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: "80%", hieght: "80%" }}>
            <Card className="card-chart">
                    <Row style={{ margin:"1em"}}>
                        <Col>from:<Input value={from} type="date" name="from" onChange={(e) => { setFrom(e.target.value) }}/></Col>
                        <Col>to:<Input value={to} type="date" name="to" onChange={(e) => { setTo(e.target.value)}}/></Col>
                        <Col><br/><Button1 variant="contained" color="primary" onClick={fetchProducts} >show results</Button1></Col>
                    </Row>
                    
                </Card>
                <Card className="card-chart">
               
                    <CardHeader>
                      
                  <h3 className="card-category">products boaught</h3>
                  <CardTitle tag="h4">
{/*                    
                    <p> Selling value: {this.state.stockTotal.saleValue} L.L</p>
                    <p> Cost value: {this.state.stockTotal.costValue} L.L</p> */}

                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={{
                        labels:products.map((data2) => { return data2.name }),
                        datasets: [
                          {
                            label: "Qty",
                            fill: true,
                            backgroundColor: "violete",
                            hoverBackgroundColor: "purple",
                            borderColor: "#d048b6",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data:products.map((data2) => { return data2.qty }),
                          }
                        ]
                      }}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
      </TabPanel>
            

        </div>
    );
}