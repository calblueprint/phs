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
          coordinates: Json
          created_at: string
          description: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          coordinates?: Json
          created_at?: string
          description?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Update: {
          coordinates?: Json
          created_at?: string
          description?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          id: string
          text: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          text?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          text?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
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
