/* 
This types files is based off of the supabase.ts file, which are the supabase generated types.
This file is meant to create clean type definitions that we can export to keep things staticly typed
Any updates to supabase.ts should be reflected here (new tables).
*/

import { Database, Json } from './supabase';

export type DisplayRow = Database['public']['Tables']['displays']['Row'];
export type LinksRow = Database['public']['Tables']['links']['Row'];
export type MediaRow = Database['public']['Tables']['media']['Row'];
export type TourDisplaysRow =
  Database['public']['Tables']['tour_displays']['Row'];
export type TourMediaRow = Database['public']['Tables']['tour_media']['Row'];
export type TourRow = Database['public']['Tables']['tours']['Row'];
export type TourWithMediaRow = TourRow & { media_url: string };
export type NewsRow = Database['public']['Tables']['news']['Row'];
export type ExhibitRow = Database['public']['Tables']['exhibits']['Row'];
export type CategoryRow = Database['public']['Tables']['categories']['Row'];
export type SpotlightRow = {
  tour_row: TourRow;
  url: string;
};
export type SpotlightWithMediaRow = TourRow & { media_url: string };
export type ToursWithMediaRow = TourRow & { media_url: string };
export type ExhibitWithCategoryRow = {
  id: number;
  category: string;
  description: string;
  image: string;
  coordinates: Json;
};