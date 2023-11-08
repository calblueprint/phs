'use client';

import supabase from '../client';
import { TourRow } from '../../types/types';

// Fetch all tours
/**
 *
 */
export async function fetchTours() {
  const { data, error } = await supabase.from('tours').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tours: ${error}`);
  }
  return data;
}

// Insert tour(s)
/**
 *
 * @param tourData
 */
export async function insertTour(tourData: TourRow) {
  const { data, error } = await supabase.from('tours').insert([tourData]);
  if (error) {
    throw new Error(
      `An error occurred while trying to insert tour: ${error.message}`,
    );
  }
  const newTour = data;
  return newTour;
}

// Update a tour
/**
 *
 * @param id
 * @param updatedInfo
 */
export async function updateTour(id: number, updatedInfo: TourRow) {
  const { data, error } = await supabase
    .from('tours')
    .update(updatedInfo)
    .eq('id', updatedInfo.id);
  if (error) {
    throw new Error(
      `An error occurred while trying to update tour: ${error.message}`,
    );
  }
  const newTour = data;
  return newTour;
}

// Upsert tour(s)
/**
 *
 * @param tourData
 */
export async function upsertTour(tourData: TourRow) {
  const { data, error } = await supabase.from('tours').upsert([tourData]);
  if (error) {
    throw new Error(
      `An error occurred while trying to upsert tour: ${error.message}`,
    );
  }
  const newTour = data;
  return newTour;
}

// Delete a tour
/**
 *
 * @param id
 */
export async function deleteTour(id: number) {
  const { data, error } = await supabase.from('tours').delete().eq('id', id);
  if (error) {
    throw new Error(
      `An error occurred while trying to delete tour: ${error.message}`,
    );
  }
  const deletedTour = data;
  return deletedTour;
}

/**
 * !!! WIP !!! 
 * @returns - Uses rpc to call Database function of the same name on Supabase. 
 * Used to call a join on a tour and the media table, in order to retrieve its cover image + the rest of the tour info.
 */
export async function joinSpotlightsWithMedia() {
  const {data, error } = await supabase.rpc('join_spotlights_with_media');
  if (error) {
    throw new Error(
      `An error occurred while trying to load spotlights: ${error.message}`,
    );
  }
  return data
}
