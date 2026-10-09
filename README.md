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

Akun pengguna lembaga: username `user`, kata sandi `User123!`. Akun ini hanya memiliki lima menu: Beranda, Pengajuan PKS, Sandbox, Monitoring, dan Pengaduan. Beranda publik dan user sama-sama hanya menampilkan dua kartu layanan: PKS dan Sandbox. Ringkasan publik/user hanya memuat PKS dan pengajuan, serta tidak menampilkan Hak Akses atau pengelolaan lembaga. Hak Akses, Regulasi, Prosedur, dan pengelolaan lembaga hanya tersedia bagi admin. Parameter URL dan navigasi juga memeriksa peran, bukan sekadar menyembunyikan menu. Kedua akun dapat dipilih untuk mengisi form login demo. Tidak ada pendaftaran akun atau database pengguna nyata.

Website langsung membuka beranda publik tanpa login. Navigasi publik hanya menampilkan Beranda, Monitoring, dan Pengaduan. Kartu layanan tetap tersedia pada beranda. PKS, Lembaga Pengguna, Prosedur, Sandbox, Hak Akses, Informasi, dan Regulasi meminta login; setelah login berhasil, layanan yang diizinkan untuk peran akun otomatis terbuka. Admin melihat navigasi lengkap; user melihat lima menu. Login dapat dibatalkan melalui tautan kembali ke beranda publik. Keluar kembali ke beranda publik.

Batas sesi disimpan di `sessionStorage` dan kedaluwarsa setelah delapan jam; izin masuk juga diperiksa di memori halaman sehingga reload kembali ke mode publik. Kata sandi tidak disimpan dalam penyimpanan browser. Pemeriksaan sesi ini hanya mengatur alur UI dan dapat dilewati pengguna; bukan kontrol keamanan. Sebelum menangani data nyata, ganti dengan autentikasi server dan otorisasi setiap layanan. Tombol bantuan masuk menjelaskan penggunaan akun demo; pemulihan kata sandi belum tersedia.
