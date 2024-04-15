import React from 'react';
import { BackArrow } from '../../../../public/icons';

/**
 * @returns the BackArrow button
 */
export default function BackButton() {
  return (
    <div className="bg-[#EBF0E8] bg-opacity-[36%] w-[3rem] h-[2.0625rem] rounded-lg flex items-center justify-around">
      <BackArrow strokeColor="#FFFDF7" />
    </div>
  );
}
