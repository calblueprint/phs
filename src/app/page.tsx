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
    <div className="HomePage bg-ivory w-full m-0 flex-col justify-center font-normal">
      <NavBar />
      <WelcomeGraphic />
      <div className="IntroInfo w-94 mt-10 mx-4">
        <div className="h-16 flex-col justify-start items-start inline-flex ">
          <p className="b3 text-night text-center text-base">
            The Peninsula Humane Society & SPCA (PHS & SPCA) is a local,
            private, non-profit charitable organization dedicated to animal
            welfare.
          </p>
        </div>
        <div className="h-48 rounded-lg bg-mint-cream justify-center items-center mt-10 m-2 inline-flex px-10 py-11">
          <h3 className="text-scary-forest text-center font-normal italic">
            Our mission is to make well and find homes for thousands of animals
            who come to us sick, injured, or too young to survive without
            supportive care.
          </h3>
        </div>
      </div>
      <HomeWildlifeSpotlights />
      <VisitorResources />
      <div className="border-t border-smoke max-h-screen">
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
