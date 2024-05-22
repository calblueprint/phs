import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

/**
 * A React component that recenters the map to a given coordinate without rendering any JSX.
 * @param {object} props - Component props.
 * @param {L.LatLng} props.center - The center to which the map should fly.
 */
function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}

RecenterMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default RecenterMap;
