import React from 'react';
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
  return (
    <div className="w-full flex overflow-x-auto justify-center align-center">
      <div className="carousel w-full">
        {media.map((item) => (
          <div
            key={item.id}
            className="w-full carousel-item"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Image
              className="w-full"
              key={item.id}
              src={item.url}
              alt={item.text ?? ""}
              width={390}
              height={245}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
