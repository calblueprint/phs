'use client';

import supabase from '../client';
import { NewsRow } from '../../types/types';

/**
 * Inserts a single news into the database.
 * @param newsData - The news to insert.
 * @returns A promise that resolves to a NewsRow object.
 */
export async function insertNews(newsData: NewsRow): Promise<NewsRow | null> {
  const { data, error } = await supabase.from('news').insert(newsData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Deletes a single news from the database.
 * @param newsId - The id of the news to delete.
 * @returns A promise that resolves to a NewsRowobject.
 */
export async function deleteNews(newsId: string): Promise<NewsRow | null> {
  const { data, error } = await supabase.from('news').delete().eq('id', newsId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Updates a single news in the database.
 * @param newNewsData - The updated news data.
 * @returns A promise that resolves to a NewsRow object.
 */
export async function updateNews(
  newNewsData: NewsRow,
): Promise<NewsRow | null> {
  const { data, error } = await supabase
    .from('news')
    .update(newNewsData)
    .eq('id', newNewsData.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Fetches all news from the database.
 * @returns A promise that resolves to an array of NewsRow objects.
 */
export async function fetchAllNews(): Promise<NewsRow[]> {
  const { data, error } = await supabase.from('news').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Fetches all news from the database sorted by created_by time recent first.
 * @returns A promise that resolves to an array of NewsRow objects.
 */
export async function fetchAllNewsByDate(): Promise<NewsRow[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Fetches a single news from the database.
 * @param newsId - The id of the news to fetch.
 * @returns A promise that resolves to a NewsRow object.
 */
export async function fetchNews(newsId: string): Promise<NewsRow> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', newsId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
