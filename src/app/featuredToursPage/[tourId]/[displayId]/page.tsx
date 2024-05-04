'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  DisplayRow,
  TourRow,
  TourDisplaysRow,
  MediaRow,
} from '../../../../types/types';
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
 * Displays a stop page for the current tour
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID
 * @param params.params.displayId - The display ID
 * @returns The tour stop page
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
  const [isWide, setIsWide] = useState(window.innerWidth >= 1024);

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
    };

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
      setMedia(displayMedia || []);
    };

    getDisplay();
    getTour();
    getLinks();
    getCurrentStop();
    fetchDisplayMedia();
  }, [params.displayId, params.tourId]);

  useEffect(() => {
    // Update isWide state on window resize
    const handleResize = () => setIsWide(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isWide ? (
    <div className="bg-ivory w-full min-h-screen">
      <NavBar />
      <div className="flex justify-center">
        <div className="flex flex-row gap-[8.5rem] py-[6.25rem]">
          <div className="flex flex-col gap-10">
            <h1 className="text-night">
              {display && display.title}
            </h1>
            {media.length > 0 ? (
              <Carousel media={media} />
            ) : (
              <div className="bg-scary-forest relative w-[29.25rem] h-[18.375rem]" />
            )}
          </div>
          <div className="flex flex-col gap-8 w-[24.375rem]">
            {(currentStop && tour?.stop_count) > 0 && (
              <ProgressBar
                tourName={tour?.name || ''}
                currentStop={currentStop || 0}
                totalStops={tour?.stop_count || 0}
              />
            )}
            <div className="">
              <p className="b3 text-night mb-[3.12rem]">
                {display && display.description}
              </p>
              <div className="flex flex-row gap-2 mb-4">
                <LastStopButton text={prevText} link={prev} />
                <NextStopButton text={nextText} link={next} />
              </div>
              <p className="b1 text-scary-forest">
                <Link href="/featuredToursPage">Exit this tour</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-ivory w-full min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="max-w-[24.375rem]">
          {(currentStop && tour?.stop_count) > 0 && (
            <ProgressBar
              tourName={tour?.name || ''}
              currentStop={currentStop || 0}
              totalStops={tour?.stop_count || 0}
            />
          )}
          <div className="mb-6">
            {media.length > 0 ? (
              <Carousel media={media} />
            ) : (
              <div className="bg-scary-forest relative w-full h-[15.3125rem]" />
            )}
          </div>
          <div className="flex flex-col gap-5 px-[1.31rem]">
            <h1 className="text-night">
              {display && display.title}
            </h1>
            <div className="pb-[2.5rem]">
              <p className="b3 text-night">
                {display && display.description}
              </p>
              <div className="flex flex-row gap-4 mt-8">
                <LastStopButton text={prevText} link={prev} />
                <NextStopButton text={nextText} link={next} />
              </div>
              <p className="b1 text-scary-forest mt-4">
                <Link href="/featuredToursPage">Exit this tour</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
