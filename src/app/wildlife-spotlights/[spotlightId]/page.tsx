'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  TourRow,
  DisplayRow,
  MediaRow,
  TourMediaRow,
} from '../../../types/types';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchMedia } from '../../../supabase/media/queries';
import {
  fetchAllTourMedia,
  fetchTourMedia,
} from '../../../supabase/tour_media/queries';
import NavBar from '../../../components/userComponents/navBar/navBar';
import {
  fetchDisplayfromSpotlight,
  fetchRelatedSpotlightsfromSpotlightId,
} from '../../../supabase/tour_displays/queries';
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
  const [allTourMedia, setAllTourMedia] = useState<TourMediaRow[]>([]);
  const [relatedSpotlights, setRelatedSpotlights] = useState<TourRow[]>([]);
  const [isWide, setIsWide] = useState(window.innerWidth >= 1024);

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

      const responseDataForRelatedSpotlights: TourRow[] =
        await fetchRelatedSpotlightsfromSpotlightId(params.spotlightId);
      setRelatedSpotlights(responseDataForRelatedSpotlights);
    }

    // Get tour media
    const getTourMedia = async () => {
      const fetchedTourMedia = await fetchTourMedia(params.spotlightId);
      setTourMedia(fetchedTourMedia);
    };

    // Get all tour media
    const getAllTourMedia = async () => {
      const fetchedAllTourMedia = await fetchAllTourMedia();
      setAllTourMedia(fetchedAllTourMedia);
    };

    // Get media
    const getMedia = async () => {
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    fetchData();
    getTourMedia();
    getMedia();
    getAllTourMedia();
  }, []);

  useEffect(() => {
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

      <div className="py-[6.25rem] flex justify-center">
        <div className="w-[62.125rem]">
          <div className="flex flex-col gap-7 mb-4">
            <p className="s3 text-night">
              <span className="text-scary-forest">
                Home / Wildlife Spotlights
              </span>{' '}
              / {spotlight.name}
            </p>

            <h1 className="text-night">{spotlight.name}</h1>
          </div>

          <div className="bg-silver w-full h-[0.03125rem] mb-[3.75rem]" />

          <div className="flex flex-row gap-[6.44rem]">
            <div className="flex flex-col">
              <div className="bg-scary-forest w-[34.75rem] h-[21.9375rem] mb-8 relative">
                {media.length > 0 && (
                  <Image
                    key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
                    src={
                      media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''
                    }
                    alt={
                      media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? ''
                    }
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                )}
              </div>

              <p className="b3 text-night mb-[3.75rem]">
                {spotlight.description}
              </p>

              {relatedSpotlights.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h4 className="text-night">
                    Related Spotlights
                  </h4>

                  <ul className="list-none flex overflow-x-auto whitespace-nowrap gap-3">
                    {relatedSpotlights.map(otherSpotlight => (
                      <li className="max-w-[10.625rem]" key={otherSpotlight.id}>
                        <Link href={`/wildlife-spotlights/${otherSpotlight.id}`}>
                          <div className="relative w-full h-[10.5625rem] rounded-2xl flex flex-col mb-[0.81rem]">
                            {media.length > 0 && (
                              <Image
                                className="rounded-lg"
                                key={
                                  media.find(
                                    m =>
                                      m.id ===
                                      allTourMedia.find(
                                        tm => tm.tour_id === otherSpotlight.id,
                                      )?.media_id,
                                  )?.id
                                }
                                src={
                                  media.find(
                                    m =>
                                      m.id ===
                                      allTourMedia.find(
                                        tm => tm.tour_id === otherSpotlight.id,
                                      )?.media_id,
                                  )?.url ?? ''
                                }
                                alt={
                                  media.find(
                                    m =>
                                      m.id ===
                                      allTourMedia.find(
                                        tm => tm.tour_id === otherSpotlight.id,
                                      )?.media_id,
                                  )?.text ?? ''
                                }
                                layout="fill"
                                objectFit="cover"
                                priority
                              />
                            )}
                          </div>
                          <p className="b1 text-night truncate mb-[0.06rem]">
                            {otherSpotlight.name}
                          </p>
                          <p className="s1 text-shadow truncate">
                            {otherSpotlight.preview_text}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {displays.length > 0 && (
              <div className="flex flex-col gap-5">
                <h4 className="text-night">In this spotlight...</h4>

                <div className="flex flex-col gap-[0.875rem] items-center">
                  {displays.map(display => (
                    <Link
                      key={display.id}
                      href={`/wildlife-spotlights/${spotlight.id}/${display.id}?spotlightId=${spotlight.id}`}
                    >
                      <button
                        type="button"
                        className="bg-mint-cream border-l-[0.3125rem] border-l-asparagus w-[20.875rem] h-[4.625rem] rounded-2xl px-[1.9375rem]"
                      >
                        <p className="b1 text-scary-forest truncate">
                          {display.title}
                        </p>
                      </button>
                    </Link>
                  ))}
                </div>
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
        href="/wildlife-spotlights"
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="bg-scary-forest relative h-[15.3125rem]">
        {media.length > 0 && (
          <Image
            className=" h-[15.3125rem] relative"
            key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
            src={media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''}
            alt={media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? ''}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </div>
      <div className="flex flex-col px-[1.125rem] pt-8 pb-6 gap-2">
        <h1 className="text-night">{spotlight.name}</h1>
        <p className="b3 text-night">{spotlight.description}</p>
      </div>

      {displays.length > 0 && (
        <div className="flex flex-col px-[1.12rem] gap-5 mb-10">
          <h4 className="text-night">In this spotlight...</h4>

          <div className="flex flex-col gap-[0.875rem] items-center">
            {displays.map(display => (
              <Link
                key={display.id}
                href={`/wildlife-spotlights/${spotlight.id}/${display.id}?spotlightId=${spotlight.id}`}
              >
                <button
                  type="button"
                  className="bg-mint-cream border-l-[0.3125rem] border-l-asparagus w-[22.125rem] h-[3.75rem] rounded-2xl px-[1.9375rem]"
                >
                  <p className="b1 text-scary-forest truncate">
                    {display.title}
                  </p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedSpotlights.length > 0 && (
        <div>
          <div className="bg-[#BDBDBD] h-[0.03125rem] mb-10" />

          <div className="flex flex-col gap-4 pb-10">
            <h4 className="text-night px-[1.125rem]">
              Related Spotlights
            </h4>

            <ul className="list-none flex overflow-x-auto whitespace-nowrap px-[1.125rem] gap-[0.75rem]">
              {relatedSpotlights.map(otherSpotlight => (
                <li className="w-[10.125rem]" key={otherSpotlight.id}>
                  <Link href={`/wildlife-spotlights/${otherSpotlight.id}`}>
                    <div className="relative w-full h-[10.5625rem] rounded-2xl flex flex-col">
                      {media.length > 0 && (
                        <Image
                          className="rounded-lg"
                          key={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  tm => tm.tour_id === otherSpotlight.id,
                                )?.media_id,
                            )?.id
                          }
                          src={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  tm => tm.tour_id === otherSpotlight.id,
                                )?.media_id,
                            )?.url ?? ''
                          }
                          alt={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  tm => tm.tour_id === otherSpotlight.id,
                                )?.media_id,
                            )?.text ?? ''
                          }
                          layout="fill"
                          objectFit="cover"
                          priority
                        />
                      )}
                    </div>
                    <p className="b1 text-night truncate mt-2">
                      {otherSpotlight.name}
                    </p>
                    <p className="s1 text-shadow truncate mb-3">
                      {otherSpotlight.preview_text}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
