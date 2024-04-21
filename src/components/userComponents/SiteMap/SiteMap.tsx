'use client';

import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { fetchAllSpotlights } from '../../../supabase/tours/queries';
import { ExhibitWithCategoryRow, TourRow } from '../../../types/types';
import Control from './Control';
import { fetchAllExhibits } from '../../../supabase/exhibits/queries';
import { getCategoryColor1 } from '../../../supabase/category/queries';
import RecenterMap from './MapInteractionHandler';
import {
  DefaultMarkerIcon,
  SelectedMarkerIcon,
} from '../../../../public/icons';
import ExhibitPreviewCard from './ExhibitPreviewCard';
import TourPreviewCard from './TourPreviewCard';

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
 * Render a site map component.
 * @param SiteMapProps - The props for the site map component.
 * @param SiteMapProps.mode - The mode for the site map, either 'tours' or 'exhibits'.
 * @returns The site map component based on the provided mode.
 */
function SiteMap({ mode }: SiteMapProps) {
  const [spotlightTours, setSpotlightTours] = useState<
    TourRow[] | ExhibitWithCategoryRow[] | null
  >(null);
  const [colorsMap, setColorsMap] = useState<{ [key: string]: string }>({});
  const [selectedTour, setSelectedTour] = useState<TourRow | ExhibitWithCategoryRow | null>(
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
        if (mode === 'tours') {
          data = await fetchAllSpotlights();
        } else if (mode === 'exhibits') {
          data = await fetchAllExhibits();
        }
        if (data && mode === 'tours') {
          const colors = await Promise.all(
            data.map(async item => ({
              id: item.id,
              color: await getCategoryColor1(item.id),
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
        } else if (data && mode === 'exhibits') {
          console.log(data);
          const colors = await Promise.all(
            data.map(async item => ({
              id: item.id,
              color: await getCategoryColor1(item.id),
            })),
          );
          console.log(colors);
          const newColorsMap = colors.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.id]: curr.color,
            }),
            {},
          );
          console.log("COLOR MAP!!");
          setColorsMap(newColorsMap);
          console.log(newColorsMap);
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
    tour: TourRow | ExhibitWithCategoryRow,
    markerIndex: number,
  ) => {
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
      zoom={14}
      zoomControl={false}
      scrollWheelZoom
      style={{
        height: '40vh',
        width: '100%',
        minHeight: '532px',
        zIndex: '10',
        marginBottom: '25px',
      }}
      key={new Date().getTime()}
    >
      <TileLayer {...tileLayer} />
      {spotlightTours &&
        spotlightTours.map((tour, i) => {
          // Fetch the color for this tour/exhibit; fallback to a default color if not found
          console.log(tour);
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
          {mode === 'tours' ? (
            <TourPreviewCard
              tour={selectedTour as TourRow} // Assuming you have proper type checks or type casting
              handleClose={handlePreviewClose}
            />
          ) : (
            <ExhibitPreviewCard
              tour={selectedTour as ExhibitWithCategoryRow} // Assuming you have proper type checks or type casting
              handleClose={handlePreviewClose}
            />
          )}
        </Control>
      )}
 
      {selectedTour == null && <RecenterMap center={center} />}
    </MapContainer>
  );
}

export default SiteMap;
