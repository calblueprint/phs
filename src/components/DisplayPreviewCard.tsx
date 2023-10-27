import React from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { DisplayRow } from '../types/types';

interface DisplayCardProps {
  display: DisplayRow;
  handleClose: () => void;
  handleClick?: () => void;
}

/**
 * @param {DisplayRow} DisplayCardProps.display display to preview
 * @param {Function} DisplayCardProps.handleClick function to handle actions when clicked
 * @param {Function} DisplayCardProps.handleClose function to handle closing of preview card
 * @returns preview card component to display within leaflet map container
 */
function DisplayPreviewCard({
  display,
  handleClick,
  handleClose,
}: DisplayCardProps) {
  const { title, description, coordinates } = display;

  const map = useMapEvents({
    click: e => {
      if (!e.latlng.equals(coordinates as LatLngExpression)) {
        handleClose();
      }
    },
  });

  return (
    <div className="flex flex-col h-fit left-1/2 translate-x-5">
      <div
        className="flex flex-row align-center rounded-md shadow-[0_4px_21px_0_rgba(0, 0, 0, 0.25)] overflow-hidden w-80 max-h-28 absolute bottom-0"
        onClick={handleClick}
        aria-hidden="true"
      >
        <img
          className="shrink"
          src="https://unsplash.it/118/113"
          alt="Placeholder for this input"
        />
        <div
          className="bg-white rounded-r-md align-center justify-items-center align-middle pt-6 pb-4 px-3.5 w-10/12 overflow-hidden"
          tabIndex={1}
          onClick={handleClick}
        >
          <div className="w-full flex-col block gap-x-5 overflow-hidden text-base">
            <h3 className="truncate" style={{ fontWeight: 'bolder' }}>
              {title}
            </h3>
            <h4 className="max-w-full line-clamp-2">{description}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayPreviewCard;
