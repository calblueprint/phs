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
          preview_text: string | null
          spotlight: boolean
          stop_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          preview_text?: string | null
          spotlight?: boolean
          stop_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          preview_text?: string | null
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
      fetchimagesfordisplay: {
        Args: {
          displayid: string
        }
        Returns: {
          id: string
          url: string
          type: string
          title: string
          text: string
          created_at: string
        }[]
      }
      join_spotlights_with_media: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          description: string
          created_at: string
          stop_count: number
          spotlight: boolean
          preview_text: string
          media_url: string
        }[]
      }
      join_tours_with_media: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          description: string
          created_at: string
          stop_count: number
          spotlight: boolean
          preview_text: string
          url: string
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
