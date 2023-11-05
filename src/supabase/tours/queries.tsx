/* eslint-disable */
'use client';

import supabase from '../client';
import { TourRow } from '../../types/types';

// Fetch all tours
export async function fetchAllTours() {
  const { data, error } = await supabase.from('tours').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tours: ${error}`);
  }
  return data;
}

// Fetch a single tour
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

// Insert tour(s)
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
export async function updateTour(id: string, updatedInfo: TourRow) {
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
export async function deleteTour(id: string) {
  const { data, error } = await supabase.from('tours').delete().eq('id', id);
  if (error) {
    throw new Error(
      `An error occurred while trying to delete tour: ${error.message}`,
    );
  }
  const deletedTour = data;
  return deletedTour;
}
