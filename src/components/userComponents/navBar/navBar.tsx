<<<<<<< HEAD
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

=======
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
>>>>>>> e2ff808 (merge resolved)
import { HamburgerMenu, CloseMenu } from '../../../../public/icons';

/**
 * @returns The navigation bar for the web app
 */
export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
<<<<<<< HEAD
  const [isWide, setIsWide] = useState(false);
=======
>>>>>>> e2ff808 (merge resolved)

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showMenu]);

<<<<<<< HEAD
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

=======
>>>>>>> e2ff808 (merge resolved)
  /**
   * Toggles the side menu
   */
  function handleClick() {
    setShowMenu(!showMenu);
  }

<<<<<<< HEAD
  return isWide ? (
    <nav className="bg-scary-forest w-full h-[4.625rem] flex flex-col justify-between sticky top-0 left-0 z-[9999]">
      <div className="flex flex-row pl-[3.88rem] pr-[4.75rem] pt-5 justify-between items-center">
=======
  return (
    <nav className="bg-scary-forest w-full h-[4.25rem] flex flex-col relative z-[9999]">
      <div className="flex flex-row justify-between relative top-2">
>>>>>>> e2ff808 (merge resolved)
        <Link href="/">
          <img
            src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/PHSLogo.jpg"
            alt="PHSLogo"
<<<<<<< HEAD
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
=======
            className="object-contain w-[6.5rem] h-[2.25rem] relative left-[1.13rem]"
          />
        </Link>
        <button
          type="button"
          className="w-10 h-10 relative right-[0.81rem]"
          onClick={handleClick}
          aria-label="Toggle Menu"
        >
          <div className="flex justify-center items-center w-full h-full">
            {showMenu ? <CloseMenu /> : <HamburgerMenu />}
          </div>
        </button>
      </div>
      <div className="bg-hunterGreen w-full h-[0.375rem] absolute bottom-0" />

      {showMenu && (
        <div className="bg-[#000000B2] w-full h-full flex justify-end fixed top-[4.25rem]">
          <div className="bg-ivory w-[14.9375rem] h-full relative p-[1.31rem]">
            <h1 className="text-scary-forest font-lato text-sm font-normal uppercase mt-[1.5rem]">
              WELCOME
            </h1>
            <Link
              href="/"
              className="text-night font-lato text-lg font-bold block relative left-4 mt-[1.25rem]"
            >
              Home
            </Link>

            <h1 className="text-scary-forest font-lato text-sm font-normal uppercase mt-[2.12rem]">
              VISIT
            </h1>
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
>>>>>>> e2ff808 (merge resolved)
          </div>
        </div>
      )}
    </nav>
  );
}
