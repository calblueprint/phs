/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import NavBar from '@/components/userComponents/navBar/navBar';
import { MediaRow, TourRow, TourMediaRow } from '@/types/types';
import { fetchMedia } from '@/supabase/media/queries';
import { fetchTour } from '@/supabase/tours/queries';
import { fetchTourMedia } from '@/supabase/tour_media/queries';

export default ({ params }: { params: { tourId: string } }) => {
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [tour, setTour] = useState<TourRow>();
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);

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

    getTour();
    getTourMedia();
    getMedia();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />

      <div className="flex flex-col items-center">
        <div className="p-4 text-center">
          <h1 className="px-20 py-4 text-[#333333] text-xl font-extrabold mb-4">
            You've reached the end of this tour!
          </h1>
          <p className="text-[#333333] text-lg font-medium mb-4">
            Thanks for visiting {tour?.name}.
          </p>
        </div>
        <div className="bg-[#7ca24e] text-center w-72 h-auto rounded-2xl mb-4">
          <Link href="/featuredToursPage">
            <h2 className="text-white font-bold p-4">
              Back to Featured Tours
            </h2>
          </Link>
        </div>
      </div>

      <div className="bg-[#f5f6f5] p-4">
        <h3 className="text-[#141414] font-bold py-4">Related Links</h3>
        <ol className="px-4">
          {tourMedia.map(tm => (
            <li key={tm.media_id}>
              <div className="py-2">
                <Link href={media.find(m => m.id === tm.media_id)?.url ?? '-1'}>
                  <h4 className="font-light">
                    {media.find(m => m.id === tm.media_id)?.type}
                  </h4>
                  <h4 className="font-light">
                    {media.find(m => m.id === tm.media_id)?.title}
                  </h4>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
