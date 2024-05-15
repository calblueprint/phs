import React, { useState } from 'react';
import { BackArrow } from '../../../../public/icons';

/**
 * @returns the BackArrow button
 */
export default function BackButton() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <button
      className={`w-12 h-[2.0625rem] rounded-lg bg-[#EBF0E8] bg-opacity-40 flex items-center justify-center ${isClicked? "brightness-[.6]" : ""}`}
      aria-label="Back Button"
      type="button"
      onClick={handleClick}
    >
      <BackArrow strokeColor="#FFFDF7" />
    </button>
  );
}
