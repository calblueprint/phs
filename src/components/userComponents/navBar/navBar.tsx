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
      <div className='flex flex-row justify-between relative top-[3.25rem]'>
        <Link href="/">
          <img
            src="https://phs-spca.org/wp-content/uploads/2017/03/PHSLogo.jpg"
            alt="PHSLogo"
            className="object-contain w-[6.5rem] h-[2.25rem] relative left-[1.13rem]"
          />
        </Link>
        <button type="button" className="w-10 h-10 relative right-[0.81rem]" onClick={handleClick}>
          <HamburgerMenu />
        </button>
      </div>
      <div className=" bg-hunter-green w-[24.375rem] h-[0.375rem] absolute bottom-0"/>

      {showMenu && (
        <div className="fixed top-28 right-0 h-full w-3/5 bg-[#ebf0e4] shadow-lg">
          <h1 className="text-xl text-black font-bold p-4">WELCOME</h1>
          <ul className="p-4">
            <Link href="/" className="block mb-2 text-black">
              Home
            </Link>
          </ul>

          <h1 className="text-xl text-black font-bold p-4">VISIT</h1>
          <ul className="p-4">
            <Link href="/hoursAdmissionPage" className="block mb-2 text-black">
              Hours & Admission
            </Link>
            <Link href="/featuredToursPage" className="block mb-2 text-black">
              Featured Tours
            </Link>
            <Link href="/spotlightPage" className="block mb-2 text-black">
              Spotlight Tours
            </Link>
            <Link href="/siteMapPage" className="block mb-2 text-black">
              Site Map
            </Link>
            <Link href="/qrCodeTourPage" className="block text-black">
              QR Code Tour
            </Link>
            <Link href="/qrCodeScanner" className="block text-black">
              QR Scanner
            </Link>
          </ul>

          <h1 className="text-xl text-black font-bold p-4">LEARN & EXPLORE</h1>
          <ul className="p-4">
            <Link href="/collectionsPage" className="block mb-2 text-black">
              Collections
            </Link>
            <Link href="/newsFeedPage" className="block mb-2 text-black">
              News Feed
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
