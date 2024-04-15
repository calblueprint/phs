import supabase from '../client';

import { CategoryRow } from '../../types/types';

// Assume this function is in `supabase/category/queries.js`
/**
 *
 * @param category category to retreive color
 * @param id
 * @returns color for category, else null
 */
// eslint-disable-next-line import/prefer-default-export
export async function getCategoryColor1(id: string | number) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('color_hex')

      .eq('id', id);

    if (error) {
      console.error('Error fetching from Supabase:', error.message);
      return null; // Return null on query error
    }

    // Check if data array is not empty
    if (data && data.length > 0 && data[0].color_hex) {
      // console.log(`Color for ${category}:`, data[0].color_hex);

      return data[0].color_hex;
    }
    console.log('No matching category found or color_hex is undefined');
    return null; // Return null if no matching data found
  } catch (error) {
    console.error(`An unexpected error occurred:`, error);
    return null; // Return null on unexpected error
  }
}

/**
 * Fetches all categories from the database.
 * @returns A promise that resolves to an array of ExhibitRow objects.
 */
export async function fetchAllCategories(): Promise<CategoryRow[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
