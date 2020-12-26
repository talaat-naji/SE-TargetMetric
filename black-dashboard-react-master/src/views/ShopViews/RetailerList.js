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
      retailersFilter:[]

    };
   
  }

  fetchRetailers = () => {
    if (sessionStorage.getItem('loggedIn')) {
      apiClient.get('../api/getRetailers')
        .then(response => {
          
          this.setState({ retailers: response.data,retailersFilter: response.data })
         
        })
        .catch(error => console.error(error))

    }
  }
  filterResults = (value) => {
    
    if (value === null) {
      this.setState({ retailersFilter: this.state.retailers });
    } else {
      let filter = this.state.retailers.filter(retailer => retailer.name.toLowerCase().includes(value));

      this.setState({ retailersFilter: filter });
    
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
               
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                  <tr><h3>Retailers</h3></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Input onChange={(e)=>this.filterResults(e.target.value)} type="text" placeholder="search by name"/></td>
                       
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
                        <th>email</th>
                        <th>Governorate</th>
                        <th>District</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.retailersFilter.map(retailer => {
                        
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
