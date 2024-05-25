'use client';

import supabase from '../client';
import { LinksRow } from '../../types/types';

/**
 * Fetches all links from the database.
 * @returns A promise that resolves to an array of LinksRow objects.
 */
export default async function fetchAllLinks(): Promise<LinksRow[]> {
  const { data, error } = await supabase.rpc('get_links');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
