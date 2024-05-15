import React, { useState } from 'react';

/**
 * @param root0 -
 * @param root0.text - Text to display on button
 * @returns A spotlight display button
 */
export default function SpotlightDisplayButton({ text }: { text: string }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <button
      className={`w-full h-full rounded-lg bg-mint-cream border-l-[0.3125rem] border-l-asparagus flex items-center justify-center ${
        isClicked ? 'bg-[#7CA24E33]' : ''
      }`}
      aria-label="Spotlight Display Button"
      type="button"
      onClick={handleClick}
    >
      <p className="b1 text-scary-forest truncate">{text}</p>
    </button>
  );
}
