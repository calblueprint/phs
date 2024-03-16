'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { TourRow, DisplayRow } from '../../../types/types';
import { fetchTour } from '../../../supabase/tours/queries';
import NavBar from '../../../components/userComponents/navBar/navBar';
import {
  fetchDisplayfromSpotlight,
  fetchRelatedSpotlightsfromSpotlightId,
} from '../../../supabase/tour_displays/queries';

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

    fetchData();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <img
        src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="placeholder"
        height={145}
      />
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
