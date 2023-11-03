/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, TourDisplaysRow } from '@/types/types';
import NavBar from '@/components/userComponents/navBar/navBar';
import supabase from '@/supabase/client';

export default function Page({
  params,
}: {
  params: { tourId: string; displayId: string };
}) {
  const [display, setDisplay] = useState<DisplayRow>();
  const [prev, setPrev] = useState<string>(
    `/featuredToursPage/${params.tourId}`,
  );
  const [next, setNext] = useState<string>(
    `/featuredToursPage/${params.tourId}/tourEndPage`,
  );

  useEffect(() => {
    // Fetch display details
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

    // Fetch tour displays to get the display order
    async function fetchTourDisplays() {
      try {
        const { data, error } = await supabase
          .from('tour_displays')
          .select('*')
          .eq('tour_id', params.tourId);
        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error('No data found');
        }
        console.log('Obtained tour displays');
        const responseData: TourDisplaysRow[] = data;

        // Sort the responseData array in ascending display_order
        responseData.sort(
          (a, b) => (a?.display_order || 0) - (b?.display_order || 0),
        );

        return responseData;

      } catch (error) {
        console.error('Error fetching tour displays:', error);
      }
    }

    // Get the links for the previous and next displays or pages
    async function fetchLinks() {
      const tourDisplays: TourDisplaysRow[] = await fetchTourDisplays();
      const index = tourDisplays.findIndex(
        tourDisplay => tourDisplay.display_id === params.displayId,
      );

      if (index === -1) {
        console.error('Display not found in tour displays');
      } else if (index === 0) {
        setNext(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index + 1].display_id
          }`,
        );
      } else if (index === tourDisplays.length - 1) {
        setPrev(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index - 1].display_id
          }`,
        );
      } else {
        setPrev(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index - 1].display_id
          }`,
        );
        setNext(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index + 1].display_id
          }`,
        );
      }
    }

    fetchDisplay();
    fetchLinks();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <h1 className="text-[#333333] text-3xl font-bold p-4">
        {display && display.title}
      </h1>

      <p className="text-[#333333] p-4 font-medium">
        {display && display.description}
      </p>
      {/* TODO: Add tour-specific image */}
      <img
        src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="placeholder"
      />
      {/* TODO: Add tour-specific text */}
      <p className="text-[#333333] px-4 py-2">
        Scientifically known as Procyon lotor, raccoons are highly adaptable
        creatures with a wide range of habitats across North and Central
        America. They are often found in wooded areas, making their homes in the
        hollows of trees, old burrows, or even rock crevices.
      </p>
      <p className="text-[#333333] px-4 py-2">
        Raccoons are equally comfortable in urban and suburban settings, where
        they utilize human-made structures like attics, garages, and abandoned
        buildings as dens. Wetlands and riparian habitats near water sources are
        also common areas for raccoons due to their affinity for aquatic
        foraging. These omnivorous mammals display a remarkable ability to
        thrive in various environments, making them one of the most widely
        distributed and resilient wildlife species on the continent.
      </p>
      <div className="flex flex-row justify-between p-4">
        <Link
          className="bg-[#386131] text-center w-[48%] h-16 rounded-2xl"
          href={prev}
        >
          <h2 className="relative top-[30%] text-white font-bold">Back</h2>
        </Link>
        <Link
          className="bg-[#386131] text-center w-[48%] h-16 rounded-2xl"
          href={next}
        >
          <h2 className="relative top-[30%] text-white font-bold">Next</h2>
        </Link>
      </div>
      <div>
        <h4 className="text-[#386131] p-4 font-bold">
          <Link href="/featuredToursPage">Exit this tour</Link>
        </h4>
      </div>
    </div>
  );
}