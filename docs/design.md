# Dashboard Portal Pemanfaatan Data

Rancangan disetujui pengguna pada 9 Oktober 2026.

Implementasi lokal Next.js App Router dan TypeScript. Referensi visual: header biru, sidebar putih, enam kartu menu utama. Identitas instansi menggunakan simbol generik agar tidak mengklaim logo resmi.

Beranda menampilkan ringkasan dummy, menu layanan, aktivitas terbaru, dan pengumuman. Navigasi membuka tampilan modul dengan tabel dummy yang dapat dicari. Pengajuan PKS dan pengaduan memiliki formulir demo. Sandbox menyediakan simulasi permintaan dengan data sintetis. Sidebar responsif dan dapat ditutup. Seluruh interaksi memakai state lokal; tidak ada autentikasi atau koneksi data kependudukan.

Validasi: pemeriksaan TypeScript, build produksi, dan pemeriksaan browser bila tersedia. Implementasi berurutan: setup aplikasi, komponen dashboard, interaksi modul, CSS responsif, validasi dan preview.

## Tambahan login demo

Halaman `/login` memakai logo Kemendagri dan akun demo. Alur terbaru sesuai permintaan pengguna: website langsung membuka beranda publik tanpa login dengan tiga navigasi, Beranda, Monitoring, dan Pengaduan. Layanan kelembagaan di beranda meminta login ketika diklik, termasuk PKS, Lembaga Pengguna, Prosedur, dan Sandbox. Tujuan disimpan di parameter `layanan` yang divalidasi melalui daftar modul; setelah login, layanan tersebut dibuka otomatis. Pengguna yang masuk melihat seluruh navigasi. Keluar dan reload kembali ke mode publik. Tidak ada backend atau autentikasi produksi. Validasi mencakup akses publik, pengalihan layanan terlindungi, login ke layanan yang dipilih, dan keluar.
