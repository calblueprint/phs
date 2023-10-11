export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "bp-testing": {
        Row: {
          coordinates: string | null
          creation: string
          description: string | null
          id: number
          title: string | null
          updated: string | null
        }
        Insert: {
          coordinates?: string | null
          creation: string
          description?: string | null
          id?: number
          title?: string | null
          updated?: string | null
        }
        Update: {
          coordinates?: string | null
          creation?: string
          description?: string | null
          id?: number
          title?: string | null
          updated?: string | null
        }
        Relationships: []
      }
      displays: {
        Row: {
          coordinates: Json | null
          created_at: string
          description: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          coordinates?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
