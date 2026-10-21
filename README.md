# NgolahDuit

**Your Money. Your Rules.**

NgolahDuit adalah aplikasi personal money management yang membantu pengguna mengatur budget, mencatat pemasukan, dan memantau pengeluaran secara lebih praktis.

Dikembangkan sebagai web application dan tersedia dalam versi desktop untuk pengguna Windows.

## Download for Windows

**[Download NgolahDuit for Windows](https://github.com/Dwi-prakoso/NgolahDuit/releases)**

Platform: Windows 10/11 (64-bit)

Pengguna tidak perlu menginstal Node.js, VS Code, atau menjalankan server secara manual.

## Installation Guide

1. Buka halaman [GitHub Releases](https://github.com/Dwi-prakoso/NgolahDuit/releases).
2. Pilih versi terbaru NgolahDuit.
3. Pada bagian **Assets**, download file `Money Tracker Setup 1.0.0.exe` untuk versi 1.0.0.
4. Buka folder tempat file installer disimpan.
5. Klik dua kali file `.exe` untuk memulai instalasi.
6. Pilih lokasi instalasi sesuai keinginan, lalu ikuti instruksi sampai selesai.
7. Buka aplikasi melalui Desktop atau Windows Start Menu.

Untuk akses lebih cepat, pengguna bisa klik kanan ikon aplikasi di taskbar, lalu pilih **Pin to taskbar**.

**Note:** Karena installer belum memiliki sertifikat code-signing dari penerbit tepercaya, Windows mungkin menampilkan peringatan keamanan. Pastikan file diunduh dari repository resmi ini.

## Features

- Personal budgeting
- Pencatatan pemasukan dan pengeluaran
- Pengelolaan keuangan pribadi
- Antarmuka web dan desktop
- Server lokal yang berjalan otomatis pada versi desktop

## Tech Stack

| Technology | Purpose |
|---|---|
| React & TypeScript | Frontend |
| TanStack Start | Full-stack application |
| Vite | Build tooling |
| Nitro | Local server runtime |
| Electron | Windows desktop application |
| Electron Builder | Windows installer packaging |
| Tailwind CSS | UI styling |

## Development

Untuk menjalankan project dari source code:

```bash
git clone https://github.com/Dwi-prakoso/NgolahDuit.git
cd NgolahDuit
npm install
npm run dev
```

Untuk membangun dan menjalankan versi desktop secara lokal:

```bash
npm run build:desktop
npm run desktop
```

Untuk membuat installer Windows:

```bash
npm run dist:win
```

## Release

**Version:** 1.0.0

**Platform:** Windows x64

**Distribution:** GitHub Releases

---

NgolahDuit — Your Money. Your Rules.