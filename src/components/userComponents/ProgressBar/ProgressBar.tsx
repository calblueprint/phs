import React from 'react';

interface ProgressBarProps {
  tourName: string;
  currentStop: number;
  totalStops: number;
}

/**
 * @param root0 -
 * @param root0.tourName - The name of the tour.
 * @param root0.currentStop - The current stop number.
 * @param root0.totalStops - The total number of stops.
 * @returns The tour progress bar.
 */
function ProgressBar({ tourName, currentStop, totalStops }: ProgressBarProps) {
  const width = (currentStop / totalStops) * 100;

  return (
    <div className="bg-ivory w-[24.375rem] min-h-[5.625rem] flex flex-col relative">
      <div className="pl-[1.56rem] lg:pl-0 pr-[1.56rem] pt-[1.69rem] pb-[1.12rem]">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="b2 text-night">{tourName} Tour</p>
          <div className="flex flex-row items-center gap-3">
            <div className="bg-[#F5F6F5] w-[18.75rem] h-[0.625rem] rounded-full">
              <div
                className="h-[0.625rem] rounded-full"
                style={{
                  width: `${width}%`,
                  background:
                    'linear-gradient(180deg, #7CA24E 0%, #386131 100%)',
                }}
              />
            </div>
            <p className="b2 text-night">
              {currentStop}/{totalStops}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-silver w-full h-[0.03rem] relative bottom-0" />
    </div>
  );
}

export default ProgressBar;
