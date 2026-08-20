-- KMON VIP /crm — schema inicial. Rodar uma vez contra o banco provisionado.

CREATE TABLE IF NOT EXISTS tracking_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('whatsapp_click', 'form_submission', 'phone_click')),
  page_url TEXT,
  page_title TEXT,
  button_id TEXT,
  button_text TEXT,
  button_location TEXT,
  service TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  gclid TEXT,
  fbclid TEXT,
  referrer TEXT,
  device_type TEXT,
  ip_hash TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_created_at ON tracking_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_type_created ON tracking_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_ip_hash_created ON tracking_events (ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  phone_normalized TEXT,
  email TEXT,
  service_interest TEXT,
  service_city TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  conversion_page TEXT,
  gclid TEXT,
  fbclid TEXT,
  utm_term TEXT,
  utm_content TEXT,
  status TEXT NOT NULL DEFAULT 'novo'
    CHECK (status IN ('novo', 'em_atendimento', 'qualificado', 'proposta_enviada', 'fechado', 'perdido')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_phone_normalized ON leads (phone_normalized);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

CREATE TABLE IF NOT EXISTS crm_users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Key-value store for site behavior toggled live from /crm/funcoes.
-- Reading a missing key falls back to the current hardcoded default in
-- code, so adding a new setting never requires a migration to "activate" it.
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown; rendered to sanitized HTML at request time
  cover_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'KMON VIP',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ, -- set once, first time a post is published; not touched by later edits
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published ON blog_posts (status, published_at DESC);
