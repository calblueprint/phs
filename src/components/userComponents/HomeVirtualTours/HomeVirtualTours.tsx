/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/check-param-names */
import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { joinAllToursWithMedia } from '../../../supabase/tours/queries';
import { TourWithMediaRow } from '../../../types/types';

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
function HomeVirtualTours(): React.JSX.Element {
  // {spotlightsWithMedia} : {spotlightsWithMedia : SpotlightWithMediaRow[]}
  const [tourWithMedia, setToursWithMedia] = useState<
    TourWithMediaRow[]
  >([]);
  useEffect(() => {
    /**
     * @returns - Takes a tour and media table and joins them together, joined data has image + info from spotlight.
     */
    async function fetchData() {
      try {
        const responseData: TourWithMediaRow[] =
          await joinAllToursWithMedia();
        setToursWithMedia(responseData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in fetch data: ', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div 
    className="pl-4 py-20 w-full bg-mint-cream flex-col justify-start 
    items-start gap-6 inline-flex">
      <div className="w-full h-5 justify-between items-center inline-flex">
        <h2 className="text-night font-medium">Virtual Tours</h2>
        <Link
          className="b1 text-asparagus inline-flex items-center mr-4"
          href="/featuredToursPage"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </Link>
      </div>
      <p className='b3 text-night'>
        In order to prioritize the well-being of our animals and provide them with the space to fully recover, 
        parts of our facility remain closed to the public.
        However, you`re invited to explore them virtually and learn about our fascinating
         inhabitants through our online featured tours!
      </p>
      <div className="carousel carousel-center space-x-4 mt-6 rounded-lg w-full">
        {/* NOTE: Uncomment this once WE HAVE ENOUGH DUMMY DATA */}
        {tourWithMedia.map((tour: TourWithMediaRow) => (
          <Link href="/homePage" key={tour.id}>
            <div className="relative carousel-item w-60 h-48 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
              <img
                className="object-cover rounded-lg"
                src={tour.media_url}
                alt="background for spotlight"
              />
              <div className="absolute bottom-0.5 p-4 space-y-2 flex-col">
                <p className="s1 font-light line-clamp-2">
                  {tour.stop_count} stops
                </p>
                <h4 className="w-45">
                  {tour.name}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeVirtualTours;
