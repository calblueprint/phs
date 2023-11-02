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

/**
 *
 * @param id
 */
export async function fetchTour(id: string) {
  const { data, error } = await supabase
  .from('tours')
  .select('*')
  .eq('id', id)
  .single();
  if (error) {
    throw new Error(`An error occurred while trying to read tours: ${error}`);
  }
  return data;
}

/**
 *
 */
export async function fetchSpotlightTours() {
  const { data, error } = await supabase
  .from('tours')
  .select('*')
  .eq('spotlight', true)
  if (error) {
    throw new Error(`An error occurred while trying to read tours: ${error}`);
  }
  return data;
}

/**
 *
 * @param spotlightId
 */
// just an fyi, fetchSpotlightMedia is not fully done
export async function fetchSpotlightMedia(spotlightId: string) { // pass in tours id
  const { data, error } = await supabase
  .from('tour_media')
  .select('*')
  .eq('id', spotlightId)
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
