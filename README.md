# 🔮 Corporate Khodam Detector

Cek khodam korporat-mu berdasarkan nama dan role pekerjaan. Hasilnya deterministic — input yang sama selalu menghasilkan khodam yang sama.

## Kenapa Stack Ini?

### Next.js 16 (App Router)
Awalnya proyek ini di-bootstrap dengan `create-next-app`. Tapi kenapa tetap pakai Next.js padahal ini 100% client-side?

- **Zero-config TypeScript**: TypeScript langsung jalan tanpa setup tambahan.
- **Build optimization**: Next.js otomatis nge-minify, nge-bundle, dan nge-tree-shake output static.
- **Static export**: Hasil build bisa di-deploy ke mana aja (Vercel, GitHub Pages, Netlify) tanpa server.
- **Font optimization**: `next/font` ngasih Geist font tanpa network request tambahan.
- **App Router**: Sederhana untuk single-page app, tanpa boilerplate Pages Router.
- **Familiar tooling**: Dev server HMR cepat, environment variable, image optimization — semuanya built-in.

### React 19
- Concurrent rendering buat transisi yang mulus antara form dan hasil.
- `useState` lazy initializer buat menghindari `useEffect` untuk state initialization.
- `forwardRef` untuk card DOM reference yang dipakai `html-to-image`.

### Tailwind CSS v4
- Utility-first: nggak perlu nulis CSS custom untuk 90% kasus.
- Dark mode via class strategy — tinggal toggle `dark` class di `<html>`.
- Performa: output production di-purge otomatis, nggak ada unused CSS.

### html-to-image
- Satu-satunya dependency tambahan. Capture DOM card → PNG tanpa server-side rendering.
- `pixelRatio: 2` untuk hasil download yang sharp di layar Retina.

### Kenapa tanpa backend / database?
**Because it doesn't need one.** Semua data khodam (42 entitas) adalah static array di `src/data/khodam-database.ts`. Hasil generate murni deterministic dari seed hash `(nama + role)`. Nggak ada user auth, nggak ada server state, nggak ada API — semuanya terjadi di browser.

## next-env.d.ts Itu Apa?

File `next-env.d.ts` adalah file otomatis yang digenerate Next.js. Isinya:

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

**Fungsinya:**
- Memberi tahu TypeScript compiler bahwa ada tipe-tipe global dari Next.js (seperti `Image` component, `Link`, routing).
- Auto-generated — jangan diedit manual.
- Setiap kali `next dev` atau `next build` dijalankan, file ini di-update otomatis.
- File `routes.d.ts` di `./next/types/` juga auto-generated dari struktur folder `app/`.

Jadi kalau ngehapus `next-env.d.ts`, Next.js akan bikin ulang saat di-build.

## Konsep: Deterministic Generation (Tanpa Database)

Proyek ini **tidak punya database**. Yang ada adalah:

### 1. Static Database (In-memory)
File `src/data/khodam-database.ts` berisi array **42 khodam** dengan 5 rarity. Ini bukan database — ini hardcoded data structure yang di-import langsung ke kode.

### 2. Seed-Based Generator
Logika inti ada di `src/lib/khodam-generator.ts`:

```
nama + role → djb2 hash → seed number
    ↓
seed % totalWeight → rarity (weighted: common 40%, uncommon 30%, rare 20%, epic 8%, legendary 2%)
    ↓
filter database by rarity → pilih khodam: candidates[seed % candidates.length]
    ↓
generate attributes dari seed → 5 stats (nilai 60-100, pseudo-random tapi deterministic)
    ↓
generate signature 8-char hex dari seed
```

**Deterministic**: Input `("Budi", "software-engineer")` selalu menghasilkan khodam yang sama. Signature bisa dipakai sebagai proof.

### 3. Riwayat (localStorage)
History disimpan di `localStorage` — maksimal 10 item. Bukan database server. Data hilang kalau user clear browser data.

### Flow Aplikasi

```
┌─────────────────────────────────────────────────┐
│ User input (name + role)                        │
│     ↓                                           │
│ Form → generateKhodam() → seed → rarity →       │
│ khodam → attributes → signature                 │
│     ↓                                           │
│ Result card → save to localStorage              │
│     ↓                                           │
│ Download PNG / Share / Lihat lagi               │
└─────────────────────────────────────────────────┘
```

## Fitur Interaktif

- **Dark mode** — toggle, persist ke localStorage, ikut system preference
- **Loading animasi** — emoji berganti, teks random mistis
- **Particle effects** — canvas sparkle, warna/amount beda per rarity
- **Share** — Web Share API, fallback clipboard
- **Copy signature** — klik signature hex
- **Search riwayat** — filter by nama / signature / rarity
- **Hapus item riwayat** — hover X button
- **Card reveal animation** — scale + fade + glow shadow
- **Download PNG** — via html-to-image, resolusi 2x

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build & Lint

```bash
npm run build    # typecheck + production build
npm run lint     # ESLint
```

## Struktur Proyek

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Tailwind + custom animations
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Halaman utama
├── components/
│   ├── khodam/             # Domain components
│   ├── layout/             # Header, Footer, Container, ThemeToggle
│   └── ui/                 # UI primitives (Button, Card, Input, Select)
├── data/
│   └── khodam-database.ts  # 42 khodam entities (static, no DB)
├── lib/
│   ├── seed.ts             # Hash function
│   ├── khodam-generator.ts # Generation pipeline
│   ├── storage.ts          # localStorage wrapper
│   └── utils.ts            # Helpers (rarity, attributes, signature)
└── types/
    └── index.ts            # TypeScript types + constants
```
