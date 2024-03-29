import React, { useState } from 'react';
import Image from 'next/image';
import { MediaRow } from '../../../types/types';

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
    <div className="w-full flex overflow-x-auto justify-center align-center">
      <div className="carousel w-full">
        {media.map(item => (
          <div
            key={item.id}
            className="w-full carousel-item"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Image
              className="w-full"
              key={item.id}
              src={item.url}
              alt={item.text ?? ''}
              width={390}
              height={245}
              objectFit="cover"
              priority
            />
          )}
        </div>
      </div>
      {media.length > 1 && (
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-[1.56rem] z-10 rounded-full"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1.9rem"
            viewBox="0 0 21 34"
            fill="none"
          >
            <path
              d="M2 2L18 17.2L2 32.4"
              stroke="#FFFDF7"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
