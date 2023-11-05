import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import SpotlightScroller from '../SpotlightScroller/SpotlightScroller';

/**
 *
 */
function HomeWildlifeSpotlights() {
  return (
    <div className='mt-8'>
        <div className='w-96 h-5 justify-start items-center gap-28 mx-4 inline-flex'>
          <h3 className="text-night">Our Wildlife Spotlights</h3>
          <button type = "button" className="b1 text-asparagus inline-flex items-center"> 
            See All 
            <HiChevronRight className='text-2xl'/>
          </button>
        </div>
        <SpotlightScroller/>
      </div>
  );
}

export default HomeWildlifeSpotlights;
