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
import Alert from 'reactstrap/lib/Alert';

export default function AutoOrder(props) {
    const [alert, setAlert] = React.useState('');
    const [orderList, setOrderList] = React.useState([]);
    const [max_orderQty, setQtyMax] = React.useState();

    const editQty = (barcode, newQty) => {


        orderList.forEach(element => {
            if (element.barcode === barcode) {
                element.qty = newQty;
                element.total = newQty * element.cost;


            }
        });
        setQtyMax(newQty);

    }

    const issueOrder = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/issueOrder', {
                orderList: orderList,
                supplier_id: props.supplier.id,
                supplier_email: props.supplier.email
            }).then((response) => {

                if (response.status === 200) {

                    setAlert(<Alert onClick={() => { setAlert('') }}>your order was sent succesfully</Alert>)
                } else {
                    setAlert(<Alert className="danger" onClick={() => { setAlert('') }}>Thier was an issue in sending your order</Alert>)
                }
            })

                .catch(error => console.error(error))

        }
    }
    React.useEffect(() => {
        const temp = []
        props.orders.map((order) => {

            // setQtyMax(order.max_orderQty);
            temp.push({
                pId: order.product_id,
                barcode: order.barcode,
                description: order.description,
                qty: order.max_orderQty,
                cost: order.cost,
                total: order.cost * order.max_orderQty
            })

        })

        setOrderList(temp);
    }, [])

    return (<>

        <Card>
            <CardHeader>
                <Row><Col xs="auto">
                    <Button onClick={() => { issueOrder() }}>Issue Order</Button>
                </Col>
                    <Col>
                        {alert}
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                
                <Table className="tablesorter" responsive>
                    <thead className="text-primary">

                        <tr>
                            <th>#Barcode</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>U.Price</th>
                            <th>T.Price</th>
                            {/* <th className="text-center">Phone</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                    <td><Input style={{ color: "black" }} type="number" onChange={(e) => { setProduct_id(e.target.value) }} /></td>
                    <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setName(e.target.value) }} /></td>
                    <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setDescription(e.target.value) }} /></td>
                    <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setCost(e.target.value) }} /></td>
                    <td><Input style={{ color: "black" }} type="text" onChange={(e) => { setPrice(e.target.value) }} /></td>
                    <td><Button onClick={() => { addProduct(); fetchProducts() }}>ADD</Button></td>
                </tr> */}
                        {
                            orderList.map((order) => {


                                return (
                                    <tr >
                                        <td>{order.barcode} </td>
                                        <td>{order.description}</td>
                                        <td><Input defaultValue={order.qty} onChange={(e) => { editQty(order.barcode, e.target.value); }} /></td>
                                        <td>{order.cost}</td>
                                        <td>{order.total}</td>


                                    </tr>
                                );
                            }
                            )}


                    </tbody>
                </Table>
            </CardBody>
        </Card>
    </>);
}