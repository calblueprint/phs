import React from 'react';
import Link from 'next/link';
import { CaretLeft } from '../../../../public/Icons';

interface LastStopButtonProps {
  text: string;
  link: string;
}

/**
 * @param root0 -
 * @param root0.text - The text to display on the button.
 * @param root0.link - The link to the previous page.
 * @returns the Last Stop button
 */
export default function LastStopButton({ text, link }: LastStopButtonProps) {
  return (
    <Link
      href={link}
      className="w-[10.375rem] h-[4.375rem] rounded-lg outline outline-scary-forest outline-1 flex items-center relative p-[1.56rem]"
    >
      <div className="flex items-center justify-start w-full gap-[1.31rem]">
        <CaretLeft />
        <h4 className="text-scary-forest font-lato font-bold text-center">
          {text}
        </h4>
      </div>
    </Link>
  );
}
