'use client';

import supabase from '../client';
import { TourMediaRow } from '../../types/types';

// Fetch all tour media
/**
 *
 */
export async function fetchTourMedia() {
  const { data, error } = await supabase.from('tour_media').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tour media: ${error}`);
  }
  console.log({data});
  return data;
}