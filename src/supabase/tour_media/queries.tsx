'use client';

import supabase from '../client';
import { TourMediaRow } from '../../types/types';

// Fetch all tour media
/**
 *
 */
export async function fetchAllTourMedia() {
  const { data, error } = await supabase.from('tour_media').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tour media: ${error}`);
  }
  return data;
}

/**
 *
 * @param id
 */
export async function fetchTourMedia(id: string) {
  const { data, error } = await supabase
    .from('tour_media')
    .select('*')
    .eq('tour_id', id);
  if (error) {
    throw new Error(`An error occurred while trying to read tour media: ${error}`);
  }
  return data;
}
