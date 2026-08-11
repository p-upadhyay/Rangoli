import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Null until the env vars are set, so the site keeps working unconfigured:
 * the farmaish form explains it is offline and the listener count stays hidden,
 * rather than either of them throwing.
 *
 * The anon key is meant to be public. What keeps submissions private is row
 * level security on the table, not the key — see supabase/schema.sql.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const supabaseReady = Boolean(supabase);
