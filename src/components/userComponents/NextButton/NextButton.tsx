import React from 'react';
import { NextArrow } from '../../../../public/Icons';

/**
 * @returns the NextArrow button
 */
export default function NextButton() {
  return (
    <div className="bg-[#EBF0E8] opacity-[36%] w-[3rem] h-[2.0625rem] rounded-lg flex items-center justify-around">
      <NextArrow />
    </div>
  );
}