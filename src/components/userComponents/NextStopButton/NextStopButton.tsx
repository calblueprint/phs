import React from 'react';
import Link from 'next/link';
import { CaretRight } from '../../../../public/Icons';

interface NextStopButtonProps {
  text: string;
  link: string;
}

/**
 * @param root0 -
 * @param root0.text - The text to display on the button.
 * @param root0.link - The link to the next page.
 * @returns the Next Stop button
 */
export default function NextStopButton({ text, link }: NextStopButtonProps) {
  return (
    <Link
      href={link}
      className="bg-asparagus w-[10.375rem] h-[4.375rem] rounded-lg flex items-center relative p-4"
    >
      <div className="flex items-center justify-center w-full">
        <h4 className="text-ivory font-semibold text-center">{text}</h4>
        <div className="absolute right-4">
          <CaretRight />
        </div>
      </div>
    </Link>
  );
}
