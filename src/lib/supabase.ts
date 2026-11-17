import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const hasValidConfig =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl?.includes('your-project-ref') &&
  !supabaseAnonKey?.includes('your-supabase-anon-key');

/**
 * Browser-safe Supabase client initialized exclusively with the public
 * project URL and anon/publishable key. Never use a service_role or secret key here.
 */
export const supabase: SupabaseClient | null = hasValidConfig
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const isSupabaseConfigured = Boolean(supabase);
