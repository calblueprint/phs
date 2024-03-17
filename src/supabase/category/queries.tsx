'use client';

import { DisplayRow } from '../../types/types';
import supabase from '../client';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @param category_in
 */
// eslint-disable-next-line import/prefer-default-export, camelcase
export async function get_category_color(category_in: string) {
    const { data, error } = await supabase.rpc('get_category_color', { category_in });
    if (error) {
      // Log the error message for debugging
      console.error(`An error occurred trying to generate color: ${error.message}`);
      // Throw a new error with the message for further handling
      throw new Error(`An error occurred trying to generate color: ${error.message}`);
    }
    return data;
}
// Assume this function is in `supabase/category/queries.js`
/**
 *
 */
export async function get_category_color1(category) {
    try {
        const { data, error } = await supabase
            .from('categories') // Adjust according to your actual table name
            .select('color')
            .eq('category', category)
            .single(); // Assuming each category has a unique color

        if (error) throw new Error(error.message);
        return data.color; // Ensure you're returning the color property
    } catch (error) {
        console.error(`Error fetching color for category ${category}:`, error);
        return null; // Return null to handle errors gracefully
    }
}




