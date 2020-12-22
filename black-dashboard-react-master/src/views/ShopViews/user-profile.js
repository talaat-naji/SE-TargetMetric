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
import Select from 'react-select';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from "../../services/api"
class ShopUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Governorate: [],
            Districts: [],
            districtId: 0,
            govId: 0,
            name: '',
            email: '',
            town: "",
            profile: "",
            open:false,

        };
    }
    handleClickOpen = () => {
        this.setState({ open: true });
       console.log("hiii");
   };
   
    handleClose = () => {
     this.setState({ open: false });
      // setName(null);
      // setDeadline(null);
   };
    handleSubmit = () => {
     this.setState({ open: false });
      this.changeProfile();
     
   
   };
     changeProfile = () => {
       const fd = new FormData();
       fd.append('image', this.state.profile);
         if (sessionStorage.getItem('loggedIn')) {
           apiClient.post('/api/editProfilePic', fd)
             .then(()=>{this.fetchUserInfo()})
             .catch(error => console.error(error)
                     )
   
         }
     }
    fetchGovernorates = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('../api/getGovernorate')
                .then(response => {
                    this.setState({ Governorate: response.data });
                })
                .catch(error => console.error(error))

        }
    }
    fetchDistricts = (govId) => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/getDistrict', { GovernorateId: govId })
                .then(response => {
                    this.setState({ Districts: response.data});
                })
                .catch(error => console.error(error))

        }
    }
    fetchUserInfo = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('../api/getProfile')
                .then(response => {
                    //console.log(response.data,"i am here")
                    this.setState({
                        name: response.data[0].name,
                        districtId: response.data[0].districtId,
                        govId: response.data[0].govId,
                        email: response.data[0].email,
                        town: response.data[0].town,
                        profile:response.data[0].profile_url,
                    });
                    this.fetchDistricts(response.data[0].govId);
                })
                .catch(error => console.error(error))

        }
    }
    componentDidMount() {
        this.fetchGovernorates();
        this.fetchUserInfo();

    }
    handleChangeGov = (govId) => {
        this.setState({ govId: govId })
        this.fetchDistricts(govId)
    }
    submitData = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('../api/updateRetailerProfile', {
                GovernorateId: this.state.govId,
                districtId: this.state.districtId,
                name: this.state.name,
                town: this.state.town,
                email: this.state.email
                
            })
                .then(response => {
                    // this.setState({ Districts: response.data });
                })
                .catch(error => console.error(error))

        }
    }
    render() {

        return (
            <>
                <div className="content">
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
              <Input type="file" onChange={(e) => { this.setState({ profile: e.target.files[0] })}}/>
                
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Upload image
          </Button>
        </DialogActions>
      </Dialog> 
                    <Row>
                        <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Edit Profile</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>

                                        <Col className="px-md-1" md="3">
                                            <FormGroup>
                                                <label>Name</label>
                                                <Input
                                                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                    defaultValue={this.state.name}
                                                    placeholder="Name"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                          </label>
                                                <Input
                                                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                                                    defaultValue={this.state.email}
                                                    placeholder='Email'
                                                    type="email" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Governorate</label>
                                                <select value={this.state.govId} onChange={(e) => { this.setState({ districtId: "undefined"});this.handleChangeGov(e.target.value); }}>
                                                    {this.state.Governorate.map((governorate) => {
                                                        return (
                                                            <option value={governorate.value}>{governorate.label}</option>
                                                        );
                                                    })}
                                                </select>
                                                {/* <Select defaultValue={{ value: this.state.govId }} options={this.state.Governorate} onChange={(e) => { this.handleChangeGov(e.value); this.setState({ districtId: null }) }} /> */}
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="4">
                                            <FormGroup>
                                                <label>District</label>

                                                <select value={this.state.districtId} onChange={(e) => {this.setState({ districtId: e.target.value }) }}>
                                                    <option value={"undefined"}>choose district</option>
                                                    {this.state.Districts.map((district) => {
                                                       
                                                        return (
                                                            <option value={district.value}>{district.label}</option>
                                                        );
                                                    })}
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label>Town Name</label>
                                                <Input
                                                    onChange={(e) => { this.setState({ town: e.target.value }) }}
                                                    defaultValue={this.state.town}
                                                    placeholder="Town"
                                                    type="text" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="8">
                                            <FormGroup>
                                                <label>About Me</label>
                                                <Input
                                                    cols="80"
                                                    defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                                                    placeholder="Here can be your description"
                                                    rows="4"
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    onClick={(e) => { this.submitData() }}
                                    className="btn-fill"
                                    color="primary"
                                    type="submit">
                                    Save
                  </Button>
                            </CardFooter>
                        </Card>
                        </Col>
                        <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img
                                                onClick={this.handleClickOpen}
                        alt="..."
                        className="avatar"
                        src={this.state.profile}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default ShopUserProfile;
