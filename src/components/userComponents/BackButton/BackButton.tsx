import React from 'react';
import { BackArrow } from '../../../../public/Icons';

/**
 * @returns the BackArrow button
 */
export default function BackButton() {
  return (
    <div className="bg-[#EBF0E8] w-[3rem] h-[2.0625rem] rounded-lg flex items-center justify-around">
      <BackArrow />
    </div>
  );
}
