'use client';

import supabase from '../client';

/**
 *
 * @param category_in
 */
// Assume this function is in `supabase/category/queries.js`
/**
 *
 */
// eslint-disable-next-line import/prefer-default-export
export async function getCategoryColor1(category: string) {
    try {
        const { data, error } = await supabase
            .from('categories') 
            .select('color_hex')
            .eq('category', category); 

        if (error) {
            console.error("Error fetching from Supabase:", error.message);
            return null; // Return null on query error
        }

        // Check if data array is not empty
        if (data && data.length > 0 && data[0].color_hex) {
            console.log(`Color for ${category}:`, data[0].color_hex);
            return data[0].color_hex;
        } else {
            console.log("No matching category found or color_hex is undefined");
            return null; // Return null if no matching data found
        }
    } catch (error) {
        console.error(`An unexpected error occurred:`, error);
        return null; // Return null on unexpected error
    }
}