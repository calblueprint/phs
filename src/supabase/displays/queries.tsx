'use client';

import { DisplayRow } from '../../types/types';
import supabase from '../client';

/**
 *
 */
export async function fetchDisplays() {
  const { data, error } = await supabase.from('displays').select('*');
  if (error) {
    throw new Error(`An error occurred trying to read displays: ${error}`);
  }
  return data;
}

/**
 *
 * @param id
 */
export async function deleteDisplay(id: number) {
  const { error } = await supabase.from('displays').delete().eq('id', id);

  if (error) {
    throw new Error(`An error occurred trying to delete displays: ${error}`);
  } else {
    fetchDisplays();
  }
}

/**
 *
 * @param displayData
 */
export async function createDisplay(displayData: DisplayRow) {
  const { data, error } = await supabase.from('displays').upsert([displayData]);

  if (error) {
    throw new Error(
      `An error occurred trying to create displays: ${error.message}`,
    );
  }
  const newDisplay = data;
  return newDisplay;
}


/**
 *
 * @param id
 * @param updatedInfo
 */
export async function updateDisplay(id: number, updatedInfo: DisplayRow) {
  const { data, error } = await supabase
    .from('displays')
    .update(updatedInfo)
    .eq('id', updatedInfo.id);

  if (error) {
    throw new Error(`Error updating display data: ${error.message}`);
  }

  const newDisplay = data;
  return newDisplay;
}


/**
 * 
 * @param displayIds - array of display ids
 * @returns all the displays matching the display ids
 */
export async function fetchDisplaysfromIds(displayIds: string[]) {
  const { data, error } = await supabase
    .from('displays')
    .select('*')
    .in('id', displayIds);

  if (error) {
    throw new Error(`Error updating display data: ${error.message}`);
  }

  return data;
}