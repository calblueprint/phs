'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, MediaRow, TourMediaRow } from '../../../../types/types';
import NavBar from '../../../../components/userComponents/navBar/navBar';
import { fetchDisplayFromId } from '../../../../supabase/displays/queries';
import { fetchDisplayfromSpotlight } from '../../../../supabase/tour_displays/queries';
import BackButton from '../../../../components/userComponents/BackButton/BackButton';
import Carousel from '../../../../components/userComponents/ImageScroller/ImageScroller';
import { fetchImagesForDisplay } from '../../../../supabase/media/queries';
import { ExternalLinkIcon } from '../../../../../public/Icons';
import { fetchTourMedia } from '../../../../supabase/tour_media/queries';

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
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);

  useEffect(() => {
    /**
     * @returns a display
     */
    async function fetchData() {
      try {
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
      } catch (error) {
        console.error(error);
      }
    }

    // Get tour media
    const getTourMedia = async () => {
      const fetchedTourMedia = await fetchTourMedia(params.spotlightId);
      setTourMedia(fetchedTourMedia);
    };

    // Fetch the display media
    const fetchDisplayMedia = async () => {
      const displayMedia = await fetchImagesForDisplay(params.displayId);
      setMedia(displayMedia || []);
    };

    fetchData();
    getTourMedia();
    fetchDisplayMedia();
  }, []);

  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <Link
        href={`/spotlightPage/${params.spotlightId}`}
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="mb-6">
        {media.length > 0 ? (
          <Carousel media={media} />
        ) : (
          <div className="bg-scary-forest relative w-full h-[15.3125rem]" />
        )}
      </div>
      <h1 className="text-night font-lato text-3xl text-14 font-bold px-[18px] pt-[8px]">
        {display.title}
      </h1>
      <p className="text-night font-lato px-[18px] pt-[16px] pb-[32px]">
        {display.description}
      </p>

      {otherDisplays.length > 0 && (
        <div>
          <h1 className="text-night font-bold font-lato text-[18px] px-[18px]">
            More in this spotlight...
          </h1>

          <div className="flex flex-wrap flex-col gap-[14px] px-[18px] pt-[16px] pb-[48px] w-screen overflow-x-auto">
            {otherDisplays.map(otherDisplay => (
              <Link
                key={otherDisplay.id}
                href={`/spotlightPage/${params.spotlightId}/${otherDisplay.id}?spotlightId=${params.spotlightId}`}
              >
                <button
                  type="button"
                  className="bg-mint-cream border-l-[0.3125rem] border-l-asparagus text-scary-forest font-lato w-[354px] h-[60px] font-bold rounded-2xl px-[31px] truncate"
                >
                  {otherDisplay.title}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {tourMedia.length > 0 && (
        <div>
          <div className="bg-[#F5F6F5] mb-4">
            <div className="bg-[#BDBDBD] h-[0.03125rem]" />
            <div className="flex flex-col px-[1.12rem] py-8 gap-6">
              <h3 className="text-night font-lato font-normal">Related Links</h3>
              <ol className="px-[0.88rem]">
                {tourMedia.map((tm, index) => (
                  <li key={tm.media_id} className="flex flex-col gap-4">
                    <Link
                      href={media.find(m => m.id === tm.media_id)?.url ?? '-1'}
                      className="flex flex-col gap-1"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <h4 className="text-shadow font-lato text-sm font-light uppercase">
                          {media.find(m => m.id === tm.media_id)?.type}
                        </h4>
                        <ExternalLinkIcon />
                      </div>
                      <h4 className="text-night font-lato font-normal">
                        {media.find(m => m.id === tm.media_id)?.title}
                      </h4>
                    </Link>
                    {index !== tourMedia.length - 1 && (
                      <div className="bg-[#BDBDBD] h-[0.03125rem] mb-6" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-[#BDBDBD] h-[0.03125rem]" />
          </div>
        </div>
      )}

      <h4 className="text-[#386131] font-lato font-semibold px-[25px] pb-[40px]">
        <Link href="/spotlightPage">See all spotlights</Link>
      </h4>
    </div>
  );
}