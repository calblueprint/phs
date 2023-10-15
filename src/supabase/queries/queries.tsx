"use client";

import React, { useState, useEffect } from 'react';
import supabase from '../client';
import { Tables } from "../../types/database.types";
import { Database } from "../../types/supabase";

export async function fetchDisplays() {
    const { data, error } = await supabase.from('bp-testing').select('*');
    if (error) {
        throw new Error(`An error occurred trying to read displays: ${error}`);
      }
      return data;
}

  
export async function deleteDisplay(id: string) {
    const { data, error } = await supabase.from('bp-testing').delete().eq('id', id);
    if (error) {
        throw new Error(`An error occurred trying to delete displays: ${error}`);
    }
     else {
        fetchDisplays();
    }
}

export async function createDisplay(displayData: Database['public']['Tables']['displays']['Row']) {
  const { data, error } = await supabase.from('bp-testing').upsert([displayData]);
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
export async function updateDisplay(id: string, updatedInfo: Partial<Database['public']['Tables']['displays']['Row']>) {
	
    const { data, error } = await supabase
    .from('bp-testing').update(updatedInfo).eq('id', updatedInfo.id);
	
    if (error) {
        throw new Error(`Error updating display data: ${error.message}`);
    }
	
	const newDisplay = data;
    return newDisplay;
}