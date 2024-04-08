/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/check-param-names */
import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { joinAllSpotlightsWithMedia } from '../../../supabase/tours/queries';
import { SpotlightWithMediaRow } from '../../../types/types';

/**
 // eslint-disable-next-line
 * @param root0
 * @param root0.mediaSpotlights - The media spotlights.
 * @param root0.SpotlightsWithMedia - The spotlights with media.
 * @param root0.spotlightsWithMedia - The spotlights with media.
 * @returns - For the Home page: Give a preview of content stored on the spotlights page
 * See All button will lead to the spotlights home page
 * Spotlight scroller will showcase and link to chosen spotlights
 */
function HomeWildlifeSpotlights(): React.JSX.Element {
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
        const responseData: SpotlightWithMediaRow[] =
          await joinAllSpotlightsWithMedia();
        setSpotlightsWithMedia(responseData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in fetch data: ', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="ml-4 my-20 bg-ivory">
      <div className="w-full h-5 justify-between items-center inline-flex">
        <h3 className="text-night">Our Wildlife Spotlights</h3>
        <Link
          className="b1 text-asparagus inline-flex items-center mr-4"
          href="/spotlightPage"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </Link>
      </div>
      <div className="carousel carousel-center space-x-4 mt-6 rounded-lg w-full">
        {spotlightsWithMedia.map((spotlight: SpotlightWithMediaRow) => (
          <Link href={`/spotlightPage/${spotlight.id}`} key={spotlight.id}>
            <div className="relative carousel-item w-60 h-72 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
              <img
                className="object-cover rounded-lg"
                src={spotlight.media_url}
                alt="background for spotlight"
              />
              <div className="absolute bottom-0.5 p-4 space-y-2 flex-col">
                <h4 className="w-45">{spotlight.name}</h4>
                <p className="s1 font-light line-clamp-2">
                  {spotlight.preview_text}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeWildlifeSpotlights;
