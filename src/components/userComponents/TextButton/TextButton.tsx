import React, { useState } from 'react';

/**
 * @param root0 -
 * @param root0.text - Text to display
 * @returns A text that acts like a button
 */
export default function TextButton({ text }: { text: string }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <button
      className={isClicked ? 'brightness-[.8]' : ''}
      aria-label="Text Button"
      type="button"
      onClick={handleClick}
    >
      <p className="b1 text-scary-forest">{text}</p>
    </button>
  );
}
