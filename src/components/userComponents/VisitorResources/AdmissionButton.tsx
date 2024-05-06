import React from 'react';
import Link from 'next/link';
import { MdOutlineCalendarMonth } from 'react-icons/md';

/**
 * @returns - Button for the user to view the hours and location of the wildlife care center
 * This button is part of the Visitor Resources section of the home page
 */
function AdmissionButton() {
  return (
    <a
      className="AdmissionButton w-full rounded-md
      justify-center items-center inline-flex z-10 
      bg-ivory group hover:bg-mint-cream focus:bg-mint-cream
      shadow-darkest focus:shadow-vignette
      px-5 py-5 web:px-8 web:py-6"
      href="/hoursAdmissionPage"
    >
      <div
        className="GreenCircle w-10 h-10 relative rounded-full flex justify-center items-center
      bg-mint-cream group-hover:bg-ivory group-focus:bg-ivory"
      >
        <MdOutlineCalendarMonth className="w-7 h-7 text-scary-forest" />
      </div>
      <div
        className="flex-col justify-start
      items-start gap-0.5 inline-flex"
      >
        <p className="b1 text-night whitespace-normal web:text-nowrap">
          Hours & Location
        </p>
      </div>
    </a>
  );
}

export default AdmissionButton;
