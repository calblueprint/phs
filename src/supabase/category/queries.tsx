'use client';

import { DisplayRow } from '../../types/types';
import supabase from '../client';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @param category_in
 */
// eslint-disable-next-line import/prefer-default-export, camelcase
// export async function get_category_color(category_in: string) {
//     const { data, error } = await supabase.rpc('get_category_color', { category_in });
//     if (error) {
//       // Log the error message for debugging
//       console.error(`An error occurred trying to generate color: ${error.message}`);
//       // Throw a new error with the message for further handling
//       throw new Error(`An error occurred trying to generate color: ${error.message}`);
//     }
//     return data;
// }
// Assume this function is in `supabase/category/queries.js`
/**
 *
 * @param category - The category for which you want to fetch the color
 * @returns The color for the category
 */
// eslint-disable-next-line import/prefer-default-export
export async function getCategoryColor1(category: string) {
  try {
    const { data, error } = await supabase
      .from('categories') // Adjust according to your actual table name
      .select('color')
      .eq('category', category); // Use this if you're sure there's only one entry per category

    if (error) {
      throw new Error(error.message);
    }

    // Assuming 'color' is the column you want and each category has a unique color.
    // 'data' would be the object containing 'color', so we return data.color.
    // Check if 'data' exists to avoid accessing property 'color' of null.
    console.log(`Color for ${category}:`, data[0].color);
    return data ? data[0].color : null;
  } catch (error) {
    console.error(`Error fetching color for category ${category}:`, error);
    // Return null or a default color to handle errors gracefully
    return null;
  }
}
