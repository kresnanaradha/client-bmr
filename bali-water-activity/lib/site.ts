// Set in .env.local locally and in the Vercel project settings; never committed,
// because the repository is public.
export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX";

// Off unless explicitly enabled: demo deployments carry sample reviews and
// unconfirmed prices that must not show up in search results.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Blank disables tracking.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
