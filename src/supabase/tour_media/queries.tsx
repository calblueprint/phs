'use client';

import supabase from '../client';
import { TourMediaRow } from '../../types/types';

/**
 * Fetches all tour media from the database.
 * @returns A promise that resolves to an array of TourMediaRow objects.
 */
export async function fetchAllTourMedia() {
  const { data, error } = await supabase.from('tour_media').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Fetches all tour media for a single tour from the database.
 * @param tourId - The id of the tour to fetch.
 * @returns A promise that resolves to an array of TourMediaRow objects.
 */
export async function fetchTourMedia(tourId: string): Promise<TourMediaRow[]> {
  const { data, error } = await supabase
    .from('tour_media')
    .select('*')
    .eq('tour_id', tourId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

