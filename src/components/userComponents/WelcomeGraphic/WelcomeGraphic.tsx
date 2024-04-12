import React from 'react';

/**
 * @returns - Welcome graphic on the home page.  Button available for "start tour" leads to the featured tours page and flow
 */
function WelcomeGraphic() {
  return (
    <div
      className="w-full h-96 bg-neutral-900 bg-opacity-60 flex justify-center items-center relative"
      style={{
        backgroundImage:
          "url('https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/EllisonCover.png?t=2023-11-05T03%3A22%3A44.379Z')",
      }}
    >
      <div className="w-80 h-40 flex-col justify-start items-center gap-6 inline-flex">
        <div className="flex-col justify-start items-center gap-1 flex">
          <p className=" font-light text-center">WELCOME TO</p>
          <h1 className="text-center w-80">The Peninsula Humane</h1>
          <h1 className="text-center w-80">Society & SPCA</h1>
          <h1 className="text-center w-80">Wildlife Care Center</h1>
        </div>
      </div>
    </div>
  );
}

export default WelcomeGraphic;
