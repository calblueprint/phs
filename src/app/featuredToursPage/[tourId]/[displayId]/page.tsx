/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow } from '@/types/types';
import NavBar from '@/components/userComponents/navBar/navBar';
import supabase from '@/supabase/client';

export default function Page({ params }: { params: { displayId: string } }) {
  const [display, setDisplay] = useState<DisplayRow>();

  useEffect(() => {
    async function fetchDisplay() {
      try {
        const { data, error } = await supabase
          .from('displays')
          .select('*')
          .eq('id', params.displayId)
          .single();
        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error('No data found');
        }
        console.log('Obtained display details');
        const responseData: DisplayRow = data;
        setDisplay(responseData);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    }

    fetchDisplay();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <h1 className="text-[#333333] text-3xl font-bold p-4">
        {display && display.title}
      </h1>
      <p className="text-[#333333] p-4">{display && display.description}</p>
      {/* TODO: Add tour-specific image */}
      <img
        src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="placeholder"
      />
      {/* TODO: Add tour-specific text */}
      <p className="text-[#333333] p-4">
        Scientifically known as Procyon lotor, raccoons are highly adaptable
        creatures with a wide range of habitats across North and Central
        America. They are often found in wooded areas, making their homes in the
        hollows of trees, old burrows, or even rock crevices. Raccoons are
        equally comfortable in urban and suburban settings, where they utilize
        human-made structures like attics, garages, and abandoned buildings as
        dens. Wetlands and riparian habitats near water sources are also common
        areas for raccoons due to their affinity for aquatic foraging. These
        omnivorous mammals display a remarkable ability to thrive in various
        environments, making them one of the most widely distributed and
        resilient wildlife species on the continent.
      </p>
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
