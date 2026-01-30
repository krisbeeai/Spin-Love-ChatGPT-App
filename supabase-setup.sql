-- ============================================
-- SpinLove - Supabase Database Setup
-- ============================================
-- Führe dieses Script im Supabase SQL Editor aus:
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================


-- ============================================
-- 1. USERS TABELLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  country TEXT DEFAULT 'DE',
  consent BOOLEAN DEFAULT false,
  consent_date TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  free_spins_used INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnelle Email-Suche
CREATE INDEX idx_users_email ON users(email);

-- Index für Status-Filter
CREATE INDEX idx_users_status ON users(status);

-- Kommentare für Übersichtlichkeit
COMMENT ON TABLE users IS 'SpinLove registrierte Benutzer';
COMMENT ON COLUMN users.language IS 'Browsersprache: de, en, es, fr, it';
COMMENT ON COLUMN users.country IS 'Land via GeoIP: DE, AT, CH, US, etc.';
COMMENT ON COLUMN users.consent IS 'DSGVO Checkbox akzeptiert';
COMMENT ON COLUMN users.status IS 'active = Zugang, revoked = gesperrt';


-- ============================================
-- 2. SESSIONS TABELLE (Magic Links)
-- ============================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für Token-Lookup
CREATE INDEX idx_sessions_token ON sessions(token);

-- Index für User-Sessions
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

COMMENT ON TABLE sessions IS 'Magic Link Sessions für Login';
COMMENT ON COLUMN sessions.token IS 'Einmaliger Token im Magic Link';
COMMENT ON COLUMN sessions.used_at IS 'NULL = nicht verwendet, Timestamp = verwendet';


-- ============================================
-- 3. SPIN_HISTORY TABELLE
-- ============================================
CREATE TABLE spin_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  results JSONB NOT NULL,
  language TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für User-History
CREATE INDEX idx_spin_history_user_id ON spin_history(user_id);

-- Index für Datum (neueste zuerst)
CREATE INDEX idx_spin_history_created_at ON spin_history(created_at DESC);

COMMENT ON TABLE spin_history IS 'Gespeicherte Spin-Ergebnisse pro User';
COMMENT ON COLUMN spin_history.results IS 'JSON mit allen 4 Kategorien + Ergebnissen';

-- Beispiel für results JSONB:
-- {
--   "food": {"title": "Candle-Light Dinner", "emotion": "romantic"},
--   "movie": {"title": "Rom-Com Marathon", "emotion": "playful"},
--   "together": {"title": "Couple Massage", "emotion": "relaxing"},
--   "intimacy": {"title": "Love Letter Exchange", "emotion": "tender"},
--   "worldCuisine": {"title": "Italian", "description": "..."}  -- optional
-- }


-- ============================================
-- 4. FREE SPINS TRACKING (für nicht-registrierte User)
-- ============================================
CREATE TABLE free_spin_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  spins_used INT DEFAULT 0,
  last_spin_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für Session-Lookup
CREATE INDEX idx_free_spin_session ON free_spin_tracking(session_id);

COMMENT ON TABLE free_spin_tracking IS 'Tracking für kostenlose Spins vor Registrierung';


-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- RLS aktivieren
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE spin_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_spin_tracking ENABLE ROW LEVEL SECURITY;

-- Service Role hat vollen Zugriff (für Backend)
CREATE POLICY "Service role full access users" ON users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access sessions" ON sessions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access spin_history" ON spin_history
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access free_spin_tracking" ON free_spin_tracking
  FOR ALL USING (auth.role() = 'service_role');


-- ============================================
-- 6. FUNKTIONEN
-- ============================================

