-- ==========================================
-- SUPABASE SCHEMA UNTUK JOGJAGAMERS SERVICES
-- ==========================================

-- 1. TABEL KONTEN HALAMAN (Untuk Hero & Advertisement)
-- Tabel ini hanya akan memiliki 1 baris data (id = 1) karena hanya ada satu halaman utama.
CREATE TABLE page_content (
  id integer PRIMARY KEY DEFAULT 1,
  
  -- Hero Section
  hero_title text NOT NULL,
  hero_subtitle text NOT NULL,

  -- Advertisement Section
  ad_image_url text NOT NULL,
  ad_text text NOT NULL,
  ad_button_text text NOT NULL,
  ad_button_link text NOT NULL,

  -- News Hero Section (Berita Utama)
  news_hero_title text NOT NULL,
  news_hero_bg_image text,
  
  -- Memastikan hanya ada 1 baris konfigurasi
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert data awal (Default) agar sesuai dengan desain saat ini
INSERT INTO page_content (
  id,
  hero_title,
  hero_subtitle,
  ad_image_url,
  ad_text,
  ad_button_text,
  ad_button_link,
  news_hero_title,
  news_hero_bg_image
) VALUES (
  1,
  'A Community for<br>your life.',
  'Cloud Gaming performa tinggi. Turnamen layak tonton. Musik favoritmu dalam Audio Spasial. Koleksi game cloud paling epik. Original series eksklusif dari komunitas. Semua hiburan gaming terbaik ada di sini — hanya di JOGJAGAMERS.',
  'assets/images/spacevailable.png',
  'Become our Streamer NOW!<br> Benefits for Streamer JGRP and JGVRP.',
  'Selengkapnya',
  '#',
  'Update Patch JGVRP. Changelog 2.10.5',
  'assets/images/hm1lujd919iyoel5icfj.jpg'
);


-- 2. TABEL NEWS CARDS (Untuk list kartu berita yang berjalan)
CREATE TABLE news_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  tag text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert data awal untuk kartu berita
INSERT INTO news_cards (title, tag) VALUES
  ('Update Patch 2.10.5 Dirilis', 'JGVRP · Update'),
  ('Event Akhir Pekan: Balap Liar', 'JGRP · Event'),
  ('Maintenance Server Terjadwal', 'Pengumuman'),
  ('Rekrutmen Staff Dibuka', 'Komunitas'),
  ('Perubahan Sistem Ekonomi', 'JGVRP · Update'),
  ('Turnamen Balap Mingguan', 'JGRP · Event'),
  ('Kolaborasi Komunitas Baru', 'Komunitas'),
  ('Giveaway Server Spesial', 'Pengumuman');


-- ==========================================
-- PENGATURAN KEAMANAN (Row Level Security / RLS)
-- ==========================================
-- Kita mengaktifkan RLS agar hanya admin (via Supabase Dashboard) yang bisa Edit/Delete/Insert
-- Sedangkan publik (pengunjung website anonim) hanya bisa MEMBACA (SELECT).

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on page_content" 
  ON page_content FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public read access on news_cards" 
  ON news_cards FOR SELECT TO anon USING (true);
-- SUPABASE STORAGE (Tempat Penyimpanan Gambar Fisik)
-- ==========================================
-- Membuat bucket publik bernama "images" tempat Anda akan mengunggah gambar.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Mengizinkan siapa saja (publik) untuk melihat/mendownload gambar dari bucket "images"
CREATE POLICY "Gambar bisa dilihat oleh publik" 
  ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Mengizinkan hanya admin (authenticated) yang bisa upload/edit gambar
CREATE POLICY "Hanya admin yang bisa mengubah gambar" 
  ON storage.objects FOR ALL USING (auth.role() = 'authenticated');
