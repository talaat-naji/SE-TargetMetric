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
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [debtsFilter, setDebtsFilter] = React.useState([]);
    const [debts, setDebts] = React.useState([]);
    const [customerDebts, setCustomerDebts] = React.useState([]);
    const [customerDebts2, setCustomerDebts2] = React.useState([]);
    const [sales, setSales] = React.useState([]);
    const [name, setName] = React.useState("");
    const [recieved, setRecieved] = React.useState(0);

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

    const fetchSales = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/getSales')
                .then((response) => {

                    setSales(response.data)

                })
                .catch(error => console.error(error))
        }
    }
    const savePayment = () => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/savePayment',{data:customerDebts2})
                .then((response) => {
                    fetchCustomerDebts(name);
                })
                .catch(error => console.error(error))
        }
    }


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
    const filterResults = (value) => {
        if (value === null) {
            setDebtsFilter(debts);
        } else {
            let filter = debts.filter(debt => debt.customer.toLowerCase().includes(value));
            setDebtsFilter(filter);
        }

    }
    React.useEffect(() => {
        fetchSales();
    }, [])

    const recievePayment = (payment) => {
        let remaining = 0;
        let recievedTemp = payment;
        let temp = [];

        if (payment == null) { setCustomerDebts2(customerDebts); setRecieved(payment) } else {

            for (let i = customerDebts2.length - 1; i >= 0; i--) {
                console.log(recievedTemp, "recieved");
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
            
            setRecieved(remaining);
            setCustomerDebts2(temp);
            
        }
    }
  
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

            </TabPanel>

            <TabPanel value={value} index={1} style={{ width: "90%" }}>

                <Card>
                   
                    <CardHeader>
                    <br/>
                        <h3 className="text-center" style={{fontWeight:"bolder"}}>Customers Debts List</h3>
                        <hr style={{ backgroundColor: "#aebcc2" }} />
                        <Row><Col md="auto">
                        <i className="tim-icons icon-zoom-split"/>
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
                        <h3 className="text-center" style={{fontWeight:"bold"}}> {name}</h3>
                        <hr style={{backgroundColor:"#aebcc2"}}/>
                        <Row><Col md="auto">
                            <Input
                                placeholder="enter the recieved amount from the customer here"
                                onChange={(e) => { setCustomerDebts2(customerDebts); recievePayment(e.target.value) }}
                            /></Col><Col md="auto">
                                <Button onClick={savePayment}>Save</Button>
                            </Col>
                            <Col>
                                <Paper className="text-center" elevation={3}>
                              <h4 style={{color:"black",fontWeight:"bolder" }}> Change <br />
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