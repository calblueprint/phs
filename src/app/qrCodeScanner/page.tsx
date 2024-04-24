'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';
import QrScanner from '../../components/userComponents/QrScanner/QrScanner';
import Footer from '../../components/userComponents/Footer/Footer';
/**
 * @returns qr code scanner page
 */
function App() {
  return (
    <div style={{ backgroundColor: '#FFFDF7', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '19px' }}>
        <h1 className="pt-[61px] text-[#3B3B3B] text-[32px] font-Lato">
          QR Learning Exhibits
        </h1>
        <p className="pt-[31px] text-[16.5px] text-[#3B3B3B] font-Lato text-base font-normal">
          Saratoga is home to an abundance of plant and animal life. As you
          explore these exhibits, you will learn about species that are
          endangered and being carefully monitored by scientists with protective
          efforts in place. We welcome you to learn more about these important
          plants and animals throughout the exhibits by utilizing our QR codes
          on each sign that has a fun fact about a species.
        </p>
      </div>
      <QrScanner />
      <Footer />
    </div>
  );
}
export default App;
