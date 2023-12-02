'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import NavBar from '../../components/userComponents/navBar/navBar';
import FilterButton from '../../components/userComponents/FilterButton/FilterButton';

const filterButtonContent: string[] = [
  'Buildings & Services',
  'Pools, Aviaries, Enclosures',
  'Site Features',
];

const SiteMap = dynamic(
  () => import('../../components/userComponents/SiteMap/SiteMap'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);



/**
 * @returns Page for the interactive map
 */
function MapPage() {

  // move tour logic here: need to share state between filter 
  const handleFilter = () => {};

  const renderFilterContainer = () => (
    <div className="container mb-6 mt-9">
      <p className="text-[#808080]">FILTER BY</p>
      <div className="inline-flex flex-row items-center gap-x-2.5 w-full overflow-x-scroll no-scrollbar">
        {filterButtonContent &&
          filterButtonContent.map(text => (
            <FilterButton key={text} content={text} onClick={handleFilter} />
          ))}
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-start pl-6">
        {renderFilterContainer()}
        <div className=" w-full pr-6 flex h-2/3 mb-8">
          <SiteMap />
        </div>
      </div>
    </>
  );
}

export default MapPage;
