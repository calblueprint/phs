/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/check-param-names */
import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { joinAllSpotlightsWithMedia } from '../../../../supabase/tours/queries';
import { SpotlightWithMediaRow } from '../../../../types/types';
import { useWebDeviceDetection } from '../../../../context/WindowWidthContext/WindowWidthContext';

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
  const isWebDevice = useWebDeviceDetection();
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
    <div className="pl-4 web:px-48 py-20 web:py-25 bg-ivory ">
      <div className=" h-5 w-full web:px-51 justify-between items-center inline-flex ">
        <h3 className="text-night">Our Wildlife Spotlights</h3>
        {!isWebDevice && (
          <Link
            className="b1 inline-flex items-center
            text-asparagus hover:text-hunter-green focus:text-hunter-green"
            href="/wildlife-spotlights"
          >
            See All
            <HiChevronRight className="text-2xl" />
          </Link>
        )}
      </div>
      <div className="carousel carousel-center space-x-4  web:px-51 web:w-280 mt-6 rounded-lg w-full">
        {spotlightsWithMedia.map((spotlight: SpotlightWithMediaRow) => (
          <Link href={`/wildlife-spotlights/${spotlight.id}`} key={spotlight.id}>
            <div
              className="relative 
            carousel-item w-60 h-72 web:w-96 rounded-lg 
            overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
              <img
                className="object-cover object-center w-full h-full rounded-lg"
                src={spotlight.media_url}
                alt="background for spotlight"
              />
              <div
                className="absolute bottom-0.5 
              p-4 web:pl-7 web:pr-24 web:pt-40 web:pb-8 space-y-2 flex-col"
              >
                <h4 className="w-45">{spotlight.name}</h4>
                <p className="s1 font-light line-clamp-2">
                  {spotlight.preview_text}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div
        className=" h-5 w-full web:px-51 text-center
       justify-center inline-flex "
      >
        {isWebDevice && (
          <Link
            className="b1 mt-8 inline-flex text-center justify-center
            text-asparagus hover:text-hunter-green focus:text-hunter-green"
            href="/wildlife-spotlights"
          >
            See all wildlife spotlights
            <HiChevronRight className="text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomeWildlifeSpotlights;
