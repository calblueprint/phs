'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { TourRow, DisplayRow, MediaRow, TourMediaRow } from '../../../types/types';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchMedia } from '../../../supabase/media/queries';
import { fetchTourMedia } from '../../../supabase/tour_media/queries';
import NavBar from '../../../components/userComponents/navBar/navBar';
import { fetchDisplayfromSpotlight, fetchRelatedSpotlightIdsFromSpotlight } from '../../../supabase/tour_displays/queries';

/**
 * @param -.params
 * @param -.params.spotlightId
 * @param -.params.params
 * @param -.params.params.spotlightId
 * @param -.params.params
 * @param -.params.params.spotlightId
 * @returns a spotlight page given a spotlight Id
 */
export default function Page({ params }: { params: { spotlightId: string } }) {
  const [spotlight, setSpotlight] = useState<TourRow>({
    created_at: 'N/A',
    description: 'N/A',
    id: '0',
    name: 'N/A',
    spotlight: true,
    preview_text: 'N/A',
    stop_count: 0,
  });

  const [displays, setDisplays] = useState<DisplayRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);

  // const [relatedSpolights, setRelatedSpotlight] = useState<TourRow[]>([])

  useEffect(() => {
    /**
     * @returns data from tour table and display table
     */
    async function fetchData() {
      try {
        const responseDataForSpotlight: TourRow = await fetchTour(
          params.spotlightId,
        );
        setSpotlight(responseDataForSpotlight);
        const responseDataForDisplays: DisplayRow[] =
          await fetchDisplayfromSpotlight(params.spotlightId);
        setDisplays(responseDataForDisplays);

        // const responseDataForRelatedSpotlights: TourRow[] = await fetchRelatedSpotlightsfromSpotlightId(params.spotlightId);
        // setRelatedSpotlight(responseDataForRelatedSpotlights);

      } catch (error) {
        console.error(error);
      }
    }

    // Get tour media
    const getTourMedia = async () => {
      const fetchedTourMedia = await fetchTourMedia(params.spotlightId);
      setTourMedia(fetchedTourMedia);
    };

    // Get media
    const getMedia = async () => {
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    fetchData();
    getTourMedia();
    getMedia();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      {media.length > 0 && (
        <Image
          className="w-[24.375rem] h-[15.3125rem] relative"
          key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
          src={media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''}
          alt={media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? 'Spotlight display image'}
          layout="responsive"
          width={390}
          height={245}
          objectFit="cover"
          priority
        />
      )}
      <h1 className="text-green-700 font-Lato text-base font-normal pl-[18px] pt-[31px]">
        {' '}
        CATEGORY TWO
      </h1>
      <h1 className="text-[#333333] text-3xl text-14 font-bold pl-[18px] pt-[8px]">
        {spotlight.name}
      </h1>
      <p className="text-[#333333] p-4">{spotlight.description}</p>
      <h1 className="text-black font-Lato font-bold text-[18px] font-medium pl-[18px]">
        In this spotlight...
      </h1>
      <div className="flex flex-wrap mt-2 pl-2">
        {displays.map(display => (
          <Link
            key={display.id}
            href={`/spotlightPage/${spotlight.id}/${display.id}?spotlightId=${spotlight.id}`}
          >
            <button
              type="button"
              className="bg-[#7CA24E] w-[163px] h-[74px] text-white font-bold rounded-2xl p-[21px] m-2 mb-4"
            >
              {display.title}
            </button>
          </Link>
        ))}
      </div>

      <h1 className="text-black font-Lato font-bold text-[18px] font-medium pl-[18px] pb-[16px]">
        Related Spotlights
      </h1>

      <ul className="list-none p-0 flex">
        {/* {relatedSpolights.map(otherSpotlight => (
          <li
            className="pl-[18px] w-[162px] overflow-x-auto"
            key={otherSpotlight.id}
          >
            <Link href={`/spotlightPage/${spotlight.id}`}>
              <div className="bg-[#386131] h-[169px] rounded-2xl p-[18px] flex flex-col" />
              <h4 className="text-black font-Lato text-20 font-bold mt-2">
                {otherSpotlight.name}
              </h4>
              <h2 className="text-gray font-Lato text-sm font-normal">
                {otherSpotlight.description}
              </h2>
            </Link>
          </li>
        ))} */}
      </ul>
    </div>
  );
}