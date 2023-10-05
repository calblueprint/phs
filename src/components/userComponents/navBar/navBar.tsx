import React, { useState } from 'react';
import Link from 'next/link';

function NavBar() {
    const [showMenu, setShowMenu] = useState(false);

    function handleClick() {
        setShowMenu(!showMenu);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Escape') {
            setShowMenu(false);
        }
    };

    return (
        <nav className="bg-gray-100 p-4 flex items-center justify-between">
            <Link href="/toursHomescreenPage">
                <img
                    src="logo.png"
                    alt="Logo"
                    className="w-10 h-10"
                />
            </Link>
            <div className="flex-grow" />
            <button
                type="button"
                className="w-10 h-10 bg-gray-500"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            />
            
            {showMenu && (
                <div
                    className="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg"
                    onClick={() => setShowMenu(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="button"
                >
                    <div className="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg">
                        <h1 className="text-xl text-black font-bold p-4">Plan Your Visit</h1>
                        <ul className="p-4">
                            <Link href="/hoursAdmissionPage" className="block mb-2 text-black">Hours & Admission</Link>
                            <Link href="/interactiveMapPage" className="block mb-2 text-black">Interactive Map</Link>
                            <Link href="/qrCodeTourPage" className="block text-black">QR Code Tour</Link>
                        </ul>
                        <h1 className="text-xl text-black font-bold p-4">Learn & Explore</h1>
                        <ul className="p-4">
                            <Link href="/collectionsPage" className="block mb-2 text-black">Collections</Link>
                            <Link href="/newsFeedPage" className="block mb-2 text-black">News Feed</Link>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;