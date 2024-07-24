import React from 'react';
import Link from 'next/link';
import { FiMap } from 'react-icons/fi';

/**
 * @returns - Button for the user to explore the exhibits of the wildlife care center
 * This button is part of the Visitor Resources section of the home page
 */
function ExhibitButton() {
  return (
    <Link
      href="/exhibitPage"
      className="ExhibitButton py-6 w-full md:px-8 md:py-16 bg-stone-50 rounded-lg shadow
        justify-start items-center gap-4 inline-flex"
    >
      <div className="GreenCircle w-14 h-14 md:h-13 relative bg-mint-cream rounded-full flex justify-center items-center">
        <FiMap className="w-6 h-6 text-scary-forest" />
      </div>
      <div className="TextField flex-col gap-[4px]">
        <p className="b1 text-neutral-700 leading-tight">
          Explore our Exhibits
        </p>
        <p className="s w-52 text-zinc-500 text-sm font-normal font-lato">
          Discover interactive exhibits of our wildlife care center
        </p>
      </div>
    </Link>
  );
}

export default ExhibitButton;
