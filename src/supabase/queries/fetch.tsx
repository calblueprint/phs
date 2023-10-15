'use client';

import React, { useState, useEffect } from 'react';
import supabase from '../client';
import { Display } from '@/types/schemaTypes';

export async function fetchDisplays() {
  const { data, error } = await supabase.from('bp-testing').select('*');

  if (error) {
    throw new Error(`An error occurred trying to read displays: ${error}`);
  }

  return data;
}

export async function deleteDisplay(id) {
  const { data, error } = await supabase
    .from('bp-testing')
    .delete()
    .eq('id', id);
  if (error) {
    throw new Error(`An error occurred trying to delete displays: ${error}`);
  } else {
    fetchDisplays();
  }
}

export async function createDisplay(displayData: Display) {
  const { data, error } = await supabase.from('countries').upsert(displayData);
  if (error) {
    throw new Error(`An error occurred trying to create displays: ${error}`);
  } else {
    fetchDisplays();
  }
}

// export async function insertDisplay(displayData: Display) {
//     const { error } = await supabase.from('profiles').insert(displayData);
//     if (error) {
//       throw new Error(`Error inserting profile data: ${error.message}`);
//     }
//   }
export async function updateDisplay(updatedInfo: Partial<Display>) {
  const { error } = await supabase
    .from('bp-testing')
    .update(updatedInfo)
    .eq('title', updatedInfo.title);
  if (error) {
    throw new Error(`Error updating display data: ${error.message}`);
  }
}
