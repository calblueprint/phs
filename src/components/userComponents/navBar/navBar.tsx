import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HamburgerMenu, CloseMenu } from '../../../../public/icons';

/**
 * @returns The navigation bar for the web app
 */
export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showMenu]);

  /**
   * Toggles the side menu
   */
  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <nav
      className="bg-hunterGreen p-4 flex items-center justify-between z-[9999]"
      style={{ padding: '1rem', position: 'sticky', top: 0 }}
    >
      <Link href="/">
        <img
          src="https://phs-spca.org/wp-content/uploads/2017/03/PHSLogo.jpg"
          alt="Logo"
          className="object-contain"
          style={{ maxHeight: '100%', maxWidth: '50%' }}
        />
      </Link>
      <div className="flex-grow" />
      <button
        type="button"
        className="w-10 h-10"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Menu"
      >
        <MenuIcon />
      </button>

      {showMenu && (
        <div className="bg-[#000000B2] w-full h-full flex justify-end fixed top-[4.25rem]">
          <div className="bg-ivory w-[14.9375rem] h-full relative p-[1.31rem]">
            <h1 className="text-scary-forest font-lato text-sm font-normal uppercase mt-[1.5rem]">WELCOME</h1>
            <Link
              href="/"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Home
            </Link>

            <h1 className="text-scary-forest font-lato text-sm font-normal uppercase mt-[2.12rem]">VISIT</h1>
            <Link
              href="/hoursAdmissionPage"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Hours & Location
            </Link>
            <Link
              href="/siteMapPage"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Site Maps
            </Link>

            <h1 className="text-scary-forest font-lato text-sm font-normal uppercase mt-[2.13rem]">
              LEARN & EXPLORE
            </h1>
            <Link
              href="/featuredToursPage"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Virtual Tours
            </Link>
            <Link
              href="/spotlightPage"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Wildlife Spotlights
            </Link>
            <Link
              href="/newsFeedPage"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              News Feed
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}