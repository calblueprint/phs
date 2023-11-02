/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { TourRow, DisplayRow } from '@/types/types';
import { fetchSpotlightTours, fetchTour } from '@/supabase/tours/queries';
import NavBar from '@/components/userComponents/navBar/navBar';
import supabase from '@/supabase/client';
import { fetchDisplayfromSpotlight, fetchMatchingTourDisplayIdsfromSpotlight } from '../../../supabase/tour_displays/queries';

export default function Page({ params }: { params: { spotlightId: string } }) {
  const [spotlight, setSpotlight] = useState<TourRow>({
    created_at: "N/A",
    description: "N/A",
    id: "0",
    name: "N/A",
    spotlight: true,
    stop_count: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData: TourRow = await fetchTour(params.spotlightId);
        setSpotlight(responseData);
        const displays: DisplayRow[] = await fetchDisplayfromSpotlight(params.spotlightId)
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
      <h1 className="text-Night font-lato text-16 font-medium pl-4">In this spotlight...</h1>
      {/* TODO: Add display ids */}
      spotlig
      <div className="flex flex-row justify-between p-4">
        <button className="bg-[#386131] w-[48%] h-16 text-white font-bold rounded-2xl">
          Back
        </button>
        <button className="bg-[#386131] w-[48%] h-16 text-white font-bold rounded-2xl">
          Next Stop
        </button>
      </div>
      <div>
        <h4 className="text-[#386131] p-4 font-bold">
          <Link href="/featuredToursPage">Exit this tour</Link>
        </h4>
      </div>
    </div>
  );
}