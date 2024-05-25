'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { fetchAllSpotlights } from '../../supabase/tours/queries';
import { fetchMedia } from '../../supabase/media/queries';
import { fetchAllTourMedia } from '../../supabase/tour_media/queries';
import NavBar from '../../components/userComponents/NavBar/NavBar';
import { TourRow, MediaRow, TourMediaRow } from '../../types/types';
import { BackArrow } from '../../../public/icons';

/**
 * @returns The spotlights page.
 */
export default function WildlifeSpotlightsPage() {
  const [spotlights, setSpotlights] = useState<TourRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [allTourMedia, setAllTourMedia] = useState<TourMediaRow[]>([]);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    /**
     * @returns spotlight data
     */
    async function fetchData() {
      try {
        const responseData: TourRow[] = await fetchAllSpotlights();
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

  return (
    <div className="bg-ivory min-h-screen">
      <NavBar />

      {isWide ? (
        <div className="py-20 flex justify-center">
          <div className="w-[62.125rem] flex flex-col">
            <div className="text-night font-normal text-sm font-lato mb-6">
              <span className="text-scary-forest">Home</span> / Wildlife
              Spotlights
            </div>
            <div className="flex flex-col gap-4 mb-[3.12rem]">
              <h1 className="text-night">Wildlife Spotlights</h1>
              <p className="b3 text-night">
                Wildlife Spotlights provide answers to many frequently asked
                questions. You’ll find information on topics ranging from what
                to do if you encounter a baby bird lost from its nest to how to
                deal with nuisance animals in your yard.
              </p>
            </div>
            <div className="bg-silver h-[0.03125rem] mb-[3.12rem]" />

            <ul className="grid grid-cols-2 gap-x-[6rem] gap-y-[3.75rem]">
              {spotlights.map(spotlight => (
                <li className="w-[28.125rem]" key={spotlight.id}>
                  <Link
                    href={`/wildlife-spotlights/${spotlight.id}`}
                    className="rounded-lg"
                  >
                    <div className="relative w-[28.125rem] h-[17.09rem] rounded-lg overflow-hidden">
                      {media.length > 0 && (
                        <img
                          key={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  m => m.tour_id === spotlight.id,
                                )?.media_id,
                            )?.id
                          }
                          src={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  m => m.tour_id === spotlight.id,
                                )?.media_id,
                            )?.url ?? ''
                          }
                          alt={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  m => m.tour_id === spotlight.id,
                                )?.media_id,
                            )?.text ?? ''
                          }
                          className="object-cover w-full h-full rounded-lg"
                        />
                      )}
                    </div>
                    <h2 className="text-night truncate pt-[1.09rem]">
                      {spotlight.name}
                    </h2>
                    <p className="s1 text-shadow line-clamp-2 pt-[0.37rem]">
                      {spotlight.preview_text}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="px-[1.125rem] pt-4 pb-10 flex justify-center">
          <div className="flex flex-col max-w-[22.125rem]">
            <div className="mb-6">
              <Link href="/">
                <BackArrow />
              </Link>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h1 className="text-night">Wildlife Spotlights</h1>
              <p className="b3 text-night">
                Wildlife Spotlights provide answers to many frequently asked
                questions. You’ll find information on topics ranging from what
                to do if you encounter a baby bird lost from its nest to how to
                deal with nuisance animals in your yard.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-8">
              {spotlights.map(spotlight => (
                <li key={spotlight.id}>
                  <Link
                    href={`/wildlife-spotlights/${spotlight.id}`}
                    className="w-full rounded-lg"
                  >
                    <div className="relative w-[22rem] h-[13.375rem] rounded-lg overflow-hidden mb-[0.875rem]">
                      {media.length > 0 && (
                        <img
                          key={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  m => m.tour_id === spotlight.id,
                                )?.media_id,
                            )?.id
                          }
                          src={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  m => m.tour_id === spotlight.id,
                                )?.media_id,
                            )?.url ?? ''
                          }
                          alt={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(
                                  m => m.tour_id === spotlight.id,
                                )?.media_id,
                            )?.text ?? ''
                          }
                          className="object-cover w-full h-full rounded-lg"
                        />
                      )}
                    </div>
                    <h2 className="text-night truncate mb-1">
                      {spotlight.name}
                    </h2>
                    <p className="s1 text-shadow line-clamp-2">
                      {spotlight.preview_text}
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
