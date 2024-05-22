import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState, useRef } from 'react';
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
import { useWebDeviceDetection } from '../../../context/WindowWidthContext/WindowWidthContext';

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
  const [selectedTour, setSelectedTour] = useState<
    TourRow | ExhibitWithCategoryRow | null
  >(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(center);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isWebDevice = useWebDeviceDetection();
  const cacheRef = useRef<{ tours?: TourRow[], exhibits?: ExhibitWithCategoryRow[] }>({});


  
  useEffect(() => {
    /**
     * This useEffect will manage fetching Data depending on if the chosen map is tours or exhibits.
     * It will also manage the initial state of the map when no marker is chosen
     * 
     * It will fetch tours when spotlights == True
     */
    async function fetchData() {
      setLoading(true);
      try {
        let data;
        if (mode === 'tours') {
          if (cacheRef.current.tours) {
            data = cacheRef.current.tours;
          } else {
            data = await fetchAllSpotlights();
            cacheRef.current.tours = data;
          }
        } else if (mode === 'exhibits') {
          if (cacheRef.current.exhibits) {
            data = cacheRef.current.exhibits;
          } else {
            data = await fetchAllExhibits();
            cacheRef.current.exhibits = data;
          }
        }

        if (data) {
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
          setSpotlightTours(data ?? []);
        }
      } catch (error) {
        console.error(`Encountered an error fetching data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    setMapCenter(center);
    setSelectedMarker(null);
    setSelectedTour(null);
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
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        spotlightTours &&
        spotlightTours.map((tour, i) => {
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
        })
      )}
      {selectedTour && (
        isWebDevice ? (
          <Control position="bottomright">
            {mode === 'tours' ? (
              <TourPreviewCard
                tour={selectedTour as TourRow} 
                handleClose={handlePreviewClose}
              />
            ) : (
              <ExhibitPreviewCard
                tour={selectedTour as ExhibitWithCategoryRow} 
                handleClose={handlePreviewClose}
              />
            )}
          </Control>
        ) : (
          <div className="bottom-center">
            {mode === 'tours' ? (
              <TourPreviewCard
                tour={selectedTour as TourRow} 
                handleClose={handlePreviewClose}
              />
            ) : (
              <ExhibitPreviewCard
                tour={selectedTour as ExhibitWithCategoryRow} 
                handleClose={handlePreviewClose}
              />
            )}
          </div>
        )
      )}
 
      {selectedTour == null && <RecenterMap center={center} />}
    </MapContainer>
  );
}

export default SiteMap;