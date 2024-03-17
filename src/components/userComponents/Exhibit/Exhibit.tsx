import React from 'react';
import Image from 'next/image';

/**
 *
 * @param root0 passed in
 * @param root0.title title of exhibit
 * @param root0.description description of exhibit
 * @param root0.category category of exhibit
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
      <ul key={id}>
        <div className="w-[100%] px-4 pt-6 pb-7 bg-mint-cream rounded flex-col justify-start items-start gap-2.5 inline-flex mt-6">
            <div className="flex-col justify-start items-start gap-5 flex">
                <div className="justify-start items-center gap-2 inline-flex">
                <div className="text-neutral-700 text-lg font-bold font-['Lato']"> {title}</div>
                </div>
                <div className="text-black text-base font-light font-['Lato']">{description}</div>
                <Image src={image} alt="Exhibit" width={354} height={150}/>
            </div>
        </div>
      </ul>
    );
  }