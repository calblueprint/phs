'use client';

import supabase from '../client';
import { TourDisplaysRow, DisplayRow } from '../../types/types';
import { fetchDisplaysfromIds } from '../displays/queries';

// Fetch all tour displays
/**
 * @param () - nothing
 * @returns fetches tour displays
 */
export async function fetchTourDisplays() {
  const { data, error } = await supabase.from('tour_displays').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  return data;
}

/**
 * 
 * @param tourId - an id from the tours table
 * @returns given a tour id in spotlights, fetch from the tours_display table to get all the corresponding display_ids
 */
export async function fetchMatchingTourDisplayIdsfromSpotlight(tourId: string) {
  const { data, error } = await supabase
  .from('tour_displays')
  .select('*')
  .eq('tour_id', tourId)
  
  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  const displayIds = data.map((item) => item.display_id);
  console.log('hello?')
  return displayIds;
}

/**
 * @param spotlightId - a spotlight ID
 * @returns given a spotlight ID, get all the displays
 */
export async function fetchDisplayfromSpotlight(spotlightId: string) {
  const displayIds: string[] = await fetchMatchingTourDisplayIdsfromSpotlight(spotlightId);
  const displays: DisplayRow[] = await fetchDisplaysfromIds(displayIds)
  return displays;
}