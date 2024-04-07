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
      <div className="px-[1.56rem] pt-[1.69rem] pb-[1.12rem]">
        <div className="flex flex-col items-center gap-2">
          <div>{tourName} Tour</div>
          <div className="flex flex-row items-center gap-3">
            <div className="bg-[#F5F6F5] w-[18.75rem] h-[0.625rem] rounded-full">
              <div
                className="h-[0.625rem] rounded-full"
                style={{ width: `${width}%`, background: "linear-gradient(180deg, #7CA24E 0%, #386131 100%)" }}
              />
            </div>
            <h4 className="text-night text-center">
              {currentStop}/{totalStops}
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-silver w-full h-[0.03rem] relative bottom-0" />
    </div>
  );
}

export default ProgressBar;
