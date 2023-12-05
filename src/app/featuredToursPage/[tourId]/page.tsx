'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, TourDisplaysRow, TourRow } from '../../../types/types';
import NavBar from '../../../components/userComponents/navBar/navBar';
import { fetchTour } from '../../../supabase/tours/queries';
import { fetchTourDisplays } from '../../../supabase/tour_displays/queries';
import { fetchAllDisplays } from '../../../supabase/displays/queries';
import BackButton from '../../../components/userComponents/BackButton/BackButton';

/**
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
    tour && (
    <div className="bg-ivory w-[24.375rem] min-h-full">
      <NavBar />
      <Link
        href="/featuredToursPage"
        className="absolute top-32 left-[1.12rem] z-10"
      >
        <BackButton />
      </Link>
      <img
        className="w-[24.375rem] h-[15.3125rem] relative"
        src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="placeholder"
      />

      <div className="w-[24.375rem] flex flex-col px-[1.125rem] absolute top-[20.56rem] gap-6 mb-[2.5rem]">
        <div className="bg-mint-cream w-[22.125rem] rounded-md px-[2.1875rem] py-[2.1875rem] flex-col items-center gap-3 inline-flex">
          <div className="flex flex-col text-center gap-1">
            <h2 className="text-night text-sm">WELCOME TO</h2>
            <h1 className="text-night text-[2rem] font-bold">
              {tour.name}
            </h1>
          </div>
          <div className="w-[12.625rem] px-4 py-3 bg-asparagus rounded-lg justify-center items-center gap-2.5">
            <Link
              href={`/featuredToursPage/${params.tourId}/${tourDisplays[0]?.display_id}`}
            >
              <h2 className="text-ivory text-center text-base font-bold">
                Start Tour
              </h2>
            </Link>
          </div>
        </div>

        <p className="text-night">{tour.description}</p>

        <div className="flex flex-col relative gap-4 mb-10">
          <div className="flex justify-between items-center">
            <h3 className="text-night text-lg font-bold">In this tour</h3>
            <div className="bg-[#F5EDCF80] w-[4.375rem] h-[1.5rem] rounded-lg px-3 py-[0.31rem]">
              <p className="text-night text-xs text-center">
                {tour.stop_count} stops
              </p>
            </div>
          </div>
          <ol>
            {tourDisplays.map(tourDisplay => (
              <li key={tourDisplay.display_id}>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
    )
  );
}
