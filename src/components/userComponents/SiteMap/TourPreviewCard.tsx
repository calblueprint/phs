import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import Link from 'next/link';
import Image from 'next/image';
import { TourRow } from '../../../types/types';
import { fetchImagesForTour } from '../../../supabase/media/queries';
// import { fetchExhibitImage } from '../../../supabase/exhibits/queries';

interface TourCardProps {
  tour: TourRow;
  handleClose: () => void;
  handleClick?: () => void;
}
/**
 * Props for the tour preview card component.
 * @param props - The props for the tour preview card.
 * @param props.tour – tour to render preview
 * @param props.handleClick – onClick function for preview card
 * @param props.handleClose – close function for preview card
 * @returns - The rendered tour preview card component.
 */
function TourPreviewCard({ tour, handleClick, handleClose }: TourCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [name1, setname1] = useState<string>('');

  const { id, description, coordinates, category } = tour;
  // name, for tour title for exhibit

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
    const fetchDetails = async () => {
      setLoading(true);

      let imageUrl = '';
      let displayName = '';

      // Fetch images for a tour
      const images = await fetchImagesForTour(tour.id);
      if (images && images.length > 0) {
        imageUrl = images[0].url;
      }
      displayName = tour.name;
      // Set state variables
      setPreviewImage(imageUrl);
      setname1(displayName);
      setLoading(false);
    };

    fetchDetails();
  }, [tour]);

  /** route this to spotlights */

  return (
    <div className="flex flex-col items-center justify-center w-[27.5rem] h-[8.5rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 pb-[2.87rem] pr-[1.19rem] pl-[1.19rem] rounded-md">
      <div
        className="flex flex-row items-center rounded-md overflow-hidden bg-ivory cursor-pointer  sm:w-4/4 md:w-5/5 lg:w-2/2 xl:w-5/5 flex-shrink-0 shadow-xl"
        aria-hidden="true"
      >
        {!loading && (
          <div className="relative w-[5.8125rem] z-10 h-full shrink-0 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md">
            <Image
              src={previewImage}
              alt="placeholder"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div
          className="justify-items-center align-middle z-20 overflow-hidden w-full h-full"
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
            <div
              aria-label="Close preview card"
              className="flex justify-end items-center pt-2 pr-[0.5rem]"
              role="button"
              tabIndex={0}
              onClick={e => {
                e.stopPropagation(); //  prevents the click from propagating to the parent link
                handleClose();
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  handleClose();
                }
              }}
            >
                 <div className=" pr-[10rem] pl-[0] pt-[0.25rem] pb-[0rem] font-lato text-xs rounded-lg ">
                <span className='text-shadow bg-[#F173731A]'>
                {category}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M10.0523 11.0274L3.35083 4.32596M10.0524 4.32596L3.35083 11.0275"
                  stroke="silver"
                  strokeWidth="1.11692"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
           
            </div>
            <Link href={`/spotlightPage/${id}`}>
              <h3 className="relative truncate font-medium font-lato text-night pr-[0.31rem] pl-[0.75rem] pt-[0.3rem] pb-[0rem] text-base leading-normal">
                {name1}
              </h3>

              <h4 className="relative font-lato h-[2rem] pr-[0.31rem] pt-[0rem] pl-[0.75rem] pb-[2.4rem] text-shadow line-clamp-2 text-sm">
                {description}
              </h4>
              <h6 className="relative pt-[0.7rem] pr-[1rem] pb-[0.4rem] text-silver font-lato text-xs text-right">
                Go to virtual tour &gt;
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPreviewCard;
