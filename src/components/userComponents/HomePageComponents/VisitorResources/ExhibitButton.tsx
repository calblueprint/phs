import React from 'react';
import Link from 'next/link';
import { FiMap } from 'react-icons/fi';

/**
 * @returns - Button for the user to explore the exhibits of the wildlife care center
 * This button is part of the Visitor Resources section of the home page
 *
 * Click effects are applied to the button, exhibit logo turns white on-click
 * Group hover and focus effects are used s.t. hover effects work on everything.
 */
function ExhibitButton() {
  return (
    <Link
      href="/exhibitPage"
      className="ExhibitButton rounded-lg justify-start items-center gap-4 inline-flex
      bg-ivory group hover:bg-mint-cream focus:bg-mint-cream 
      w-full h-full web:h-48
      p-6 web:px-8 web:py-16 
      shadow-darkest focus:shadow-vignette"
    >
      <div
        className="GreenCircle relative rounded-full flex justify-center items-center 
        w-14 h-14
       bg-mint-cream group-hover:bg-ivory group-focus:bg-ivory"
      >
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
