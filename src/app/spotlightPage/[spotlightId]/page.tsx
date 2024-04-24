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
import Footer from '../../../components/userComponents/Footer/Footer';
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

  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <Link
        href="/spotlightPage"
        className="absolute top-[5.25rem] left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <div className="bg-scary-forest relative w-[24.375rem] h-[15.3125rem]">
        {media.length > 0 && (
          <Image
            className="w-[24.375rem] h-[15.3125rem] relative"
            key={media.find(m => m.id === tourMedia[0]?.media_id)?.id}
            src={media.find(m => m.id === tourMedia[0]?.media_id)?.url ?? ''}
            alt={media.find(m => m.id === tourMedia[0]?.media_id)?.text ?? ''}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </div>
      <div className="flex flex-col px-[18px] pt-[32px] pb-[24px] gap-2">
        <h1 className="text-night font-lato text-3xl text-14 font-bold">
          {spotlight.name}
        </h1>
        <p className="text-night font-normal font-lato">
          {spotlight.description}
        </p>
      </div>

      {displays.length > 0 && (
        <div className="flex flex-col px-[18px] gap-[20px] pb-[40px]">
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
                  className="bg-mint-cream border-l-[0.3125rem] border-l-asparagus w-[354px] h-[60px] text-scary-forest font-lato font-bold truncate rounded-2xl px-[31px]"
                >
                  {display.title}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedSpotlights.length > 0 && (
        <div>
          <div className="bg-[#BDBDBD] h-[0.03125rem] mb-[40px]" />

          <div className="flex flex-col gap-4 pb-[40px]">
            <h1 className="text-night font-lato font-bold text-[18px] px-[18px]">
              Related Spotlights
            </h1>

            <ul className="list-none flex overflow-x-auto whitespace-nowrap px-[18px] gap-[12px]">
              {relatedSpotlights.map(otherSpotlight => (
                <li className="w-[162px]" key={otherSpotlight.id}>
                  <Link href={`/spotlightPage/${otherSpotlight.id}`}>
                    <div className="relative w-full h-[169px] rounded-2xl flex flex-col">
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
                    <h4 className="text-night font-lato text-20 font-bold mt-2 truncate">
                      {otherSpotlight.name}
                    </h4>
                    <h2 className="text-shadow font-lato text-sm font-normal truncate mb-2">
                      {otherSpotlight.preview_text}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
