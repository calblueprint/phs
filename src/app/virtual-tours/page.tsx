'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { fetchAllTours } from '../../supabase/tours/queries';
import { fetchMedia } from '../../supabase/media/queries';
import { fetchAllTourMedia } from '../../supabase/tour_media/queries';
import { TourRow, MediaRow, TourMediaRow } from '../../types/types';

import { BackArrow } from '../../../public/icons';
import NavBar from '../../components/userComponents/NavBar/NavBar';
import NextButton from '../../components/userComponents/NextButton/NextButton';

/**
 * @returns The virtual tours page.
 */
export default function VirtualToursPage() {
  const [tours, setTours] = useState<TourRow[]>([]);
  const [allTourMedia, setAllTourMedia] = useState<TourMediaRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    // Fetch tour and tour media data
    const fetchData = async () => {
      const fetchedTours = await fetchAllTours();
      setTours(fetchedTours);
      const fetchedAllTourMedia = await fetchAllTourMedia();
      setAllTourMedia(fetchedAllTourMedia);
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    fetchData();
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
            <div className="mb-[3.12rem]">
              <p className="s3 text-night mb-6">
                <span className="text-scary-forest">Home</span> / Virtual Tours
              </p>
              <h1 className="text-night mb-4">Virtual Tours</h1>
              <p className="b3 text-night mb-[3.12rem]">
                Take a virtual sneak peek behind the scenes at our Wildlife Care
                Center. Here you will find outside enclosures where sick,
                injured, and orphaned wildlife recuperate and acclimate before
                being released back into their natural habitat. Choose your
                favorite animal to start the tour.
              </p>
              <div className="bg-silver h-[0.03125rem]" />
            </div>

            <ul className="grid grid-cols-2 gap-[3.75rem]">
              {tours.map(
                tour =>
                  tour.spotlight === false && (
                    <li key={tour.id}>
                      <Link
                        href={`/virtual-tours/${tour.id}`}
                        className="rounded-lg"
                      >
                        <div className="relative w-[29.1875rem] h-[22.8125rem] rounded-xl overflow-hidden">
                          {media.length > 0 && (
                            <img
                              src={
                                media.find(
                                  m =>
                                    m.id ===
                                    allTourMedia.find(
                                      tm => tm.tour_id === tour.id,
                                    )?.media_id,
                                )?.url ?? ''
                              }
                              alt={
                                media.find(
                                  m =>
                                    m.id ===
                                    allTourMedia.find(
                                      tm => tm.tour_id === tour.id,
                                    )?.media_id,
                                )?.text ?? ''
                              }
                              className="object-cover w-full h-full"
                            />
                          )}
                          <div
                            className="absolute bottom-0 w-full h-48 rounded-lg p-[1.31rem] flex flex-col justify-end"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(51, 51, 51, 0.0) 0%, rgba(51, 51, 51, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)',
                            }}
                          >
                            <p className="s3 mt-0.5 relative bottom-[0.44rem]">
                              {tour.stop_count} stops
                            </p>
                            <div className="flex items-center justify-between">
                              <h2 className="truncate relative bottom-[0.31rem]">
                                {tour.name}
                              </h2>
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
      ) : (
        <div className="px-[1.12rem] pt-4 pb-10 flex justify-center">
          <div className="flex flex-col max-w-[22.125rem]">
            <div className="mb-4">
              <Link href="/">
                <BackArrow />
              </Link>
            </div>

            <h1 className="text-night mb-2">Virtual Tours</h1>
            <p className="b3 text-night mb-6">
              Take a virtual sneak peek behind the scenes at our Wildlife Care
              Center. Here you will find outside enclosures where sick, injured,
              and orphaned wildlife recuperate and acclimate before being
              released back into their natural habitat. Choose your favorite
              animal to start the tour.
            </p>

            <ul className="grid grid-cols-1 gap-5 items-center">
              {tours.map(
                tour =>
                  tour.spotlight === false && (
                    <li key={tour.id}>
                      <Link
                        href={`/virtual-tours/${tour.id}`}
                        className="w-full rounded-lg block"
                      >
                        <div className="relative w-[22.125rem] h-[12.3125rem] rounded-xl overflow-hidden">
                          {media.length > 0 && (
                            <img
                              src={
                                media.find(
                                  m =>
                                    m.id ===
                                    allTourMedia.find(
                                      tm => tm.tour_id === tour.id,
                                    )?.media_id,
                                )?.url ?? ''
                              }
                              alt={
                                media.find(
                                  m =>
                                    m.id ===
                                    allTourMedia.find(
                                      tm => tm.tour_id === tour.id,
                                    )?.media_id,
                                )?.text ?? ''
                              }
                              className="object-cover w-full h-full"
                            />
                          )}
                          <div
                            className="absolute bottom-0 w-full h-48 rounded-lg p-[1.31rem] flex flex-col justify-end"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(51, 51, 51, 0.0) 0%, rgba(51, 51, 51, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)',
                            }}
                          >
                            <p className="s3 mt-0.5 relative bottom-[0.44rem]">
                              {tour.stop_count} stops
                            </p>
                            <div className="flex items-center justify-between">
                              <h2 className="truncate relative bottom-[0.31rem]">
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
      )}
    </div>
  );
}
