'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { fetchAllDisplays } from '../../../supabase/displays/queries';
import { fetchMedia } from '../../../supabase/media/queries';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchTourDisplays } from '../../../supabase/tour_displays/queries';
import { fetchTourMedia } from '../../../supabase/tour_media/queries';
import { DisplayRow, MediaRow, TourDisplaysRow, TourMediaRow, TourRow } from '../../../types/types';

import BackButton from '../../../components/userComponents/BackButton/BackButton';
import NavBar from '../../../components/userComponents/navBar/navBar';

/**
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID
 * @returns The tour start page
 */
export default function TourStartPage({
  params,
}: {
  params: { tourId: string };
}) {
  const [tour, setTour] = useState<TourRow>();
  const [tourDisplays, setTourDisplays] = useState<TourDisplaysRow[]>([]);
  const [displays, setDisplays] = useState<DisplayRow[]>([]);
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);

  useEffect(() => {
    // Fetch tour, tour displays, and tour media data
    const fetchData = async () => {
      const fetchedTour = await fetchTour(params.tourId);
      setTour(fetchedTour);
      const fetchedTourDisplays = await fetchTourDisplays(params.tourId);
      setTourDisplays(fetchedTourDisplays);
      const fetchedDisplays = await fetchAllDisplays();
      setDisplays(fetchedDisplays);
      const fetchedTourMedia = await fetchTourMedia(params.tourId);
      setTourMedia(fetchedTourMedia);
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    fetchData();
  }, [params.tourId]);

  return (
    tour && (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <Link
        href="/featuredToursPage"
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="bg-scary-forest relative w-[24.375rem] h-[15.3125rem]">
        {media.length > 0 && (
          <Image
            key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
            src={media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''}
            alt={media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? ''}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </div>

      <div className="w-[24.375rem] flex flex-col px-[1.125rem] absolute top-[17.81rem] gap-6 mb-[2.5rem]">
        <div className="bg-mint-cream w-[22.125rem] rounded-md px-[2.1875rem] py-[2.25rem] flex-col items-center gap-3 inline-flex">
          <div className="flex flex-col w-[22.125rem] rounded-md px-[2.1875rem] text-center gap-1">
            <h2 className="text-night text-sm font-lato font-normal">WELCOME TO</h2>
            <h1 className="text-night font-lato text-[2rem] truncate font-bold">
              {tour.name}
            </h1>
          </div>
          <div className="w-[12.625rem] px-4 py-[0.62rem] bg-asparagus rounded-lg justify-center items-center gap-2.5">
            <Link
              href={`/featuredToursPage/${params.tourId}/${tourDisplays[0]?.display_id}`}
            >
              <h2 className="text-ivory text-center text-base font-lato font-bold">
                Start Tour
              </h2>
            </Link>
          </div>
        </div>

        <p className="text-night font-lato font-normal">{tour.description}</p>

        <div className="flex flex-col relative gap-4 mb-10">
          <div className="flex justify-between items-center">
            <h3 className="text-night font-lato text-lg font-bold">In this tour</h3>
            <div className="bg-[#F5EDCF80] w-[4.375rem] h-[1.5rem] rounded-[0.5625rem] px-3 py-1">
              <p className="text-night font-lato font-normal text-xs text-center">
                {tour.stop_count} stops
              </p>
            </div>
          </div>
          <ol>
            {tourDisplays.map(tourDisplay => (
              <li key={tourDisplay.display_id} className="mb-[0.44rem] ml-4">
                <h4 className="font-normal font-lato">
                  {tourDisplay.display_order != null
                    ? tourDisplay.display_order + 1
                    : ''}
                  .{' '}
                  {
                    displays.find(
                      display => display.id === tourDisplay.display_id,
                    )?.title
                  }
                </h4>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
    )
  );
}
