'use client';

import { LatLngExpression } from 'leaflet';
import React, { useEffect, useMemo, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
} from 'react-leaflet';

import { fetchDisplays } from '../../../supabase/displays/queries';
import { DisplayRow } from '../../../types/types';
import DisplayPreviewCard from '../../DisplayPreviewCard';
import { fetchMockDisplays, getMockDisplay } from '../../../app/utils/mockData';
import Control from './Control';

const center: LatLngExpression = {
  lat: 37.25323057233323,
  lng: -122.08556629289924,
};

const tileLayer: { attribution: string; url: string } = {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

// interface SiteMapProps {
//   handleMarkerSelect: (display: DisplayRow) => void;
// }

/**
 * @returns Interactive map based on React Leaflet, holds the markers which lead to exhibits
 */
function SiteMap() {
  const [displays, setDisplays] = useState<DisplayRow[]>([]);
  const [selectedDisplay, setSelectedDisplay] = useState<DisplayRow | null>(
    null,
  );
  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        // const data = await fetchDisplays();
        const data = fetchMockDisplays(5);
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
  }, []);

  const handleMarkerSelect = (display: DisplayRow) => {
    setSelectedDisplay(display);
  };

  // const map = useMemo(() => first
  // , [displays])
  const handlePreviewClose = () => {
    setSelectedDisplay(null);
  }

  

  return (
    <MapContainer
        center={center}
        zoom={18}
        zoomControl={false}
        scrollWheelZoom
        // style={styles.MapContainer}
        style={{
          height: '75vh',
          width: '100%',
          minHeight: '544px',
          zIndex: '10',
        }}
        key={new Date().getTime()}
      >
        <TileLayer {...tileLayer} />
        <LayersControl position="topright">
          {displays.map(display => (
              <Marker
                key={display.id}
                position={{
                  lat: (display.coordinates as { lat: number })?.lat ?? 0,
                  lng: (display.coordinates as { lng: number })?.lng ?? 0,
                }}
                eventHandlers={{ click: () => handleMarkerSelect(display) }}
              />
          ))}
        {selectedDisplay && (
          <Control position="bottomleft">
            <DisplayPreviewCard display={selectedDisplay} handleClose={handlePreviewClose}/>
          </Control>
        )}
        </LayersControl>
      </MapContainer>
  );
}

export default SiteMap;
