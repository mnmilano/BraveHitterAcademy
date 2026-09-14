# Brave Hitter Academy web app

Mobile-first V1 application shell backed by the canonical curriculum in this repository.

## Local setup

1. Copy `.env.example` to `.env.local` and fill the service values.
2. Run the SQL migrations with the Supabase CLI.
3. `npm install && npm run dev`.

The current UI includes a browser-persistent product preview. Production persistence is defined in `supabase/migrations` and must be enabled with a linked Supabase project before release.
