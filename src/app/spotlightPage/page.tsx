'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { fetchSpotlightTours } from '../../supabase/tours/queries';
import { fetchMedia } from '../../supabase/media/queries';
import { fetchAllTourMedia } from '../../supabase/tour_media/queries';
import NavBar from '../../components/userComponents/navBar/navBar';
import { TourRow, MediaRow, TourMediaRow } from '../../types/types';
import { BackArrow } from '../../../public/Icons';

/**
 * @returns spotlights from tours table
 */
function App() {
  const [spotlights, setSpotlights] = useState<TourRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [allTourMedia, setAllTourMedia] = useState<TourMediaRow[]>([]);

  useEffect(() => {
    /**
     * @returns spotlight data
     */
    async function fetchData() {
      try {
        const responseData: TourRow[] = await fetchSpotlightTours();
        setSpotlights(responseData);
      } catch (error) {
        console.error(error);
      }
    }

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
    getAllTourMedia();
    getMedia();
  }, []);

  return (
    <div className="bg-ivory min-h-screen">
      <NavBar />

      <div className="px-[18px] pt-[16px] pb-[44px]">
        <div className="mb-6">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>

        <h1 className="text-night font-lato text-3xl font-bold mb-4">
          Our Wildlife Spotlights
        </h1>
        <p className="text-night font-normal font-lato mb-6">
          Wildlife Spotlights offer insights into common questions we receive.
          Browse a Spotlight to learn more about important wildlife topics.
        </p>
        <div className="bg-[#BDBDBD] h-[0.03125rem] mx-[-18px] mb-4" />

        <ul className="list-none">
          {spotlights.map(spotlight => (
            <li className="my-4" key={spotlight.id}>
              <Link
                href={`/spotlightPage/${spotlight.id}`}
                className="w-full rounded-lg"
              >
                <div className="bg-scary-forest relative w-full h-[13.375rem] rounded-lg flex flex-col">
                  {media.length > 0 && (
                    <Image
                      className="w-[24.375rem] h-[13.375rem] rounded-lg"
                      key={
                        media.find(
                          m =>
                            m.id ===
                            allTourMedia.find(m => m.tour_id === spotlight.id)
                              ?.media_id,
                        )?.id
                      }
                      src={
                        media.find(
                          m =>
                            m.id ===
                            allTourMedia.find(m => m.tour_id === spotlight.id)
                              ?.media_id,
                        )?.url ?? ''
                      }
                      alt={
                        media.find(
                          m =>
                            m.id ===
                            allTourMedia.find(m => m.tour_id === spotlight.id)
                              ?.media_id,
                        )?.text ?? ''
                      }
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  )}
                </div>
                <h4 className="text-night font-lato text-2xl truncate font-normal pt-[14px]">
                  {spotlight.name}
                </h4>
                <h2 className="text-shadow font-lato text-sm font-normal pt-[4px]">
                  {spotlight.preview_text}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;