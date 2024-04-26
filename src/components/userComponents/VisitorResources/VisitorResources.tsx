import React, { useEffect, useState } from 'react';
import ExhibitButton from './ExhibitButton';
import MapButton from './MapButton';
import AdmissionButton from './AdmissionButton';

/**
 * @returns - Visitor resources section of the home page.  Users can reach the Site Map and QR flow from here.
 * These resources are mainly for in-person experiences
 */
function VisitorResources() {
  return (
    <div className="relative justify-center">
      <div className="absolute inset-0 bg-hunter-green bg-opacity-80 z-0" />
      <div
        className="Visitor-Resources w-full px-4 py-20
        flex-col items-start justify-start items-center 
        gap-4 inline-flex bg-opacity-80"
        style={{
          backgroundImage:
            "url('https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/BirdBackground')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="ForCentering w-96 z-10">
          <p className="text-ivory text-2xl font-medium z-10 web:text-center">
            Visitor Resources
          </p>
        </div>
        <div className="z-10 flex-col items-start justify-start items-center gap-4 web:gap-3 inline-flex bg-opacity-80 web:flex-row">
          <ExhibitButton />
          <div className="flex w-full justify-center gap-4 web:space-x-0 z-10 web:flex-col web:gap-3">
            <div className="w-1/2 web:w-full">
              <MapButton />
            </div>
            <div className="w-1/2 web:w-full">
              <AdmissionButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorResources;
