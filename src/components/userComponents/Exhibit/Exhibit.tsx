import React from 'react';
import Image from 'next/image';
  
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
  id: string;
}) {
  return (
    <li key={id} id={`a${id}`}>
      <div className="w-[100%] px-4 py-8 bg-mint-cream rounded-lg flex-col justify-start items-start gap-2.5 inline-flex mt-6">
        <div className="flex-col justify-start items-start gap-5 flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <h2 className="text-night text-2xl font-semibold font-['Lato']">
              {' '}
              {title}
            </h2>
          </div>
          <p className="text-night text-base leading-normal font-normal font-['Lato']">
            {description}
          </p>
          <Image src={image} alt="Exhibit" width={354} height={150} />
        </div>
      </div>
    </li>
  );
}
