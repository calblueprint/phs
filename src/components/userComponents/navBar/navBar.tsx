import React, { useState } from 'react';
import Link from 'next/link';

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  function handleClick() {
    setShowMenu(!showMenu);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Escape') {
      setShowMenu(false);
    }
  }

  return (
    <nav
      className="bg-[#4b711d] p-4 flex items-center justify-between"
      style={{ padding: '1rem' }}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
        >
          <path
            d="M9.58331 13.4167H36.4166"
            stroke="white"
            strokeWidth="3.83333"
            strokeLinecap="round"
          />
          <path
            d="M9.58331 23H36.4166"
            stroke="white"
            strokeWidth="3.83333"
            strokeLinecap="round"
          />
          <path
            d="M9.58331 32.5833H36.4166"
            stroke="white"
            strokeWidth="3.83333"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {showMenu && (
        <div className="fixed top-20 right-0 h-full w-3/5 bg-[#ebf0e4] shadow-lg z-[9999]">
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
            <Link href="/siteMapPage" className="block mb-2 text-black">
              Site Map
            </Link>
            <Link href="/qrCodeTourPage" className="block text-black">
              QR Code Tour
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

export default NavBar;
