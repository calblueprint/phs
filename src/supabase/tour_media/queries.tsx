'use client';

import supabase from '../client';
import { TourMediaRow } from '../../types/types';

// Fetch all tour displays
/**
 *
 */
export async function fetchTourDisplays() {
  const { data, error } = await supabase.from('tour_media').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  return data;
}