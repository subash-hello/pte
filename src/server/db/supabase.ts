import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://oomkgkvkfnpejkpxcvrp.supabase.co';

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_-Om2int_Y9ZRT_YdnmBWlA_v_JfFM2a';

export const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  SUPABASE_PUBLISHABLE_KEY;

export const SUPABASE_JWKS_URL =
  process.env.SUPABASE_JWKS_URL ||
  'https://oomkgkvkfnpejkpxcvrp.supabase.co/auth/v1/.well-known/jwks.json';

// Server-side admin client (bypasses RLS with secret / service role key)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Client-safe instance using publishable key
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabaseAdmin;
