import { FeedPost } from "@/components/Post/type";
import { Profile } from "../../types/supabaseTypes";

export type FriendStatus =
  | "NONE"
  | "PENDING_OUTGOING"
  | "PENDING_INCOMING"
  | "FRIENDS"
  | "SELF";

export type ProfileRowItem = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string | null;
  friendStatus?: FriendStatus;
  requestId?: string;
  isVerified?: boolean;
};

export type ProfileWithFriendStatus = Profile & {
  friendStatus: FriendStatus;
  requestId?: string; // only when pending
  friendsCount?: number;
};

export type FriendsEnvelop = {
  friends: ProfileRowItem[];
  count: number;
};

export type FeedEnvelope = {
  items: ProfileRowItem[];
  nextCursor: string | null;
};

export type ProfileEnvelop = {
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
  posts: FeedPost[];
};
