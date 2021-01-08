/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import { Button } from "@material-ui/core";
import React from "react";
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input
} from "reactstrap";

import apiClient from "../services/api";
class RecieveOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      supplierName: "",
      supplier_id: 0,
      supplier_email: 0,
      order_id: 0,
      orderState: false,
      orderList: [],

    };
    this.products = [];
    this.sum = 0;
    
  }
  notify = place => {
   
    // var color = Math.floor(Math.random() * 5 + 1);
    var type= "success";
   
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
           Invoice was sent succesfully to the supplier
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  fetchSupplier = (id) => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/getSupplierById', { supplier_id: id })
        .then(response => {
          //  console.log(response.data);
          this.setState({ supplierName: "supplier not found" });
          if (response !== null) {
            this.setState({
              supplierName: response.data[0].name,
              supplier_id: response.data[0].id,
              supplier_email: response.data[0].email
            })
          }

        })
        .catch(error => console.error(error))

    }

  }
  fetchOrder = (id) => {
    if (sessionStorage.getItem('loggedIn')) {

      apiClient.post('../api/getOrderById', {
        supplier_id: this.state.supplier_id,
        order_id: id
      })
        .then((response) => {

          this.sum = 0;
          this.products = [];

          this.setState({
            orderList: [],
            order_id: id,
            OrderState: false
          });

          if (response.data.id !== null) {

            this.setState({ OrderState: true });

            response.data.map((order) => {

              this.sum += order.product.cost * order.qty;

              this.products.push({
                pId: order.product.id,
                barcode: order.product.barcode,
                description: order.product.description,
                qty: order.qty,
                qtyRecieved: order.qty,
                cost: order.product.cost,
                total: order.product.cost * order.qty
              });
            });
            this.setState({ orderList: this.products })
          }

        })
        .catch(error => console.error(error))

    }

  }
  editQty = (barcode, newValue) => {
    this.sum = 0;
    this.products.forEach(element => {
      if (element.barcode === barcode) {
        if (element.qty >= newValue) {
          element.qtyRecieved = newValue;
          element.total = element.cost * newValue;
        }
      }
      this.sum += element.total;
    });
    console.log(this.products);
    this.setState({ orderList: this.products });
  }
  sendInvoice = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/sendInvoice', {
        invoice: this.state.orderList,
        sum: this.sum,
        order_id: this.state.order_id,
        supplier_id: this.state.supplier_id,
        supplier_email: this.state.supplier_email,
      })
        .then(response => {
          if (response.status === 200) {
            this.notify("br")
          }
          if (response) {
            this.sum = 0;
            this.products = [];
            this.setState({
              orderList: [],
              order_id: 0,
              OrderState: false

            });
            
          }
        }).catch(error => console.error(error))
    }
  }
  render() {

    return (
      <>
        <div className="content">
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  {/* <CardTitle tag="h4">Simple Table</CardTitle> */}
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" >
                    <thead className="text-primary">
                      <tr>
                        <th colSpan="3" className="text-center"><h3>RECIEVE PRODUCTS</h3></th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Supplier ID:</td>
                        <td><Input type="number" onChange={(e) => { this.fetchSupplier(e.target.value) }} /></td>
                        <td>{this.state.supplierName}</td>
                      </tr>
                      <tr>
                        <td>Order ID:</td>
                        <td><Input type="number" onChange={(e) => { this.fetchOrder(e.target.value) }} /></td>
                        <td>{this.state.OrderState ? "order found" : ""}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Table className="tablesorter">
                    <thead>
                      <tr>
                        <td>Barcode</td>
                        <td>Description</td>
                        <td>Qty Ordered</td>
                        <td>Qty Recieved</td>
                        <td>U.price</td>
                        <td>Tot.Price</td>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {this.products.forEach(order => {console.log(order,"order") })} */}
                      {
                        this.state.OrderState ?
                          //console.log(this.products)
                          this.state.orderList.map(order => {
                            console.log(order, order.barcode, "kiiii");
                            return (
                              <tr>
                                <td>{order.barcode}</td>
                                <td>{order.description}</td>
                                <td>{order.qty}</td>
                                <td><Input defaultValue={order.qtyRecieved} type='number' onChange={(e) => { if (e.target.value > order.qty) { e.target.value = order.qty; alert("Qty recieved cant exeed qty ordered") } this.editQty(order.barcode, e.target.value); }}></Input></td>
                                <td>{order.cost}</td>
                                <td>{order.total}</td>

                              </tr>)


                          }) :
                          <tr><td colSpan="6" className="text-center">enter a valid Purchase Order Id</td></tr>

                      }
                      {this.state.OrderState ? <>
                        <tr>
                          <td colSpan="5" className="text-right">total</td>
                          <td >{this.sum}</td>
                        </tr>
                        <tr>
                          <td colSpan="6" className="text-center"><Button color="info" onClick={this.sendInvoice}>RECIECVE</Button></td>

                        </tr></> : <></>}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default RecieveOrder;
