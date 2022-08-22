import React from "react";
import GoogleMapReact from 'google-map-react';
import "./Style.css"


//import { Wrapper, Status } from "@googlemaps/react-wrapper";

const Marker = () => <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/0/00/Simpleicons_Places_map-marker-point.svg"></img>;

export default function MusicalMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBA2iTAGD-JE07Uy47l19ZDdUvTY23_T7M" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={10.99835602}
          lng={77.01502627}
        
        />
      </GoogleMapReact>
    </div>
  );
}

