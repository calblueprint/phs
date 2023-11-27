import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { SpotlightWithMediaRow } from '../types/types';
import { joinSpotlightsWithMedia } from '@/supabase/tours/queries';

/**
 * !!! WIP !!!
 * @param root0
 * @param root0.mediaSpotlights
 * @param root0.SpotlightsWithMedia
 * @param root0.spotlightsWithMedia
 * @returns - For the Home page: Give a preview of content stored on the spotlights page
 * See All button will lead to the spotlights home page
 * Spotlight scroller will showcase and link to chosen spotlights
 */
function HomeWildlifeSpotlights(
  // {spotlightsWithMedia} : {spotlightsWithMedia : SpotlightWithMediaRow[]}
  ) {
  const [spotlightsWithMedia, setSpotlightsWithMedia] = useState<SpotlightWithMediaRow[]>([]);
  useEffect(() => {
    /**
     * @returns - !!! WIP !!! Used to fetch data for the spotlights with media
     */
    async function fetchData() {
      try {
        const responseData = await joinSpotlightsWithMedia();
        setSpotlightsWithMedia(responseData);
      } catch (error) {
        console.error("Error in fetch data: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-full h-5 justify-between items-center wx-4 inline-flex">
        <h3 className="text-night ml-4 ">Our Wildlife Spotlights</h3>
        <Link
          className="b1 text-asparagus inline-flex items-center mr-4"
          href = "/spotlightPage"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </Link>
      </div>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 rounded-box w-full">
        {spotlightsWithMedia.map((spotlight : SpotlightWithMediaRow) => (
          <img
           className="carousel-item w-[234.78px] h-[275px] bg-gradient-to-b from-zinc-800 to-black rounded-lg"
           src={spotlight.media_url}
           alt = "background for spotlight"
           key = {spotlight.id}
           />
            )
        )}
        {/* <div className="carousel-item w-60 h-72 bg-gradient-to-b from-zinc-800 to-black rounded-lg">
          test
        </div>
        <div className="carousel-item w-60 h-68.75 bg-gradient-to-b from-zinc-800 to-black rounded-lg">
          test
        </div>
        <div className="carousel-item w-60 h-68.75 bg-gradient-to-b from-zinc-800 to-black rounded-lg">
          test
        </div>
        <div className="carousel-item w-60 h-68.75 bg-gradient-to-b from-zinc-800 to-black rounded-lg">
          test
        </div>
        <div className="carousel-item w-60 h-68.75 bg-gradient-to-b from-zinc-800 to-black rounded-lg">
          test
        </div> */}
      </div>
    </div>
  );
}

export default HomeWildlifeSpotlights;
