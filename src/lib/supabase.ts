export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      knowledge_base: {
        Row: {
          answer: string
          created_at: string
          hint: string | null
          id: number
          notes: string | null
          question: string
          topic_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          hint?: string | null
          id?: number
          notes?: string | null
          question: string
          topic_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string
          hint?: string | null
          id?: number
          notes?: string | null
          question?: string
          topic_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_knowledge_base_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_knowledge_base_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_knowledge_base_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          blocked: boolean
          created_at: string
          date_of_birth: string | null
          description: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          is_public: boolean
          last_login: string | null
          last_login_ip: string | null
          last_name: string | null
          phone: number | null
          updated_at: string | null
        }
        Insert: {
          blocked?: boolean
          created_at?: string
          date_of_birth?: string | null
          description?: string | null
          email: string
          first_name?: string | null
          id: string
          is_active?: boolean
          is_public?: boolean
          last_login?: string | null
          last_login_ip?: string | null
          last_name?: string | null
          phone?: number | null
          updated_at?: string | null
        }
        Update: {
          blocked?: boolean
          created_at?: string
          date_of_birth?: string | null
          description?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean
          last_login?: string | null
          last_login_ip?: string | null
          last_name?: string | null
          phone?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz: {
        Row: {
          access_code: string | null
          accessible_from: string
          accessible_till: string
          created_at: string
          creator_id: string
          description: string
          has_accessibility_constrain: boolean
          has_time_limit: boolean
          id: number
          is_protected: boolean
          is_public: boolean
          subject_id: number | null
          time_limit_in_minutes: number | null
          title: string
          topic_id: number | null
          updated_at: string
        }
        Insert: {
          access_code?: string | null
          accessible_from?: string
          accessible_till?: string
          created_at?: string
          creator_id: string
          description: string
          has_accessibility_constrain?: boolean
          has_time_limit?: boolean
          id?: number
          is_protected?: boolean
          is_public?: boolean
          subject_id?: number | null
          time_limit_in_minutes?: number | null
          title: string
          topic_id?: number | null
          updated_at?: string
        }
        Update: {
          access_code?: string | null
          accessible_from?: string
          accessible_till?: string
          created_at?: string
          creator_id?: string
          description?: string
          has_accessibility_constrain?: boolean
          has_time_limit?: boolean
          id?: number
          is_protected?: boolean
          is_public?: boolean
          subject_id?: number | null
          time_limit_in_minutes?: number | null
          title?: string
          topic_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic_view"
            referencedColumns: ["id"]
          },
        ]
      }
      subject: {
        Row: {
          created_at: string
          description: string
          id: number
          is_public: boolean
          public: boolean
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          is_public?: boolean
          public?: boolean
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          is_public?: boolean
          public?: boolean
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      topic: {
        Row: {
          created_at: string
          description: string
          id: number
          is_public: boolean
          subject_id: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          is_public?: boolean
          subject_id: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          is_public?: boolean
          subject_id?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_topic_subject_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_topic_subject_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      quiz_view: {
        Row: {
          accessible_from: string | null
          accessible_till: string | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          first_name: string | null
          has_accessibility_constrain: boolean | null
          has_time_limit: boolean | null
          id: number | null
          is_protected: boolean | null
          is_public: boolean | null
          last_name: string | null
          subject_id: number | null
          subject_title: string | null
          time_limit_in_minutes: number | null
          title: string | null
          topic_id: number | null
          topic_title: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic_view"
            referencedColumns: ["id"]
          },
        ]
      }
      random_knowledge_base: {
        Row: {
          answer: string | null
          created_at: string | null
          hint: string | null
          id: number | null
          question: string | null
          subject_id: number | null
          topic_id: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_knowledge_base_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_knowledge_base_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topic_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_knowledge_base_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_topic_subject_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_topic_subject_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject_view"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_view: {
        Row: {
          created_at: string | null
          description: string | null
          first_name: string | null
          id: number | null
          is_public: boolean | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subject_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_view: {
        Row: {
          created_at: string | null
          description: string | null
          first_name: string | null
          id: number | null
          is_public: boolean | null
          subject_id: number | null
          subject_name: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_topic_subject_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_topic_subject_fkey"
            columns: ["subject_id"]
            referencedRelation: "subject_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      roles: "student" | "teacher" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
