'use client';

import supabase from '../client';
import { TourDisplaysRow, DisplayRow, TourRow } from '../../types/types';
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

/**
 * @param spotlightId - a spotlight ID
 * @returns given a spotlight ID, get all the ids of the spotlight recommendations for related spotlights
 */
export async function fetchRelatedSpotlightIdsFromSpotlight(spotlightId: string) {
  const { data, error } = await supabase
  .from('spotlight_recommendations')
  .select('*')
  .eq('source_display_id', spotlightId)

  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  const relatedSpotlightIds = data.map((item) => item.target_display_id);
  return relatedSpotlightIds;
}

/**
 * @param relatedSpotlightIds - list of all the spotlight ids that go under related spotlights
 * @returns the spotlights that have the corresponding ids
 */
export async function fetchRelatedSpotlightsfromIds(relatedSpotlightIds: string[]) {
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
 * @param spotlightId - a spotlight ID
 * @returns given a spotlight ID, get all the related spotlights
 */
export async function fetchRelatedSpotlightsfromSpotlightId(spotlightId: string) {
  const relatedSpotlightIds: string[] = await fetchRelatedSpotlightIdsFromSpotlight(spotlightId);
  const spotlights: TourRow[] = await fetchRelatedSpotlightsfromIds(relatedSpotlightIds)
  return spotlights;
}