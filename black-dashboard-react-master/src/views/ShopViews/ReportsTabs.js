import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from "moment";
import apiClient from "../../services/api";
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
import { Paper } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import DailyData from './DailyData';

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
        backgroundColor: "#252537",
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function ReportsTabs(props) {
  const chart1_2_options = {
    maintainAspectRatio: false,
    onClick: (e, element) => {
      if (element.length > 0) {
        let ind = element[0]._index;
        setMonth(ind + 1);
        // this.setState({ open: true ,ind:ind+1})
        // this.fetchDailyData(ind);
      }
    },
    
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  };

    const classes = useStyles();
    const [value, setValue] = React.useState(0);                    //tab index
    const [debtsFilter, setDebtsFilter] = React.useState([]);       //serching customers
    const [debts, setDebts] = React.useState([]);                   //list of customers with debts
    const [customerDebts, setCustomerDebts] = React.useState([]);   // specific customer unpaid invoices
    const [customerDebts2, setCustomerDebts2] = React.useState([]); //view the remaining debts before saving
    const [graphData, setGraphData] = React.useState([]);
    const [sales, setSales] = React.useState([]);
    const [profits, setProfits] = React.useState([]);
    const [name, setName] = React.useState("");
    const [recieved, setRecieved] = React.useState(0);
  const [bigChartData, setBgChartData] = React.useState("data1");
  const [month, setMonth] = React.useState(0);

 
  

    //get customers with unpaid invoices with total debt
    const fetchGroupedDebts = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getGroupedDebts')
                .then(response => {
                    setDebts(response.data);
                    setDebtsFilter(response.data);
                })
                .catch(error => console.error(error))

        }
    }

    //get customer unpaid invoices
    const fetchCustomerDebts = (name) => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getCustomerDebts', { name: name })
                .then(response => {
                    setCustomerDebts(response.data);
                    setCustomerDebts2(response.data);
                })
                .catch(error => console.error(error))

        }
    }
    const fixGraphData = (data) => {
        let sales = [];
        let profits = [];
        for (var i = 1; i <= 12; i++) {
          let j = 0;
            let sale = 0;
            let profit = 0;
          while (j < data[0].length) {
              if (data[0][j]['month'] == i) {
                 
                sale += data[0][j]['totalSales'];
                profit += data[1][j]['totalProfit'];
            }
            
    
            j++;
          }
    
            sales.push(sale);
            profits.push(profit);
        }
        
        setSales(sales);
        setProfits(profits);
}
    //get sales and profits for the diagrams
    const fetchSales = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/getSales')
                .then((response) => {
                    fixGraphData(response.data);
                    setGraphData(response.data);
                   
                })
                .catch(error => console.error(error))
        }
    }
    
    //save customer debts after recieving a payment
    const savePayment = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/savePayment', { data: customerDebts2 })
                .then((response) => {
                    fetchCustomerDebts(name);
                })
                .catch(error => console.error(error))
        }
    }

    //to switch tabs
    const handleChange = (event, newValue) => {
        setValue(newValue);

        if (newValue === 1) {
            fetchGroupedDebts();
        }
        if (newValue === 2) {
            fetchCustomerDebts(name);
        }
        if (newValue !== 2) {
            setName("");
        }

    };
    //filter customer's debt list 
    const filterResults = (value) => {
        if (value === null) {
            setDebtsFilter(debts);
        } else {
            let filter = debts.filter(debt => debt.customer.toLowerCase().includes(value));
            setDebtsFilter(filter);
        }

    }

    //recalculate customer debts after recieving a payment from him
    const recievePayment = (payment) => {
        let remaining = 0;
        let recievedTemp = payment;
        let temp = [];
      
      if (payment == "") {
        setCustomerDebts2(customerDebts);
        for (let i = customerDebts.length - 1; i >= 0; i--) { 
          remaining += customerDebts[i].total - customerDebts[i].amountRecieved;
        }
       
        setRecieved(-remaining);
      } else {

        for (let i = 0;i<customerDebts2.length; i++) {
                
                if (recievedTemp > 0) {
                    remaining = recievedTemp - (customerDebts[i].total - customerDebts[i].amountRecieved)

                    if (remaining >= 0) {

                        temp.push({
                            id: customerDebts[i].id,
                            total: customerDebts[i].total,
                            amountRecieved: customerDebts[i].total,
                            created_at: customerDebts[i].created_at
                        })


                    } else
                        if (remaining < 0) {

                            temp.push({
                                id: customerDebts[i].id,
                                total: customerDebts[i].total,
                                amountRecieved: customerDebts[i].total + remaining,
                                created_at: customerDebts[i].created_at
                            })


                        }
                    recievedTemp = remaining;

                } else {
                    temp.push({
                        id: customerDebts[i].id,
                        total: customerDebts[i].total,
                        amountRecieved: customerDebts[i].amountRecieved,
                        created_at: customerDebts[i].created_at
                    })
                }
            }

        console.log(temp);
        let change = 0;
        for (let i = 0; i < temp.length; i++) { 
          
          change +=temp[i].total - temp[i].amountRecieved;
          console.log(change,"=",temp[i].total-temp[i].amountRecieved,"i=",i);
            }
        console.log(change);
        if(change===0){change=-remaining}
            setRecieved(-change);    
        
        setCustomerDebts2(temp);
        
      }
      
    }
    React.useEffect(() => {
        fetchSales();
    }, [])

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
                <Tab label="My Sales" {...a11yProps(0)} />
                <Tab label="Debts" {...a11yProps(1)} />
                {name != "" ? <Tab label="Debt Details" {...a11yProps(2)} /> : <></>}



            </Tabs>
            <TabPanel value={value} index={0} style={{ width: "80%", hieght: "80%" }}>
          <DailyData month={month} open={month !== 0} setMonth={(e) => {setMonth(0) }}/>
            <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Sales behaviors</h5>
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
                            active: bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => { setBgChartData("data1"); }}
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
                          onClick={() => { setBgChartData("data2"); }}
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
                  <div className="chart-area">
                    <Line
                      data={{
                        labels: [
                          "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                        ],
                        datasets: [
                          {
                            label: bigChartData === "data1" ? "Sales" : "Profits" ,
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
                            data: bigChartData === "data1" ? sales : profits
                          }
                        ]
                      }
                      }
                      options={chart1_2_options}

                    />

                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>

            </TabPanel>

            <TabPanel value={value} index={1} style={{ width: "90%" }}>

                <Card>

                    <CardHeader>
                        <br />
                        <h3 className="text-center" style={{ fontWeight: "bolder" }}>Customers Debts List</h3>
                        <hr style={{ backgroundColor: "#aebcc2" }} />
                        <Row><Col md="auto">
                            <i className="tim-icons icon-zoom-split" />
                        </Col>
                            <Col>
                                <Input placeholder="search by name" onChange={(e) => { filterResults(e.target.value) }} />
                            </Col></Row>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr className="text-center">
                                    <th>Customer</th>
                                    <th>Debt Value</th>
                                </tr>

                            </thead>
                            <tbody>
                                {debtsFilter.map((debt) => {
                                    return (
                                        <tr className="text-center" onClick={(e) => { setName(debt.customer); setRecieved(-debt.debtValue); fetchCustomerDebts(debt.customer); setValue(2) }}>
                                            <td>{debt.customer}</td>
                                            <td>{debt.debtValue}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

            </TabPanel>

            <TabPanel value={value} index={2} style={{ width: "80%", hieght: "80%" }}>


                <Card>



                    <CardHeader>
                        <h3 className="text-center" style={{ fontWeight: "bold" }}> {name}</h3>
                        <hr style={{ backgroundColor: "#aebcc2" }} />
                        <Row><Col md="auto">
                            <Input
                                placeholder="enter the recieved amount from the customer here"
                                onChange={(e) => { setCustomerDebts2(customerDebts); recievePayment(e.target.value) }}
                            /></Col><Col md="auto">
                                <Button onClick={savePayment}>Save</Button>
                            </Col>
                            <Col>
                                <Paper className="text-center" elevation={3}>
                                    <h4 style={{ color: "black", fontWeight: "bolder" }}> Change <br />
                                        {recieved}
                                    </h4>


                                </Paper></Col></Row>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr className="text-center">
                                    <th>invoice Total</th>
                                    <th>Amount Recieved</th>
                                    <th>Remaining</th>
                                    <th>date</th>
                                </tr>

                            </thead>
                            <tbody>
                                {customerDebts2.map((debt) => {
                                    return (
                                        <tr key={debt.id} className="text-center" >
                                            <td>{debt.total}</td>
                                            <td>{debt.amountRecieved}</td>
                                            <td>{debt.total - debt.amountRecieved}</td>
                                            <td>{moment(debt.created_at).format("LLL")}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </TabPanel>

            {/* <TabPanel value={value} index={2} style={{ width: "80%", hieght: "80%" }}>


            </TabPanel>
            <TabPanel value={value} index={3} style={{ width: "80%", hieght: "80%" }}>


            </TabPanel>
            <TabPanel value={value} index={4} style={{ width: "80%", hieght: "80%" }}>


            </TabPanel> */}
        </div>

    );
}