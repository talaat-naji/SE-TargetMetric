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
import { Button } from "@material-ui/core";
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input
} from "reactstrap";
//import Alert from "reactstrap/lib/Alert";
import apiClient from "../../services/api";
import RetailerRow from "./RetailerRow";
import ProductOrder from "./ProductOrder";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      products: [],
      sortedProducts: [],
      sortWay:"dsc",

    };

  }

  fetchProducts = (value) => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.post('../api/getProductsByBarcode',{barcode:value})
        .then(response => {

          this.setState({ products: response.data,sortedProducts: response.data })
         
        })
        .catch(error => console.error(error))

    }
  }
  sortResults = () => {

    if (this.state.sortWay === "dsc") {
      let filter = this.state.products.sort((a, b) => a.price > b.price ? 1 : -1);
      this.setState({ sortedProducts: filter,sortWay:"asc" });

    } else {
      let filter = this.state.products.sort((a, b) => a.price < b.price ? 1 : -1);

      this.setState({ sortedProducts: filter,sortWay:"dsc" });

    }
  }
  componentDidMount() {
    if (this.props.barcode != 0) {
      this.fetchProducts(this.props.barcode);
    }
  }
  render() {

    return (
      <>
        {/* <div className="content"> */}
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>

                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr><h3>Products</h3></tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>
                      <Row>
                      <Col xs="auto">
                        
                          <i className="tim-icons icon-zoom-split" />
                         
                        </Col>
                        <Col>
                            <Input autoFocus={true} onChange={(e) => this.fetchProducts(e.target.value)} type="text" placeholder="search product by barcode" />
                            
                        </Col>
                        </Row>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>description</th>
                        <th>Retailer</th>
                        <th onClick={this.sortResults}>price <i  className={this.state.sortWay=="dsc"?"tim-icons icon-minimal-down bold":"tim-icons icon-minimal-up"}/></th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.sortedProducts.map(product => {

                          return (
                            <>
                              <tr>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.retailer.name}</td>
                                <td>{product.price}</td>
                                <td><ProductOrder product={product} retailer_id={product.retailer.id}/></td>

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
        {/* </div> */}
      </>
    );
  }
}

export default ProductList;
