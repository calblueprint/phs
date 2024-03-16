'use client';

import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { fetchSpotlightTours } from '../../../supabase/tours/queries';
import { TourRow } from '../../../types/types';
import Control from './Control';
import DisplayPreviewCard from './DisplayPreviewCard';

const center: LatLngExpression = {
  lat: 37.25323057233323,
  lng: -122.08556629289924,
};

const tileLayer: { attribution: string; url: string } = {
  attribution: '',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const defaultMarkerIcon = L.divIcon({
  html: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="35"
      viewBox="0 0 30 35"
      fill="none"
    >
      <circle cx="15" cy="15" r="15" fill="#F17373" />
      <circle cx="15" cy="15" r="12" fill="#FFFDF7" />
      <path d="M15 35L18.5 31.5L24 27H6L11.5 31.5L15 35Z" fill="#F17373" />
    </svg>
  `,
  className: 'default-icon',
  iconSize: [30, 35],
});

const selectedMarkerIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="35" viewBox="0 0 30 35" fill="none">
  <circle cx="15" cy="15" r="15" fill="#F17373"/>
  <circle cx="15" cy="15" r="5" fill="#FFFDF7"/>
  <path d="M15 35L18.5 31.5L24 27H6L11.5 31.5L15 35Z" fill="#F17373"/>
</svg>`,
  className: 'selected-icon',
  iconSize: [30, 35],
});

/**
 * @returns Interactive map based on React Leaflet, holds the markers which lead to exhibits
 */
function SiteMap() {
  const [spotlightTours, setSpotlightTours] = useState<TourRow[] | null>(null);
  const [selectedTour, setSelectedTour] = useState<TourRow | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(center);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  // fetch tours where spotlight == True
  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        const data = await fetchSpotlightTours();
        setSpotlightTours(data);
      } catch (error) {
        throw new Error(`Encountered an error fetching displays: ${error}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedTour) {
      setSelectedMarker(null);
    }
  }, [selectedTour]);

  const handleMarkerSelect = (tour: TourRow, markerIndex: number) => {
    setSelectedTour(tour);
    setSelectedMarker(markerIndex);
    setMapCenter(tour.coordinates as LatLngExpression);
  };

  const handlePreviewClose = () => {
    setSelectedTour(null);
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={10}
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
        {spotlightTours && spotlightTours.map((tour, i) => (
          <Marker
            key={tour.id}
            position={{
              lat: (tour.coordinates as { lat: number })?.lat ?? 0,
              lng: (tour.coordinates as { lng: number })?.lng ?? 0,
            }}
            eventHandlers={{ click: () => handleMarkerSelect(tour, i) }}
            icon={selectedMarker === i ? selectedMarkerIcon : defaultMarkerIcon}
          />
        ))}
        {selectedTour && (
          <Control position="bottomright">
            <DisplayPreviewCard
              tour={selectedTour}
              handleClose={handlePreviewClose}
            />
          </Control>
        )}
      </LayersControl>
    </MapContainer>
  );
}

export default SiteMap;
