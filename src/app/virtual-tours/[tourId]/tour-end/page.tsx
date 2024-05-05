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
    `/virtual-tours/${params.tourId}`,
  );
  const [isWide, setIsWide] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    // Fetch tour, tour media, media, and back link data
    const fetchData = async () => {
      const fetchedTour = await fetchTour(params.tourId);
      setTour(fetchedTour);
      const fetchedTourMedia = await fetchTourMedia(params.tourId);
      setTourMedia(fetchedTourMedia);
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
      const tourDisplays: TourDisplaysRow[] = await fetchTourDisplays(
        params.tourId,
      );
      setBackLink(
        `/virtual-tours/${params.tourId}/${
          tourDisplays[tourDisplays.length - 1].display_id
        }`,
      );
    };

    fetchData();
  }, [params.tourId]);

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
        <div className="flex flex-col gap-[3.12rem] py-[10rem] items-center">
          <div className="flex flex-col items-center gap-8 mx-[3.47rem]">
            <div className="flex flex-col gap-3 text-center">
              <div className="flex flex-col items-center gap-5 mx-[2.34rem]">
                <Congratulations />
                <h2 className="text-night">
                  {`You've reached the end of this tour!`}
                </h2>
              </div>
              <p className="b3 text-night">Thanks for visiting {tour?.name}.</p>
            </div>
            <div className="bg-asparagus w-[13.75rem] text-center rounded-lg">
              <Link href="/virtual-tours">
                <p className="b1 px-4 py-[0.62rem]">Back to Virtual Tours</p>
              </Link>
            </div>
          </div>
          {tourMedia.length > 0 && (
            <div className="bg-[#F5F6F5] mb-10 w-[24.375rem]">
              <div className="bg-[#BDBDBD] h-[0.03125rem]" />
              <div className="flex flex-col px-[1.12rem] py-8 gap-6">
                <h4 className="text-night">Related Links</h4>
                <ol className="px-[0.88rem]">
                  {tourMedia.map((tm, index) => (
                    <li key={tm.media_id} className="flex flex-col gap-4">
                      <Link
                        href={
                          media.find(m => m.id === tm.media_id)?.url ?? '-1'
                        }
                        className="flex flex-col gap-1"
                      >
                        <div className="flex flex-row items-center gap-2">
                          <p className="s1 text-shadow uppercase">
                            {media.find(m => m.id === tm.media_id)?.type}
                          </p>
                          <ExternalLinkIcon />
                        </div>
                        <p className="b2 text-night">
                          {media.find(m => m.id === tm.media_id)?.title}
                        </p>
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
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-ivory w-full min-h-screen">
      <NavBar />
      <Link href={backLink} className="relative top-4 left-[1.12rem]">
        <BackArrow />
      </Link>

      <div className="flex flex-col gap-10 mt-8 mb-10">
        <div className="flex flex-col items-center gap-8 mx-[3.47rem]">
          <div className="flex flex-col gap-3 text-center">
            <div className="flex flex-col items-center gap-5 mx-[2.34rem]">
              <Congratulations />
              <h2 className="text-night">
                {`You've reached the end of this tour!`}
              </h2>
            </div>
            <p className="b3 text-night">Thanks for visiting {tour?.name}.</p>
          </div>
          <div className="bg-asparagus w-[13.75rem] text-center rounded-lg">
            <Link href="/virtual-tours">
              <p className="b1 px-4 py-[0.62rem]">Back to Virtual Tours</p>
            </Link>
          </div>
        </div>
        {tourMedia.length > 0 && (
          <div className="bg-[#F5F6F5] mb-10">
            <div className="bg-[#BDBDBD] h-[0.03125rem]" />
            <div className="flex flex-col px-[1.12rem] py-8 gap-6">
              <h4 className="text-night">Related Links</h4>
              <ol className="px-[0.88rem]">
                {tourMedia.map((tm, index) => (
                  <li key={tm.media_id} className="flex flex-col gap-4">
                    <Link
                      href={media.find(m => m.id === tm.media_id)?.url ?? '-1'}
                      className="flex flex-col gap-1"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <p className="s1 text-shadow uppercase">
                          {media.find(m => m.id === tm.media_id)?.type}
                        </p>
                        <ExternalLinkIcon />
                      </div>
                      <p className="b2 text-night">
                        {media.find(m => m.id === tm.media_id)?.title}
                      </p>
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
        )}
      </div>
    </div>
  );
}
