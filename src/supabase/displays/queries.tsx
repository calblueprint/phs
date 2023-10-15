"use client";

import { Database } from '../../types/supabase';
import { DisplayRow } from '../../types/types';
import supabase from '../client';

export async function fetchDisplays() {
    const { data, error } = await supabase.from('displays').select('*');
    if (error) {
        throw new Error(`An error occurred trying to read displays: ${error}`);
      }
      return data;
}

  
export async function deleteDisplay(id: number) {

    const { data, error } = await supabase.from('displays').delete().eq('id', id);

    if (error) {
        throw new Error(`An error occurred trying to delete displays: ${error}`);
    }
     else {
        fetchDisplays();
    }
}


export async function createDisplay(displayData: DisplayRow) {
  const { data, error } = await supabase.from('displays').upsert([displayData]);

  if (error) {
    throw new Error(`An error occurred trying to create displays: ${error.message}`);
  }
  const newDisplay = data;
  return newDisplay;
}
  


// export async function insertDisplay(displayData: Display) {
//     const { error } = await supabase.from('profiles').insert(displayData);
//     if (error) {
//       throw new Error(`Error inserting profile data: ${error.message}`);
//     }
//   }

export async function updateDisplay(id: number, updatedInfo: DisplayRow) {
	
    const { data, error } = await supabase
    .from('displays').update(updatedInfo).eq('id', updatedInfo.id);

	
    if (error) {
        throw new Error(`Error updating display data: ${error.message}`);
    }
	
	const newDisplay = data;
    return newDisplay;
}