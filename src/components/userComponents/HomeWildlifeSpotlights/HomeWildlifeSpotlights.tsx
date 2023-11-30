import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { joinSpotlightsWithMedia } from '../../../supabase/tours/queries';
import { SpotlightWithMediaRow } from '../../../types/types';

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
          <div
            key={spotlight.id}
            className="carousel-item w-[234.78px] h-[275px] bg-gradient-to-b from-zinc-800 to-black rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-full object-cover rounded-lg"
              src={spotlight.media_url}
              alt="background for spotlight"
            />
            <div className="bg-red-400 flex-col justify-start items-start gap-2 inline-flex">
              <div className="w-[181px] text-stone-50 text-xl font-extrabold font-['Lato']">Dove Flight Enclosures</div>
              <div className="w-[181px] text-stone-50 text-sm font-normal font-['Lato']">Species diversity, reproduction, and conservation</div>
            </div>
          </div>
            )
        )
        }
      </div>
    </div>
  );
}

export default HomeWildlifeSpotlights;
