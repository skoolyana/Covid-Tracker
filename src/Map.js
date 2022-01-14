import React from "react";
import './Map.css';

import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./Util";


function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

function Map({countries,casesType, center, zoom}) {

  

  return (
    <div className="map">

        
    
    <LeafletMap  center={center}  zoom={zoom} >
    <ChangeView center={center} zoom={zoom} /> 

    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {showDataOnMap(countries,casesType)}
    </LeafletMap>
    </div>
  );
}

export default Map;
