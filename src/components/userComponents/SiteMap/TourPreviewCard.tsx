import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TourRow } from '../../../types/types';
import { fetchImagesForTour } from '../../../supabase/media/queries';
import { useWebDeviceDetection } from '../../../context/WindowWidthContext/WindowWidthContext';

interface TourCardProps {
  tour: TourRow;
  handleClose: () => void;
  handleClick?: () => void;
}

/**
 * Represents a preview card for a tour.
 * @param tour - The tour data.
 * @param tour.tour  - The tour data.
 * @param tour.handleClick - The function to call when the card is clicked.
 * @param tour.handleClose - The function to call when the close button is clicked.
 * @returns The component UI.
 */
function TourPreviewCard({
  tour,
  handleClick,
  handleClose,
}: TourCardProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [name1, setname1] = useState<string>('');

  const { id, description, category } = tour;

  const [width, setWidth] = useState('20.06rem');
  const [height, setHeight] = useState('7.687rem');
  const isWebDevice = useWebDeviceDetection();

  useEffect(() => {
    /**
     * This useEffect will take care of resizing for different device dimensions
     */
    function handleResize() {
      if (isWebDevice) {
        setWidth('27.06rem');
        setHeight('8.5rem');
      } else {
        setWidth('20.06rem');
        setHeight('7.687rem');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isWebDevice]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const images = await fetchImagesForTour(tour.id);
      setPreviewImage(images && images.length > 0 ? images[0].url : '');
      setname1(tour.name);
      setLoading(false);
    };

    fetchDetails();
  }, [tour]);

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto rounded-md px-[0.56rem]"
      style={{ width, height }}
    >
      <div
        className="flex flex-row items-center rounded-md overflow-hidden bg-ivory cursor-pointer flex-shrink-0 shadow-xl"
        aria-hidden="true"
        onClick={handleClick}
      >
        {!loading && (
          <div className="relative w-[5.875rem] z-10 h-full shrink-0 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md">
            <Image
              src={previewImage}
              alt="Tour preview"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div
          className="justify-items-center align-middle z-20 overflow-hidden w-full h-full"
          onKeyDown={e => {
            if (e.key === 'Enter' && handleClick) {
              handleClick();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="">
            <div
              className="flex justify-end items-center pt-2 pr-2"
              onClick={e => {
                e.stopPropagation();
                handleClose();
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  handleClose();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Close preview"
            >
              <div className="pl-[0.75rem] w-full">
                <text className="text-shadow bg-[#F173731A] pr-2 pl-2 rounded-md">
                  {category}
                </text>
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
            <Link href={`/wildlife-spotlights/${id}`}>
              <h3 className="relative pr-[0.31rem] pl-[0.75rem] pt-[0.3rem] pb-[0rem]">
                <p className="truncate font-medium font-lato text-night  text-base leading-normal">
                  {name1}
                </p>
              </h3>
              <h4 className="relative h-[2rem] pr-[0.31rem] pt-[0rem] pl-[0.75rem] pb-[2.4rem]">
                <p className="line-clamp-2 text-shadow text-xs font-normal font-lato">
                  {description}
                </p>
              </h4>
              <h6 className="relative pt-[0rem] pr-[1rem] pb-[0.4rem] text-silver font-lato text-xs text-right">
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
