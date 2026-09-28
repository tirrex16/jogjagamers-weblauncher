# Jogjagamers Services

Landing page responsif dan modern untuk ekosistem komunitas **Jogjagamers (JGRP & JGVRP)**. Proyek ini dibangun dengan fokus pada performa yang ringan, antarmuka yang elegan (terinspirasi dari *modern web design*), dan pengalaman responsif (*mobile-friendly*) menggunakan HTML, CSS, dan Vanilla JavaScript.

## 🚀 Fitur Utama

- **Modern & Responsive UI**: Tampilan dirancang bersih dan profesional, sepenuhnya responsif dari layar Desktop hingga Mobile (beradaptasi secara mulus di bawah ukuran 833px & 480px).
- **Mega Menu (Flyout) & Hamburger Mobile**: Sistem navigasi responsif yang memiliki menu *dropdown/flyout* di desktop dan berubah menjadi *accordion* pada menu hamburger di mobile.
- **Theme-Aware Navbar**: Navbar secara otomatis dapat menyesuaikan warna (gelap/terang) bergantung pada area konten yang sedang di-*scroll* (*Intersection Observer*).
- **Draggable & Auto-scrolling News Track**: Area kartu berita yang dapat berjalan secara otomatis tanpa henti (*infinite loop*), dan mendukung interaksi geser/sentuh (*drag & swipe*) baik menggunakan mouse maupun layar sentuh.
- **Supabase Ready**: Struktur sudah disiapkan (`schema.sql`) untuk integrasi penuh dengan **Supabase**, memungkinkan pergantian teks dan gambar secara dinamis melalui *Database* dan *Cloud Storage*.

## 🛠️ Teknologi yang Digunakan

- **HTML5** (Semantik dan SEO-friendly)
- **CSS3 Vanilla** (Variabel Root, Media Queries, Flexbox, Grid)
- **Vanilla JavaScript (ES6)** (Clean code, Modular per *section*)
- **Supabase** (Proses Integrasi Database & Storage CDN)

## 📂 Struktur Folder

```text
/
├── assets/         # Aset gambar, logo, ikon pendukung (JGRP, JGVRP, dsb)
├── js/             # File logika Javascript modular
│   ├── navbar.js   # Logika navigasi utama, flyout, dan theme observer
│   ├── chapternav.js # Logika sub-menu navigasi donasi
│   ├── news.js     # Rendering news cards dan fitur swipe/drag auto-scroll
│   └── modal.js    # Sistem rahasia Pop-up (Bottom sheet)
├── index.html      # Kerangka utama halaman web
├── styles.css      # Seluruh styling dan penyesuaian mobile
└── schema.sql      # Skrip konfigurasi Database & Storage untuk Supabase
```

## ⚙️ Cara Menjalankan (Local Development)

Proyek ini menggunakan *Vanilla* web stack murni, tidak ada *build process* atau bundler kompleks yang diwajibkan.

1. *Clone* repository ini:
   ```bash
   git clone https://github.com/username/jogjagamers-services.git
   ```
2. Buka folder proyek:
   ```bash
   cd jogjagamers-services
   ```
3. Buka file `index.html` secara langsung di browser favorit Anda, atau jalankan melalui **Live Server** (ekstensi VSCode) untuk pengalaman *development* yang lebih baik.

## 🗄️ Persiapan Supabase (Akan Datang)
Bagi administrator, Anda dapat menjalankan skrip yang ada di `schema.sql` pada menu **SQL Editor** di *dashboard* Supabase Anda. Ini akan secara otomatis membuat tabel untuk pengaturan teks halaman utama, daftar berita, pengaturan *Row Level Security (RLS)*, dan *Storage Bucket* untuk gambar.
