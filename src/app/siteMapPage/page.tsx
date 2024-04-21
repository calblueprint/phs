'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '../../components/userComponents/navBar/navBar';
import FilterButton from '../../components/userComponents/FilterButton/FilterButton';

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
    <div className="mb-6  pl-0 pr-0 ">
      <div className='pt-9 pr-2 pl-2 pb-3'>
      <p className="text-night font-lato text-2xl font-semibold">Wildlife Care Center Maps</p>
      </div>
      <div className="flex flex-row items-center pr-0 pl-0 rounded-lg bg-mint-cream  border-mint-cream border-[8px]"
      style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>  
      
       
     
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

  return (
    <>
    
      <NavBar />
      <div className="pt-0 pl-2 pr-2 bg-ivory">
        {renderFilterContainer()}
        <div className=" w-full pr-2 pl-2 flex h-2/3 mb-8">
        <SiteMap mode={mode} />
        </div>
      </div>
    </>
  );
}

export default MapPage;
