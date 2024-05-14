import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import Link from 'next/link';
import Image from 'next/image';
import { ExhibitWithCategoryRow } from '../../../types/types';

import { fetchExhibitImage } from '../../../supabase/exhibits/queries';
import { useWebDeviceDetection } from '../../../context/WindowWidthContext/WindowWidthContext';

interface ExhibitCardProps {
  tour: ExhibitWithCategoryRow;
  handleClose: () => void;
  handleClick?: () => void;
}

/**
 * @param ExhibitCardProps.display display to preview
 * @param ExhibitCardProps.handleClick function to handle actions when clicked
 * @param ExhibitCardProps.handleClose function to handle closing of preview card
 * @param ExhibitCardProps.display.display
 * @param ExhibitCardProps.display.handleClick
 * @param ExhibitCardProps.display.handleClose
 * @param ExhibitCardProps.display.tour
 * @returns preview card component to display within leaflet map container
 */
function ExhibitPreviewCard({
  tour,
  handleClick,
  handleClose,
}: ExhibitCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [name1, setname1] = useState<string>('');

  const { id, description, coordinates, category } = tour;
  const [width, setWidth] = useState('20.06rem');
  const [height, setHeight] = useState('7.687rem');
  const isWebDevice = useWebDeviceDetection();

  useEffect(() => {
    /**
     * This function adjusts the width and height of the component
     * based on whether the device is detected as a web device.
     * Had to specify the dimensions because dynamic width and height 
     * did not work.
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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  

    // const imageObj = await fetchExhibitImage(tour.id); 
    // if (imageObj) {
        imageUrl = tour.image; 
    // }
    displayName = tour.category;

      
  
      // Set state variables
      setPreviewImage(imageUrl);
      setname1(displayName);
      setLoading(false);
    };

    fetchDetails();
  }, [tour]);

  /** route this to spotlights */

  return (
    <div className="flex flex-col items-center justify-center mx-auto rounded-md px-[0.56rem]" style={{ width, height }}>
    <div className="flex flex-row items-center rounded-md overflow-hidden bg-ivory cursor-pointer flex-shrink-0 shadow-xl" aria-hidden="true">
      {!loading && (
        <div className="relative w-[5.875rem] z-10 h-full shrink-0 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md">
          <Image
            src={previewImage}
            alt='placeholder'
            layout="fill"
            objectFit="cover"
          /> 
        </div>
      )}
      <div className="justify-items-center align-middle z-20 overflow-hidden w-full h-full" onClick={handleClick} onKeyDown={e => {
        if (handleClick && e.key === 'Enter') {
          handleClick();
        }
      }} role="button" tabIndex={0}>
        <div className=""> 
          <div className="flex justify-end items-center pt-2 pr-2" onClick={e => {
                e.stopPropagation();
                handleClose(); 
              }}>
 
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M10.0523 11.0274L3.35083 4.32596M10.0524 4.32596L3.35083 11.0275" stroke="silver" strokeWidth="1.11692" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <Link href={`/spotlightPage/${id}`}>
          <h3 className="relative pr-[0.31rem] pl-[0.75rem] pt-[0.3rem] pb-[0rem]">
                <p className='truncate font-medium font-lato text-night  text-base leading-normal'>{name1}</p>
              </h3>
            <h4 className="relative h-[2rem] pr-[0.31rem] pt-[0rem] pl-[0.75rem] pb-[2.4rem]">
              <p className='line-clamp-2 text-shadow text-xs font-normal font-lato'>{description} </p>
            </h4>
            <h6 className='relative pt-[0rem] pr-[1rem] pb-[0.4rem] text-silver font-lato text-xs text-right'>
              Go to exhibit &gt;
            </h6>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ExhibitPreviewCard;
