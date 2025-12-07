export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      comments: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          parentId: string | null;
          postId: string | null;
          userId: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          parentId?: string | null;
          postId?: string | null;
          userId?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          parentId?: string | null;
          postId?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_parentId_fkey";
            columns: ["parentId"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notification: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          postId: string | null;
          read: boolean | null;
          receiverId: string | null;
          senderId: string | null;
          title: string | null;
          type: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          postId?: string | null;
          read?: boolean | null;
          receiverId?: string | null;
          senderId?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          postId?: string | null;
          read?: boolean | null;
          receiverId?: string | null;
          senderId?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "notification_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notification_receiverId_fkey";
            columns: ["receiverId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notification_senderId_fkey";
            columns: ["senderId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      postLikes: {
        Row: {
          created_at: string;
          id: string;
          postId: string | null;
          userId: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          postId?: string | null;
          userId?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          postId?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "postLikes_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "postLikes_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          author: string | null;
          content: string | null;
          created_at: string;
          id: string;
          images: Json | null;
          media: Json | null;
          parent_id: string | null;
          videos: Json[] | null;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          images?: Json | null;
          media?: Json | null;
          parent_id?: string | null;
          videos?: Json[] | null;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          images?: Json | null;
          media?: Json | null;
          parent_id?: string | null;
          videos?: Json[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          app_interest: string[] | null;
          avatarUrl: string | null;
          cover_photo: string | null;
          created_at: string;
          dob: string | null;
          email: string | null;
          ethnicity: string | null;
          firstName: string | null;
          fullLineageName: string | null;
          gender: string | null;
          hasStore: Database["public"]["Enums"]["Boolean"] | null;
          id: string;
          interest: string[] | null;
          isComplete: boolean | null;
          lastName: string | null;
          lineage_ids: string[] | null;
          lineage_names: string[] | null;
          location: string | null;
          profession: string | null;
          username: string | null;
        };
        Insert: {
          app_interest?: string[] | null;
          avatarUrl?: string | null;
          cover_photo?: string | null;
          created_at?: string;
          dob?: string | null;
          email?: string | null;
          ethnicity?: string | null;
          firstName?: string | null;
          fullLineageName?: string | null;
          gender?: string | null;
          hasStore?: Database["public"]["Enums"]["Boolean"] | null;
          id?: string;
          interest?: string[] | null;
          isComplete?: boolean | null;
          lastName?: string | null;
          lineage_ids?: string[] | null;
          lineage_names?: string[] | null;
          location?: string | null;
          profession?: string | null;
          username?: string | null;
        };
        Update: {
          app_interest?: string[] | null;
          avatarUrl?: string | null;
          cover_photo?: string | null;
          created_at?: string;
          dob?: string | null;
          email?: string | null;
          ethnicity?: string | null;
          firstName?: string | null;
          fullLineageName?: string | null;
          gender?: string | null;
          hasStore?: Database["public"]["Enums"]["Boolean"] | null;
          id?: string;
          interest?: string[] | null;
          isComplete?: boolean | null;
          lastName?: string | null;
          lineage_ids?: string[] | null;
          lineage_names?: string[] | null;
          location?: string | null;
          profession?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      relationships: {
        Row: {
          created_at: string;
          id: string;
          receiver: string | null;
          requester: string | null;
          status: Database["public"]["Enums"]["status"] | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          receiver?: string | null;
          requester?: string | null;
          status?: Database["public"]["Enums"]["status"] | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          receiver?: string | null;
          requester?: string | null;
          status?: Database["public"]["Enums"]["status"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "relationships_receiver_fkey";
            columns: ["receiver"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "relationships_requester_fkey";
            columns: ["requester"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      saved: {
        Row: {
          content: Json | null;
          created_at: string;
          id: string;
          type: string | null;
          userId: string | null;
        };
        Insert: {
          content?: Json | null;
          created_at?: string;
          id?: string;
          type?: string | null;
          userId?: string | null;
        };
        Update: {
          content?: Json | null;
          created_at?: string;
          id?: string;
          type?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "saved_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      store: {
        Row: {
          availability: string | null;
          category: string | null;
          condition: string | null;
          created_at: string;
          description: string | null;
          id: string;
          images: Json | null;
          location: string | null;
          name: string | null;
          price: number | null;
          profile_id: string | null;
          tag: string | null;
        };
        Insert: {
          availability?: string | null;
          category?: string | null;
          condition?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: Json | null;
          location?: string | null;
          name?: string | null;
          price?: number | null;
          profile_id?: string | null;
          tag?: string | null;
        };
        Update: {
          availability?: string | null;
          category?: string | null;
          condition?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: Json | null;
          location?: string | null;
          name?: string | null;
          price?: number | null;
          profile_id?: string | null;
          tag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "store_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Boolean: "true" | "false";
      status: "pending" | "accepted" | "rejected" | "blocked";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      Boolean: ["true", "false"],
      status: ["pending", "accepted", "rejected", "blocked"],
    },
  },
} as const;
