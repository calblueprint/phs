'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiCalendar, FiCompass } from 'react-icons/fi';
import Link from 'next/link';
import NavBar from '../../components/userComponents/navBar/navBar';
import { BackArrow } from '../../../public/icons';

/**
 * @returns The hours and location page.
 */
export default function HoursLocationPage() {
  const [isWide, setIsWide] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    // Update isWide state on window resize
    const handleResize = () => setIsWide(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isWide ? (
    <div className="bg-ivory min-h-screen">
      <NavBar />
      <div className="py-[6.25rem] flex justify-center">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-6">
            <p className="s3 text-night">
              <span className="text-scary-forest">Home</span> / Hours & Location
            </p>
            <h1 className="text-night">Hours & Location</h1>
          </div>
          <div className="flex flex-row gap-[5.69rem]">
            <img
              src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/HOURS_AND_LOCATION.png?t=2024-05-05T03%3A55%3A28.082Z"
              alt="Hours & Location"
              className="object-cover w-[30.375rem] h-[25.6875rem] rounded-xl"
            />
            <div className="flex flex-col gap-[3.31rem]">
              <div className="flex flex-col gap-[2.12rem]">
                <h4 className="text-night">Site Information</h4>
                <div className="flex flex-col">
                  <div className="mb-9">
                    <div className="flex flex-row gap-[0.56rem] items-center">
                      <FiCompass className="text-scary-forest w-[1.375rem] h-[1.375rem] flex-shrink-0" />
                      <p className="b2 text-night">
                        24103 Congress Springs Road,
                      </p>
                    </div>
                    <p className="b2 text-night pl-8">Saratoga, CA 95070</p>
                  </div>
                  <div className="flex gap-[0.56rem] items-center mb-[0.62rem]">
                    <FiCalendar className="text-scary-forest w-[1.375rem] h-[1.375rem] flex-shrink-0" />
                    <p className="b2 text-night">
                      Monday-Sunday | 9 AM to 6 PM
                    </p>
                  </div>
                  <p className="s1 text-night pl-8">Closed on holidays*</p>
                </div>
              </div>
              <div>
                <h4 className="text-night mb-[2.12rem]">Contact Us</h4>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex flex-row gap-[0.62rem] items-center">
                    <p className="b3 text-night">Wildlife Care Center</p>
                    <p className="s1 text-shadow">650-340-7022</p>
                  </div>
                  <div className="flex flex-row gap-[0.62rem] items-center">
                    <p className="b3 text-night">Peninsula Intake</p>
                    <p className="s1 text-shadow">650-340-7022</p>
                  </div>
                  <div className="flex flex-row gap-[0.62rem] items-center">
                    <p className="b3 text-night">South Bay Intake</p>
                    <p className="s1 text-shadow">408-929-9453</p>
                  </div>
                </div>
                <p className="b3 text-night w-[24.75rem]">
                  If you've found a wild animal that appears to be sick,
                  injured, or orphaned, safely contain it and either bring it to
                  our nearest shelter or contact us for guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-ivory min-h-screen">
      <NavBar />
      <div className="px-[1.12rem] pt-4 pb-[2.5rem]">
        <div className="mb-4">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>
        <h1 className="text-night mb-4">Hours & Location</h1>
        <h4 className="text-night mb-4">Site Information</h4>

        <div className="bg-[#EBF0E8] rounded-lg py-8 pl-[1.13rem] pr-[1.56rem] mb-[2.38rem]">
          <div className="mb-[1.81rem]">
            <div className="flex gap-[0.56rem] items-center">
              <FiCompass className="text-scary-forest w-[1.375rem] h-[1.375rem] flex-shrink-0" />
              <p className="b2 text-night">24103 Congress Springs Road,</p>
            </div>
            <p className="b2 text-night pl-8">Saratoga, CA 95070</p>
          </div>
          <div className="flex gap-[0.56rem] mb-[0.69rem] items-center">
            <FiCalendar className="text-scary-forest w-[1.375rem] h-[1.375rem] flex-shrink-0" />
            <p className="b2 text-night">Monday-Sunday | 9 AM to 6 PM</p>
          </div>
          <p className="s1 text-night pl-8">Closed on holidays*</p>
        </div>

        <h4 className="text-night mb-[1.56rem]">Contact Us</h4>
        <div className="flex flex-col gap-6 pl-[1.31rem] pb-[1.81rem]">
          <div className="flex flex-row gap-[0.62rem] items-center">
            <p className="b3 text-night">Wildlife Care Center</p>
            <p className="s1 text-shadow">650-340-7022</p>
          </div>
          <div className="flex flex-row gap-[0.62rem] items-center">
            <p className="b3 text-night">Peninsula Intake</p>
            <p className="s1 text-shadow">650-340-7022</p>
          </div>
          <div className="flex flex-row gap-[0.62rem] items-center">
            <p className="b3 text-night">South Bay Intake</p>
            <p className="s1 text-shadow">408-929-9453</p>
          </div>
        </div>
        <p className="b3 text-night pl-[1.31rem]">
          If you've found a wild animal that appears to be sick, injured, or
          orphaned, safely contain it and either bring it to our nearest shelter
          or contact us for guidance.
        </p>
      </div>
    </div>
  );
}
