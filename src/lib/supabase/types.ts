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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Block: {
        Row: {
          blockedId: string;
          blockerId: string;
          createdAt: string;
          id: string;
        };
        Insert: {
          blockedId: string;
          blockerId: string;
          createdAt?: string;
          id: string;
        };
        Update: {
          blockedId?: string;
          blockerId?: string;
          createdAt?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Block_blockedId_fkey";
            columns: ["blockedId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Block_blockerId_fkey";
            columns: ["blockerId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Comment: {
        Row: {
          content: string;
          createdAt: string;
          id: string;
          likeCount: number;
          parentCommentId: string | null;
          postId: string;
          profileId: string;
        };
        Insert: {
          content: string;
          createdAt?: string;
          id: string;
          likeCount?: number;
          parentCommentId?: string | null;
          postId: string;
          profileId: string;
        };
        Update: {
          content?: string;
          createdAt?: string;
          id?: string;
          likeCount?: number;
          parentCommentId?: string | null;
          postId?: string;
          profileId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Comment_parentCommentId_fkey";
            columns: ["parentCommentId"];
            isOneToOne: false;
            referencedRelation: "Comment";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comment_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "Post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comment_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      CommentReaction: {
        Row: {
          commentId: string;
          createdAt: string;
          id: string;
          profileId: string;
          type: Database["public"]["Enums"]["ReactionType"];
        };
        Insert: {
          commentId: string;
          createdAt?: string;
          id: string;
          profileId: string;
          type?: Database["public"]["Enums"]["ReactionType"];
        };
        Update: {
          commentId?: string;
          createdAt?: string;
          id?: string;
          profileId?: string;
          type?: Database["public"]["Enums"]["ReactionType"];
        };
        Relationships: [
          {
            foreignKeyName: "CommentReaction_commentId_fkey";
            columns: ["commentId"];
            isOneToOne: false;
            referencedRelation: "Comment";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "CommentReaction_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Conversation: {
        Row: {
          createdAt: string;
          createdById: string | null;
          id: string;
          isGroup: boolean;
          title: string | null;
        };
        Insert: {
          createdAt?: string;
          createdById?: string | null;
          id: string;
          isGroup?: boolean;
          title?: string | null;
        };
        Update: {
          createdAt?: string;
          createdById?: string | null;
          id?: string;
          isGroup?: boolean;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Conversation_createdById_fkey";
            columns: ["createdById"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      ConversationParticipant: {
        Row: {
          conversationId: string;
          id: string;
          joinedAt: string;
          lastReadAt: string | null;
          profileId: string;
          role: string;
        };
        Insert: {
          conversationId: string;
          id: string;
          joinedAt?: string;
          lastReadAt?: string | null;
          profileId: string;
          role?: string;
        };
        Update: {
          conversationId?: string;
          id?: string;
          joinedAt?: string;
          lastReadAt?: string | null;
          profileId?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ConversationParticipant_conversationId_fkey";
            columns: ["conversationId"];
            isOneToOne: false;
            referencedRelation: "Conversation";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ConversationParticipant_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Follow: {
        Row: {
          createdAt: string;
          followeeId: string;
          followerId: string;
          id: string;
        };
        Insert: {
          createdAt?: string;
          followeeId: string;
          followerId: string;
          id: string;
        };
        Update: {
          createdAt?: string;
          followeeId?: string;
          followerId?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Follow_followeeId_fkey";
            columns: ["followeeId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Follow_followerId_fkey";
            columns: ["followerId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Interest: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      Kinship: {
        Row: {
          createdAt: string;
          id: string;
          profileIdA: string;
          profileIdB: string;
          relationAtoB: Database["public"]["Enums"]["KinshipType"];
          verified: boolean;
          verifiedById: string | null;
        };
        Insert: {
          createdAt?: string;
          id: string;
          profileIdA: string;
          profileIdB: string;
          relationAtoB: Database["public"]["Enums"]["KinshipType"];
          verified?: boolean;
          verifiedById?: string | null;
        };
        Update: {
          createdAt?: string;
          id?: string;
          profileIdA?: string;
          profileIdB?: string;
          relationAtoB?: Database["public"]["Enums"]["KinshipType"];
          verified?: boolean;
          verifiedById?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Kinship_profileIdA_fkey";
            columns: ["profileIdA"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Kinship_profileIdB_fkey";
            columns: ["profileIdB"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Lineage: {
        Row: {
          createdAt: string;
          createdById: string | null;
          description: string | null;
          id: string;
          name: string;
          primarySurname: string | null;
          rootRegion: string | null;
          rootVillage: string | null;
          type: Database["public"]["Enums"]["LineageType"];
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          createdById?: string | null;
          description?: string | null;
          id: string;
          name: string;
          primarySurname?: string | null;
          rootRegion?: string | null;
          rootVillage?: string | null;
          type?: Database["public"]["Enums"]["LineageType"];
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          createdById?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          primarySurname?: string | null;
          rootRegion?: string | null;
          rootVillage?: string | null;
          type?: Database["public"]["Enums"]["LineageType"];
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Lineage_createdById_fkey";
            columns: ["createdById"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      LineageMembership: {
        Row: {
          addedById: string | null;
          createdAt: string;
          generation: number | null;
          id: string;
          isPrimaryLineage: boolean;
          lineageId: string;
          profileId: string;
          role: Database["public"]["Enums"]["LineageRole"];
        };
        Insert: {
          addedById?: string | null;
          createdAt?: string;
          generation?: number | null;
          id: string;
          isPrimaryLineage?: boolean;
          lineageId: string;
          profileId: string;
          role?: Database["public"]["Enums"]["LineageRole"];
        };
        Update: {
          addedById?: string | null;
          createdAt?: string;
          generation?: number | null;
          id?: string;
          isPrimaryLineage?: boolean;
          lineageId?: string;
          profileId?: string;
          role?: Database["public"]["Enums"]["LineageRole"];
        };
        Relationships: [
          {
            foreignKeyName: "LineageMembership_addedById_fkey";
            columns: ["addedById"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "LineageMembership_lineageId_fkey";
            columns: ["lineageId"];
            isOneToOne: false;
            referencedRelation: "Lineage";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "LineageMembership_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      MediaFile: {
        Row: {
          createdAt: string;
          height: number | null;
          id: string;
          mimeType: string;
          postId: string;
          sizeBytes: number;
          type: Database["public"]["Enums"]["MediaType"];
          updatedAt: string;
          url: string;
          width: number | null;
        };
        Insert: {
          createdAt?: string;
          height?: number | null;
          id: string;
          mimeType: string;
          postId: string;
          sizeBytes: number;
          type: Database["public"]["Enums"]["MediaType"];
          updatedAt: string;
          url: string;
          width?: number | null;
        };
        Update: {
          createdAt?: string;
          height?: number | null;
          id?: string;
          mimeType?: string;
          postId?: string;
          sizeBytes?: number;
          type?: Database["public"]["Enums"]["MediaType"];
          updatedAt?: string;
          url?: string;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "MediaFile_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "Post";
            referencedColumns: ["id"];
          },
        ];
      };
      Message: {
        Row: {
          content: string | null;
          conversationId: string;
          createdAt: string;
          deletedAt: string | null;
          id: string;
          mediaUrl: string | null;
          senderId: string;
          timestamp: string;
        };
        Insert: {
          content?: string | null;
          conversationId: string;
          createdAt?: string;
          deletedAt?: string | null;
          id: string;
          mediaUrl?: string | null;
          senderId: string;
          timestamp?: string;
        };
        Update: {
          content?: string | null;
          conversationId?: string;
          createdAt?: string;
          deletedAt?: string | null;
          id?: string;
          mediaUrl?: string | null;
          senderId?: string;
          timestamp?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Message_conversationId_fkey";
            columns: ["conversationId"];
            isOneToOne: false;
            referencedRelation: "Conversation";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Message_senderId_fkey";
            columns: ["senderId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      MessageRead: {
        Row: {
          messageId: string;
          readAt: string;
          userId: string;
        };
        Insert: {
          messageId: string;
          readAt?: string;
          userId: string;
        };
        Update: {
          messageId?: string;
          readAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "MessageRead_messageId_fkey";
            columns: ["messageId"];
            isOneToOne: false;
            referencedRelation: "Message";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "MessageRead_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Mute: {
        Row: {
          createdAt: string;
          id: string;
          mutedId: string;
          muterId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          mutedId: string;
          muterId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          mutedId?: string;
          muterId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Mute_mutedId_fkey";
            columns: ["mutedId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Mute_muterId_fkey";
            columns: ["muterId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Notification: {
        Row: {
          actorId: string | null;
          commentId: string | null;
          createdAt: string;
          id: string;
          isRead: boolean;
          lineageId: string | null;
          messageId: string | null;
          postId: string | null;
          recipientId: string;
          type: Database["public"]["Enums"]["NotificationType"];
        };
        Insert: {
          actorId?: string | null;
          commentId?: string | null;
          createdAt?: string;
          id: string;
          isRead?: boolean;
          lineageId?: string | null;
          messageId?: string | null;
          postId?: string | null;
          recipientId: string;
          type: Database["public"]["Enums"]["NotificationType"];
        };
        Update: {
          actorId?: string | null;
          commentId?: string | null;
          createdAt?: string;
          id?: string;
          isRead?: boolean;
          lineageId?: string | null;
          messageId?: string | null;
          postId?: string | null;
          recipientId?: string;
          type?: Database["public"]["Enums"]["NotificationType"];
        };
        Relationships: [
          {
            foreignKeyName: "Notification_actorId_fkey";
            columns: ["actorId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_commentId_fkey";
            columns: ["commentId"];
            isOneToOne: false;
            referencedRelation: "Comment";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_lineageId_fkey";
            columns: ["lineageId"];
            isOneToOne: false;
            referencedRelation: "Lineage";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_messageId_fkey";
            columns: ["messageId"];
            isOneToOne: false;
            referencedRelation: "Message";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "Post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_recipientId_fkey";
            columns: ["recipientId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      Post: {
        Row: {
          commentCount: number;
          content: string | null;
          createdAt: string;
          id: string;
          likeCount: number;
          lineageId: string | null;
          locationText: string | null;
          profileId: string;
          shareCount: number;
          updatedAt: string;
          visibility: Database["public"]["Enums"]["PostVisibility"];
        };
        Insert: {
          commentCount?: number;
          content?: string | null;
          createdAt?: string;
          id: string;
          likeCount?: number;
          lineageId?: string | null;
          locationText?: string | null;
          profileId: string;
          shareCount?: number;
          updatedAt: string;
          visibility?: Database["public"]["Enums"]["PostVisibility"];
        };
        Update: {
          commentCount?: number;
          content?: string | null;
          createdAt?: string;
          id?: string;
          likeCount?: number;
          lineageId?: string | null;
          locationText?: string | null;
          profileId?: string;
          shareCount?: number;
          updatedAt?: string;
          visibility?: Database["public"]["Enums"]["PostVisibility"];
        };
        Relationships: [
          {
            foreignKeyName: "Post_lineageId_fkey";
            columns: ["lineageId"];
            isOneToOne: false;
            referencedRelation: "Lineage";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Post_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      PostReaction: {
        Row: {
          createdAt: string;
          id: string;
          postId: string;
          profileId: string;
          type: Database["public"]["Enums"]["ReactionType"];
        };
        Insert: {
          createdAt?: string;
          id: string;
          postId: string;
          profileId: string;
          type?: Database["public"]["Enums"]["ReactionType"];
        };
        Update: {
          createdAt?: string;
          id?: string;
          postId?: string;
          profileId?: string;
          type?: Database["public"]["Enums"]["ReactionType"];
        };
        Relationships: [
          {
            foreignKeyName: "PostReaction_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "Post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "PostReaction_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      profile: {
        Row: {
          avatarUrl: string | null;
          bio: string;
          city: string | null;
          country: string | null;
          countryCode: string | null;
          coverUrl: string | null;
          createdAt: string;
          dateOfBirth: string | null;
          district: string | null;
          email: string;
          ethnicity: string | null;
          firstName: string;
          gender: string | null;
          id: string;
          isProfileComplete: boolean;
          isVerified: boolean;
          lastName: string;
          lineageMainSurname: string | null;
          lineageRootVillage: string | null;
          location: string;
          occupation: string | null;
          updatedAt: string;
          userId: string;
          username: string;
        };
        Insert: {
          avatarUrl?: string | null;
          bio?: string;
          city?: string | null;
          country?: string | null;
          countryCode?: string | null;
          coverUrl?: string | null;
          createdAt?: string;
          dateOfBirth?: string | null;
          district?: string | null;
          email: string;
          ethnicity?: string | null;
          firstName?: string;
          gender?: string | null;
          id: string;
          isProfileComplete?: boolean;
          isVerified?: boolean;
          lastName?: string;
          lineageMainSurname?: string | null;
          lineageRootVillage?: string | null;
          location?: string;
          occupation?: string | null;
          updatedAt: string;
          userId: string;
          username: string;
        };
        Update: {
          avatarUrl?: string | null;
          bio?: string;
          city?: string | null;
          country?: string | null;
          countryCode?: string | null;
          coverUrl?: string | null;
          createdAt?: string;
          dateOfBirth?: string | null;
          district?: string | null;
          email?: string;
          ethnicity?: string | null;
          firstName?: string;
          gender?: string | null;
          id?: string;
          isProfileComplete?: boolean;
          isVerified?: boolean;
          lastName?: string;
          lineageMainSurname?: string | null;
          lineageRootVillage?: string | null;
          location?: string;
          occupation?: string | null;
          updatedAt?: string;
          userId?: string;
          username?: string;
        };
        Relationships: [];
      };
      ProfileInterest: {
        Row: {
          createdAt: string;
          interestId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          interestId: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          interestId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ProfileInterest_interestId_fkey";
            columns: ["interestId"];
            isOneToOne: false;
            referencedRelation: "Interest";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ProfileInterest_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      ProfileSettings: {
        Row: {
          allowMessagesFrom: string;
          allowTagging: boolean;
          createdAt: string;
          discoveryAllowLineage: boolean;
          isPrivate: boolean;
          profileId: string;
          showLastSeen: boolean;
          updatedAt: string;
        };
        Insert: {
          allowMessagesFrom?: string;
          allowTagging?: boolean;
          createdAt?: string;
          discoveryAllowLineage?: boolean;
          isPrivate?: boolean;
          profileId: string;
          showLastSeen?: boolean;
          updatedAt: string;
        };
        Update: {
          allowMessagesFrom?: string;
          allowTagging?: boolean;
          createdAt?: string;
          discoveryAllowLineage?: boolean;
          isPrivate?: boolean;
          profileId?: string;
          showLastSeen?: boolean;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ProfileSettings_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: true;
            referencedRelation: "profile";
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
      KinshipType:
        | "PARENT"
        | "CHILD"
        | "SIBLING"
        | "SPOUSE"
        | "GRANDPARENT"
        | "GRANDCHILD"
        | "COUSIN"
        | "UNCLE_AUNT"
        | "NEPHEW_NIECE"
        | "OTHER";
      LineageRole: "ANCESTOR" | "DESCENDANT" | "SPOUSE" | "EXTENDED";
      LineageType: "FAMILY" | "CLAN" | "SURNAME_LINE" | "TRIBE";
      MediaType: "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO" | "OTHER";
      NotificationType:
        | "FOLLOW"
        | "LIKE"
        | "COMMENT"
        | "MENTION"
        | "MESSAGE"
        | "LINEAGE_INVITE"
        | "LINEAGE_ACCEPT";
      PostVisibility: "PUBLIC" | "FOLLOWERS" | "LINEAGE_ONLY" | "PRIVATE";
      ReactionType: "LIKE" | "LOVE" | "LAUGH" | "ANGRY" | "SAD";
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
      KinshipType: [
        "PARENT",
        "CHILD",
        "SIBLING",
        "SPOUSE",
        "GRANDPARENT",
        "GRANDCHILD",
        "COUSIN",
        "UNCLE_AUNT",
        "NEPHEW_NIECE",
        "OTHER",
      ],
      LineageRole: ["ANCESTOR", "DESCENDANT", "SPOUSE", "EXTENDED"],
      LineageType: ["FAMILY", "CLAN", "SURNAME_LINE", "TRIBE"],
      MediaType: ["IMAGE", "VIDEO", "DOCUMENT", "AUDIO", "OTHER"],
      NotificationType: [
        "FOLLOW",
        "LIKE",
        "COMMENT",
        "MENTION",
        "MESSAGE",
        "LINEAGE_INVITE",
        "LINEAGE_ACCEPT",
      ],
      PostVisibility: ["PUBLIC", "FOLLOWERS", "LINEAGE_ONLY", "PRIVATE"],
      ReactionType: ["LIKE", "LOVE", "LAUGH", "ANGRY", "SAD"],
    },
  },
} as const;
