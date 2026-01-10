import { ProductAvailabilty, ProductMediaInput, ProductStatus } from "../../../types/supabaseTypes";
import { Author } from "../Post/type";

export type FeedProduct = {
    availability: "IMMEDIATLY" | "IN_A_WEEK" | "IN_A_MONTH" | "OTHER";
    category: string;
    city: string | null;
    condition: "NEW" | "USED_LIKE_NEW" | "USED_GOOD" | "USED_FAIR";
    country: string | null;
    createdAt: string;
    currency: string;
    deletedAt: string | null;
    description: string;
    district: string | null;
    expiresAt: string | null;
    id: string;
    lat: number | null;
    lng: number | null;
    locationText: string | null;
    negotiable: boolean;
    price: number;
    publishedAt: string | null;
    saveCount: number;
    sellerId: string;
    status: ProductStatus;
    title: string;
    updatedAt: string;
    viewCount: number;
    visibility: ProductAvailabilty

    media: ProductMediaInput[],
    seller: Author
};