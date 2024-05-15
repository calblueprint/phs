import React, { useState } from 'react';

/**
 * @param root0 -
 * @param root0.text - Text to display on button
 * @returns A button with text
 */
export default function ButtonWithText({ text }: { text: string }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <button
      className={`w-full h-full rounded-lg bg-asparagus flex items-center justify-center ${
        isClicked ? 'brightness-[.8]' : ''
      }`}
      aria-label="Button with Text"
      type="button"
      onClick={handleClick}
    >
      <p className="b1 text-ivory">{text}</p>
    </button>
  );
}
