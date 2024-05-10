import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import Link from 'next/link';
import Image from 'next/image';
import { TourRow } from '../../../types/types';
import { fetchImagesForTour } from '../../../supabase/media/queries';

interface TourCardProps {
  tour: TourRow;
  handleClose: () => void;
  handleClick?: () => void;
}

function TourPreviewCard({ tour, handleClick, handleClose }: TourCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [name1, setname1] = useState<string>('');

  const { id, description, category } = tour;

  // Responsive dimension states
  const [width, setWidth] = useState('20.06rem');
  const [height, setHeight] = useState('7.687rem');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
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
    <div className="flex flex-col items-center justify-center mx-auto rounded-md pl-[0.8rem] pr-[0rem]" style={{ width, height }}>
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
              <div className='pl-[0.75rem] w-full'>
                <span className='text-shadow bg-[#F173731A] pr-2 pl-2 rounded-md'>{category}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path d="M10.0523 11.0274L3.35083 4.32596M10.0524 4.32596L3.35083 11.0275" stroke="silver" strokeWidth="1.11692" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Link href={`/spotlightPage/${id}`}>
              <h3 className="relative truncate font-medium font-lato text-night pr-[0.31rem] pl-[0.75rem] pt-[0.3rem] pb-[0rem] text-base leading-normal">
                {name1}
              </h3>
              <h4 className="relative font-lato h-[2rem] pr-[0.31rem] pt-[0rem] pl-[0.75rem] pb-[2.4rem] text-shadow line-clamp-2 font-normal line-height-normal">
                {description}
              </h4>
              <h6 className='relative pt-[0rem] pr-[1rem] pb-[0.4rem] text-silver font-lato text-xs text-right'>
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
