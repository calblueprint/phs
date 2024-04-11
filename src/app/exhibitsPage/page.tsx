'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '../../components/userComponents/navBar/navBar';
import { CategoryRow } from '../../types/types';
import { fetchAllCategories } from '../../supabase/category/queries';
import Exhibit from '../../components/userComponents/Exhibit/Exhibit';
import BackButton from '../../components/userComponents/BackButton/page';

/**
 * @returns exhibit page
 */
function App() {
  const [exhibits, setExhibits] = useState<CategoryRow[]>([]);
  useEffect(() => {
    // Get exhibits
    const getExhibits = async () => {
      const fetchedExhibits: CategoryRow[] = await fetchAllCategories();
      setExhibits(fetchedExhibits);
    };
    getExhibits();
    // Detect the hash in URL and scroll to the element with the corresponding ID
  }, [exhibits]);

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        const yOffset = -50;
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          // check on this offset later
          window.scrollTo({ top: y, behavior: 'instant' });
        }
      }, 1000);
    }
  }, []);
  return (
    <div className="bg-ivory">
      <NavBar />
      <div className="p-4 m-auto">
        <BackButton />
        <div className="flex-col justify-start items-start mt-2">
          <div className="text-night text-[32px] font-bold leading-9 font-['Lato'] mb-4">
            Our Exhibits{' '}
          </div>
          <div className="text-night text-base leading-5 font-normal font-['Lato']">
            Saratoga is home to an abundance of plant and animal life. As you
            explore these exhibits you will learn about species that are
            endangered and being carefully monitored by scientists with
            protective efforts in place.
          </div>
        </div>
        <Link href="/siteMapPage">
          <div className="px-4 py-2 mb-2 mt-6 rounded-md border active:border-hunterGreen border-asparagus justify-start items-start inline-flex">
            <div className="active:text-hunterGreen text-center text-asparagus text-base font-bold font-['Lato'] leading-tight">
              Go to Map
            </div>
          </div>
        </Link>
        <ul>
          {exhibits.map(exhibit => (
            <Exhibit
              title={exhibit.category || ''}
              description={exhibit.description || ''}
              image={exhibit.image || ''}
              key={exhibit.id}
              id={exhibit.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
