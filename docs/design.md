# Dashboard Portal Pemanfaatan Data

Rancangan disetujui pengguna pada 9 Oktober 2026.

Implementasi lokal Next.js App Router dan TypeScript. Referensi visual: header biru, sidebar putih, enam kartu menu utama. Identitas instansi menggunakan simbol generik agar tidak mengklaim logo resmi.

Beranda menampilkan ringkasan dummy, menu layanan, aktivitas terbaru, dan pengumuman. Navigasi membuka tampilan modul dengan tabel dummy yang dapat dicari. Pengajuan PKS dan pengaduan memiliki formulir demo. Sandbox menyediakan simulasi permintaan dengan data sintetis. Sidebar responsif dan dapat ditutup. Seluruh interaksi memakai state lokal; tidak ada autentikasi atau koneksi data kependudukan.

Validasi: pemeriksaan TypeScript, build produksi, dan pemeriksaan browser bila tersedia. Implementasi berurutan: setup aplikasi, komponen dashboard, interaksi modul, CSS responsif, validasi dan preview.

## Tambahan login demo

Sesuai permintaan pengguna, halaman `/login` memakai logo Kemendagri, panel informasi biru, dan form username/kata sandi. Akun contoh terlihat jelas pada halaman. Login memvalidasi kredensial demo lalu membuat sesi browser selama delapan jam. Dashboard memeriksa sesi sebelum menampilkan isi; tombol keluar di profil menghapus sesi. Tidak ada backend atau autentikasi produksi. Pengujian mencakup kredensial salah, kredensial benar, muat ulang dashboard, dan keluar.
