'use client';

import { LatLngExpression } from 'leaflet';
import React from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';

const center: LatLngExpression = {
  lat: 37.25323057233323,
  lng: -122.08556629289924,
};

const tileLayer: { attribution: string; url: string } = {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

function SiteMap() {
  return (
    <MapContainer
      center={center}
      zoom={18}
      zoomControl={false}
      scrollWheelZoom
      style={{ height: '75vh', width: '100%', minHeight: '544px' }}
      key={new Date().getTime()}
    >
      <ZoomControl position="bottomright" />
      <TileLayer {...tileLayer} />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Marker with popup">
          <Marker position={center}>
            <Popup>
              Populate the popups here <br /> Add new control overlays for
              different locations
            </Popup>
          </Marker>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default SiteMap;
