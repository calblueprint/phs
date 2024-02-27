'use client';

import Link from 'next/link';
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import HomeWildlifeSpotlights from '../components/userComponents/HomeWildlifeSpotlights/HomeWildlifeSpotlights';
import NavBar from '../components/userComponents/navBar/navBar';
import VisitorResources from '../components/userComponents/VisitorResources/VisitorResources';
import WelcomeGraphic from '../components/userComponents/WelcomeGraphic/WelcomeGraphic';

/**
 * @returns - Home page for PHS/SPCA.  Buttons are available for the major flows of the application from this page.
 */
function Home() {
  return (
    <div className="bg-ivory min-h-screen w-full min-w-screen m-0">
      <NavBar />
      <WelcomeGraphic />
      <div className="w-96 h-24 flex-col justify-start items-start gap-4 inline-flex mt-8 mx-4">
        <h3 className="text-night">Overview</h3>
        <p className="w-96 text-night">
          The Peninsula Humane Society and SPCA (PHS and SPCA) is a local,
          private, non-profit charitable organization dedicated to animal
          welfare.
        </p>
      </div>
      <HomeWildlifeSpotlights />
      <VisitorResources />
      <div className="border-t border-smoke">
        <div className="mt-8 mx-4">
          <div className="News-Header inline-flex w-full justify-between items-center wx-4 mb-6">
            <h3 className="text-night">Latest News</h3>
            <Link
              className="b1 text-asparagus inline-flex items-center"
              href="/newsFeedPage"
            >
              See All
              <HiChevronRight className="text-2xl" />
            </Link>
          </div>
          <div className="News Card mx-4 h-50 pb-4 border-b border-smoke mb-6">
            <p className="b2 w-full text-night">Cat-ober adoption promotion</p>
            <p className="s1 w-full text-shadow">October 18, 2023</p>
          </div>
          <div className="News Card mx-4 h-50 pb-4 border-b border-smoke mb-6">
            <p className="b2 w-full text-night">
              Wingo Starr the peacock is available for adoption
            </p>
            <p className="s1 w-full text-shadow">September 14, 2023</p>
          </div>
          <div className="News Card mx-4 h-50 pb-4 border-b border-smoke mb-6">
            <p className="b2 w-full text-night">
              Professor Truffles the pig is seeking a new home
            </p>
            <p className="s1 w-full text-shadow">July 27, 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
