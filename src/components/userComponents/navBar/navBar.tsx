import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { HamburgerMenu, CloseMenu } from '../../../../public/icons';

/**
 * @returns The navigation bar for the web app
 */
export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showMenu]);

  useEffect(() => {
    if (window) {
      setIsWide(window.innerWidth >= 1024);
    }
    // Update isWide state on window resize
    const handleResize = () => setIsWide(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Toggles the side menu
   */
  function handleClick() {
    setShowMenu(!showMenu);
  }

  return isWide ? (
    <nav className="bg-scary-forest w-full h-[4.625rem] flex flex-col justify-between sticky top-0 left-0 z-[9999]">
      <div className="flex flex-row pl-[3.88rem] pr-[4.75rem] pt-5 justify-between items-center">
        <Link href="/">
          <img
            src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/PHSLogo.jpg"
            alt="PHSLogo"
            className="w-[6.5rem] h-[2.25rem]"
          />
        </Link>
        <p className="b1 text-ivory flex flex-row gap-[3.19rem]">
          <Link href="/hours-and-location">Hours & Location</Link>
          <Link href="/exhibits">Exhibits</Link>
          <Link href="/site-maps">Site Maps</Link>
          <Link href="/virtual-tours">Virtual Tours</Link>
          <Link href="/wildlife-spotlights">Wildlife Spotlights</Link>
          <Link href="/news">News</Link>
        </p>
      </div>
      <div className="bg-hunter-green w-full h-[0.375rem]" />
    </nav>
  ) : (
    <nav className="w-full sticky top-0 left-0 z-[9999]">
      <div className="bg-scary-forest h-[4.25rem] flex flex-col justify-between relative">
        <div className="flex flex-row pl-[1.12rem] pr-[0.88rem] pt-2 justify-between">
          <Link href="/">
            <img
              src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/PHSLogo.jpg"
              alt="PHSLogo"
              className="object-contain w-[6.5rem] h-[2.25rem]"
            />
          </Link>
          <button
            type="button"
            className="w-10 h-10"
            onClick={handleClick}
            aria-label="Toggle Menu"
          >
            <div className="flex justify-center">
              {showMenu ? <CloseMenu /> : <HamburgerMenu />}
            </div>
          </button>
        </div>
        <div className="bg-hunter-green w-full h-[0.375rem]" />
      </div>

      {showMenu && (
        <div className="flex flex-row w-full top-[4.25rem] absolute right-0 z-[999]">
          <button
            type="button"
            className="bg-[#000000B2] flex-auto min-h-screen"
            onClick={handleClick}
            aria-label="Exit Menu"
          />
          <div className="bg-ivory flex flex-col gap-[2.12rem] w-[18.8125rem] h-screen px-[1.65rem] py-[2.81rem]">
            <div className="flex flex-col gap-5">
              <p className="s1 text-scary-forest uppercase">WELCOME</p>
              <h4 className="text-night pl-5">
                <Link href="/">Home</Link>
              </h4>
            </div>
            <div className="flex flex-col gap-5">
              <p className="s1 text-scary-forest uppercase">VISIT</p>
              <h4 className="text-night flex flex-col gap-[1.38rem] pl-5">
                <Link href="/hours-and-location">Hours & Location</Link>
                <Link href="/site-maps">Site Maps</Link>
                <Link href="/exhibits">Exhibits</Link>
              </h4>
            </div>
            <div>
              <div className="flex flex-col gap-5">
                <p className="s1 text-scary-forest uppercase">
                  LEARN & EXPLORE
                </p>
                <h4 className="text-night flex flex-col gap-[1.38rem] pl-5">
                  <Link href="/virtual-tours">Virtual Tours</Link>
                  <Link href="/wildlife-spotlights">Wildlife Spotlights</Link>
                  <Link href="/news">News</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
