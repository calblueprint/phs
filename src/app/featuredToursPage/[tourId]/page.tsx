'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, TourDisplaysRow, TourRow } from '../../../types/types';
import NavBar from '../../../components/userComponents/navBar/navBar';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchTourDisplays } from '../../../supabase/tour_displays/queries';
import { fetchAllDisplays } from '../../../supabase/displays/queries';

/**
 * The page that displays the start of a tour.
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID.
 * @returns The tour start page.
 */
export default function TourStartPage({
  params,
}: {
  params: { tourId: string };
}) {
  const [displays, setDisplays] = useState<DisplayRow[]>([]);
  const [tour, setTour] = useState<TourRow>();
  const [tourDisplays, setTourDisplays] = useState<TourDisplaysRow[]>([]);

  useEffect(() => {
    // Get tour
    const getTour = async () => {
      const fetchedTour = await fetchTour(params.tourId);
      setTour(fetchedTour);
    };

    // Get tour displays
    const getTourDisplays = async () => {
      const fetchedTourDisplays = await fetchTourDisplays(params.tourId);
      setTourDisplays(fetchedTourDisplays);
    };

    // Get displays
    const getDisplays = async () => {
      const fetchedDisplays = await fetchAllDisplays();
      setDisplays(fetchedDisplays);
    };

    getTour();
    getTourDisplays();
    getDisplays();
  }, [params.tourId]);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <div>
        <img
          src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="placeholder"
        />
        <div className="mt-4">
          <div className="flex items-center flex-col bg-[#d7e0cc] h-48 rounded-md mx-4 p-4">
            <h2 className="text-[#141414] text-sm mt-4">WELCOME TO</h2>
            <h1 className="text-[#333333] text-3xl font-bold mb-4">
              {tour && tour.name}
            </h1>
            <div className="bg-[#7ca24e] w-52 rounded-md">
              <Link
                className="rounded-md w-full"
                href={`/featuredToursPage/${params.tourId}/${tourDisplays[0]?.display_id}`}
              >
                <h2 className="text-[#fafafa] text-sm text-center font-bold py-2 px-4">
                  Start Tour
                </h2>
              </Link>
            </div>
          </div>
        </div>
        <p className="p-4 text-night">{tour && tour.description}</p>
        <h3 className="p-4 text-lg font-bold text-night">In this tour</h3>
        <ol className="px-12">
          {tourDisplays.map(tourDisplay => (
            <li key={tourDisplay.display_id}>
              <div className='text-night'>
                <Link
                  href={`/featuredToursPage/${params.tourId}/${tourDisplay.display_id}`}
                >
                  <h4 className="font-light">
                    {tourDisplay.display_order != null
                      ? tourDisplay.display_order + 1
                      : ''}
                    .{' '}
                    {
                      displays.find(
                        display => display.id === tourDisplay.display_id,
                      )?.title
                    }
                  </h4>
                </Link>
              </div>
            </li>
          ))}
        </ol>
        <h4 className="text-[#386131] px-4 py-8 font-bold">
          <Link href="/featuredToursPage">Back to Tours</Link>
        </h4>
      </div>
    </div>
  );
}
