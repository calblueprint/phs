/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import NavBar from '@/components/userComponents/navBar/navBar';
import { MediaRow, TourRow, TourMediaRow } from '@/types/types';
import supabase from '@/supabase/client';

export default function Page({ params }: { params: { tourId: string } }) {
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [tour, setTour] = useState<TourRow>();
  const [tourMedia, setTourMedia] = useState<TourMediaRow[]>([]);

  useEffect(() => {
    // Fetch tour details
    async function fetchTour() {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('id', params.tourId)
          .single();
        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error('No data found');
        }
        console.log('Obtained tour details');
        const responseData: TourRow = data;
        setTour(responseData);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    }

    // Fetch tour media
    async function fetchTourMedia() {
      try {
        const { data, error } = await supabase
          .from('tour_media')
          .select('*')
          .eq('tour_id', params.tourId);
        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error('No data found');
        }
        console.log('Obtained tour media');
        console.log({ data: data });
        const responseData: TourMediaRow[] = data;
        console.log({ responseData: responseData });

        setTourMedia(responseData);
        console.log({ tourMedia: tourMedia });
      } catch (error) {
        console.error('Error fetching tour media:', error);
      }
    }

    // Fetch media to get the media titles
    async function fetchMedia() {
      try {
        const { data, error } = await supabase.from('media').select('*');
        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error('No data found');
        }
        console.log('Obtained media');
        const responseData: MediaRow[] = data;
        setMedia(responseData);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }

    fetchTour();
    fetchTourMedia();
    fetchMedia();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <div className="text-center">
        <div className="p-4">
          <h1 className="px-20 py-4 text-[#333333] text-xl font-extrabold">
            You've reached the end of this tour!
          </h1>
          <p className="text-[#333333] text-lg font-medium">
            Thank you for visiting {tour?.name}!
          </p>
        </div>
      </div>
      <Link
        className="bg-white text-center w-[48%] h-16 rounded-2xl"
        href="/featuredToursPage"
      >
        <h2 className="text-[#386131] font-bold p-4">Back to Featured Tours</h2>
      </Link>
      <div className="bg-[#F5F6F5] h-16">
        <h3 className="text-[#141414] font-bold p-4">Related Links</h3>

        <ol className="px-12">
          {tourMedia.map(tm => (
            <li key={tm.media_id}>
              <div>
                <Link
                  href={media.find(m => m.id === tm.media_id)?.url ?? '-1'}
                >
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
}
