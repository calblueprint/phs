'use client';

import supabase from '../client';
import { TourRow } from '../../types/types';

/**
 * Fetches all tours from the database.
 * @returns A promise that resolves to an array of TourRow objects.
 */
export async function fetchAllTours(): Promise<TourRow[]> {
  const { data, error } = await supabase.from('tours').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Fetches a single tour from the database.
 * @param tourId - The id of the tour to fetch.
 * @returns A promise that resolves to a TourRow object.
 */
export async function fetchTour(tourId: string): Promise<TourRow> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', tourId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Inserts a single tour into the database.
 * @param tourData - The tour to insert.
 * @returns A promise that resolves to a TourRow object.
 */
/**
 *
 * @param tourData
 */
export async function insertTour(tourData: TourRow): Promise<TourRow | null> {
  const { data, error } = await supabase.from('tours').insert(tourData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Updates a single tour in the database.
 * @param newTourData - The updated tour data.
 * @returns A promise that resolves to a TourRow object.
 */
export async function updateTour(
  newTourData: TourRow,
): Promise<TourRow | null> {
  const { data, error } = await supabase
    .from('tours')
    .update(newTourData)
    .eq('id', newTourData.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Upserts a single tour into the database.
 * @param tourData - The tour to upsert.
 * @returns A promise that resolves to a TourRow object.
 */
export async function upsertTour(tourData: TourRow): Promise<TourRow | null> {
  const { data, error } = await supabase.from('tours').upsert(tourData);
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
 * @param id
 */
export async function deleteTour(id: number) {
  const { data, error } = await supabase.from('tours').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * !!! WIP !!!
 * @returns - Uses rpc to call Database function of the same name on Supabase.
 * Used to call a join on a tour and the media table, in order to retrieve its cover image + the rest of the tour info.
 */
export async function joinSpotlightsWithMedia() {
  const { data, error } = await supabase.rpc('join_spotlights_with_media');
  console.log({ datastuff: data });
  if (error) {
    throw new Error(
      `An error occurred while trying to load spotlights: ${error.message}`,
    );
  }
  return data;
}

/**
 *
 */
export async function joinToursWithMedia() {
  const { data, error } = await supabase.rpc('join_tours_with_media');
  if (error) {
    throw new Error(
      `An error occurred while trying to load spotlights: ${error.message}`,
    );
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
    .eq('spotlight', true);
  if (error) {
    throw new Error(`An error occurred while trying to read tours: ${error}`);
  }
  return data;
}
