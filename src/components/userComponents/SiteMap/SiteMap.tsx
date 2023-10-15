'use client';

import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import { fetchDisplays } from '../../../supabase/displays/queries';
import { DisplayRow } from '../../../types/types';

const center: LatLngExpression = {
  lat: 37.25323057233323,
  lng: -122.08556629289924,
};

const tileLayer: { attribution: string; url: string } = {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

/**
 * @returns Interactive map based on React Leaflet, holds the markers which lead to exhibits
 */
function SiteMap() {
  const [displays, setDisplays] = useState<DisplayRow[]>([]);

  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        const data = await fetchDisplays();
        setDisplays(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Displays in useEffect:', displays);
  }, [displays]);
  return (
    <MapContainer
      center={center}
      zoom={6}
      zoomControl={false}
      scrollWheelZoom
      style={{ height: '75vh', width: '100%', minHeight: '544px' }}
      key={new Date().getTime()}
    >
      <ZoomControl position="bottomright" />
      <TileLayer {...tileLayer} />
      <LayersControl position="topright">
        {displays.map(display => (
          <LayersControl.Overlay key={display.id} name={display.title}>
            <Marker
              key={display.id}
              position={{
                // lat: (display.coordinates as { lat: number })?.lat ?? 0,
                // lng: (display.coordinates as { lng: number })?.lng ?? 0,
                lat: display.coordinates.lat,
                lng: display.coordinates.lng,
              }}
            >
              <Popup>
                {display.title} <br /> {display.description}
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
}

export default SiteMap;
