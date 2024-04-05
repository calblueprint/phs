'use client';

import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { fetchSpotlightTours } from '../../../supabase/tours/queries';
import { ExhibitRow, TourRow } from '../../../types/types';
import Control from './Control';
import DisplayPreviewCard from './DisplayPreviewCard';
import { fetchExhibit, fetchAllExhibits } from '../../../supabase/exhibits/queries';

const center: LatLngExpression = {
  lat: 37.587480,
  lng: -122.331010,
};
// have to change fetchSpsotlightTours to tours

const tileLayer: { attribution: string; url: string } = {
  attribution: '',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const defaultMarkerIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g filter="url(#filter0_d_5161_2353)">
  <circle cx="10" cy="10" r="9" fill="#F17373"/>
  <circle cx="10" cy="10" r="8.1" stroke="#FFFDF7" stroke-width="1.8"/>
  </g>
  <defs>
  <filter id="filter0_d_5161_2353" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset/>
  <feGaussianBlur stdDeviation="0.5"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5161_2353"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5161_2353" result="shape"/>
  </filter>
  </defs>
  </svg>
  `,
  className: 'default-icon',
  iconSize: [30, 35],
});

const selectedMarkerIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <g filter="url(#filter0_d_5161_2252)">
  <circle cx="20" cy="20" r="18" fill="#F17373"/>
  <circle cx="20" cy="20" r="16.3" stroke="#F17373" stroke-width="3.4"/>
  </g>
  <circle cx="20" cy="20" r="6" fill="#FFFDF7"/>
  <defs>
  <filter id="filter0_d_5161_2252" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset/>
  <feGaussianBlur stdDeviation="1"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5161_2252"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5161_2252" result="shape"/>
  </filter>
  </defs>
  </svg>
`,
  className: 'selected-icon',
  iconSize: [30, 35],
});
interface SiteMapProps {
  mode: 'tours' | 'exhibits';
}

/**
 * @params mode - will
 * @returns Interactive map based on React Leaflet, holds the markers which lead to exhibits
 */
function SiteMap({ mode }: SiteMapProps) {
  const [spotlightTours, setSpotlightTours] = useState<TourRow[] | ExhibitRow[] | null>(null);
  const [selectedTour, setSelectedTour] = useState<TourRow | ExhibitRow | null>(
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
        let data;
        if (mode === "tours") {
          data = await fetchSpotlightTours();
        } else if (mode === "exhibits") {
          // Assuming you have a similar function to fetch exhibits
          data = await fetchAllExhibits();
        }
        setSpotlightTours(data ?? []);
      } catch (error) {
        throw new Error(`Encountered an error fetching data: ${error}`);
        
      }
    }
    fetchData();
  }, [mode]);

  useEffect(() => {
    if (!selectedTour) {
      setSelectedMarker(null);
    }
  }, [selectedTour]);

  const handleMarkerSelect = (tour: TourRow | ExhibitRow, markerIndex: number) => {
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
