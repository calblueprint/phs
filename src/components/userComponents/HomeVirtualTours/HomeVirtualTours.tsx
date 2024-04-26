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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [tourWithMedia, setToursWithMedia] = useState<TourWithMediaRow[]>([]);
  useEffect(() => {
    /**
     * @returns - Takes a tour and media table and joins them together, joined data has image + info from spotlight.
     */
    async function fetchData() {
      try {
        const responseData: TourWithMediaRow[] = await joinAllToursWithMedia();
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
      className="pl-4 py-20 web:px-56 web:py-24 w-full bg-mint-cream flex-col justify-start 
    items-start gap-6 inline-flex"
    >
      <div className="w-full web:w-280 h-5 justify-between items-center inline-flex">
        <h2 className="text-night font-medium">Virtual Tours</h2>
        {windowWidth < 1024 && (
          <Link
            className="b1 text-asparagus inline-flex items-center mr-4"
            href="/featuredToursPage"
          >
            See All
            <HiChevronRight className="text-2xl" />
          </Link>
        )}
        {/* <Link
          className="b1 text-asparagus inline-flex items-center mr-4"
          href="/featuredToursPage"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </Link> */}
      </div>
      <p className="b3 text-night">
        In order to prioritize the well-being of our animals and provide them
        with the space to fully recover, parts of our facility remain closed to
        the public. However, you`re invited to explore them virtually and learn
        about our fascinating inhabitants through our online featured tours!
      </p>
      <div className="carousel carousel-center web:w-280 space-x-4 mt-6 rounded-lg w-full">
        {/* NOTE: Uncomment this once WE HAVE ENOUGH DUMMY DATA */}
        {tourWithMedia.map((tour: TourWithMediaRow) => (
          <Link href="/homePage" key={tour.id}>
            <div className="relative carousel-item w-60 web:w-80 h-48 web:h-60 rounded-lg overflow-hidden">
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
                <h4 className="w-45">{tour.name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div
        className=" h-5 w-full web:px-51 text-center
       justify-center inline-flex "
      >
        {windowWidth >= 1024 && (
          <Link
            className="b1 mt-8 text-asparagus inline-flex text-center justify-center"
            href="/featuredToursPage"
          >
            See all virtual tours
            <HiChevronRight className="text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomeVirtualTours;
