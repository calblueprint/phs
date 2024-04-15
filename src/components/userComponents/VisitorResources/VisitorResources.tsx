import React, { useEffect, useState } from 'react';
import { FiMap, FiCompass } from 'react-icons/fi';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import Link from 'next/link';

/**
 * @returns - Visitor resources section of the home page.  Users can reach the Site Map and QR flow from here.
 * These resources are mainly for in-person experiences
 */
function VisitorResources() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  
  return (
    <div className="relative flexbox flex-col justify-center">
      {/* <div className="absolute inset-0 bg-lime-800 bg-opacity-80 z-0" /> */}
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
        <div className="absolute inset-0 bg-hunter-green bg-opacity-80 z-0" />
        <div className="ForCentering w-96 z-10">
          <p className="text-ivory text-2xl font-medium z-10">
            Visitor Resources
          </p>
        </div>

        {/* {windowWidth < 768 && (
          <>
            <Link
              href="/exhibitPage"
              className="ExhibitButton w-96 h-28 px-7 py-6 bg-stone-50 rounded-lg shadow
              justify-start items-center gap-4 inline-flex z-10"
            >
              <div className="GreenCircle w-14 h-14 relative bg-mint-cream rounded-full flex justify-center items-center">
                <FiMap className="w-6 h-6 text-scary-forest" />
              </div>
              <div className="TextField flex-col gap-[4px]">
                <p className="b1 text-neutral-700 leading-tight">
                  Explore our Exhibits
                </p>
                <p className="s w-52 text-zinc-500 text-sm font-normal font-['Lato']">
                  Discover interactive exhibits of our wildlife care center
                </p>
              </div>
            </Link>
            <div className="flex justify-center space-x-6 z-10">
              <Link
                className="MapButton bg-ivory w-44 h-22 py-5 rounded-md shadow 
              justify-center items-center gap-3 inline-flex z-10 gap-3"
                href="/siteMapPage"
              >
                <div className="GreenCircle w-10 h-10 relative bg-mint-cream rounded-full flex justify-center items-center">
                  <FiCompass className="w-6 h-6 text-scary-forest" />
                </div>
                <div className="h-5 justify-center items-start gap-1.5 flex">
                  <div className="w-20 text-neutral-700 text-base font-bold font-['Lato'] leading-tight">
                    View Map
                  </div>
                </div>
              </Link>
              <Link
                className="AdmissionButton bg-ivory w-44 h-22 py-5 rounded-md shadow 
                justify-center items-center gap-3 inline-flex z-10 gap-3"
                href="/hoursAdmissionPage"
              >
                <div
                  className="GreenCircle w-10 h-10 relative bg-mint-cream 
                rounded-full flex justify-center items-center"
                >
                  <MdOutlineCalendarMonth className="w-7 h-7 text-scary-forest" />
                </div>
                <div
                  className="w-23.5 h-12.25 flex-col justify-start
                  items-start gap-0.5 inline-flex"
                >
                  <p className="b1 text-night">Hours &</p>
                  <p className="b1 text-night">Location</p>
                </div>
              </Link>
            </div>
          </>
        )} */}
        <Link
              href="/exhibitPage"
              className="ExhibitButton w-96 h-28 px-7 py-6 bg-stone-50 rounded-lg shadow
              justify-start items-center gap-4 inline-flex z-10"
            >
              <div className="GreenCircle w-14 h-14 relative bg-mint-cream rounded-full flex justify-center items-center">
                <FiMap className="w-6 h-6 text-scary-forest" />
              </div>
              <div className="TextField flex-col gap-[4px]">
                <p className="b1 text-neutral-700 leading-tight">
                  Explore our Exhibits
                </p>
                <p className="s w-52 text-zinc-500 text-sm font-normal font-['Lato']">
                  Discover interactive exhibits of our wildlife care center
                </p>
              </div>
            </Link>
            <div className="flex justify-center space-x-6 z-10">
              <Link
                className="MapButton bg-ivory w-44 h-22 py-5 rounded-md shadow 
              justify-center items-center gap-3 inline-flex z-10 gap-3"
                href="/siteMapPage"
              >
                <div className="GreenCircle w-10 h-10 relative bg-mint-cream rounded-full flex justify-center items-center">
                  <FiCompass className="w-6 h-6 text-scary-forest" />
                </div>
                <div className="h-5 justify-center items-start gap-1.5 flex">
                  <div className="w-20 text-neutral-700 text-base font-bold font-['Lato'] leading-tight">
                    View Map
                  </div>
                </div>
              </Link>
              <Link
                className="AdmissionButton bg-ivory w-44 h-22 py-5 rounded-md shadow 
                justify-center items-center gap-3 inline-flex z-10 gap-3"
                href="/hoursAdmissionPage"
              >
                <div
                  className="GreenCircle w-10 h-10 relative bg-mint-cream 
                rounded-full flex justify-center items-center"
                >
                  <MdOutlineCalendarMonth className="w-7 h-7 text-scary-forest" />
                </div>
                <div
                  className="w-23.5 h-12.25 flex-col justify-start
                  items-start gap-0.5 inline-flex"
                >
                  <p className="b1 text-night">Hours &</p>
                  <p className="b1 text-night">Location</p>
                </div>
              </Link>
            </div>
      </div>
    </div>
  );
}

export default VisitorResources;
