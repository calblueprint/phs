'use client';

import React, { useState, useEffect } from 'react';
import supabase from "../client";
import { Tables } from "../../types/database.types";
import { Database } from "../../types/supabase";

export async function fetchMedia() {
    const { data, error } = await supabase.from('media').select('*');
    console.log("here????");
    if (error) {
        throw new Error(`An error occurred trying to read displays: ${error}`);
      }
      console.log(data);
      return data;
}
export async function deleteMedia(id: number) {
    const { data, error } = await supabase.from('media').delete().eq('id', id);
    if (error) {
        throw new Error(`An error occurred trying to delete displays: ${error}`);
    }
     else {
        fetchMedia();
    }
}
export async function createMedia(mediaData: Database['public']['Tables']['media']['Row']) {
  const { data, error } = await supabase.from('media').upsert([mediaData]);
  if (error) {
    throw new Error(`An error occurred trying to create displays: ${error.message}`);
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
export async function updateMedia(id: number, updatedInfo: Partial<Database['public']['Tables']['media']['Row']>) {
    const { data, error } = await supabase
    .from('media').update(updatedInfo).eq('id', updatedInfo.id);
    if (error) {
        throw new Error(`Error updating display data: ${error.message}`);
    }
    const newMedia = data;
    return newMedia;
}