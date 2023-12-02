import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import Link from 'next/link';
import Image from 'next/image';
import { TourRow } from '../../../types/types';
import { fetchImagesForTour } from '../../../supabase/media/queries';

interface DisplayCardProps {
  tour: TourRow;
  handleClose: () => void;
  handleClick?: () => void;
}

/**
 * @param DisplayCardProps.display display to preview
 * @param DisplayCardProps.handleClick function to handle actions when clicked
 * @param DisplayCardProps.handleClose function to handle closing of preview card
 * @param DisplayCardProps.display.display
 * @param DisplayCardProps.display.handleClick
 * @param DisplayCardProps.display.handleClose
 * @param DisplayCardProps.display.tour
 * @returns preview card component to display within leaflet map container
 */
function DisplayPreviewCard({
  tour,
  handleClick,
  handleClose,
}: DisplayCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const { id, name, description, coordinates } = tour;

  // Map Context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const map = useMapEvents({
    click: e => {
      if (!e.latlng.equals(coordinates as LatLngExpression)) {
        handleClose();
      }
    },
  });

  // fetch image to use for preview
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const images = await fetchImagesForTour(id);
      if (images) {
        setPreviewImage(images[0].url);
      }
      setLoading(false);
    };

    fetchImages();
  }, [tour]);

  /** route this to spotlights */

  return (
    <Link href={`/spotlightPage/${id}`}>
      <div className="flex flex-col h-fit left-1/2 translate-x-5">
        <div
          className="flex flex-row align-center rounded-md shadow-[0_4px_21px_0_rgba(0, 0, 0, 0.25)] overflow-hidden w-80 max-h-28 absolute bottom-0"
          onClick={handleClick}
          aria-hidden="true"
        >
          {!loading && 
            <Image
              className="shrink"
              src={previewImage}
              alt="Placeholder for this input"
            />
          }
          <div
            className="bg-white rounded-r-md align-center justify-items-center align-middle pt-6 pb-4 px-3.5 w-10/12 overflow-hidden"
            onClick={handleClick}
            onKeyDown={e => {
              if (handleClick && e.key === 'Enter') {
                handleClick();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="w-full flex-col block gap-x-5 overflow-hidden text-base">
              <h3
                className="truncate text-black"
                style={{ fontWeight: 'bolder' }}
              >
                {name}
              </h3>
              <h4 className="max-w-full line-clamp-2">{description}</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DisplayPreviewCard;
