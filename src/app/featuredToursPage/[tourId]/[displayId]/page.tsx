'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, TourRow, TourDisplaysRow } from '../../../../types/types';
import NavBar from '../../../../components/userComponents/navBar/navBar';
import { fetchTour } from '../../../../supabase/tours/queries';
import { fetchDisplay } from '../../../../supabase/displays/queries';
import { fetchTourDisplays } from '../../../../supabase/tour_displays/queries';
import ProgressBar from '../../../../components/userComponents/ProgressBar/ProgressBar';

/**
 * The page that displays a tour stop.
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID.
 * @param params.params.displayId - The display ID.
 * @returns The tour stop page.
 */
export default function TourStopPage({
  params,
}: {
  params: { tourId: string; displayId: string };
}) {
  const [display, setDisplay] = useState<DisplayRow>();
  const [tour, setTour] = useState<TourRow>();
  const [currentStop, setCurrentStop] = useState<number>();
  const [prev, setPrev] = useState<string>(
    `/featuredToursPage/${params.tourId}`,
  );
  const [next, setNext] = useState<string>(
    `/featuredToursPage/${params.tourId}/tourEndPage`,
  );

  useEffect(() => {
    // Get display
    const getDisplay = async () => {
      const fetchedDisplay = await fetchDisplay(params.displayId);
      setDisplay(fetchedDisplay);
    };

    // Get tour
    const getTour = async () => {
      const fetchedTour = await fetchTour(params.tourId);
      setTour(fetchedTour);
    };

    // Get tour displays
    const getTourDisplays = async () => {
      const fetchedTourDisplays = await fetchTourDisplays(params.tourId);
      return fetchedTourDisplays;
    };

    // Get the links for the previous and next pages
    /**
     *
     */
    async function getLinks() {
      const tourDisplays: TourDisplaysRow[] = await getTourDisplays();
      const index = tourDisplays.findIndex(
        tourDisplay => tourDisplay.display_id === params.displayId,
      );

      if (index === -1) {
        throw new Error('Display not found in tour displays');
      } else if (index === 0) {
        setNext(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index + 1].display_id
          }`,
        );
      } else if (index === tourDisplays.length - 1) {
        setPrev(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index - 1].display_id
          }`,
        );
      } else {
        setPrev(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index - 1].display_id
          }`,
        );
        setNext(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index + 1].display_id
          }`,
        );
      }
    }

    // Get the current stop number
    /**
     *
     */
    async function getCurrentStop() {
      const tourDisplays: TourDisplaysRow[] = await getTourDisplays();
      const index = tourDisplays.findIndex(
        tourDisplay => tourDisplay.display_id === params.displayId,
      );

      if (index === -1) {
        throw new Error('Display not found in tour displays');
      } else {
        setCurrentStop(index + 1);
      }
    }

    getDisplay();
    getTour();
    getLinks();
    getCurrentStop();
  }, [params.displayId, params.tourId]);

  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <ProgressBar
        tourName={tour?.name || ''}
        currentStop={currentStop || 0}
        totalStops={tour?.stop_count || 0}
      />
      <div className="flex flex-col px-[1.56rem] gap-2 mt-8">
        <h1 className="text-[#333333] text-3xl font-bold">
          {display && display.title}
        </h1>
        <p className="text-[#333333] font-medium">
          Raccoons adapt to a variety of habitats, making them highly versatile
          mammals.
        </p>
      </div>
      <img
        className="w-[24.375rem] h-[15.3125rem] my-6 relative"
        src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="placeholder"
      />
      <p className="text-[#333333] px-[1.56rem]">
        {display && display.description}
      </p>
      <div className="flex flex-row justify-between p-4">
        <Link
          className="bg-[#386131] text-center w-[48%] h-16 rounded-2xl"
          href={prev}
        >
          <h2 className="relative top-[30%] text-white font-bold">Back</h2>
        </Link>
        <Link
          className="bg-[#386131] text-center w-[48%] h-16 rounded-2xl"
          href={next}
        >
          <h2 className="relative top-[30%] text-white font-bold">Next</h2>
        </Link>
      </div>
      <div>
        <h4 className="text-[#386131] p-4 font-bold">
          <Link href="/featuredToursPage">Exit this tour</Link>
        </h4>
      </div>
    </div>
  );
}
