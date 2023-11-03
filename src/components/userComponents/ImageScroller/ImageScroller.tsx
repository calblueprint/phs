import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchMedia } from '../../../supabase/media/queries';
import { MediaRow } from '../../../types/types';

/**
 *
 */
export default function Carousel() {
  const [media, setMedia] = useState<MediaRow[]>([]);

  const imageLoader = ({ src, width }: { src: string; width: number }) =>
    `${src}?w=${width}`;

  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        const responseData: MediaRow[] = await fetchMedia();
        const images: MediaRow[] = responseData.filter(m => m.type === 'image');
        setMedia(images);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="h-245 w-390 flex overflow-x-auto">
      <div className="whitespace-nowrap carousel carousel-end">
        {media.map(item => (
          <div
            key={item.id}
            className="inline-block w-390 h-245 carousel-item w-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Image
              loader={imageLoader}
              key={item.id}
              src={item.url}
              alt="Media Image"
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
