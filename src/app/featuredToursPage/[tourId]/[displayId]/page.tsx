'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, TourRow, TourDisplaysRow, MediaRow } from '../../../../types/types';
import NavBar from '../../../../components/userComponents/navBar/navBar';
import { fetchTour } from '../../../../supabase/tours/queries';
import { fetchDisplay } from '../../../../supabase/displays/queries';
import { fetchTourDisplays } from '../../../../supabase/tour_displays/queries';
import ProgressBar from '../../../../components/userComponents/ProgressBar/ProgressBar';
import LastStopButton from '../../../../components/userComponents/LastStopButton/LastStopButton';
import NextStopButton from '../../../../components/userComponents/NextStopButton/NextStopButton';
import { fetchImagesForDisplay } from '../../../../supabase/media/queries';
import Carousel from '../../../../components/userComponents/ImageScroller/ImageScroller';

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
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [prev, setPrev] = useState<string>(
    `/featuredToursPage/${params.tourId}`,
  );
  const [prevText, setPrevText] = useState<string>('Back');
  const [next, setNext] = useState<string>(
    `/featuredToursPage/${params.tourId}/tourEndPage`,
  );
  const [nextText, setNextText] = useState<string>('End Tour');

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
    const getLinks = async () => {
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
        setNextText('Next Stop');
      } else if (index === tourDisplays.length - 1) {
        setPrev(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index - 1].display_id
          }`,
        );
        setPrevText('Last Stop');
      } else {
        setPrev(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index - 1].display_id
          }`,
        );
        setPrevText('Last Stop');
        setNext(
          `/featuredToursPage/${params.tourId}/${
            tourDisplays[index + 1].display_id
          }`,
        );
        setNextText('Next Stop');
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

    // Fetch the display media
    const fetchDisplayMedia = async () => {
      const displayMedia = await fetchImagesForDisplay(params.displayId);
      setMedia(displayMedia);
    }

    getDisplay();
    getTour();
    getLinks();
    getCurrentStop();
    fetchDisplayMedia();
  }, [params.displayId, params.tourId]);

  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <ProgressBar
        tourName={tour?.name || ''}
        currentStop={currentStop || 0}
        totalStops={tour?.stop_count || 1}
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
      {media.length > 0 && <Carousel media={media} />}
      <div className="px-[1.56rem] pb-[2.5rem]">
        <p className="text-[#333333]">
          {display && display.description}
        </p>
        <div className="flex flex-row justify-between mt-8">
          <LastStopButton text={prevText} link={prev} />
          <NextStopButton text={nextText} link={next} />
        </div>
        <h4 className="text-[#386131] font-semibold mt-4">
          <Link href="/featuredToursPage">Exit this tour</Link>
        </h4>
      </div>
    </div>
  );
}
