import { useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
/**
 *
 */
function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default RecenterMap;

