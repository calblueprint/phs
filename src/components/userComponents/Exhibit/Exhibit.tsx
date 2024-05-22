import React from 'react';
import Image from 'next/image';
import { useWebDeviceDetection } from '../../../context/WindowWidthContext/WindowWidthContext';

/**
 *
 * @param root0 passed in
 * @param root0.title title of exhibit
 * @param root0.description description of exhibit
 * @param root0.image image
 * @param root0.id id of exhibit
 * @returns exhibit component
 */
export default function Exhibit({
  title,
  description,
  image,
  id,
}: {
  title: string;
  description: string;
  image: string;
  id: number;
}) {
  const isWebDevice = useWebDeviceDetection();
  return (
    <div>
      {!isWebDevice && (
        <li key={id} id={`a${id}`}>
          <div className="w-full px-4 py-8 bg-mint-cream rounded-lg flex-col justify-start items-start gap-2.5 inline-flex mt-6">
            <div className="flex-col justify-start items-start gap-5 flex">
              <div className="justify-start items-center gap-2 inline-flex">
                <h2 className="text-night font-semibold leading-tight font-['Lato']">
                  {title}
                </h2>
              </div>
              <p className="text-night leading-tight font-normal font-['Lato']">
                {description}
              </p>
              <Image src={image} alt="Exhibit" width={354} height={150} />
            </div>
          </div>
        </li>
      )}
      {isWebDevice && (
        <div className="flex flex-col w-full px-8 py-16 bg-mint-cream rounded-lg flex-col justify-start items-start gap-2.5 mt-6">
          <div className="justify-start items-start gap-5">
            <div className="justify-start items-center gap-2">
              <h1 className="text-hunter-green font-semibold leading-tight font-['Lato']">
                {' '}
                {title}
              </h1>
            </div>
            <p className="text-night leading-tight font-normal mt-5 mb-5 font-['Lato']">
              {description}
            </p>
          </div>
          <Image src={image} alt="Exhibit" width={354} height={150} />
          <div className="flex-grow" />
        </div>
      )}
    </div>
  );
}
