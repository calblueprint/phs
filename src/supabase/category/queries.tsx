import supabase from '../client';
import { CategoryRow } from '../../types/types';
// Assume this function is in `supabase/category/queries.js`
/**
 * @param id - Each tour or exhibit has its unique identifier
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
      return null; // Return null on query error
    }

    // Check if data array is not empty
    if (data && data.length > 0 && data[0].color_hex) {
      return data[0].color_hex;
    }

    return null; // Return null if no matching data found
  } catch (error) {
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
