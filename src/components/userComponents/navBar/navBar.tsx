import React, { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenu } from '../../../../public/Icons';

/**
 * @returns The navigation bar for the web app
 */
export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  /**
   * Toggles the side menu
   */
  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <nav className="bg-scary-forest w-[24.375rem] h-[7rem] flex flex-col relative z-[9999]">
      <div className="flex flex-row justify-between relative top-[3.25rem]">
        <Link href="/">
          <img
            src="https://phs-spca.org/wp-content/uploads/2017/03/PHSLogo.jpg"
            alt="PHSLogo"
            className="object-contain w-[6.5rem] h-[2.25rem] relative left-[1.13rem]"
          />
        </Link>
        <button
          type="button"
          className="w-10 h-10 relative right-[0.81rem]"
          onClick={handleClick}
        >
          <HamburgerMenu />
        </button>
      </div>
      <div className=" bg-hunter-green w-[24.375rem] h-[0.375rem] absolute bottom-0" />

      {showMenu && (
        <div className="relative">
          <div className="bg-[#141414] fixed top-28 left-0 w-full h-full opacity-[56%]" />
          <div className="bg-ivory fixed top-28 right-0 w-[14.9375rem] h-full p-[1.31rem]">
            <h1 className="text-scary-forest text-sm mt-[1.5rem]">WELCOME</h1>
            <Link href="/" className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]">
              Home
            </Link>

            <h1 className="text-scary-forest text-sm mt-[2.12rem]">VISIT</h1>
            <Link
              href="/hoursAdmissionPage"
              className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Hours & Admission
            </Link>
            <Link
              href="/featuredToursPage"
              className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Tours
            </Link>
            <Link
              href="/siteMapPage"
              className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Site Map
            </Link>
            <Link
              href="/qrCodeTourPage"
              className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              QR Scanner
            </Link>

            <h1 className="text-scary-forest text-sm mt-[2.13rem]">LEARN & EXPLORE</h1>
            <Link
              href="/spotlightPage"
              className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Spotlights
            </Link>
            <Link
              href="/newsFeedPage"
              className="text-night text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              News Feed
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
