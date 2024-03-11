'use client';

<<<<<<< HEAD
import supabase from '../client';
import { ExhibitRow } from '../../types/types';

/**
 * Fetches all tours from the database.
 * @returns A promise that resolves to an array of ExhibitRow objects.
 */
export async function fetchAllExhibits() {
  const { data, error } = await supabase.rpc('get_exhibit_details');
  if (error) {
    throw new Error(error.message);
=======
import { ExhibitRow } from '../../types/types';
import supabase from '../client';

/**
 * @params nothing
 * @returns all exhibits
 */
export async function fetchAllExhibits() {
  const { data, error } = await supabase.from('exhibits').select('*');
  if (error) {
    throw new Error(`An error occurred trying to read exhibits: ${error}`);
>>>>>>> b191485 (added database and page)
  }
  return data;
}

/**
 * Fetches a single exhibit from the database.
 * @param exhibitId - The id of the exhibit to fetch.
 * @returns A promise that resolves to a ExhibitRow object.
 */
export async function fetchExhibit(exhibitId: string): Promise<ExhibitRow> {
  const { data, error } = await supabase
    .from('exhibits')
    .select('*')
    .eq('id', exhibitId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
/**
 * Fetches a single image exhibit from the database.
 * @param exhibitId - The id of the exhibit to fetch.
 * @returns A promise that resolves to a ExhibitRow object.
 */
export async function fetchExhibitImage(
  exhibitId: string,
): Promise<{ image: string }> {
  const { data, error } = await supabase
    .from('exhibits')
    .select('image')
    .eq('id', exhibitId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Provide a default image URL if the image is null
  const imageUrl =
    data?.image ??
    'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'; // Adjust the default image path as needed

  return { image: imageUrl };
}

/**
 * Inserts a single exhibit into the database.
 * @param exhibitData - The exhibit to insert.
 * @returns A promise that resolves to a ExhibitRow object.
 */
export async function insertExhibit(
  exhibitData: ExhibitRow,
): Promise<ExhibitRow | null> {
  const { data, error } = await supabase.from('exhibits').insert(exhibitData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Updates a single exhibit in the database.
 * @param newExhibitData - The updated exhibit data.
 * @returns A promise that resolves to a ExhibitRow object.
 */
export async function updateExhibit(
  newExhibitData: ExhibitRow,
): Promise<ExhibitRow | null> {
  const { data, error } = await supabase
    .from('exhibits')
    .update(newExhibitData)
    .eq('id', newExhibitData.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Upserts a single exhibit into the database.
 * @param exhibitData - The exhibit to upsert.
 * @returns A promise that resolves to a ExhibitRow object.
 */
export async function upsertTour(
  exhibitData: ExhibitRow,
): Promise<ExhibitRow | null> {
  const { data, error } = await supabase.from('exhibits').upsert(exhibitData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Deletes a single exhibit from the database.
 * @param exhibitId - The id of the exhibit to delete.
 * @returns A promise that resolves to a ExhibitRow object.
 */
export async function deleteExhibit(
  exhibitId: string,
): Promise<ExhibitRow | null> {
  const { data, error } = await supabase
    .from('exhibits')
    .delete()
    .eq('id', exhibitId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
=======
/**
 *
 * @param id
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
 * @param exhibitData
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
<<<<<<< HEAD
>>>>>>> b191485 (added database and page)
=======
>>>>>>> 7599b67 (prettier)
