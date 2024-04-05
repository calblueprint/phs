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
 * Fetches all spotlights from the database.
 * @returns A promise that resolves to an array of TourRow objects, selected based on being spotlights
 */
export async function fetchAllSpotlights(): Promise<TourRow[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('spotlight', true);
  if (error) {
    throw new Error(
      `An error occurred while trying to read tour displays: ${error}`,
    );
  }
  return data;
}

/**
 * @param spotlightId - a spotlight ID
 * @returns A promise that resolves to an array of TourRow objects, selected based on being spotlights
 *
 * given a spotlight ID, get all the objects of the related spotlights
 * TODO: Switching this function to be a database function
 */
export async function fetchRecommendedSpotlights(spotlightId: string) {
  const { data, error } = await supabase.rpc('fetch_recommended_spotlights', {
    source_spotlight_id: spotlightId,
  });
  if (error) {
    throw new Error(
      `An error occurred while trying to read tour displays: ${error}`,
    );
  }
  return data;
}

/**
 * Queries all of the spotlights, then queries their join tables to retrieve the media associated with each of them.
 *  @returns A promise that resolves to an array of TourRow objects, selected based on being spotlights
 */
export async function joinAllSpotlightsWithMedia() {
  const { data, error } = await supabase.rpc('join_all_spotlights_with_media');
  if (error) {
    throw new Error(
      `An error occurred while trying to read tour displays: ${error}`,
    );
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

/**
 * @returns A promise that resolves to an array of TourRow objects,
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
