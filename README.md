# Portal Pemanfaatan Data Kependudukan

Dashboard dummy berbasis Next.js App Router, React, TypeScript, dan Lucide Icons. Mengikuti referensi visual dashboard kelembagaan dengan header biru, sidebar, dan enam layanan utama.

## Menjalankan

```sh
npm install
npm run dev
```

Buka http://localhost:3000.

## Validasi dan produksi

```sh
npm run typecheck
npm run build
npm start
```

## Fitur demo

- Sidebar responsif, enam kartu layanan, ringkasan, aktivitas, dan pengumuman.
- Halaman `/login` dengan validasi akun demo, tampil/sembunyikan kata sandi, pengisian akun demo, serta keluar melalui menu profil.
- Halaman informasi, regulasi, lembaga, PKS, hak akses, monitoring, dan pengaduan dengan pencarian serta detail dokumen.
- Form pengajuan PKS dan pengaduan menambah data dalam sesi halaman.
- Sandbox dengan identitas sintetis `DEMO-0001` dan simulasi respons JSON.
- Unduhan dokumen teks demo serta pusat bantuan dan notifikasi.

Seluruh data bersifat sintetis. Ringkasan dashboard adalah contoh statis. Tidak ada backend, autentikasi produksi, pengiriman pengaduan nyata, atau akses data kependudukan. Data formulir hilang saat halaman dimuat ulang. Logo Kementerian Dalam Negeri menggunakan gambar yang diberikan pengguna. Font Google bersifat opsional dengan fallback sans-serif.

## Login demo

Username: `admin`. Kata sandi: `Admin123!`.

Dashboard mengarahkan pengunjung tanpa sesi demo ke `/login`. Sesi disimpan di `sessionStorage`, kedaluwarsa setelah delapan jam, dan dihapus saat keluar atau tab ditutup. Kata sandi tidak disimpan dalam penyimpanan browser. Pemeriksaan sesi ini hanya mengatur alur UI dan dapat dilewati pengguna; bukan kontrol keamanan. Sebelum menangani data nyata, ganti dengan autentikasi server dan otorisasi setiap layanan. Tombol bantuan masuk menjelaskan penggunaan akun demo; pemulihan kata sandi belum tersedia.
