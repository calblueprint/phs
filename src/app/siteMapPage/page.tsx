'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import NavBar from '../../components/userComponents/navBar/navBar';

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

function MapPage() {
  // TODO: ask about expected styling when button selected – able to filter on multiple conds?
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-start pl-6">
        <div className="container mb-6 mt-9">
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Site Map</h1>
          <div className="inline-flex flex-row items-center gap-x-2.5 w-full overflow-x-scroll no-scrollbar">
            {filterButtonContent &&
              filterButtonContent.map(text => (
                <button
                  key={text}
                  type="button"
                  className="bg-[#4b711d]/[0.13] text-white py-2 px-4 rounded-full whitespace-nowrap"
                  style={{
                    border: '1px solid #4B711D',
                    flexWrap: 'nowrap',
                    color: '#4B711D',
                  }}
                >
                  {text}
                </button>
              ))}
          </div>
        </div>
        <div className=" w-full pr-6 flex h-2/3 mb-8">
          <SiteMap />
        </div>
      </div>
    </>
  );
}

export default MapPage;
