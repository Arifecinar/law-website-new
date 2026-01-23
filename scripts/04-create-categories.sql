-- =====================================================
-- KATEGORİ YÖNETİM SİSTEMİ - VERİTABANI MIGRATION
-- =====================================================

-- 1. Categories tablosu oluştur (hiyerarşik yapı)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Articles tablosuna category_id kolonu ekle
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL;

-- 3. Index'ler oluştur (performans için)
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);

-- 4. Varsayılan kategorileri ekle
INSERT INTO categories (name, slug, description, parent_id, display_order, is_active) VALUES
  ('Genel', 'genel', 'Genel hukuki konular', NULL, 1, true),
  ('İş Hukuku', 'is-hukuku', 'İş hukuku ile ilgili makaleler', NULL, 2, true),
  ('Ceza Hukuku', 'ceza-hukuku', 'Ceza hukuku ile ilgili makaleler', NULL, 3, true),
  ('Aile Hukuku', 'aile-hukuku', 'Aile hukuku ile ilgili makaleler', NULL, 4, true),
  ('Gayrimenkul Hukuku', 'gayrimenkul-hukuku', 'Gayrimenkul hukuku ile ilgili makaleler', NULL, 5, true),
  ('Miras Hukuku', 'miras-hukuku', 'Miras hukuku ile ilgili makaleler', NULL, 6, true),
  ('Ticaret Hukuku', 'ticaret-hukuku', 'Ticaret hukuku ile ilgili makaleler', NULL, 7, true),
  ('Şirketler Hukuku', 'sirketler-hukuku', 'Şirketler hukuku ile ilgili makaleler', NULL, 8, true),
  ('Hukuk Haberleri', 'hukuk-haberleri', 'Güncel hukuk haberleri', NULL, 9, true)
ON CONFLICT (slug) DO NOTHING;

-- 5. Eski makalelerin kategorilerini güncelle (category text -> category_id)
-- "Legal News" kategorisini "Hukuk Haberleri" olarak eşle
UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'hukuk-haberleri')
WHERE category = 'Legal News' AND category_id IS NULL;

-- Diğer kategorileri eşle
UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'genel')
WHERE (category = 'Genel' OR category IS NULL) AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'is-hukuku')
WHERE category = 'İş Hukuku' AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'ceza-hukuku')
WHERE category = 'Ceza Hukuku' AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'aile-hukuku')
WHERE category = 'Aile Hukuku' AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'gayrimenkul-hukuku')
WHERE (category = 'Gayrimenkul' OR category = 'Gayrimenkul Hukuku') AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'miras-hukuku')
WHERE (category = 'Miras' OR category = 'Miras Hukuku') AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'ticaret-hukuku')
WHERE category = 'Ticaret Hukuku' AND category_id IS NULL;

UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'sirketler-hukuku')
WHERE category = 'Şirketler Hukuku' AND category_id IS NULL;

-- Kalan makaleleri "Genel" kategorisine ata
UPDATE articles 
SET category_id = (SELECT id FROM categories WHERE slug = 'genel')
WHERE category_id IS NULL;

-- =====================================================
-- TAMAMLANDI!
-- Artık kategoriler ve makaleler eşleştirildi.
-- =====================================================

