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
  // fetches all the exhibits to display on the page
  useEffect(() => {
    // Get exhibits
    const getExhibits = async () => {
      const fetchedExhibits: CategoryRow[] = await fetchAllCategories();
      setExhibits(fetchedExhibits);
    };
    getExhibits();
    // Detect the hash in URL and scroll to the element with the corresponding ID
  }, [exhibits]);

  // activates whenever the page opens.
  // checks if there's a "hash" which is an id of one of the exhibits to scroll to.
  // scrolls down to corresponding exhibit with slight offset
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        const yOffset = -200;
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
          <h1 className="text-night leading-9 font-['Lato'] mb-4">
            Our Exhibits{' '}
          </h1>
          <p className="text-night leading-5 font-normal font-['Lato']">
            The Bay Area is home to a wide variety of plant and animal life. As
            you explore the exhibits, you will learn about threatened and
            endangered species that are under careful monitoring by biologists.
            Protective conservation efforts are in place for these vulnerable
            plants and animals. We welcome you to learn more about these
            important species throughout the exhibits. Scan the QR codes on
            display for more information.
          </p>
        </div>
        <Link href="/siteMapPage">
          <div className="px-4 py-2 mb-2 mt-6 rounded-md border active:border-hunterGreen border-asparagus justify-start items-start inline-flex">
            <p className="active:text-hunterGreen text-center text-asparagus font-bold font-['Lato'] leading-tight">
              Go to Map
            </p>
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
