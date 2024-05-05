import React, { useState } from 'react';
import Image from 'next/image';
import { MediaRow } from '../../../types/types';
import { LeftChevron, RightChevron } from '../../../../public/icons';

interface CarouselProps {
  media: MediaRow[];
}

/**
 * @param CarouselProps defines the props for the component
 * @param CarouselProps.media defines the array of media objects from which to render images
 * @returns scroller component for the current display
 */
export default function Carousel({ media }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Goes to previous image
  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1,
    );
  };

  // Goes to next image
  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative w-full h-full">
      <img
        src={media[currentIndex].url}
        alt={media[currentIndex].text ?? 'Carousel image'}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 px-[1.25rem] flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <LeftChevron />
        </button>
        <button type="button" onClick={goToNext} aria-label="Next image">
          <RightChevron />
        </button>
      </div>
    </div>
  );
}
