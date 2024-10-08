'use client';

import React from 'react';
import HomeWildlifeSpotlights from '../components/userComponents/HomePageComponents/HomeWildlifeSpotlights/HomeWildlifeSpotlights';
import NavBar from '../components/userComponents/NavBar/NavBar';
import VisitorResources from '../components/userComponents/HomePageComponents/VisitorResources/VisitorResources';
import WelcomeGraphic from '../components/userComponents/HomePageComponents/WelcomeGraphic/WelcomeGraphic';
import HomeVirtualTours from '../components/userComponents/HomePageComponents/HomeVirtualTours/HomeVirtualTours';
import HomeNewsFeed from '../components/userComponents/HomePageComponents/HomeNewsFeed/HomeNewsFeed';
import { useWebDeviceDetection } from '../context/WindowWidthContext/WindowWidthContext';
import Footer from '../components/userComponents/Footer/Footer';

/**
 * @returns - Home page for PHS/SPCA.  Buttons are available for the major flows of the application from this page.
 */
function Home() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  const isWebDevice = useWebDeviceDetection();

  return (
    <div className="HomePage w-full h-full m-0 flex-col justify-center font-normal">
      <NavBar />
      <WelcomeGraphic />
      <div className="IntroInfo md:w-full md:h-72 bg-ivory md:bg-mint-cream inline-flex flex-col justify-center items-center">
        {windowWidth < 768 && (
          <p className="b3 w-full px-[2rem] mt-10 text-night text-center text-base gap-4">
            The Peninsula Humane Society & SPCA (PHS/SPCA) is a local, private,
            non-profit charitable organization dedicated to animal welfare.
            PHS/SPCA is truly an open admission shelter, not only accepting many
            pet animals who might be refused at other shelters, but also taking
            care of sick, injured, and orphaned native wildlife.
          </p>
        )}
        <div
          className="web:w-auto h-48 rounded-lg bg-mint-cream web:bg-ivory justify-center 
        items-center mt-10 web:mt-0 m-2 inline-flex px-10 py-11 web:px-[4.59rem] py-[2.875rem]"
        >
          <h3 className="w-64 md:w-96 text-scary-forest text-center font-normal italic">
            Peninsula Humane Society & SPCA guided by the humane ethics, builds
            healthy relationships between people and animals.
          </h3>
        </div>
      </div>
      <HomeWildlifeSpotlights />
      <VisitorResources />
      <HomeVirtualTours />
      <HomeNewsFeed />
      <Footer />
    </div>
  );
}

export default Home;
