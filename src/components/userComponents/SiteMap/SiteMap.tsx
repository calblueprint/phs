'use client';

import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { fetchAllSpotlights } from '../../../supabase/tours/queries';
import { ExhibitRow, TourRow } from '../../../types/types';
import Control from './Control';
import DisplayPreviewCard from './DisplayPreviewCard';
import {
  fetchExhibit,
  fetchAllExhibits,
} from '../../../supabase/exhibits/queries';
import { getCategoryColor1 } from '../../../supabase/category/queries';
import RecenterMap from './MapInteractionHandler';
import { DefaultMarkerIcon, SelectedMarkerIcon } from '../../../../public/icons';

const center: LatLngExpression = {
  lat: 37.58748,
  lng: -122.33101,
};

const tileLayer: { attribution: string; url: string } = {
  attribution: '',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const createDefaultMarkerIcon = (color: string) =>
  L.divIcon({
    html: renderToStaticMarkup(<DefaultMarkerIcon color={color} />),
    className: 'default-icon',
    iconSize: [20, 20],
  });

const createSelectedMarkerIcon = (color: string) =>
  L.divIcon({
    html: renderToStaticMarkup(<SelectedMarkerIcon color={color} />),
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
  const [spotlightTours, setSpotlightTours] = useState<
    TourRow[] | ExhibitRow[] | null
  >(null);
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
        if (mode === 'tours') {
          data = await fetchAllSpotlights();
        } else if (mode === 'exhibits') {
          data = await fetchAllExhibits();
        }
        if (data) {
          const colors = await Promise.all(
            data.map(async item => ({
              id: item.id,
              color: await getCategoryColor1(item.category),
            })),
          );
          const newColorsMap = colors.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.id]: curr.color,
            }),
            {},
          );
          setColorsMap(newColorsMap);
          console.log('Colors Map:', newColorsMap); // Log here
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

  const handleMarkerSelect = (
    tour: TourRow | ExhibitRow,
    markerIndex: number,
  ) => {
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
        {spotlightTours &&
          spotlightTours.map((tour, i) => {
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
                icon={
                  selectedMarker === i
                    ? createSelectedMarkerIcon(color)
                    : createDefaultMarkerIcon(color)
                }
              />
            );
          })}
        {selectedTour && (
          <Control position="bottomright">
            <DisplayPreviewCard
              tour={selectedTour}
              handleClose={handlePreviewClose}
            />
          </Control>
        )}
      </LayersControl>
      {selectedTour == null && <RecenterMap center={center} />}
    </MapContainer>
  );
}

export default SiteMap;
