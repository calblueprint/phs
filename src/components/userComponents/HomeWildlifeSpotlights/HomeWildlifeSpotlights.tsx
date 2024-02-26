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
function HomeWildlifeSpotlights() {
  // {spotlightsWithMedia} : {spotlightsWithMedia : SpotlightWithMediaRow[]}
  const [spotlightsWithMedia, setSpotlightsWithMedia] = useState<
    SpotlightWithMediaRow[]
  >([]);
  useEffect(() => {
    /**
     * @returns - Takes a tour and media table and joins them together, joined data has image + info from spotlight.
     */
    async function fetchData() {
      try {
        const responseData = await joinSpotlightsWithMedia();
        setSpotlightsWithMedia(responseData);
      } catch (error) {
        console.error('Error in fetch data: ', error);
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
          href="/spotlightPage"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </Link>
      </div>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 rounded-box w-full">
        {spotlightsWithMedia.map((spotlight: SpotlightWithMediaRow) => (
          <Link href={`/spotlightPage/${spotlight.id}`} key={spotlight.id}>
            <div className="relative carousel-item w-56 h-64 bg-gradient-to-b from-zinc-800 to-black rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={spotlight.media_url}
                alt="background for spotlight"
              />
              <div className="absolute bottom-0.5 p-4">
                <div className="w-45.25 text-stone-50 text-xl font-extrabold">
                  {spotlight.name}
                </div>
                <div className="w-28 h-9 text-stone-50 text-sm font-normal line-clamp-2">
                  {spotlight.preview_text}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeWildlifeSpotlights;
