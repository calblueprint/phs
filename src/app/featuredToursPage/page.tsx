'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { fetchAllTours } from '../../supabase/tours/queries';
import { fetchMedia } from '../../supabase/media/queries';
import { fetchAllTourMedia } from '../../supabase/tour_media/queries';
import { TourRow, MediaRow, TourMediaRow } from '../../types/types';

import { BackArrow } from '../../../public/Icons';
import NavBar from '../../components/userComponents/navBar/navBar';
import NextButton from '../../components/userComponents/NextButton/NextButton';

/**
 * @returns The featured tours page.
 */
export default function FeaturedToursPage() {
  const [tours, setTours] = useState<TourRow[]>([]);
  const [allTourMedia, setAllTourMedia] = useState<TourMediaRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);

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

  return (
    <div className="bg-ivory min-h-screen">
      <NavBar />

      <div className="px-[1.12rem] pt-4 pb-[3.69rem]">
        <div className="mb-4">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>

        <h1 className="text-night font-lato text-3xl font-bold mb-2">
          Virtual Tours
        </h1>
        <p className="text-night font-lato font-normal mb-6">
          Take a virtual sneak peek behind the scenes at our Wildlife Care
          Center. Here you will find outside enclosures where sick, injured, and
          orphaned wildlife recuperate and acclimate before being released back
          into their natural habitat. Choose your favorite animal to start the
          tour.
        </p>

        <ul className="list-none flex flex-col gap-5">
          {tours.map(
            tour =>
              tour.spotlight === false && (
                <li key={tour.id}>
                  <Link
                    href={`/featuredToursPage/${tour.id}`}
                    className="w-full rounded-lg block"
                  >
                    <div className="bg-scary-forest relative w-full h-[12.3125rem] rounded-lg overflow-hidden">
                      {media.length > 0 && (
                        <Image
                          className="rounded-lg"
                          src={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(tm => tm.tour_id === tour.id)
                                  ?.media_id,
                            )?.url ?? ''
                          }
                          alt={
                            media.find(
                              m =>
                                m.id ===
                                allTourMedia.find(tm => tm.tour_id === tour.id)
                                  ?.media_id,
                            )?.text ?? ''
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
                        <h4 className="text-ivory font-lato text-xs font-normal mt-0.5 relative bottom-[0.44rem]">
                          {tour.stop_count} stops
                        </h4>
                        <div className="flex items-center justify-between">
                          <h2 className="text-ivory font-lato text-2xl font-normal truncate relative bottom-[0.31rem]">
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