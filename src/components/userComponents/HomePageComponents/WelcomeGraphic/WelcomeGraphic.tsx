import React from 'react';
import { useWebDeviceDetection } from '../../../../context/WindowWidthContext/WindowWidthContext';

/**
 * @returns - Welcome graphic on the home page.
 */
function WelcomeGraphic() {
  const isWebDevice = useWebDeviceDetection();
  return (
    <div
      className="h-96 web:h-[45.188rem] bg-neutral-900 bg-opacity-60 flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/EllisonCover.png?t=2023-11-05T03%3A22%3A44.379Z')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-80 h-38 flex-col justify-start items-center gap-1 inline-flex">
        <p className=" font-light text-center">WELCOME TO</p>
        <h1 className="text-center w-80">The Peninsula Humane</h1>
        <h1 className="text-center w-80">Society & SPCA</h1>
        <h1 className="text-center w-80">Wildlife Care Center</h1>
        {isWebDevice && (
          <p className="b3 font-light mt-7 w-96 text-center">
            Peninsula Humane Society & SPCA (PHS & SPCA) is a local, private,
            non-profit charitable organization dedicated to animal welfare.
          </p>
        )}
      </div>
    </div>
  );
}

export default WelcomeGraphic;
