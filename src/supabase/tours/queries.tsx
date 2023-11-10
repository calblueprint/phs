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
export async function updateTour(newTourData: TourRow): Promise<TourRow | null> {
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
    throw new Error(error.message);
  }
  return data;
}

/**
 * Deletes a single tour from the database.
 * @param tourId - The id of the tour to delete.
 * @returns A promise that resolves to a TourRow object.
 */
export async function deleteTour(tourId: string): Promise<TourRow | null> {
  const { data, error } = await supabase.from('tours').delete().eq('id', tourId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
