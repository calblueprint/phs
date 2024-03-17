'use client';

import { ExhibitRow } from '../../types/types';
import supabase from '../client';

/**
 * @returns all exhibits
 */
export async function fetchAllExhibits() {
  const { data, error } = await supabase.from('exhibits').select('*');
  if (error) {
    throw new Error(`An error occurred trying to read exhibits: ${error}`);
  }
  return data;
}

/**
 *
 * @param id display id
 * @returns nothing
 */
export async function deleteDisplay(id: string) {
  const { error } = await supabase.from('exhibits').delete().eq('id', id);

  if (error) {
    throw new Error(`An error occurred trying to delete displays: ${error}`);
  } else {
    fetchAllExhibits();
  }
}

/**
 *
 * @param exhibitData row of exhibit data
 * @returns new exhibit row
 */
export async function createExhibit(exhibitData: ExhibitRow) {
  const { data, error } = await supabase.from('exhibits').upsert([exhibitData]);

  if (error) {
    throw new Error(
      `An error occurred trying to create displays: ${error.message}`,
    );
  }
  const newExhibit = data;
  return newExhibit;
}

/**
 *
 * @param id - id number
 * @param updatedInfo - the exhibit row to update
 * @returns - updates that given exhibit row
 */
export async function updateExhibit(id: number, updatedInfo: ExhibitRow) {
  const { data, error } = await supabase
    .from('exhibits')
    .update(updatedInfo)
    .eq('id', updatedInfo.id);

  if (error) {
    throw new Error(`Error updating exhibit data: ${error.message}`);
  }

  const newExhibit = data;
  return newExhibit;
}
