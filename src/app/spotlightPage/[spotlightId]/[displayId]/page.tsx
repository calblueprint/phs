/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow } from '@/types/types';
import NavBar from '@/components/userComponents/navBar/navBar';
import { fetchDisplayFromId } from '../../../../supabase/displays/queries';
import { fetchDisplayfromSpotlight } from '../../../../supabase/tour_displays/queries';

export default function Page({ params }: { params: { displayId: string, spotlightId: string } }) {
  const [display, setDisplay] = useState<DisplayRow>({
    coordinates: {0:0},
    created_at: "N/A",
    description: "N/A",
    id: "0",
    title: "N/A",
    updated_at: "N/A",
  });

  const [otherDisplays, setOtherDisplays] = useState<DisplayRow[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentDisplayData: DisplayRow = await fetchDisplayFromId(params.displayId);
        setDisplay(currentDisplayData);

        const displaysFromSpotlight: DisplayRow[] = await fetchDisplayfromSpotlight(params.spotlightId);
        const currentDisplayId = params.displayId;
        const otherDisplays = displaysFromSpotlight.filter((display) => display.id !== currentDisplayId);

        setOtherDisplays(otherDisplays);

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
        {display.title}
      </h1>
      <p className="text-[#333333] p-4">{display.description}</p>
      <h1 className="text-black font-lato text-16 font-medium pl-4">More in this spotlight...</h1>
      
      <div className="flex space-x-[14px] pl-4 pt-[16px] w-screen overflow-x-auto">
      {otherDisplays.map( 
            display => (
                <Link href={`/spotlightPage/${params.spotlightId}/${display.id}?spotlightId=${params.spotlightId}`} >
                    <button className="bg-[#7CA24E] w-[163px] h-[74px] text-white font-bold rounded-2xl p-[21px]">
                        {display.title}
                    </button>
                </Link>

            ))}
      </div>

    </div>
  );
}