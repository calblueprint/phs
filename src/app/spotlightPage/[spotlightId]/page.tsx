'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { TourRow, DisplayRow, MediaRow, TourMediaRow } from '../../../types/types';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchMedia } from '../../../supabase/media/queries';
import { fetchTourMedia } from '../../../supabase/tour_media/queries';
import NavBar from '../../../components/userComponents/navBar/navBar';
import { fetchDisplayfromSpotlight, fetchRelatedSpotlightsfromSpotlightId } from '../../../supabase/tour_displays/queries';
import BackButton from '../../../components/userComponents/BackButton/BackButton';

/**
 * @param params -
 * @param params.params -
 * @param params.params.spotlightId -
 * @returns a spotlight page given a spotlight Id
 */
export default function Page({ params }: { params: { spotlightId: string } }) {
  const [spotlight, setSpotlight] = useState<TourRow>([]);
  const [displays, setDisplays] = useState<DisplayRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);
  const [relatedSpotlights, setRelatedSpotlights] = useState<TourRow[]>([])

  useEffect(() => {
    /**
     * @returns data from tour table and display table
     */
    async function fetchData() {
      const responseDataForSpotlight: TourRow = await fetchTour(
        params.spotlightId,
      );
      setSpotlight(responseDataForSpotlight);

      const responseDataForDisplays: DisplayRow[] =
        await fetchDisplayfromSpotlight(params.spotlightId);
      setDisplays(responseDataForDisplays);

      const responseDataForRelatedSpotlights: TourRow[] = await fetchRelatedSpotlightsfromSpotlightId(params.spotlightId);
      setRelatedSpotlights(responseDataForRelatedSpotlights);
    }

    // Get tour media
    const getTourMedia = async () => {
      const fetchedTourMedia = await fetchTourMedia(params.spotlightId);
      setTourMedia(fetchedTourMedia);
    };

    // Get media
    const getMedia = async () => {
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    fetchData();
    getTourMedia();
    getMedia();
  }, []);

  return (
    <div className="bg-ivory w-[24.375rem] min-h-full">
      <NavBar />
      <Link
        href="/spotlightPage"
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="relative w-[24.375rem] h-[15.3125rem]">
        {media.length > 0 && (
          <Image
            className="w-[24.375rem] h-[15.3125rem] relative"
            key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
            src={media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''}
            alt={media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? 'Spotlight display image'}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </div>
      <div className="flex flex-col px-[18px] pt-[32px] pb-[24px] gap-2">
        <h1 className="text-night font-lato text-3xl text-14 font-semibold">
          {spotlight.name}
        </h1>
        <p className="text-night font-lato">{spotlight.description}</p>
      </div>
      <div className="flex flex-col px-[18px] gap-[20px]">
        <h1 className="text-night font-lato font-bold text-[18px]">
          In this spotlight...
        </h1>
        
        <div className="flex flex-wrap gap-[14px]">
          {displays.map(display => (
            <Link
              key={display.id}
              href={`/spotlightPage/${spotlight.id}/${display.id}?spotlightId=${spotlight.id}`}
            >
              <button
                type="button"
                className="bg-mint-cream w-[354px] h-[60px] text-scary-forest font-lato truncate rounded-2xl px-[31px]"
              >
                {display.title}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-[#BDBDBD] h-[0.03125rem] my-[40px]" />

      <div>
        <h1 className="text-night font-lato font-bold text-[18px] px-[18px] pb-[16px]">
          Related Spotlights
        </h1>

        <ul className="list-none flex">
          {relatedSpotlights.map(otherSpotlight => (
            <li
              className="pl-[18px] w-[162px] overflow-x-auto"
              key={otherSpotlight.id}
            >
              <Link href={`/spotlightPage/${spotlight.id}`}>
                <div className="bg-[#386131] h-[169px] rounded-2xl p-[18px] flex flex-col" />
                <h4 className="text-night font-lato text-20 font-bold mt-2">
                  {otherSpotlight.name}
                </h4>
                <h2 className="text-gray font-lato text-sm font-normal">
                  {otherSpotlight.preview_text}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}