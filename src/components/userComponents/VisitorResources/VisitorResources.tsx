import React from 'react';
import { PiQrCodeBold } from 'react-icons/pi';
import { FiMap } from 'react-icons/fi';
import Link from 'next/link';

/**
 * @returns - Visitor resources section of the home page.  Users can reach the Site Map and QR flow from here.
 * These resources are mainly for in-person experiences
 */
function VisitorResources() {
  return (
    <div className="Visitor-Resources w-full h-48 bg-mint-cream pt-6 px-4">
      <h3 className="text-night mb-4">Visitor Resources</h3>
      <div className="flex space-x-6">
        <Link
          className="w-44 h-24 bg-ivory text-night items-center rounded-md shadow inline-flex justify-around"
          href="/siteMapPage"
        >
          <FiMap className="w-6 h-6 text-scary-forest" />
          <div className="w-23.5 h-12.25 flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="b1 text-night">Site Map</div>
            <div className="w-24 text-left text-zinc-500 text-xs font-normal">
              Navigate the facility with ease
            </div>
          </div>
        </Link>
        <Link
          className="ml-auto w-44 h-24 bg-ivory text-night items-center rounded-md shadow inline-flex justify-around"
          href="/qrCodeTourPage"
        >
          <PiQrCodeBold className="w-7 h-7 text-scary-forest" />
          <div className="w-23.5 h-12.25 flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="b1 text-night">QR Explore</div>
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
