import React from 'react';

/**
 *
 */
function WelcomeGraphic() {
  return (
    <div
      className="w-full h-96 bg-neutral-900 bg-opacity-60 flex justify-center items-center relative"
      style={{
        backgroundImage:
          "url('https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/EllisonCover.png?t=2023-11-05T03%3A22%3A44.379Z')"
      }}
    >
      <div className="w-80 h-40 flex-col justify-start items-center gap-6 inline-flex">
        <div className="flex-col justify-start items-center gap-1 flex">
          <p className="text-center">WELCOME TO</p>
          <h1 className="text-center w-80">Ellison Conservation</h1>
          <h1 className="text-center w-80">Center for Wildlife Care</h1>
        </div>
        <div className="w-52 px-4 py-3 bg-asparagus rounded-lg justify-center items-center gap-2.5 inline-flex">
          <button type="button" className="text-center">
            Start Tour
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeGraphic;
