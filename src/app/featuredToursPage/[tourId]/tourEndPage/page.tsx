/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { fetchTours } from '@/supabase/tours/queries';
import NavBar from '@/components/userComponents/navBar/navBar';
import { TourRow } from '@/types/types';

export default function Page({ params }: { params: { tourId: string } }) {
  const [tours, setTours] = useState<TourRow[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData: TourRow[] = await fetchTours();
        setTours(responseData);
        console.log('set the tours');
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <h1 className="text-[#333333] text-3xl font-bold p-4">{params.tourId}</h1>
    </div>
  );
}
