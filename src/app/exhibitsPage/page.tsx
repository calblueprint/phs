'use client';

import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import NavBar from '../../components/userComponents/navBar/navBar';
import { ExhibitRow } from '../../types/types';
import { fetchAllExhibits } from '../../supabase/exhibits/queries';

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
    <button type="button" style={{ backgroundColor: '#4b711d' }} onClick={goBack}>
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
    <div className="bg-ivory h-screen">
      <NavBar/>
      <div className="p-4">
        <BackButton/>
        <div className="w-[95%] m-auto flex-col justify-start items-start gap-4">
          <div className="text-night text-neutral-700 text-[32px] font-bold font-['Lato']">Our Exhibits </div>
          <div className="text-night text-neutral-700 text-base font-light font-['Lato']">Saratoga is home to an abundance of plant and animal life. As you explore these exhibits you will learn about species that are endangered and being carefully monitored by scientists with protective efforts in place.</div>
        </div>
      </div>
    </div>
  );
}

export default App;
