import React, { useState } from 'react';
import Link from 'next/link';
import { CaretLeft } from '../../../../public/icons';

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
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <Link
      href={link}
      className={`w-[10.375rem] h-[4.375rem] rounded-lg outline outline-scary-forest outline-1 flex items-center relative p-[1.56rem] ${
        isClicked ? 'bg-[#3861312B] brightness-[.8]' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-start w-full gap-[1.31rem]">
        <CaretLeft />
        <p className="b1 text-scary-forest">{text}</p>
      </div>
    </Link>
  );
}
