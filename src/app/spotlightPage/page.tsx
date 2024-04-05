'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { fetchSpotlightTours } from '../../supabase/tours/queries';
import { fetchMedia } from '../../supabase/media/queries';
import { fetchAllTourMedia } from '../../supabase/tour_media/queries';
import NavBar from '../../components/userComponents/navBar/navBar';
import { TourRow, MediaRow, TourMediaRow } from '../../types/types';

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
    <div className="bg-ivory">
      <NavBar />

      <div className="px-[19.5px] pb-[16px] pt-[61px]">
        <h1 className="text-night text-3xl font-bold mb-4">
          Our Wildlife Spotlights
        </h1>
        <p className="text-[#333333] mb-4">
          Dive into the fascinating world of nature. Explore and uncover the
          captivating stories of the animal kingdom in our care center.
        </p>

        <ul className="list-none p-0">
          {spotlights.map(spotlight => (
            <li className="my-4" key={spotlight.id}>
              <Link
                href={`/spotlightPage/${spotlight.id}`}
                className="w-full rounded-2xl"
              >
                <div className="bg-[#386131] rounded-2xl flex flex-col">
                  {media.length > 0 && (
                    <Image
                      className="w-[24.375rem] h-[15.3125rem] rounded-lg"
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
                        )?.text ?? 'Tour start image'
                      }
                      layout="responsive"
                      width={100}
                      height={214}
                      objectFit="cover"
                      priority
                    />
                  )}
                </div>
                <h4 className="text-black font-Lato text-20 font-bold pt-[14px]">
                  {spotlight.name}
                </h4>
                <h2 className="text-black font-Lato text-sm font-normal pt-[4px]">
                  {spotlight.description}
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