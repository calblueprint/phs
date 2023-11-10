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
    throw new Error(error.message);
  }
  return data;
}

export async function fetchTourMedia(tourId: string): Promise<TourMediaRow[]> {
  const { data, error } = await supabase
    .from('tour_media')
    .select('*')
    .eq('tour_id', tourId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

