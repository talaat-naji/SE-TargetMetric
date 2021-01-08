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
import React from "react";
import apiClient from "../services/api";
import ViewProd from "./EditProd";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      products:[]
    };
  }
  fetchProducts = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.get('../api/myProducts')
          .then(response => {
              this.setState({ products: response.data })
          })
          .catch(error => console.error(error))

    }
    
  }
  
  componentDidMount() {
    this.fetchProducts();
    
  }
  handleEditProduct = () => {
    this.fetchProducts();
  }
  render() {
   
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">My Products</h5>
                 
                </CardHeader>
                <CardBody className="all-icons">
                  
                    {this.state.products.map((product) => {
                      return (
                        // product.products.map((prod) => {
                        
                        //   return (
                        //     <Col
                        //       className="font-icon-list"
                        //       lg="4.5"
                        //       md="6"
                        //       sm="9"
                        // >
                          
                             <>
                              <ViewProd onImageUpdate={this.handleEditProduct} product={product} onEditProduct={this.handleEditProduct} />
                        
                          </>
                          );
                        // }));
                    })}
                   
                     
                   
                    
                   
                  
                 
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Products;
