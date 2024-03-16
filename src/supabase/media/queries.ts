'use client';

import supabase from '../client';
import { MediaRow } from '../../types/types';

/**
 * @returns all media objects in the media table
 */
export async function fetchMedia() {
  const { data, error } = await supabase.from('media').select('*');
  if (error) {
    throw new Error(`An error occurred trying to read displays: ${error}`);
  }
  return data;
}

/**
 *
 * @param displayId id of the display to fetch pictures for
 * @returns array of image objects corresponding to the display
 */
export async function fetchImagesForDisplay(displayId: string | undefined) {
  if (!displayId) {
    return null;
  }
  const { data, error } = await supabase.rpc('fetchimagesfordisplay', {
    displayid: displayId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
/**
 *
 * @param id of media to delete
 * @returns deletes a media row where id == media_id
 */
export async function deleteMedia(id: number) {
  const { error } = await supabase.from('media').delete().eq('id', id);
  if (error) {
    throw new Error(`An error occurred trying to delete displays: ${error}`);
  } else {
    fetchMedia();
  }
}
/**
 *
 * @param mediaData object containing the new media to create
 * @returns new created media object
 */
export async function createMedia(mediaData: MediaRow) {
  const { data, error } = await supabase.from('media').upsert([mediaData]);
  if (error) {
    throw new Error(
      `An error occurred trying to create displays: ${error.message}`,
    );
  }
  const newMedia = data;
  return newMedia;
}
// export async function insertDisplay(displayData: Display) {
//     const { error } = await supabase.from(‘profiles’).insert(displayData);
//     if (error) {
//       throw new Error(`Error inserting profile data: ${error.message}`);
//     }
//   }
/**
 *
 * @param id of media to update
 * @param updatedInfo fields to update on media object
 * @returns updated media
 */
export async function updateMedia(id: number, updatedInfo: MediaRow) {
  const { data, error } = await supabase
    .from('media')
    .update(updatedInfo)
    .eq('id', updatedInfo.id);
  if (error) {
    throw new Error(`Error updating display data: ${error.message}`);
  }
  const newMedia = data;
  return newMedia;
}
