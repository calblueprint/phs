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
      <div className="flex flex-col items-center justify-center w-[25rem] h-[8.25rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 pb-[2.87rem] pr-[1.19rem] pl-[1.19rem] rounded-md">
        <div
          className="flex flex-row items-center rounded-md overflow-hidden bg-ivory cursor-pointer w-full sm:w-4/4 md:w-5/5 lg:w-2/2 xl:w-5/5 flex-shrink-0 shadow-xl" 
          // style={{ width: '22rem', height: '8.25rem', flexShrink: 0, borderRadius: '0.5rem', boxShadow: '0px 4px 24px 0px rgba(20, 20, 20, 0.16)' }}
          aria-hidden="true"
        >
          {!loading && 
          <div className="relative w-[7.8125rem] h-[8.25rem] shrink-0 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md">
           
            <Image
              // className="shrink"
              src={previewImage}
              alt='placeholder'
              // width={100%} // Example width
              // height={200} // Example height
              // "relative w-[7.8125rem] h-[7rem] flex-none "
              layout="fill"
              objectFit="cover"

            /> 
            </div>
          }
          <div
            className="justify-items-center align-middle overflow-hidden w-full h-full"
            onClick={handleClick}
            onKeyDown={e => {
              if (handleClick && e.key === 'Enter') {
                handleClick();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className=""> 
              <h3
                className="relative truncate font-bold font-lato text-night pr-[0.31rem] pl-[0.75rem] pt-[2.31rem] pb-[0rem] text-base"
                // style={{ fontWeight: 'bolder' }}
                // "flex-grow p-1"
                // overflow-hidden text-night truncate font-lato text-base font-bold leading-normal
              >
                {name}
              </h3>
      
              <h4 className="relative font-lato h-[2.0625rem] pr-[0.31rem] pt-[0.37rem] pl-[0.75rem] pb-[2.38rem] text-shadow line-clamp-2 text-sm">
                {description}
              </h4>
                
          
   
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DisplayPreviewCard;
