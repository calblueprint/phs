'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, MediaRow } from '@/types/types';
import NavBar from '@/components/userComponents/navBar/navBar';
import supabase from '@/supabase/client';
import { fetchImagesForDisplay } from '../../../../supabase/media/queries';
import Carousel from '../../../../components/userComponents/ImageScroller/ImageScroller';
/**
 * The page that displays a tour stop.
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID.
 * @param params.params.displayId - The display ID.
 * @returns The tour stop page.
 */
export default function TourStopPage({
  params,
}: {
  params: { tourId: string; displayId: string };
}) {
  const [display, setDisplay] = useState<DisplayRow>();
  const [media, setMedia] = useState<MediaRow[]>([]);
  // TODO: add loading state for page – only render after isLoading == false
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        const responseData: DisplayRow = data;
        setDisplay(responseData);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    }

    getDisplay();
    getLinks();
  }, [params.displayId, params.tourId]);

  useEffect(() => {
    async function fetchDisplayMedia() {
      try {
        const displayMedia = await fetchImagesForDisplay(display?.id);
        displayMedia && setMedia(displayMedia);
        setIsLoading(false);
      } catch (e) {
        throw e;
      }
    }

    fetchDisplayMedia();
  }, [display]);

  return (
    <div className="bg-[#ebf0e4] h-full">
      <NavBar />
      <h1 className="text-[#333333] text-3xl font-bold p-4">
        {display && display.title}
      </h1>
      {/* TODO: add short description field in supabase */}
      <p className="text-[#333333] p-4">Short display description here</p>
      {media && <Carousel media={media} />}
      <p className="text-[#333333] p-4">{display && display.description}</p>
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
