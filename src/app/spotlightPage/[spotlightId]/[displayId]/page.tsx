'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, MediaRow } from '../../../../types/types';
import NavBar from '../../../../components/userComponents/navBar/navBar';
import { fetchDisplayFromId } from '../../../../supabase/displays/queries';
import { fetchDisplayfromSpotlight } from '../../../../supabase/tour_displays/queries';
import BackButton from '../../../../components/userComponents/BackButton/BackButton';
import Carousel from '../../../../components/userComponents/ImageScroller/ImageScroller';
import { fetchImagesForDisplay } from '../../../../supabase/media/queries';

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
  const [display, setDisplay] = useState<DisplayRow>({
    coordinates: { 0: 0 },
    created_at: 'N/A',
    description: 'N/A',
    id: '0',
    title: 'N/A',
    updated_at: 'N/A',
  });

  const [otherDisplays, setOtherDisplays] = useState<DisplayRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);

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

    // Fetch the display media
    const fetchDisplayMedia = async () => {
      const displayMedia = await fetchImagesForDisplay(params.displayId);
      setMedia(displayMedia || []);
    };

    fetchData();
    fetchDisplayMedia();
  }, []);

  return (
    <div className="bg-ivory">
      <NavBar />
      <Link
        href={`/spotlightPage/${params.spotlightId}`}
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="mb-6">
        {media.length > 0 && <Carousel media={media} />}
      </div>
      <h1 className="text-night font-lato text-3xl text-14 font-bold px-[18px] pt-[8px]">
        {display.title}
      </h1>
      <p className="text-night font-lato px-[18px] pt-[16px] pb-[32px]">
        {display.description}
      </p>
      <h1 className="text-night font-bold font-Lato text-[18px] px-[18px]">
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
              className="bg-mint-cream text-scary-forest w-[354px] h-[60px] text-ivory font-bold rounded-2xl px-[31px] truncate"
            >
              {otherDisplay.title}
            </button>
          </Link>
        ))}
      </div>

      {/* <div className="bg-[#F5F6F5] mb-10">
        <div className="bg-[#BDBDBD] h-[0.03125rem]" />
        <div className="flex flex-col px-[1.12rem] py-8 gap-6">
          <h3 className="text-night font-medium">Related Links</h3>
          <ol className="px-[0.88rem]">
            {tourMedia.map((tm, index) => (
              <li key={tm.media_id} className="flex flex-col gap-4">
                <Link
                  href={media.find(m => m.id === tm.media_id)?.url ?? '-1'}
                  className="flex flex-col gap-1"
                >
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="text-shadow text-sm font-light uppercase">
                      {media.find(m => m.id === tm.media_id)?.type}
                    </h4>
                    <ExternalLinkIcon />
                  </div>
                  <h4 className="font-normal">
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
      </div> */}
    </div>
  );
}
