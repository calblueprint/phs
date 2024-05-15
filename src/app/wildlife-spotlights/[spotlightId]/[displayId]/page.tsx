'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, MediaRow, TourRow } from '../../../../types/types';
import NavBar from '../../../../components/userComponents/NavBar/NavBar';
import { fetchDisplayFromId } from '../../../../supabase/displays/queries';
import { fetchTour } from '../../../../supabase/tours/queries';
import { fetchDisplayfromSpotlight } from '../../../../supabase/tour_displays/queries';
import BackButton from '../../../../components/userComponents/BackButton/BackButton';
import Carousel from '../../../../components/userComponents/ImageScroller/ImageScroller';
import { fetchImagesForDisplay } from '../../../../supabase/media/queries';
import SpotlightDisplayButton from '@/components/userComponents/SpotlightDisplayButton/SpotlightDisplayButton';

/**
 * @param root0 -
 * @param root0.params -
 * @param root0.params.displayId - The display ID
 * @param root0.params.spotlightId - The spotlight ID
 * @returns display page
 */
export default function Page({
  params,
}: {
  params: { displayId: string; spotlightId: string };
}) {
  const [display, setDisplay] = useState<DisplayRow>([]);
  const [otherDisplays, setOtherDisplays] = useState<DisplayRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [spotlight, setSpotlight] = useState<TourRow>([]);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    /**
     * @returns a display
     */
    async function fetchData() {
      const currentDisplayData: DisplayRow = await fetchDisplayFromId(
        params.displayId,
      );
      setDisplay(currentDisplayData);

      const displaysFromSpotlight: DisplayRow[] =
        await fetchDisplayfromSpotlight(params.spotlightId);
      const currentDisplayId = params.displayId;
      const responseDataOtherDisplays = displaysFromSpotlight.filter(
        aDisplay => aDisplay.id !== currentDisplayId,
      );

      setOtherDisplays(responseDataOtherDisplays);
      const responseDataForSpotlight: TourRow = await fetchTour(
        params.spotlightId,
      );
      setSpotlight(responseDataForSpotlight);
    }

    // Fetch the display media
    const fetchDisplayMedia = async () => {
      const displayMedia = await fetchImagesForDisplay(params.displayId);
      setMedia(displayMedia || []);
    };

    fetchData();
    fetchDisplayMedia();
  }, []);

  useEffect(() => {
    if (window) {
      setIsWide(window.innerWidth >= 1024);
    }
    // Update isWide state on window resize
    const handleResize = () => setIsWide(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isWide ? (
    <div className="bg-ivory w-full min-h-screen">
      <NavBar />
      <div className="flex justify-center">
        <div className="flex flex-col gap-[3.12rem] py-[6.25rem]">
          <div className="flex flex-col gap-2">
            <p className="s2 text-scary-forest">{spotlight.name}</p>
            <h1 className="text-night">{display.title}</h1>
          </div>
          <div className="flex flex-row gap-[6.44rem]">
            <div className="w-[34.75rem] flex flex-col gap-8">
              <div className="w-[34.75rem] h-[21.9375rem]">
                {media.length > 0 && <Carousel media={media} />}
              </div>
              <p className="b3 text-night">{display.description}</p>
            </div>
            {otherDisplays.length > 0 && (
              <div className="flex flex-col gap-5 w-[20.875rem]">
                <h4 className="text-night">More in this spotlight...</h4>
                <div className="flex flex-col gap-[0.88rem]">
                  {otherDisplays.map(otherDisplay => (
                    <Link
                      key={otherDisplay.id}
                      href={`/wildlife-spotlights/${params.spotlightId}/${otherDisplay.id}?spotlightId=${params.spotlightId}`}
                    >
                      <div className="w-[20.875rem] h-[4.625rem]">
                        <SpotlightDisplayButton text={otherDisplay.title} />
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="b1 text-scary-forest">
                  <Link href="/wildlife-spotlights">See all spotlights</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-ivory w-full min-h-screen">
      <NavBar />
      <Link
        href={`/wildlife-spotlights/${params.spotlightId}`}
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="w-full h-[15.3125rem]">
        {media.length > 0 && <Carousel media={media} />}
      </div>
      <div className="px-[1.12rem] pt-8 pb-10">
        <div className="flex flex-col gap-5 mb-6">
          <div className="flex flex-col gap-2">
            <p className="s2 text-scary-forest">{spotlight.name}</p>
            <h1 className="text-night">{display.title}</h1>
          </div>
          <p className="b3 text-night">{display.description}</p>
        </div>

        {otherDisplays.length > 0 && (
          <div className="flex flex-col gap-4 mb-4">
            <h4 className="text-night">More in this spotlight...</h4>

            <div className="flex flex-col gap-[0.875rem] items-center">
              {otherDisplays.map(otherDisplay => (
                <Link
                  key={otherDisplay.id}
                  href={`/wildlife-spotlights/${params.spotlightId}/${otherDisplay.id}?spotlightId=${params.spotlightId}`}
                >
                  <div className="w-[22.125rem] h-[3.75rem]">
                    <SpotlightDisplayButton text={otherDisplay.title} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <p className="b1 text-scary-forest">
          <Link href="/wildlife-spotlights">See all spotlights</Link>
        </p>
      </div>
    </div>
  );
}
