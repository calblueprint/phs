/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Json } from '../../types/supabase';
import { DisplayRow } from '../../types/types';


export const getMockDisplay = (): DisplayRow => ({
  coordinates: { lat: 37.869121, lng: -122.257154 } as Json,
  created_at: '2023-10-11 20:56:43.529155+00',
  description:
    "Explore the captivating raccoon enclosures on this wildlife tour, where you'll witness these curious creatures up close in their natural habitat. Learn about their nocturnal behaviors and unique adaptations while enjoying an educational and entertaining experience.",
  id: '0e577993-9b25-4ef7-9275-4a6cb6359210',
  title: 'Song Bird & Squirrel Rooftop Enclosure Enclosures',
  updated_at: null,
});

export const fetchMockDisplays = (numDisplays: number): DisplayRow[] => {
  const baseDisplay = {
    coordinates: { lat: 37.869121, lng: -122.257154 },
    created_at: '2023-10-11 20:56:43.529155+00',
    description:
      "Explore the captivating raccoon enclosures on this wildlife tour, where you'll witness these curious creatures up close in their natural habitat. Learn about their nocturnal behaviors and unique adaptations while enjoying an educational and entertaining experience.",
    id: '0e577993-9b25-4ef7-9275-4a6cb6359210',
    title: 'Song Bird & Squirrel Rooftop Enclosure Enclosures',
    updated_at: null,
  };
  const displays = [baseDisplay];

  for (let i = 0; i < numDisplays; i += 1) {
    const coordOffset = Math.random() * 0.5;
    const newDisplay = {
      ...baseDisplay,
      title: `Display ${i}`,
      coordinates: {
        lat: baseDisplay.coordinates.lat + coordOffset,
        lng: baseDisplay.coordinates.lng + coordOffset,
      },
      id: i.toString()
    }
    displays.push(newDisplay);
  }

  return displays;
};
// ,