-- Funktion: User sperren bei Widerruf
CREATE OR REPLACE FUNCTION revoke_user_access(user_email TEXT)
RETURNS void AS $$
BEGIN
  -- User-Status auf 'revoked' setzen
  UPDATE users SET status = 'revoked', updated_at = NOW()
  WHERE email = user_email;
  
  -- Alle Sessions löschen
  DELETE FROM sessions 
  WHERE user_id = (SELECT id FROM users WHERE email = user_email);
  
  -- Optional: Spin-History löschen (DSGVO)
  DELETE FROM spin_history 
  WHERE user_id = (SELECT id FROM users WHERE email = user_email);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION revoke_user_access IS 'Sperrt User und löscht alle Daten (DSGVO-Widerruf)';


-- Funktion: Magic Link Token generieren
CREATE OR REPLACE FUNCTION generate_magic_link(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  v_user_id UUID;
  v_token TEXT;
BEGIN
  -- User finden
  SELECT id INTO v_user_id FROM users WHERE email = user_email AND status = 'active';
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User nicht gefunden oder gesperrt';
  END IF;
  
  -- Alten Token löschen
  DELETE FROM sessions WHERE user_id = v_user_id AND used_at IS NULL;
  
  -- Neuen Token generieren
  v_token := encode(gen_random_bytes(32), 'hex');
  
  -- Session erstellen (24h gültig)
  INSERT INTO sessions (user_id, token, expires_at)
  VALUES (v_user_id, v_token, NOW() + INTERVAL '24 hours');
  
  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION generate_magic_link IS 'Erstellt einen neuen Magic Link Token für einen User';


-- Funktion: Magic Link verifizieren
CREATE OR REPLACE FUNCTION verify_magic_link(p_token TEXT)
RETURNS TABLE(user_id UUID, email TEXT, first_name TEXT, language TEXT) AS $$
DECLARE
  v_session sessions%ROWTYPE;
  v_user users%ROWTYPE;
BEGIN
  -- Session finden
  SELECT * INTO v_session FROM sessions 
  WHERE token = p_token 
    AND used_at IS NULL 
    AND expires_at > NOW();
  
  IF v_session.id IS NULL THEN
    RAISE EXCEPTION 'Token ungültig oder abgelaufen';
  END IF;
  
  -- User finden
  SELECT * INTO v_user FROM users 
  WHERE id = v_session.user_id 
    AND status = 'active';
  
  IF v_user.id IS NULL THEN
    RAISE EXCEPTION 'User nicht gefunden oder gesperrt';
  END IF;
  
  -- Token als verwendet markieren
  UPDATE sessions SET used_at = NOW() WHERE id = v_session.id;
  
  -- User-Daten zurückgeben
  RETURN QUERY SELECT v_user.id, v_user.email, v_user.first_name, v_user.language;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION verify_magic_link IS 'Verifiziert Magic Link und gibt User-Daten zurück';


-- ============================================
-- 7. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();


-- ============================================
-- 8. VIEWS FÜR EINFACHE ABFRAGEN
-- ============================================

-- Aktive User mit Spin-Anzahl
CREATE OR REPLACE VIEW active_users_overview AS
SELECT 
  u.id,
  u.first_name,
  u.email,
  u.language,
  u.country,
  u.status,
  u.consent_date,
  u.created_at,
  COUNT(sh.id) as total_spins,
  MAX(sh.created_at) as last_spin
FROM users u
LEFT JOIN spin_history sh ON u.id = sh.user_id
WHERE u.status = 'active'
GROUP BY u.id
ORDER BY u.created_at DESC;

COMMENT ON VIEW active_users_overview IS 'Übersicht aller aktiven User für Export';


-- ============================================
-- FERTIG! ✅
-- ============================================
-- Nach dem Ausführen hast du:
-- • users Tabelle (mit Vorname, Email, Sprache, Land, etc.)
-- • sessions Tabelle (für Magic Links)
-- • spin_history Tabelle (Ergebnisse speichern)
-- • free_spin_tracking Tabelle (Free Spins vor Registrierung)
-- • Funktionen für Magic Link und Widerruf
-- • Row Level Security aktiviert
-- ============================================
