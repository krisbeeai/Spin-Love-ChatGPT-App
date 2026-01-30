import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Service Role Client für Server-seitige Operationen
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  language: string;
  country: string;
  consent: boolean;
  consent_date: string | null;
  status: 'active' | 'revoked';
  free_spins_used: number;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  used_at: string | null;
  created_at: string;
}

export interface SpinResult {
  id: string;
  user_id: string;
  results: {
    food: { title: string; emotion: string };
    movie: { title: string; emotion: string };
    together: { title: string; emotion: string };
    intimacy: { title: string; emotion: string };
    worldCuisine?: { title: string; description: string; mood: string | null; sound?: string | null } | null;
  };
  language: string;
  created_at: string;
}

export interface FreeSpinTracking {
  id: string;
  session_id: string;
  spins_used: number;
  last_spin_at: string;
  created_at: string;
}

// ============================================
// USER FUNCTIONS
// ============================================

export async function createUser(data: {
  email: string;
  first_name: string;
  language: string;
  country: string;
}): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      email: data.email.toLowerCase().trim(),
      first_name: data.first_name.trim(),
      language: data.language,
      country: data.country,
      consent: true,
      consent_date: new Date().toISOString(),
      status: 'active'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .single();

  if (error) return null;
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return user;
}

// ============================================
// MAGIC LINK FUNCTIONS
// ============================================

export async function generateMagicLinkToken(userId: string): Promise<string | null> {
  // Alte unbenutzte Tokens löschen
  await supabase
    .from('sessions')
    .delete()
    .eq('user_id', userId)
    .is('used_at', null);

  // Neuen Token generieren (64 Zeichen hex)
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Session erstellen (24h gültig)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const { error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      token: token,
      expires_at: expiresAt.toISOString()
    });

  if (error) {
    console.error('Error creating session:', error);
    return null;
  }

  return token;
}

export async function verifyMagicLinkToken(token: string): Promise<User | null> {
  // Session finden
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('*')
    .eq('token', token)
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (sessionError || !session) {
    console.error('Invalid or expired token');
    return null;
  }

  // User laden
  const user = await getUserById(session.user_id);
  if (!user || user.status !== 'active') {
    console.error('User not found or revoked');
    return null;
  }

  // Token als verwendet markieren
  await supabase
    .from('sessions')
    .update({ used_at: new Date().toISOString() })
    .eq('id', session.id);

  return user;
}

// ============================================
// FREE SPIN TRACKING
// ============================================

export async function getFreeSpinsUsed(sessionId: string): Promise<number> {
  const { data, error } = await supabase
    .from('free_spin_tracking')
    .select('spins_used')
    .eq('session_id', sessionId)
    .single();

  if (error || !data) return 0;
  return data.spins_used;
}

export async function incrementFreeSpins(sessionId: string): Promise<number> {
  // Prüfen ob Eintrag existiert
  const { data: existing } = await supabase
    .from('free_spin_tracking')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (existing) {
    // Updaten
    const { data, error } = await supabase
      .from('free_spin_tracking')
      .update({ 
        spins_used: existing.spins_used + 1,
        last_spin_at: new Date().toISOString()
      })
      .eq('session_id', sessionId)
      .select('spins_used')
      .single();

    if (error) return existing.spins_used;
    return data.spins_used;
  } else {
    // Neu erstellen
    const { data, error } = await supabase
      .from('free_spin_tracking')
      .insert({
        session_id: sessionId,
        spins_used: 1
      })
      .select('spins_used')
      .single();

    if (error) return 0;
    return data.spins_used;
  }
}

// ============================================
// SPIN HISTORY
// ============================================

export async function saveSpinResult(
  userId: string,
  results: SpinResult['results'],
  language: string
): Promise<SpinResult | null> {
  const { data, error } = await supabase
    .from('spin_history')
    .insert({
      user_id: userId,
      results: results,
      language: language
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving spin result:', error);
    return null;
  }
  return data;
}

export async function getSpinHistory(userId: string, limit: number = 20): Promise<SpinResult[]> {
  const { data, error } = await supabase
    .from('spin_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching spin history:', error);
    return [];
  }
  return data || [];
}

// ============================================
// REVOKE ACCESS (DSGVO)
// ============================================

export async function revokeUserAccess(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  if (!user) return false;

  // Status auf revoked setzen
  await supabase
    .from('users')
    .update({ status: 'revoked' })
    .eq('id', user.id);

  // Sessions löschen
  await supabase
    .from('sessions')
    .delete()
    .eq('user_id', user.id);

  // Spin History löschen
  await supabase
    .from('spin_history')
    .delete()
    .eq('user_id', user.id);

  return true;
}
