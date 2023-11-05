'use client';

import supabase from '../client';
import { TourDisplaysRow } from '../../types/types';

// Fetch all tour displays

/**
 *
 */
export async function fetchAllTourDisplays() {
  const { data, error } = await supabase.from('tour_displays').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  return data;
}

// Fetch tour displays sorted by display_order
/**
 *
 * @param id
 */
export async function fetchTourDisplays(id: string) {
  const { data, error } = await supabase
    .from('tour_displays')
    .select('*')
    .eq('tour_id', id);
  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  // Sort the data array in ascending display_order
  data.sort(
    (a, b) => (a?.display_order || 0) - (b?.display_order || 0),
  );
  return data;
}
