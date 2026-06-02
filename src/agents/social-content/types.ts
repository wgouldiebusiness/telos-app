// Shared type for the social content agent — used by the API route and the
// portal page so the shape stays in sync in one place.

export interface SocialPost {
  day: string
  caption: string
  hashtags: string[]
  bestTime: string
}
