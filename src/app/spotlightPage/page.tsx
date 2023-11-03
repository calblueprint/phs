/* eslint-disable */
'use client';

//fetch from tours table

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { fetchTours, fetchSpotlightTours, fetchSpotlightMedia } from '@/supabase/tours/queries';
import NavBar from '@/components/userComponents/navBar/navBar';
import { TourRow, MediaRow } from '@/types/types';

function App() {
  const [spotlights, setSpotlights] = useState<TourRow[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData: TourRow[] = await fetchSpotlightTours();
        setSpotlights(responseData);
        console.log('set the spotlights');
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);



  return (
    <div className="bg-[#F5F6F5]">
      <NavBar />

      <div className="p-4 bt-41">
        <h1 className="text-[#333333] text-3xl font-bold mb-4">
          Our Wildlife Spotlights
        </h1>
        <p className="text-[#333333] mb-4">
        Dive into the fascinating world of nature. Explore and uncover the captivating stories of the animal kingdom in our care center.
        </p>

        <ul className="list-none p-0">
          {spotlights.map(
            spotlight => (
                <li className="my-4" key={spotlight.id}>
                  <Link
                    href={`/spotlightPage/${spotlight.id}`}
                    className="w-full rounded-2xl"
                  >
                    <div className="bg-[#386131] h-48 rounded-2xl p-4 flex flex-col">
                      <div className="relative top-28">
                      <Image
                            key={spotlight.id}
                            src={spotlight.url}
                            alt="Media Image"
                            width={100}
                            height={214}
                            priority
                            />
                      </div>
                      
                    </div>
                    <h4 className="text-black font-Lato text-20 font-bold mt-2">
                          {spotlight.name}
                        </h4>
                        <h2 className="text-gray font-Lato text-sm font-normal">
                          {spotlight.description}
                        </h2>
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









