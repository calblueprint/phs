'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DisplayRow, TourDisplaysRow, MediaRow } from '../../../../types/types';
import NavBar from '../../../../components/userComponents/navBar/navBar';
import { fetchDisplay } from '../../../../supabase/displays/queries';
import { fetchTourDisplays } from '../../../../supabase/tour_displays/queries';
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
  const [media, setMedia] = useState<MediaRow[]>([]);
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
    };

    // Fetch the display media
    const fetchDisplayMedia = async () => {
      const displayMedia = await fetchImagesForDisplay(params.displayId);
      setMedia(displayMedia);
    };

    getDisplay();
    getLinks();
    fetchDisplayMedia();
  }, [params.displayId, params.tourId]);

  return (
    <div className="bg-[#ebf0e4] h-full">
      <NavBar />
      <h1 className="text-[#333333] text-3xl font-bold p-4">
        {display && display.title}
      </h1>
      <p className="text-[#333333] p-4 font-medium">
        {display && display.description}
      </p>
      {media.length > 0 && <Carousel media={media} />}
      <p className="text-[#333333] px-4 py-2">
        Scientifically known as Procyon lotor, raccoons are highly adaptable
        creatures with a wide range of habitats across North and Central
        America. They are often found in wooded areas, making their homes in the
        hollows of trees, old burrows, or even rock crevices.
      </p>
      <p className="text-[#333333] px-4 py-2">
        Raccoons are equally comfortable in urban and suburban settings, where
        they utilize human-made structures like attics, garages, and abandoned
        buildings as dens. Wetlands and riparian habitats near water sources are
        also common areas for raccoons due to their affinity for aquatic
        foraging. These omnivorous mammals display a remarkable ability to
        thrive in various environments, making them one of the most widely
        distributed and resilient wildlife species on the continent.
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
