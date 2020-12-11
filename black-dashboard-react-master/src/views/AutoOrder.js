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

export default function AutoOrder(props) {
    
    const orderList = [];

    const editQty=(barcode,newQty)=>{
        orderList.forEach(element => {
            if (element.barcode === barcode) {
                element.qty = newQty;
                
            }
        });
        console.log(orderList);
    }

    const issueOrder = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/issueOrder', {
                orderList: orderList,
                supplier_id: props.supplier.id,
                supplier_email:props.supplier.email
            })

                .catch(error => console.error(error))

        }
    }

    return (<>
        <Button onClick={() => { issueOrder() }}>Issue Order</Button>
        <Table className="tablesorter" responsive style={{ backgroundColor: "#525f7f" }}>
            <thead className="text-primary">

                <tr>
                    <th>#Barcode</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>U.Cost</th>
                    <th>T.cost</th>
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
                {props.orders.map((order) => {
                    {
                        orderList.push({
                         pId:order.product_id,
                        barcode: order.barcode,
                        description: order.description,
                        qty: order.max_orderQty,
                        cost: order.cost,
                        total: order.cost * order.qty
                    })}
                    
                            return (
                                <tr >
                                    <td>{order.barcode} </td>
                                    <td>{order.description}</td>
                                    <td><Input defaultValue={order.max_orderQty} onChange={(e)=>editQty(order.barcode,e.target.value)}/></td>
                                    <td>{order.cost}</td>
                                    <td>{ order.cost*order.qty }</td>
                                   
                                   
                                </tr>
                            );
                }
                )}


            </tbody>
        </Table>
    </>);
}