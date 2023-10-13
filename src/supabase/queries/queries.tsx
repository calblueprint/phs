"use client";

import { Database } from '../../types/supabase';
import supabase from '../client';

export async function fetchDisplays() {
    const { data, error } = await supabase.from('displays').select('*');
    console.log("here????");
    if (error) {
        throw new Error(`An error occurred trying to read displays: ${error}`);
      }
      console.log(data);

      return data;
}

  
export async function deleteDisplay(id: any) {

    const { data, error } = await supabase.from('displays').delete().eq('id', id);

    if (error) {
        throw new Error(`An error occurred trying to delete displays: ${error}`);
    }
     else {
        fetchDisplays();
    }
}


export async function createDisplay(displayData: Database) {
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

export async function updateDisplay(id, updatedInfo: Partial<Database>) {
	
    const { data, error } = await supabase
    .from('displays').update(updatedInfo).eq('id', updatedInfo.id);

	
    if (error) {
        throw new Error(`Error updating display data: ${error.message}`);
    }
	
	const newDisplay = data;
    return newDisplay;
}