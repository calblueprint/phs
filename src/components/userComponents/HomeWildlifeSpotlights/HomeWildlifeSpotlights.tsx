import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import SpotlightScroller from '../SpotlightScroller/SpotlightScroller';

/**
 *
 */
function HomeWildlifeSpotlights() {
  return (
    <div className="mt-8">
      <div className="w-full h-5 justify-between items-center wx-4 inline-flex">
        <h3 className="text-night ml-4 ">Our Wildlife Spotlights</h3>
        <button
          type="button"
          className="b1 text-asparagus inline-flex items-center mr-4"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </button>
      </div>
      <SpotlightScroller />
    </div>
  );
}

export default HomeWildlifeSpotlights;
