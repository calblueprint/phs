'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { fetchAllTours } from '../../supabase/tours/queries';
import NavBar from '../../components/userComponents/navBar/navBar';
import { TourRow } from '../../types/types';
import BackButton from '../../components/userComponents/BackButton/BackButton';
import NextButton from '../../components/userComponents/NextButton/NextButton';
/**
 * @returns The featured tours page.
 */
export default function FeaturedToursPage() {
  const [tours, setTours] = useState<TourRow[]>([]);

  useEffect(() => {
    // Get tours
    const getTours = async () => {
      const fetchedTours = await fetchAllTours();
      setTours(fetchedTours);
    };

    getTours();
  }, []);

  return (
    <div className="bg-ivory h-full">
      <NavBar />
      <div className="relative top-4 left-4 mb-3">
        <Link href="/">
          <BackButton />
        </Link>
      </div>

      <div className="p-4">
        <h1 className="text-night text-3xl font-bold mb-4">Featured Tours</h1>
        <p className="text-night mb-4">
          Embark on a tour and explore our exhibits from anywhere - at home or
          in person!
        </p>

        <ul className="list-none p-0">
          {tours.map(
            tour =>
              tour.spotlight === false && (
                <li className="my-4" key={tour.id}>
                  <Link
                    href={`/featuredToursPage/${tour.id}`}
                    className="w-full rounded-lg"
                  >
                    <div className="bg-[#386131] h-48 rounded-lg p-[1.31rem] flex flex-col justify-end">
                      <h4 className="text-white text-[0.8125rem] font-semibold mt-0.5 relative bottom-[0.44rem]">
                        {tour.stop_count} stops
                      </h4>
                      <div className="flex items-center justify-between">
                        <h2 className="text-white text-xl font-bold truncate relative bottom-[0.31rem]">
                          {tour.name}
                        </h2>
                        <div className="relative bottom-[0.35rem]">
                          <NextButton />
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
