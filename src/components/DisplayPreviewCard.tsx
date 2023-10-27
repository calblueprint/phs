import React, { useEffect } from 'react';
import { TbSquareRoundedX } from 'react-icons/tb';
// import { createControlComponent, useLeafletContext } from '@react-leaflet/core';
// import { Control, DomUtil } from 'leaflet';
import L from 'leaflet';
import { DisplayRow } from '../types/types';

interface DisplayCardProps {
  display: DisplayRow;
  handleClose: () => void;
  handleClick?: () => void;
}

/**
 * @param handleClick.display
 * @param handleClick function to handle actions when clicked
 * @param display object from supabase corresponding to the ...
 * @param handleClick.handleClick
 * @param handleClick.handleClose
 * @returns preview card component to display within leaflet map container
 */
function DisplayPreviewCard({
  display,
  handleClick,
  handleClose,
}: DisplayCardProps) {
  const { title, description } = display;

  return (
    <div className="flex flex-col h-fit w-fit">
      <div className='content-end'>
        <TbSquareRoundedX size={30} onClick={handleClose} tabIndex={0} className="mb-0"/>
      </div>
      <div
        className="flex flex-row align-center rounded-md shadow-[0_4px_21px_0_rgba(0, 0, 0, 0.25)] overflow-hidden w-[352px] max-h-28 absolute bottom-0"
        onClick={handleClick}
        aria-hidden="true"
      >
        <img
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
