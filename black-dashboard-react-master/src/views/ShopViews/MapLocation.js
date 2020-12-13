// /*!

// =========================================================
// * Black Dashboard React v1.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/black-dashboard-react
// * Copyright 2020 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// // */
import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Map,
  Marker,
  GoogleApiWrapper
} from "react-google-maps";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const MapWrapper = withScriptjs(

  withGoogleMap(props => (
   
    <GoogleMap
     onClick={(e)=>{props.onHandleClick(e)}}
      defaultZoom={10}
      defaultCenter={{ lat: 33.8547, lng: 35.7000 }}
      defaultOptions={{
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8ec3b9"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1a3646"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#64779e"
              }
            ]
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#334e87"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6f9ba5"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3C7680"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#304a7d"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#2c6675"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#9d2a80"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#9d2a80"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#b0d5ce"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#3a4762"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#0e1626"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#4e6d70"
              }
            ]
          }
        ]
      }}
    >
      <Marker position={{ lat: props.x, lng: props.y }} />
    </GoogleMap>
  ))
);

class MapLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 33.858,
      y: 35.7000,
      
    };
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>Google Maps</CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <MapWrapper
                      x={this.state.x}
                      y={this.state.y}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDs98g2t3oMIW-E_tKUf6TWrIf25AP0JCE"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      onHandleClick={(e) => {this.setState({ x: e.latLng.lat(), y: e.latLng.lng() })}}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MapLocation;
// import React, { Component } from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMap} from 'react-google-maps';
// class MapLocation extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       markers: [
//         {
//           title: "The marker`s title will appear as a tooltip.",
//           name: "SOMA",
//           position: { lat: 37.778519, lng: -122.40564 }
//         }
//       ]
//     };
//     this.onClick = this.onClick.bind(this);
//   }

//   onClick(t, map, coord) {
//     const { latLng } = coord;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     this.setState(previousState => {
//       return {
//         markers: [
//           ...previousState.markers,
//           {
//             title: "",
//             name: "",
//             position: { lat, lng }
//           }
//         ]
//       };
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1 className="text-center">My Maps</h1>
//         {/* {console.log(google)} */}
//         <GoogleApiWrapper apiKey="AIzaSyDs98g2t3oMIW-E_tKUf6TWrIf25AP0JCE">
//         <GoogleMap
//           google={this.props.google}
//           style={{ width: "80%", margin: "auto" }}
//           className={"map"}
//           zoom={10}
//           onClick={this.onClick}
//         >
//           {this.state.markers.map((marker, index) => (
//             <Marker
//               key={index}
//               title={marker.title}
//               name={marker.name}
//               position={marker.position}
//             />
//           ))}
//         </GoogleMap>
//         </GoogleApiWrapper>
//       </div>
//     );
//   }
// }
// export default MapLocation;
// // const App = GoogleApiWrapper({
// //   apiKey: ("AIzaSyDs98g2t3oMIW-E_tKUf6TWrIf25AP0JCE")
// // })(MapLocation);

