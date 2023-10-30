'use client';

import supabase from '../client';
import { TourDisplaysRow } from '../../types/types';

// Fetch all tour displays
export async function fetchTourDisplays() {
  const { data, error } = await supabase.from('tour_displays').select('*');
  if (error) {
    throw new Error(`An error occurred while trying to read tour displays: ${error}`);
  }
  return data;
}
