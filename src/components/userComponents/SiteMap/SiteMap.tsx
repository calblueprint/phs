'use client';

import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { fetchSpotlightTours } from '../../../supabase/tours/queries';
import { ExhibitRow, TourRow } from '../../../types/types';
import Control from './Control';
import DisplayPreviewCard from './DisplayPreviewCard';
import { fetchExhibit, fetchAllExhibits } from '../../../supabase/exhibits/queries';
import { getCategoryColor1 } from '../../../supabase/category/queries';
import RecenterMap from './MapInteractionHandler';
import TourPreviewCard from './TourPreviewCard';
import ExhibitPreviewCard from './ExhibitPreviewCard';

const center: LatLngExpression = {
  lat: 37.587480,
  lng: -122.331010,
};


const tileLayer: { attribution: string; url: string } = {
  attribution: '',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};


const createDefaultMarkerIcon = (color : string) => L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g filter="url(#filter0_d_5161_2353)">
      <circle cx="10" cy="10" r="9" fill="${color}"/>
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
    iconSize: [20, 20], 
  });


const createSelectedMarkerIcon = (color : string) => L.divIcon({
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
      <g filter="url(#filter0_d_5531_6851)">
        <circle cx="20.5" cy="20" r="18" fill="${color}"/>
        <circle cx="20.5" cy="20" r="16.3" stroke="${color}" stroke-width="3.4"/>
      </g>
      <circle cx="20.5" cy="20" r="6" fill="#FFFDF7"/>
      <defs>
        <filter id="filter0_d_5531_6851" x="0.5" y="0" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5531_6851"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5531_6851" result="shape"/>
        </filter>
      </defs>
    </svg>`,
      className: 'selected-icon',
      iconSize: [41, 40], 
    });


interface SiteMapProps {
  mode: 'tours' | 'exhibits';
}

/**
 * @param root0
 * @param root0.mode
 * @params mode - will
 * @returns Interactive map based on React Leaflet, holds the markers which lead to exhibits
 */
function SiteMap({ mode }: SiteMapProps) {
  const [spotlightTours, setSpotlightTours] = useState<TourRow[] | ExhibitRow[] | null>(null);
  const [colorsMap, setColorsMap] = useState<{ [key: string]: string }>({});
  const [selectedTour, setSelectedTour] = useState<TourRow | ExhibitRow | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(center);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [resetCenter, setResetCenter] = useState(center); // New state to trigger recentering

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
          data = await fetchAllExhibits();
        }
        if (data && mode === "tours") {
          const colors = await Promise.all(data.map(async (item) => ({
            id: item.id,
            color: await getCategoryColor1(item.category)
            
            
          })));
          const newColorsMap = colors.reduce((acc, curr) => ({
            
            ...acc,
            [curr.id]: curr.color
          }), {});
          setColorsMap(newColorsMap);

          
          console.log("Colors Map:", newColorsMap); // Log here
        } else if (data && mode === "exhibits") {
          const colors = await Promise.all(data.map(async (item) => ({
            id: item.id,
            color: await getCategoryColor1(item.title)
            
            
          })));
          const newColorsMap = colors.reduce((acc, curr) => ({
            
            ...acc,
            [curr.id]: curr.color
          }), {});
          setColorsMap(newColorsMap);

          
          console.log("Colors Map:", newColorsMap); // Log here




        }
        setSpotlightTours(data ?? []);
      } catch (error) {
        console.error(`Encountered an error fetching data: ${error}`);
      }
    }
    fetchData();
  }, [mode]);
  useEffect(() => {
    // Reset selectedTour and selectedMarker when mode changes to ensure popups start closed
    setSelectedTour(null);
    setSelectedMarker(null);
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
    setResetCenter(center); // Trigger recentering
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
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
       
        {spotlightTours && spotlightTours.map((tour, i) => {
            // Fetch the color for this tour/exhibit; fallback to a default color if not found
            const color = colorsMap[tour.id] || '#F17373'; // Fallback color
            return (
              <Marker
                key={tour.id}
                position={{
                  lat: (tour.coordinates as { lat: number })?.lat ?? 0,
                  lng: (tour.coordinates as { lng: number })?.lng ?? 0,
                }}
                eventHandlers={{ click: () => handleMarkerSelect(tour, i) }}
                
                icon={(selectedMarker === i ? createSelectedMarkerIcon(color) : createDefaultMarkerIcon(color))}
              />
            );
          })}
        {/* {selectedTour && (
          <Control position="bottomright">
            <DisplayPreviewCard
              tour={selectedTour}
              handleClose={handlePreviewClose}
            />
          </Control>
        )} */}
        {selectedTour && (
        <Control position="bottomright">
          {mode === 'tours' ? (
            <TourPreviewCard
              tour={selectedTour as TourRow} // Assuming you have proper type checks or type casting
              handleClose={handlePreviewClose}
            />
          ) : (
            <ExhibitPreviewCard
              tour={selectedTour as ExhibitRow} // Assuming you have proper type checks or type casting
              handleClose={handlePreviewClose}
            />
          )}
        </Control>
      )}
      </LayersControl>
      {selectedTour == null && <RecenterMap center={center} />} 
    </MapContainer>
  );
}

export default SiteMap;
