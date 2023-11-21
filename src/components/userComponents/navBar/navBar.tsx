import React, { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenu } from '../../../../public/Icons';

/**
 *
 */
export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  /**
   *
   */
  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <nav
      className="bg-[#4b711d] p-4 flex sticky items-center justify-between z-[9999]"
    >
      <Link href="/">
        <img
          src="https://phs-spca.org/wp-content/uploads/2017/03/PHSLogo.jpg"
          alt="Logo"
          className="object-contain max-w-[50%]"
        />
      </Link>
      <div className="flex-grow" />
      <button
        type="button"
        className="w-10 h-10"
        onClick={handleClick}
      >
        <HamburgerMenu />
      </button>

      {showMenu && (
        <div className="fixed top-20 right-0 h-full w-3/5 bg-[#ebf0e4] shadow-lg">
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

