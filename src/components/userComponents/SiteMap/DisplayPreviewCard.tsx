import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import Link from 'next/link';
import Image from 'next/image';
import { ExhibitWithCategoryRow, TourRow } from '../../../types/types';
import { fetchImagesForTour } from '../../../supabase/media/queries';
import { fetchExhibitImage } from '../../../supabase/exhibits/queries';
import { CloseIcon } from '../../../../public/icons';

interface DisplayCardProps {
  tour: TourRow | ExhibitWithCategoryRow;
  handleClose: () => void;
  handleClick?: () => void;
}

/**
 * Display a preview card component.
 * @param DisplayCardProps - The props for the display card component.
 * @param DisplayCardProps.tour - The tour or exhibit to preview.
 * @param DisplayCardProps.handleClick - The function to handle actions when clicked.
 * @param DisplayCardProps.handleClose - The function to handle closing of the preview card.
 * @returns The preview card component to display within the Leaflet map container.
 */
function DisplayPreviewCard({
  tour,
  handleClick,
  handleClose,
}: DisplayCardProps) {
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

      if ('name' in tour) {
        const images = await fetchImagesForTour(tour.id);
        if (images && images.length > 0) {
          imageUrl = images[0].url;
        }
        displayName = tour.name;
      } else {
        // Handle as an ExhibitWithCategoryRow
        // const imageObj = await fetchExhibitImage(tour.id);
        // if (imageObj) {
        imageUrl = tour.image;
        console.log(tour);
        // }
        displayName = tour.category;
      }

      // Set state variables
      setPreviewImage(imageUrl);
      setname1(displayName);
      setLoading(false);
    };

    fetchDetails();
  }, [tour]);

  /** route this to spotlights */

  return (
    <div className="flex flex-col items-center justify-center w-[25rem] h-[8.25rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 pb-[2.87rem] pr-[1.19rem] pl-[1.19rem] rounded-md">
      <div
        className="flex flex-row items-center rounded-md overflow-hidden bg-ivory cursor-pointer w-full sm:w-4/4 md:w-5/5 lg:w-2/2 xl:w-5/5 flex-shrink-0 shadow-xl"
        aria-hidden="true"
      >
        {!loading && (
          <div className="relative w-[7.8125rem] z-10 h-[8.25rem] shrink-0 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md">
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
              className="flex justify-end items-center pt-2 pr-2"
              aria-label="Close preview card"
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
              <CloseIcon />
            </div>
            <Link href={`/spotlightPage/${id}`}>
              <h3 className="relative truncate text-asparagus pr-[0.31rem] pl-[0.75rem] pt-[0rem] uppercase font-light text-xs leading-normal">
                {category}
              </h3>
              <h3 className="relative truncate font-medium font-lato text-night pr-[0.31rem] pl-[0.75rem] pt-[0.30rem] pb-[0rem] text-base leading-normal">
                {name1}
              </h3>

              <h4 className="relative font-lato h-[2rem] pr-[0.31rem] pt-[0rem] pl-[0.75rem] pb-[2.4rem] text-shadow line-clamp-2 text-sm">
                {description}
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayPreviewCard;
