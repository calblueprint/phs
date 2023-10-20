'use client';

import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import ExhibitPreview from '../ExhibitPreview/ExhibitPreview';
import styles from './siteMap.module.css'
import Image from 'next/image'

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
import Link from 'next/link';

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
  const [showExhibit, setShowExhibit] = useState(false);


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
              // eventHandlers={{click: () =>  
              //   setShowExhibit(true)
              // }}
            >
              {/* { showExhibit && <ExhibitPreview 
                  
                  display={display}
                  about='pls work'
                  topimage='/Rectangle 12.png'
                  bottomimage='/Rectangle 10.png'
                  href="/hoursAdmissionPage"
                  isOpen1={setShowExhibit}
                />} */}
              <Popup offset={[0, -30]}>
                {/* <div>
                  <ExhibitPreview
                    name={display.title}
                   {} location={`${display.coordinates.lat}, ${display.coordinates.lng}`}
                    description={display.description}
                    about='pls work bro'
                    topimage='/Rectangle 12.png'
                    bottomimage='/Rectangle 10.png'
                    href="/hoursAdmissionPage"
                  />
                </div> */}
               
                {/* <ExhibitPreview 
                  
                  display={display}
                  about='pls work'
                  topimage='/Rectangle 12.png'
                  bottomimage='/Rectangle 10.png'
                  href="/hoursAdmissionPage"
                /> */}
                


                {/* {display.title} <br /> {display.description} */}

                <div className={styles.roundedbackground}>
                <div className={styles.buttonbox}>
           
                </div>

                <div className={styles.rectangle}>
                  <div className={styles.titlebox}>
                    <h1 className={styles.titletext}>{display.title}</h1>
                  </div>

                  <div className={styles.locationbox}>
                    <p className={styles.locationtext}>{`${display.coordinates.lat}, ${display.coordinates.lng}`}</p>
                  </div>

                  <div className={styles.descriptionbox}>
                    <p className={styles.descriptiontext}>{display.description}</p>
                  </div>

                  <div className={styles.aboutbox}>
                    <h1 className={styles.abouttext}>about</h1>
                  </div>

                  <Link href='/hoursAdmissionPage'>
                    <div className={styles.picturebox}>
                      <Image
                        src={'/Rectangle 10.png'}
                        alt="exhibit display"
                        width={10}
                        height={10}
                        priority
                      />
                    </div>
                  </Link>
                </div>

                <div className={styles.topimagebox}>
                  <Image
                    src={'/Rectangle 12.png'}
                    alt="exhibit display"
                    width={10}
                    height={10}
                    priority
                  />
                </div>
              </div>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
}

export default SiteMap;
