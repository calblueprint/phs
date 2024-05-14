'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '../../components/userComponents/navBar/navBar';
import FilterButton from '../../components/userComponents/FilterButton/FilterButton';
// import { useWebDeviceDetection} from '../context/WindowWidthContext/WindowWidthContext';
import { useWebDeviceDetection } from '../../context/WindowWidthContext/WindowWidthContext';

const filterButtonContent: string[] = [
  'Virtual Tour Map',
  'Exhibits Map',
];

const SiteMap = dynamic(
  () => import('../../components/userComponents/SiteMap/SiteMap'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);
type ModeState = 'tours' | 'exhibits';

/**
 * @returns Page for the interactive map
 */
function MapPage() {

  const [selectedMap, setSelectedMap] = useState(filterButtonContent[0]); // "Virtual Tour Map" by default
  const [mode, setMode] = useState<ModeState>('tours');

  const isWebDevice = useWebDeviceDetection();




  // move tour logic here: need to share state between filter
  const handleFilter = (mapName: string) => {
    setSelectedMap(mapName);
    if (mapName === "Virtual Tour Map") {
      setMode("tours");
    } else if (mapName === "Exhibits Map") {
      setMode("exhibits");
    }
  };

  const renderFilterContainer = () => (
    <div className="mb-6 w-full px-4">
      <div className="flex flex-row items-center justify-between bg-mint-cream border-mint-cream border-[8px] rounded-lg w-full">
        {filterButtonContent &&
          filterButtonContent.map(text => (
            <FilterButton
              key={text}
              content={text}
              onClick={() => handleFilter(text)}
              isSelected={selectedMap === text}
            />
          ))}
      </div>
    </div>
  );
  const renderFilterContainerWide = () => (
    <div className="flex justify-end w-[23.875rem] h-[3.25rem]">
      <div className="flex flex-row items-center rounded-lg bg-mint-cream  border-mint-cream border-[8px]"
      style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>  
           
        {filterButtonContent &&
          filterButtonContent.map(text => (
            <FilterButton 
            key={text} 
            content={text} 
            onClick={() => handleFilter(text)} // Fixed here
            isSelected={selectedMap === text}
            />
          
          ))}
      </div>
    </div>
  );

  return isWebDevice ? (

    <>
   
    
      <NavBar />
      <div className='justify-center mx-auto w-[70%]'>
        <div className="pt-0 pl-2 pr-2 bg-ivory">

      <div className="pt-20 pb-6 pl-2 ">
        <span className="text-scary-forest font-lato text-sm font-normal">
          Home  <span className='text-night'> / Wildlife Care Center Maps </span>
        </span> 
      </div>
      <div className="flex items-center  pb-4">
        <div className='flex-initial pr-2 pl-2'>
          <p className="text-night font-lato font-normal text-3xl">Wildlife Care Center Maps</p>
        </div>
        <div className="flex-grow flex justify-end pr-2 pl-2 pb-3">
          {renderFilterContainerWide()}
        </div>
      </div>
        <div className="w-full pr-2 pl-2 flex h-2/3 mb-8">
          <SiteMap mode={mode} />
        </div>
      </div>
      </div>

    </>
  ) : (
    <>
     <NavBar />
    <div className='pt-6.25 pr-2 pl-2 pb-2 bg-ivory'>
      <div className="p-4">
        <p className="text-night font-lato text-2xl font-normal">Wildlife Care Center Maps</p>
      </div>

      {renderFilterContainer()}
      <div className="pt-0 pl-2 pr-2 bg-ivory">
        <div className="w-full pr-2 pl-2 flex h-2/3 mb-8">
          <SiteMap mode={mode} />
        </div>
      </div>
    </div>
    </>
  );
}

export default MapPage;
