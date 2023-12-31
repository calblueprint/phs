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
      display_media: {
        Row: {
          display_id: string
          media_id: string
          media_placement: string | null
        }
        Insert: {
          display_id: string
          media_id: string
          media_placement?: string | null
        }
        Update: {
          display_id?: string
          media_id?: string
          media_placement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "display_media_display_id_fkey"
            columns: ["display_id"]
            isOneToOne: false
            referencedRelation: "displays"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "display_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          }
        ]
      }
      displays: {
        Row: {
          coordinates: Json | null
          created_at: string
          description: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string
          description?: string
          id: string
          title?: string
          updated_at?: string | null
        }
        Update: {
          coordinates?: Json | null
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
          title: string | null
          type: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          text?: string | null
          title?: string | null
          type?: string | null
          url?: string
        }
        Update: {
          created_at?: string
          id?: string
          text?: string | null
          title?: string | null
          type?: string | null
          url?: string
        }
        Relationships: []
      }
      spotlight_recommendations: {
        Row: {
          source_display_id: string
          target_display_id: string
        }
        Insert: {
          source_display_id: string
          target_display_id: string
        }
        Update: {
          source_display_id?: string
          target_display_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spotlight_recommendations_source_display_id_fkey"
            columns: ["source_display_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spotlight_recommendations_target_display_id_fkey"
            columns: ["target_display_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          }
        ]
      }
      tour_displays: {
        Row: {
          display_id: string
          display_order: number | null
          tour_id: string
        }
        Insert: {
          display_id: string
          display_order?: number | null
          tour_id: string
        }
        Update: {
          display_id?: string
          display_order?: number | null
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_displays_display_id_fkey"
            columns: ["display_id"]
            isOneToOne: false
            referencedRelation: "displays"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_displays_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          }
        ]
      }
      tour_media: {
        Row: {
          media_id: string
          tour_id: string
        }
        Insert: {
          media_id: string
          tour_id: string
        }
        Update: {
          media_id?: string
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_media_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          }
        ]
      }
      tours: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
          spotlight: boolean
          stop_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          spotlight?: boolean
          stop_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          spotlight?: boolean
          stop_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_display_images: {
        Args: {
          display_id: string
        }
        Returns: Record<string, unknown>
      }
      joinspotlightswithmedia: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          description: string
          created_at: string
          stop_count: number
          spotlight: boolean
          media_url: string
        }[]
      }
    }
    Enums: {
      media_type: "image" | "video" | "link"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}