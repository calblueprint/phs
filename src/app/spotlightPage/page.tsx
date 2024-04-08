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
    <div className="bg-ivory">
      <NavBar />

      <div className="px-[18px] pt-[16px] pb-[60px]">
        <div className="mb-6">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>

        <h1 className="text-night font-['Lato'] text-3xl font-semibold mb-4">
          Our Wildlife Spotlights
        </h1>
        <p className="text-night font-['Lato'] mb-6">
          Welcome to our Wildlife Spotlights! Here, you'll find information
          about our center, including our facilities, processes, and the diverse
          range of species we care for. Explore our dedicated efforts to
          rehabilitate and conserve wildlife, learn about our educational
          programs, and discover ways you can support our cause.
        </p>
        <div className="bg-[#BDBDBD] h-[0.03125rem] mx-[-18px] mb-4" />

        <ul className="list-none p-0">
          {spotlights.map(spotlight => (
            <li className="my-4" key={spotlight.id}>
              <Link
                href={`/spotlightPage/${spotlight.id}`}
                className="w-full rounded-lg"
              >
                <div className="bg-[#386131] relative w-full h-[12.3125rem] rounded-2xl flex flex-col">
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
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  )}
                </div>
                <h4 className="text-night font-['Lato'] text-2xl truncate font-medium pt-[14px]">
                  {spotlight.name}
                </h4>
                <h2 className="text-shadow font-['Lato'] text-sm font-light pt-[4px]">
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
