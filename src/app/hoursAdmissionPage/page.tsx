'use client';

import React from 'react';
import { FiCalendar, FiCompass } from 'react-icons/fi';
import Link from 'next/link';
import NavBar from '../../components/userComponents/navBar/navBar';
import { BackArrow } from '../../../public/icons';

/**
 * @returns The hours and admission page.
 */
export default function HoursAdmissionPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <NavBar />
      <div className="px-[1.12rem] pt-4 pb-[2.5rem]">
        <div className="mb-4">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>
        <h1 className="text-night font-lato text-3xl font-bold mb-4">
          Hours & Location
        </h1>
        <h3 className="text-night font-lato text-lg font-bold mb-4">
          Site Information
        </h3>

        <div className="bg-[#EBF0E8] rounded-lg py-8 pl-[1.13rem] pr-[1.56rem] mb-[2.38rem]">
          <div className="flex gap-[0.56rem] mb-[1.81rem]">
            <FiCompass className="text-scary-forest w-[1.375rem] h-[1.375rem] flex-shrink-0" />
            <p className="text-night font-normal font-lato">
              24103 Congress Springs Road, Saratoga, CA 95070
            </p>
          </div>
          <div className="flex gap-[0.56rem] mb-[0.69rem]">
            <FiCalendar className="text-scary-forest w-[1.375rem] h-[1.375rem] flex-shrink-0" />
            <p className="text-night font-normal font-lato">
              Monday-Sunday | 9 AM to 6 PM
            </p>
          </div>
          <p className="text-night font-light font-lato italic pl-[1.93rem]">
            Closed on holidays*
          </p>
        </div>

        <h3 className="text-night font-lato text-xl font-bold mb-[1.56rem]">
          Contact Us
        </h3>
        <div className="flex flex-col gap-6 pl-[1.31rem] pb-[1.81rem]">
          <div className="flex flex-row gap-[0.62rem]">
            <p className="text-night font-normal font-lato">
              Wildlife Care Center
            </p>
            <p className="text-shadow font-normal font-lato">650-340-7022</p>
          </div>
          <div className="flex flex-row gap-[0.62rem]">
            <p className="text-night font-normal font-lato">Peninsula Intake</p>
            <p className="text-shadow font-normal font-lato">650-340-7022</p>
          </div>
          <div className="flex flex-row gap-[0.62rem]">
            <p className="text-night font-normal font-lato">South Bay Intake</p>
            <p className="text-shadow font-normal font-lato">408-929-9453</p>
          </div>
        </div>
        <p className="text-night font-normal font-lato pl-[1.31rem]">
          If you've found a wild animal that appears to be sick, injured, or
          orphaned, safely contain it and either bring it to our nearest shelter
          or contact us for guidance.
        </p>
      </div>
    </div>
  );
}
