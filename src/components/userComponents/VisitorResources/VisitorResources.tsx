import React from 'react';
import { PiQrCodeBold } from 'react-icons/pi';
import { FiMap, FiCompass } from 'react-icons/fi';
import { MdOutlineCalendarMonth } from "react-icons/md";
import Link from 'next/link';

/**
 * @returns - Visitor resources section of the home page.  Users can reach the Site Map and QR flow from here.
 * These resources are mainly for in-person experiences
 */
function VisitorResources() {
  return (
    <div 
    // src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/AnimalWellbeing?t=2024-04-09T01%3A52%3A17.540Z"
    className="Visitor-Resources w-full h-98 bg-hunter-green px-4 py-20 
flex-col justify-start items-start gap-4 inline-flex">
      <p className="text-ivory text-2xl font-medium">Visitor Resources</p>
      <Link 
      href= "/exhibitPage"
      className="ExhibitButton w-96 h-28 px-7 py-6 bg-stone-50 rounded-lg shadow
       justify-start items-center gap-4 inline-flex">
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
      <div className="flex space-x-6">
        <Link
          className="w-44 h-24 bg-ivory text-night items-center
          rounded-md shadow inline-flex justify-around"
          href="/siteMapPage"
        >
          <FiCompass className="w-6 h-6 text-scary-forest" />
          <div className="w-23.5 h-12.25 flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="b1 text-night">Site Map</div>
            <div className="w-24 text-left text-zinc-500 text-xs font-normal">
              Navigate the facility with ease
            </div>
          </div>
        </Link>
        <Link
          className="ml-auto w-44 h-24 bg-ivory text-night 
          items-center rounded-md shadow inline-flex justify-around"
          href="/qrCodeTourPage"
        >
          <MdOutlineCalendarMonth className="w-7 h-7 text-scary-forest" />
          <div className="w-23.5 h-12.25 flex-col justify-start
           items-start gap-0.5 inline-flex">
            <div className="b1 text-night">Hours & Location</div>
            <div className="w-24 text-left text-zinc-500 text-xs font-normal">
              Learn more about exhibits
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VisitorResources;
