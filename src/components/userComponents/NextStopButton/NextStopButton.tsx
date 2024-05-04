import React from 'react';
import Link from 'next/link';
import { CaretRight } from '../../../../public/icons';

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
      className="bg-asparagus w-[10.375rem] h-[4.375rem] rounded-lg flex items-center relative p-[1.56rem]"
    >
      <div className="flex items-center justify-end w-full gap-[1.31rem]">
        <p className="b1 text-ivory">
          {text}
        </p>
        <CaretRight />
      </div>
    </Link>
  );
}
