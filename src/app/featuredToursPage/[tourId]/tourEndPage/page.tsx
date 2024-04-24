'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import NavBar from '../../../../components/userComponents/navBar/navBar';
import {
  MediaRow,
  TourRow,
  TourMediaRow,
  TourDisplaysRow,
} from '../../../../types/types';
import { fetchMedia } from '../../../../supabase/media/queries';
import { fetchTour } from '../../../../supabase/tours/queries';
import { fetchTourDisplays } from '../../../../supabase/tour_displays/queries';
import { fetchTourMedia } from '../../../../supabase/tour_media/queries';
import Footer from '../../../../../components/userComponents/Footer/Footer';
import {
  BackArrow,
  Congratulations,
  ExternalLinkIcon,
} from '../../../../../public/icons';

/**
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID
 * @returns The tour end page
 */
export default function TourEndPage({
  params,
}: {
  params: { tourId: string };
}) {
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [tour, setTour] = useState<TourRow>();
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);
  const [backLink, setBackLink] = useState<string>(
    `/featuredToursPage/${params.tourId}`,
  );

  useEffect(() => {
    // Get tour
    const getTour = async () => {
      const fetchedTour = await fetchTour(params.tourId);
      setTour(fetchedTour);
    };

    // Get tour media
    const getTourMedia = async () => {
      const fetchedTourMedia = await fetchTourMedia(params.tourId);
      setTourMedia(fetchedTourMedia);
    };

    // Get media
    const getMedia = async () => {
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    /**
     * @returns The link to the previous page.
     */
    async function getBackLink() {
      const tourDisplays: TourDisplaysRow[] = await fetchTourDisplays(
        params.tourId,
      );
      setBackLink(
        `/featuredToursPage/${params.tourId}/${
          tourDisplays[tourDisplays.length - 1].display_id
        }`,
      );
    }

    getTour();
    getTourMedia();
    getMedia();
    getBackLink();
  }, [params.tourId]);

  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <Link href={backLink} className="relative top-4 left-[1.12rem]">
        <BackArrow />
      </Link>

      <div className="flex flex-col gap-10 mt-8 mb-10">
        <div className="flex flex-col items-center gap-8 mx-[3.47rem]">
          <div className="flex flex-col gap-3 text-center">
            <div className="flex flex-col items-center gap-5 mx-[2.34rem]">
              <Congratulations />
              <h1 className="text-night font-lato text-xl font-semibold">
                {`You've reached the end of this tour!`}
              </h1>
            </div>
            <p className="text-night font-lato text-sm font-normal">
              Thanks for visiting {tour?.name}.
            </p>
          </div>
          <div className="bg-asparagus w-[13.75rem] text-center rounded-lg">
            <Link href="/featuredToursPage">
              <h2 className="text-ivory font-lato text-base font-bold px-4 py-[0.62rem]">
                Back to Virtual Tours
              </h2>
            </Link>
          </div>
        </div>

        <div className="bg-[#F5F6F5] mb-10">
          <div className="bg-[#BDBDBD] h-[0.03125rem]" />
          <div className="flex flex-col px-[1.12rem] py-8 gap-6">
            <h3 className="text-night font-lato font-bold">Related Links</h3>
            <ol className="px-[0.88rem]">
              {tourMedia.map((tm, index) => (
                <li key={tm.media_id} className="flex flex-col gap-4">
                  <Link
                    href={media.find(m => m.id === tm.media_id)?.url ?? '-1'}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <h4 className="text-shadow font-lato text-sm font-normal uppercase">
                        {media.find(m => m.id === tm.media_id)?.type}
                      </h4>
                      <ExternalLinkIcon />
                    </div>
                    <h4 className="text-night font-lato font-medium">
                      {media.find(m => m.id === tm.media_id)?.title}
                    </h4>
                  </Link>
                  {index !== tourMedia.length - 1 && (
                    <div className="bg-[#BDBDBD] h-[0.03125rem] mb-6" />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-[#BDBDBD] h-[0.03125rem]" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
