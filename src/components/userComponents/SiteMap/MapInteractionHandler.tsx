import { useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
/**
 * A React component that recenters the map to a given coordinate. This component does not render any visual content.
 * @param {Object} props - Component props.
 * @param {L.LatLng} props.center - The center to which the map should fly. Must include 'lat' and 'lng' properties.
 * @returns {null} Nothing is rendered by this component.
 */
function RecenterMap({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default RecenterMap;
