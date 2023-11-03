/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { TourRow, DisplayRow } from '@/types/types';
import { fetchTour } from '@/supabase/tours/queries';
import NavBar from '@/components/userComponents/navBar/navBar';
import { fetchDisplayfromSpotlight } from '../../../supabase/tour_displays/queries';

export default function Page({ params }: { params: { spotlightId: string } }) {
  const [spotlight, setSpotlight] = useState<TourRow>({
    created_at: "N/A",
    description: "N/A",
    id: "0",
    name: "N/A",
    spotlight: true,
    stop_count: 0,
  });

  const [displays, setDisplays] = useState<DisplayRow[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData: TourRow = await fetchTour(params.spotlightId);
        setSpotlight(responseData);
        const displays: DisplayRow[] = await fetchDisplayfromSpotlight(params.spotlightId);
        setDisplays(displays);
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
      <h1 className="text-green-700 font-lato text-base font-normal pl-4 pt-[31px]"> CATEGORY TWO</h1>
      <h1 className="text-[#333333] text-3xl text-14 font-bold pl-4 pt-[8px]">
        {spotlight.name}
      </h1>
      <p className="text-[#333333] p-4">{spotlight.description}</p>
      <h1 className="text-black font-lato text-16 font-medium pl-4">In this spotlight...</h1>
      {/* TODO: Add display ids */}
      <div className="flex flex-wrap mt-2 pl-2">
       
       
      {displays.map( 
            display => (
                <Link href={`/spotlightPage/${spotlight.id}/${display.id}?spotlightId=${spotlight.id}`} >
                    <button className="bg-[#7CA24E] w-[163px] h-[74px] text-white font-bold rounded-2xl p-[21px] m-2 mb-4">
                        {display.title}
                    </button>
                </Link>

            ))}
      </div>
    </div>
  );
}