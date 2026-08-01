export type MediaStatus =
  "UNKNOWN" | "PENDING" | "PROCESSING" | "PARTIALLY_AVAILABLE" | "AVAILABLE";

export interface SeerrMedia {
  media_type?: "movie" | "tv" | null;
  tmbdId?: string | number | null;
}

export interface SeerrRequest {
  requestedBy_username?: string | null;
}

export interface SeerrWebhookPayload {
  notification_type?: string;
  event?: string;
  subject?: string;
  message?: string;
  image?: string | null;
  media?: SeerrMedia | null;
  request?: SeerrRequest | null;
}
