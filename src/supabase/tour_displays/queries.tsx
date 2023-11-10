'use client';

import supabase from '../client';
import { TourDisplaysRow } from '../../types/types';

/**
 * Fetches all tour displays from the database.
 * @returns A promise that resolves to an array of TourDisplaysRow objects.
 */
export async function fetchAllTourDisplays(): Promise<TourDisplaysRow[]> {
  const { data, error } = await supabase.from('tour_displays').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Fetches all tour displays for a single tour from the database sorted by display_order.
 * @param tourId - The id of the tour to fetch.
 * @returns A promise that resolves to an array of TourDisplaysRow objects.
 */
export async function fetchTourDisplays(
  tourId: string,
): Promise<TourDisplaysRow[]> {
  const { data, error } = await supabase
    .from('tour_displays')
    .select('*')
    .eq('tour_id', tourId);
  if (error) {
    throw new Error(error.message);
  }
  data.sort((a, b) => (a?.display_order || 0) - (b?.display_order || 0));
  return data;
}
