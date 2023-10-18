'use client';

import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import ExhibitPreview from '../ExhibitPreview/ExhibitPreview';
import styles from './siteMap.module.css'

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
      zoom={18}
      zoomControl={false}
      scrollWheelZoom
      // style={styles.MapContainer}
      style={{ height: '75vh', width: '100%', minHeight: '544px',zIndex:'10' }}
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
                lat: (display.coordinates as { lat: number })?.lat ?? 0,
                lng: (display.coordinates as { lng: number })?.lng ?? 0,
              }}
            >
              <Popup >
                {/* <div>
                  <ExhibitPreview
                    name={display.title}
                    location={`${display.coordinates.lat}, ${display.coordinates.lng}`}
                    description={display.description}
                    about='pls work bro'
                    topimage='/Rectangle 12.png'
                    bottomimage='/Rectangle 10.png'
                    href="/hoursAdmissionPage"
                  />
                </div> */}
               
                <ExhibitPreview 
                  
                  display={display}
                  about='pls work'
                  topimage='/Rectangle 12.png'
                  bottomimage='/Rectangle 10.png'
                  href="/hoursAdmissionPage"
                />
                


                {/* {display.title} <br /> {display.description} */}
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
}

export default SiteMap;
