'use client';

import supabase from '../client';
import { TourDisplaysRow, DisplayRow } from '../../types/types';
import { fetchDisplaysfromIds } from '../displays/queries';

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
 *
 * @param tourId - an id from the tours table
 * @returns given a tour id in spotlights, fetch from the tours_display table to get all the corresponding display_ids
 */
export async function fetchMatchingTourDisplayIdsfromSpotlight(tourId: string) {
  const { data, error } = await supabase
    .from('tour_displays')
    .select('*')
    .eq('tour_id', tourId);

  if (error) {
    throw new Error(
      `An error occurred while trying to read tour displays: ${error}`,
    );
  }
  const displayIds = data.map(item => item.display_id);
  return displayIds;
}

/**
 * @param spotlightId - a spotlight ID
 * @returns given a spotlight ID, get all the displays
 */
export async function fetchDisplayfromSpotlight(spotlightId: string) {
  const displayIds: string[] = await fetchMatchingTourDisplayIdsfromSpotlight(
    spotlightId,
  );
  const displays: DisplayRow[] = await fetchDisplaysfromIds(displayIds);
  return displays;
}

/**
 * @param spotlightId - a spotlight ID
 * @returns given a spotlight ID, get all the ids of the spotlight recommendations for related spotlights
 */
export async function fetchRelatedSpotlightIdsFromSpotlight(
  spotlightId: string,
) {
  const { data, error } = await supabase
    .from('spotlight_recommendations')
    .select('*')
    .eq('source_display_id', spotlightId);

  if (error) {
    throw new Error(
      `An error occurred while trying to read tour displays: ${error}`,
    );
  }
  const relatedSpotlightIds = data.map(item => item.target_display_id);
  return relatedSpotlightIds;
}

/**
 * @param relatedSpotlightIds - list of all the spotlight ids that go under related spotlights
 * @returns the spotlights that have the corresponding ids
 */
export async function fetchRelatedSpotlightsfromIds(
  relatedSpotlightIds: string[],
) {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .in('id', relatedSpotlightIds);

  if (error) {
    throw new Error(`Error updating display data: ${error.message}`);
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
