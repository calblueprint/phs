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
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div className="text-center">
        <div style={{ padding: '16px' }}>
          <h1
            className="px-20 py-4"
            style={{ color: '#333333', fontSize: '20px', fontWeight: 800 }}
          >
            You've reached the end of this tour!
          </h1>
          <p style={{ color: '#333333', fontSize: '1.1rem', fontWeight: 500 }}>
            Thank you for visiting!
          </p>
        </div>
      </div>
      <Link
        className="bg-[#386131] text-center w-[48%] h-16 rounded-2xl"
        href="/featuredToursPage"
      >
        <h2 className="relative top-[30%] text-[#386131] font-bold mt-16">
          Back to Featured Tours
        </h2>
      </Link>
    </div>
  );
}