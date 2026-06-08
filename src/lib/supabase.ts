import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const authStorageKey = 'flowlaw-supabase-auth-v2';
const legacyAuthStorageKeys = ['flowlaw-supabase-auth'];

function getDefaultAuthStorageKey() {
  if (!supabaseUrl) return null;

  try {
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
    return projectRef ? `sb-${projectRef}-auth-token` : null;
  } catch {
    return null;
  }
}

function createFlowSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storageKey: authStorageKey,
      persistSession: true,
      autoRefreshToken: false,
      detectSessionInUrl: true,
    },
  });
}

type FlowSupabaseClient = ReturnType<typeof createFlowSupabaseClient>;

declare global {
  var __flowlawSupabaseClient: FlowSupabaseClient | undefined;
}

// Create a dummy client if credentials are missing to avoid throwing during build time
// Actual calls will fail, but the build will pass if no calls are made during prerendering
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? typeof window === 'undefined'
    ? createFlowSupabaseClient()
    : globalThis.__flowlawSupabaseClient ??= createFlowSupabaseClient()
  : null as any;

export function isInvalidAuthSessionError(error: unknown) {
  const authError = error as { code?: string; message?: string } | null;
  const code = authError?.code;
  const message = authError?.message || '';

  return (
    code === 'refresh_token_not_found' ||
    code === 'refresh_token_already_used' ||
    code === 'session_not_found' ||
    code === 'session_expired' ||
    message.includes('Invalid Refresh Token') ||
    message.includes('Refresh Token Not Found')
  );
}

export async function clearLocalAuthSession() {
  if (supabase) {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      // If the remote session is already invalid, local storage cleanup below is enough.
    }
  }

  if (typeof window === 'undefined') return;

  const defaultStorageKey = getDefaultAuthStorageKey();
  const keys = [authStorageKey, ...legacyAuthStorageKeys, defaultStorageKey]
    .filter((key): key is string => Boolean(key))
    .flatMap((key) => [key, `${key}-code-verifier`, `${key}-user`]);

  keys.forEach((key) => window.localStorage.removeItem(key));
}

export async function getSafeSession() {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    if (isInvalidAuthSessionError(error)) {
      await clearLocalAuthSession();
    }

    return null;
  }

  return data.session;
}

export async function getSafeUser() {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    if (isInvalidAuthSessionError(error)) {
      await clearLocalAuthSession();
    }

    return null;
  }

  return data.user;
}

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Supabase credentials are missing in environment variables.');
  }
}
