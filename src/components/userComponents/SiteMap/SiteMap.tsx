'use client';

import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, Marker } from 'react-leaflet';

import { fetchDisplays } from '../../../supabase/displays/queries';
import { DisplayRow } from '../../../types/types';
import DisplayPreviewCard from '../../DisplayPreviewCard';
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

/**
 * @returns Interactive map based on React Leaflet, holds the markers which lead to exhibits
 */
function SiteMap() {
  const [displays, setDisplays] = useState<DisplayRow[]>([]);
  const [selectedDisplay, setSelectedDisplay] = useState<DisplayRow | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(center);

  useEffect(() => {
    /**
     * Fetches display data from db
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
  }, []);

  const handleMarkerSelect = (display: DisplayRow) => {
    setSelectedDisplay(display);
    setMapCenter(display.coordinates as LatLngExpression);
  };

  const handlePreviewClose = () => {
    setSelectedDisplay(null);
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={18}
      zoomControl={false}
      scrollWheelZoom
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
            <DisplayPreviewCard
              display={selectedDisplay}
              handleClose={handlePreviewClose}
            />
          </Control>
        )}
      </LayersControl>
    </MapContainer>
  );
}

export default SiteMap;
