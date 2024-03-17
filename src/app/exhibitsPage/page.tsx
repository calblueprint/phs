'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import NavBar from '../../components/userComponents/navBar/navBar';
import { ExhibitRow } from '../../types/types';
import { fetchAllExhibits } from '../../supabase/exhibits/queries';
import Exhibit from '../../components/userComponents/Exhibit/Exhibit';

/**
 * @param evt on click of button
 */
function goBack(evt: React.SyntheticEvent) {
  // ignore the native anchor action
  evt.preventDefault();

  window.history.back();
}

/**
 * @returns back button
 */
function BackButton() {
  return (
    <button type="button" className="text-scary-forest" onClick={goBack}>
      {' '}
      <IoIosArrowRoundBack size={40} />
    </button>
  );
}

/**
 * @returns exhibit page
 */
function App() {
  const [exhibits, setExhibits] = useState<ExhibitRow[]>([]);
  useEffect(() => {
    // Get exhibits
    const getExhibits = async () => {
      const fetchedExhibits: ExhibitRow[] = await fetchAllExhibits();
      setExhibits(fetchedExhibits);
    };
    getExhibits();
  }, [exhibits]);
  return (
    <div className="bg-ivory">
      <NavBar/>
      <div className="p-4 m-auto">
        <BackButton/>
        <div className="flex-col justify-start items-start mb-6 mt-3">
          <div className="text-night text-neutral-700 text-[32px] font-bold leading-9 font-['Lato'] mb-4">Our Exhibits </div>
          <div className="text-night text-neutral-700 text-base leading-5 font-light font-['Lato']">Saratoga is home to an abundance of plant and animal life. As you explore these exhibits you will learn about species that are endangered and being carefully monitored by scientists with protective efforts in place.</div>
        </div>
        <Link href="/siteMapPage">
          <div className="px-4 py-2 rounded-md border border-asparagus justify-start items-start gap-2.5 inline-flex">
            <div className="text-center text-asparagus text-base font-bold font-['Lato'] leading-tight">Go to Map</div>
          </div>
        </Link>
        {exhibits.map(exhibit => (
          <Exhibit title={exhibit.title} description={exhibit.description} image={exhibit.image || ''} key={exhibit.id} id={exhibit.id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
