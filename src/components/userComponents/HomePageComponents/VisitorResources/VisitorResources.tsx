import React from 'react';
import ExhibitButton from './ExhibitButton';
import MapButton from './MapButton';
import AdmissionButton from './AdmissionButton';

/**
 * @returns - Visitor resources section of the home page.  Users can reach the Site Map and QR flow from here.
 * These resources are mainly for in-person experiences
 * NOTE: VisitorResources tag below uses padding to ensure relative consistency of text lining up with buttons.
 * It will look slightly off on some screens.  Motivation: it's better to be slightly wrong on many screens
 * than VERY wrong on a few.  If solution found, @andreiTan
 */
function VisitorResources() {
  return (
    <div className="relative justify-center">
      <div className="absolute inset-0 bg-hunter-green bg-opacity-80 z-0" />
      <div
        className="Visitor-Resources w-full 
        flex flex-col items-center 
        gap-4 inline-flex bg-opacity-80
        px-4 web:px-96 py-20
        "
        style={{
          backgroundImage:
            "url('https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/BirdBackground')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p
          className="VisitorResources z-10 text-ivory text-2xl font-medium 
          px-6
          w-96 max-w-full web:w-full
          web:text-center"
        >
          Visitor Resources
        </p>
        <div
          className="z-10 flex-col items-start justify-start items-center web:items-start
        gap-4 web:gap-3 inline-flex bg-opacity-80 
         web:flex-row web:flex-grow-0 h-full"
        >
          <ExhibitButton />
          <div className="flex w-full justify-center gap-4 web:space-x-0 z-10 web:flex-col web:gap-3">
            <div className="w-1/2 web:w-full web:h-1/2">
              <MapButton />
            </div>
            <div className="w-1/2 web:w-full web:h-1/2">
              <AdmissionButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorResources;
