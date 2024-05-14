'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { fetchAllDisplays } from '../../../supabase/displays/queries';
import { fetchMedia } from '../../../supabase/media/queries';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchTourDisplays } from '../../../supabase/tour_displays/queries';
import { fetchTourMedia } from '../../../supabase/tour_media/queries';
import {
  DisplayRow,
  MediaRow,
  TourDisplaysRow,
  TourMediaRow,
  TourRow,
} from '../../../types/types';

import BackButton from '../../../components/userComponents/BackButton/BackButton';
import NavBar from '../../../components/userComponents/NavBar/NavBar';

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
  const [isWide, setIsWide] = useState(false);

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

  return isWide
    ? tour && (
        <div className="bg-ivory w-full min-h-screen">
          <NavBar />
          <div className="py-[6.25rem]">
            <div className="flex flex-row h-[38.9375rem]">
              <div className="w-[42.25rem] h-[38.9375rem]">
                {media.length > 0 && (
                  <img
                    key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
                    src={
                      media.find(m => m.id === tourMedia[0]?.media_id)?.url ??
                      ''
                    }
                    alt={
                      media.find(m => m.id === tourMedia[0]?.media_id)?.text ??
                      ''
                    }
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className="bg-mint-cream px-[5.62rem] flex flex-col flex-auto gap-8 justify-center">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="s1 text-night">WELCOME TO</p>
                    <h1 className="text-night truncate">{tour.name}</h1>
                  </div>
                  <div className="flex flex-col gap-[2.62rem]">
                    <Link
                      href={`/virtual-tours/${params.tourId}/${tourDisplays[0]?.display_id}`}
                    >
                      <div className="w-[12.625rem] px-4 py-[0.62rem] bg-asparagus rounded-lg flex justify-center">
                        <p className="b1 text-ivory">Start Tour</p>
                      </div>
                    </Link>
                    <div className="bg-silver max-w-[36rem] h-[0.03125rem]" />
                  </div>
                </div>

                <div className="flex flex-col relative gap-5">
                  <div className="flex flex-row gap-4 items-center">
                    <h4 className="text-night">In this tour</h4>
                    <div className="bg-[#F5EDCF80] w-[4.375rem] h-[1.5rem] rounded-[0.5625rem] px-3 py-1 flex items-center justify-center">
                      <p className="s3 text-night">{tour.stop_count} stops</p>
                    </div>
                  </div>
                  <ol className="pl-2 flex flex-col gap-[0.88rem]">
                    {tourDisplays.map(tourDisplay => (
                      <li key={tourDisplay.display_id}>
                        <p className="b3 text-night">
                          {tourDisplay.display_order != null
                            ? tourDisplay.display_order + 1
                            : ''}
                          .{' '}
                          {
                            displays.find(
                              display => display.id === tourDisplay.display_id,
                            )?.title
                          }
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    : tour && (
        <div className="bg-ivory w-full min-h-screen">
          <NavBar />
          <div className="flex flex-col items-center">
            <Link
              href="/virtual-tours"
              className="absolute top-[5.25rem] left-[1.12rem] z-10"
            >
              <BackButton />
            </Link>
            <div className="w-full h-[15.3125rem]">
              {media.length > 0 && (
                <img
                  key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
                  src={
                    media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''
                  }
                  alt={
                    media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? ''
                  }
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            <div className="w-[24.375rem] flex flex-col px-[1.125rem] absolute top-[17.81rem] gap-6 mb-[2.5rem]">
              <div className="bg-mint-cream w-[22.125rem] rounded-lg px-[2.1875rem] py-[2.25rem] flex-col items-center gap-3 inline-flex">
                <div className="flex flex-col w-[22.125rem] px-[2.1875rem] text-center gap-1">
                  <p className="s1 text-night">WELCOME TO</p>
                  <h1 className="text-night truncate">{tour.name}</h1>
                </div>
                <Link
                  href={`/virtual-tours/${params.tourId}/${tourDisplays[0]?.display_id}`}
                >
                  <div className="w-[12.625rem] px-4 py-[0.62rem] bg-asparagus rounded-lg flex justify-center items-center gap-2.5">
                    <p className="b1 text-ivory">Start Tour</p>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col relative gap-4 mb-10">
                <div className="flex justify-between items-center">
                  <h4 className="text-night">In this tour</h4>
                  <div className="bg-[#F5EDCF80] w-[4.375rem] h-[1.5rem] rounded-[0.5625rem] px-3 py-1 flex justify-center items-center">
                    <p className="s3 text-night">{tour.stop_count} stops</p>
                  </div>
                </div>
                <ol>
                  {tourDisplays.map(tourDisplay => (
                    <li
                      key={tourDisplay.display_id}
                      className="mb-[0.44rem] ml-4"
                    >
                      <p className="b3 text-night">
                        {tourDisplay.display_order != null
                          ? tourDisplay.display_order + 1
                          : ''}
                        .{' '}
                        {
                          displays.find(
                            display => display.id === tourDisplay.display_id,
                          )?.title
                        }
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
}
