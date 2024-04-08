'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { fetchAllTours } from '../../supabase/tours/queries';
import { fetchMedia } from '../../supabase/media/queries';
import { fetchAllTourMedia } from '../../supabase/tour_media/queries';
import NavBar from '../../components/userComponents/navBar/navBar';
import { TourRow, MediaRow, TourMediaRow } from '../../types/types';
import NextButton from '../../components/userComponents/NextButton/NextButton';
import { BackArrow } from '../../../public/Icons';
/**
 * @returns The featured tours page.
 */
export default function FeaturedToursPage() {
  const [tours, setTours] = useState<TourRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [allTourMedia, setAllTourMedia] = useState<TourMediaRow[]>([]);

  useEffect(() => {
    // Get tours
    const getTours = async () => {
      const fetchedTours = await fetchAllTours();
      setTours(fetchedTours);
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

    getTours();
    getAllTourMedia();
    getMedia();
  }, []);

  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />

      <div className="p-4">
        <div className="mb-3">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>

        <h1 className="text-night font-lato text-3xl font-semibold mb-4">
          Virtual Tours
        </h1>
        <p className="text-night font-['Lato'] mb-4">
          In order to prioritize the well-being of our animals and provide them
          with the space to fully recover, some parts of our facility remain
          closed to the public. However, you're invited to explore them
          virtually and learn about our fascinating inhabitants through our
          online featured tours!
        </p>

        <ul className="list-none mb-6">
          {tours.map(
            tour =>
              tour.spotlight === false && (
                <li className="my-4" key={tour.id}>
                  <Link
                    href={`/featuredToursPage/${tour.id}`}
                    className="w-full rounded-lg block"
                  >
                    <div className="relative w-full h-[12.3125rem] rounded-lg overflow-hidden">
                      {media.length > 0 && (
                        <Image
                          className="rounded-lg"
                          src={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(tm => tm.tour_id === tour.id)
                                  ?.media_id,
                            )?.url ?? '' // Can add a default image's url here
                          }
                          alt={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(tm => tm.tour_id === tour.id)
                                  ?.media_id,
                            )?.text ?? 'Tour start image'
                          }
                          layout="fill"
                          objectFit="cover"
                          priority
                        />
                      )}
                      <div
                        className="absolute bottom-0 w-full h-48 rounded-lg p-[1.31rem] flex flex-col justify-end"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(51, 51, 51, 0.0) 0%, rgba(51, 51, 51, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)',
                        }}
                      >
                        <h4 className="text-ivory font-['Lato'] text-xs font-normal mt-0.5 relative bottom-[0.44rem]">
                          {tour.stop_count} stops
                        </h4>
                        <div className="flex items-center justify-between">
                          <h2 className="text-ivory font-['Lato'] text-2xl font-medium truncate relative bottom-[0.31rem]">
                            {tour.name}
                          </h2>
                          <div className="relative bottom-[0.35rem]">
                            <NextButton />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
}
