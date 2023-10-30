/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { fetchTours } from '@/supabase/tours/queries';
import NavBar from '@/components/userComponents/navBar/navBar';
import { TourRow } from '@/types/types';

function App() {
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

      <div className="p-4">
        <h1 className="text-[#333333] text-3xl font-bold mb-4">
          Featured Tours
        </h1>
        <p className="text-[#333333] mb-4">
          Embark on a tour and explore our exhibits from anywhere - at home or
          in person!
        </p>

        <ul className="list-none p-0">
          {tours.map(
            tour =>
              tour.spotlight === false && (
                <li className="my-4" key={tour.id}>
                  <Link
                    href={`/featuredToursPage/${tour.id}`}
                    className="w-full rounded-2xl"
                  >
                    <div className="bg-[#386131] h-48 rounded-2xl p-4 flex flex-col">
                      <div className="relative top-28">
                        <h4 className="text-white text-sm font-semibold mt-0.5">
                          {tour.stop_count} stops
                        </h4>
                        <h2 className="text-white text-xl font-extrabold truncate">
                          {tour.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </li>
              ),
          )}
        </ul>
        
      </div>
    </div>
  );
}

export default App;
