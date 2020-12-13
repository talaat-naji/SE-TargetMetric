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
class RetailersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      retailers: [],

    };
   
  }

  fetchRetailers = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.get('../api/getRetailers')
        .then(response => {
          
          this.setState({ retailers: response.data })
         
        })
        .catch(error => console.error(error))

    }
  }
  componentDidMount() {
    this.fetchRetailers();
 }
  render() {

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  {/* <CardTitle tag="h4">Simple Table</CardTitle> */}
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                  <tr>View Retailers</tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Input type="text" placeholder="search by name" /></td>
                        <td><Input type="text" placeholder="search by somthing else"/></td>
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
                        <td>Name</td>
                        <td>email</td>
                        <td>Governorate</td>
                        <td>District</td>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.retailers.map(retailer => {
                          return (
                            <>
                           
                            <RetailerRow retailer={retailer} />
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
        </div>
      </>
    );
  }
}

export default RetailersList;
