import { useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
/**
 *
 * @param props - props for the RecenterMap component
 * @param props.center - center of the map
 * @returns null
 */
function RecenterMap({ center } : { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}
export default RecenterMap;
