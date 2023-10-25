'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import supabase from '../../supabase/client';
import { ToursRow } from '../../types/types';
import { TourDisplaysRow } from '../../types/types';
import NavBar from '@/components/userComponents/navBar/navBar';

export default function Page({ params }: { params: { tourId: string }}) {
  const [tour, setTour] = useState<ToursRow>();
  const [tourDisplays, setTourDisplays] = useState<TourDisplaysRow[]>([]);

  useEffect(() => {
    async function fetchTourData() {
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
        const responseData: ToursRow = data;
        setTour(responseData);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    }

    async function fetchTourDisplays() {
      try {
        const { data, error } = await supabase
          .from('tour_displays')
          .select('*')
          .eq('tour_id', params.tourId);
        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error('No data found');
        }
        console.log('Obtained tour displays');
        const responseData: TourDisplaysRow[] = data;
        setTourDisplays(responseData);
      } catch (error) {
        console.error('Error fetching tour displays:', error);
      }
    }

    fetchTourData();
    fetchTourDisplays();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <div>
        <img
          src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="placeholder"
        />
        <div className="mt-4">
          {tour && (
            <div className="flex items-center flex-col bg-[#d7e0cc] h-48 rounded-md mx-4 p-4">
              <h2 className="text-[#141414] text-sm mt-4">WELCOME TO</h2>

              <h1 className="text-[#333333] text-3xl font-bold mb-4">
                {tour.name}
              </h1>

              <div className="bg-[#7ca24e] w-52 rounded-md">
                <Link className="rounded-md w-full" href="/">
                  <h2 className="text-[#fafafa] text-sm text-center font-bold py-2 px-4">
                    Start Tour
                  </h2>
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="p-4">
          {tour && tour.description}
        </p>

        <h3 className="p-4 text-lg font-bold">
          In this tour
        </h3>

        <h4>Tour Displays here</h4>
        <ol className="p-4">
        </ol>

        <h4 className="text-[#386131] px-4 py-8 font-bold">
          <Link href="/featuredToursPage">
            Back to Tours
          </Link>
        </h4>

      </div>
    </div>
  );
}
