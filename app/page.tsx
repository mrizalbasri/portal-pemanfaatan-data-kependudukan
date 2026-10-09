"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Emblem from "./components/emblem";
import { useRouter } from "next/navigation";
import { endDemoSession, hasDemoSession, getDemoAccount, type DemoAccount } from "./lib/demo-session";
import { canAccessModule, isPublicModule, requestedModule, type ModuleId } from "./lib/portal-access";
import { ArrowDownToLine, ArrowRight, Bell, BookOpen, Building2, ChartNoAxesCombined, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Clock3, Code2, ExternalLink, FileCheck2, FileText, Headphones, House, KeyRound, Landmark, Menu, MessageSquare, Plus, Search, Send, ShieldCheck, Users, X, type LucideIcon } from "lucide-react";

type Row = { name: string; detail: string; date: string; status: string; description?: string };
const modules: { id: ModuleId; name: string; nav?: string; description: string; icon: LucideIcon; count: string; color: string }[] = [
  { id: "informasi", name: "Informasi Pemanfaatan Data", description: "Temukan informasi dan panduan pemanfaatan data kependudukan.", icon: FileText, count: "12 informasi tersedia", color: "blue" },
  { id: "lembaga", name: "Pengelolaan Lembaga Pengguna", nav: "Lembaga Pengguna", description: "Kelola profil dan administrasi lembaga pengguna Anda.", icon: Landmark, count: "128 lembaga terdaftar", color: "teal" },
  { id: "pks", name: "Perjanjian Kerja Sama (PKS)", nav: "Pengajuan PKS", description: "Ajukan dan pantau perjanjian kerja sama secara terintegrasi.", icon: FileCheck2, count: "24 PKS aktif", color: "indigo" },
  { id: "akses", name: "Hak Akses", description: "Kelola hak akses layanan data kependudukan lembaga.", icon: KeyRound, count: "86 akses aktif", color: "amber" },
  { id: "sandbox", name: "Sandbox Integrasi", nav: "Sandbox", description: "Uji koneksi dan integrasi layanan di lingkungan pengujian.", icon: Code2, count: "Lingkungan uji tersedia", color: "cyan" },
  { id: "monitoring", name: "Monitoring dan Evaluasi", nav: "Monitoring", description: "Pantau aktivitas pemanfaatan data dan evaluasi layanan.", icon: ChartNoAxesCombined, count: "Lihat laporan pemanfaatan", color: "violet" },
];
const nav: { id: ModuleId; name: string; icon: LucideIcon }[] = [
  { id: "beranda", name: "Beranda", icon: House },
  { id: "regulasi", name: "Regulasi", icon: BookOpen },
  { id: "prosedur", name: "Prosedur", icon: ClipboardList },
  ...modules.filter(m => m.id !== "informasi").map(m => ({ id: m.id, name: m.nav || m.name, icon: m.icon })),
  { id: "pengaduan", name: "Pengaduan", icon: MessageSquare },
];
const records: Partial<Record<ModuleId, Row[]>> = {
  informasi: [
    { name: "Panduan pemanfaatan data kependudukan", detail: "Panduan layanan · PDF", date: "08 Okt 2026", status: "Terbit" },
    { name: "Persyaratan pengajuan kerja sama", detail: "Administrasi kelembagaan · PDF", date: "05 Okt 2026", status: "Terbit" },
    { name: "Standar keamanan integrasi layanan", detail: "Panduan teknis · PDF", date: "01 Okt 2026", status: "Terbit" },
  ],
  regulasi: [
    { name: "Kebijakan pemanfaatan data kependudukan", detail: "Dokumen contoh · REG/2026/001", date: "01 Okt 2026", status: "Berlaku" },
    { name: "Pedoman perlindungan data pribadi", detail: "Dokumen contoh · REG/2026/002", date: "15 Sep 2026", status: "Berlaku" },
    { name: "Standar operasional akses data", detail: "Dokumen contoh · REG/2026/003", date: "10 Sep 2026", status: "Berlaku" },
  ],
  lembaga: [
    { name: "Dinas Kesehatan", detail: "Pemerintah Daerah · LBG-001", date: "08 Okt 2026", status: "Aktif" },
    { name: "Dinas Sosial", detail: "Pemerintah Daerah · LBG-002", date: "07 Okt 2026", status: "Aktif" },
    { name: "Dinas Pendidikan", detail: "Pemerintah Daerah · LBG-003", date: "06 Okt 2026", status: "Verifikasi" },
    { name: "RSUD Sejahtera", detail: "Layanan Kesehatan · LBG-004", date: "05 Okt 2026", status: "Aktif" },
  ],
  pks: [
    { name: "Pemanfaatan data untuk layanan kesehatan", detail: "Dinas Kesehatan · PKS-2026-024", date: "08 Okt 2026", status: "Aktif" },
    { name: "Verifikasi penerima bantuan sosial", detail: "Dinas Sosial · PKS-2026-025", date: "07 Okt 2026", status: "Diproses" },
    { name: "Validasi data peserta didik", detail: "Dinas Pendidikan · PKS-2026-026", date: "06 Okt 2026", status: "Verifikasi" },
  ],
  akses: [
    { name: "Verifikasi identitas penduduk", detail: "Dinas Kesehatan · Web Service", date: "08 Okt 2026", status: "Aktif" },
    { name: "Validasi data penerima bantuan", detail: "Dinas Sosial · Web Service", date: "07 Okt 2026", status: "Aktif" },
    { name: "Pencocokan data peserta didik", detail: "Dinas Pendidikan · Portal", date: "06 Okt 2026", status: "Diproses" },
  ],
  monitoring: [
    { name: "Laporan pemanfaatan September 2026", detail: "1.248 permintaan · 99,8% berhasil", date: "01 Okt 2026", status: "Selesai" },
    { name: "Laporan pemanfaatan Agustus 2026", detail: "1.106 permintaan · 99,6% berhasil", date: "01 Sep 2026", status: "Selesai" },
    { name: "Laporan pemanfaatan Juli 2026", detail: "982 permintaan · 99,7% berhasil", date: "01 Agu 2026", status: "Selesai" },
  ],
  pengaduan: [
    { name: "Permohonan bantuan konfigurasi integrasi", detail: "TKT-001 · Bantuan teknis", date: "08 Okt 2026", status: "Diproses" },
    { name: "Pertanyaan persyaratan dokumen PKS", detail: "TKT-002 · Administrasi", date: "06 Okt 2026", status: "Selesai" },
  ],
};
const activity = [
  { icon: FileCheck2, title: "Pengajuan PKS berhasil diverifikasi", detail: "Dinas Kesehatan", time: "10 menit lalu", status: "Disetujui", color: "teal" },
  { icon: KeyRound, title: "Permohonan hak akses baru", detail: "Dinas Sosial", time: "45 menit lalu", status: "Diproses", color: "blue" },
  { icon: Building2, title: "Pendaftaran lembaga pengguna", detail: "Dinas Pendidikan", time: "2 jam lalu", status: "Verifikasi", color: "indigo" },
];
function Badge({ children }: { children: string }) { return <span className={`badge ${["Diproses", "Verifikasi"].includes(children) ? "pending" : "success"}`}>{children}</span>; }
export default function Dashboard() {
  const router = useRouter();
  const [account, setAccount] = useState<DemoAccount | null>(null);
  const signedIn = Boolean(account);
  const isUser = account?.role === "user";
  const [active, setActive] = useState<ModuleId>("beranda");
  const [sidebar, setSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [popover, setPopover] = useState<"notifications" | "profile" | null>(null);
  const [dialog, setDialog] = useState<"pks" | "pengaduan" | "help" | null>(null);
  const [selected, setSelected] = useState<Row | null>(null);
  const [localRows, setLocalRows] = useState(records);
  const [toast, setToast] = useState("");
  const [sandboxResult, setSandboxResult] = useState(false);
  const [sandboxId, setSandboxId] = useState("DEMO-0001");
  const [sandboxError, setSandboxError] = useState("");
  useEffect(() => {
    const authenticated = hasDemoSession();
    const currentAccount = getDemoAccount();
    setAccount(currentAccount);
    const destination = requestedModule(window.location.search);
    if (canAccessModule(destination, currentAccount?.role)) setActive(destination);
    else if (!authenticated) router.replace(`/login?layanan=${destination}`);
    else { setActive("beranda"); setToast("Layanan ini hanya tersedia untuk administrator."); router.replace("/"); }
  }, [router]);
  useEffect(() => {
    function checkSession() {
      const authenticated = hasDemoSession();
      const currentAccount = getDemoAccount();
      setAccount(currentAccount);
      if (!canAccessModule(active, currentAccount?.role)) {
        setActive("beranda"); setDialog(null); setSelected(null); setPopover(null);
        router.replace("/");
      }
    }
    window.addEventListener("focus", checkSession);
    const timer = window.setInterval(checkSession, 30_000);
    return () => { window.removeEventListener("focus", checkSession); window.clearInterval(timer); };
  }, [active, router]);
  const modalRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!dialog && !selected) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setDialog(null); setSelected(null); }
      if (event.key !== "Tab") return;
      const elements = modalRef.current?.querySelectorAll<HTMLElement>('button, input, textarea, a[href], [tabindex="0"]');
      if (!elements?.length) return;
      const first = elements[0]; const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [dialog, selected]);
  const title = active === "beranda" ? "Beranda" : modules.find(m => m.id === active)?.name || nav.find(m => m.id === active)?.name || "";
  const currentRows = (localRows[active] || []).filter(r => `${r.name} ${r.detail} ${r.status}`.toLowerCase().includes(search.toLowerCase()));
  const visibleModules = modules.filter(m => (!isUser || canAccessModule(m.id, "user")) && `${m.name} ${m.description}`.toLowerCase().includes(search.toLowerCase()));
  function navigate(id: ModuleId) {
    if (!isPublicModule(id) && !hasDemoSession()) {
      setSidebar(false); setPopover(null); setDialog(null);
      router.push(`/login?layanan=${id}`);
      return;
    }
    if (!canAccessModule(id, getDemoAccount()?.role)) {
      setSidebar(false); setPopover(null); setDialog(null);
      notify("Layanan ini hanya tersedia untuk administrator.");
      return;
    }
    setActive(id); setSearch(""); setSidebar(false); setPopover(null);
  }
  function notify(message: string) { setToast(message); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = dialog === "pks" ? "pks" : "pengaduan";
    const row: Row = { name: String(data.get("title")).trim(), detail: `${String(data.get("institution")).trim()} · Pengajuan demo`, description: String(data.get("description")).trim(), date: new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date()), status: "Diproses" };
    setLocalRows(prev => ({ ...prev, [id]: [row, ...(prev[id] || [])] }));
    setDialog(null); navigate(id); notify("Pengajuan demo berhasil ditambahkan untuk sesi ini.");
  }
  function download(row: Row) {
    const blob = new Blob([`DOKUMEN DEMO — PORTAL PEMANFAATAN DATA\n\n${row.name}\n${row.detail}\nTanggal: ${row.date}\nStatus: ${row.status}\n\nDokumen ini merupakan contoh untuk demonstrasi antarmuka, bukan dokumen resmi.`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "dokumen-demo.txt"; link.click(); URL.revokeObjectURL(url);
  }

  return <div className="app-shell">
    {sidebar && <button className="sidebar-overlay" aria-label="Tutup navigasi" onClick={() => setSidebar(false)} />}
    <aside className={`sidebar ${sidebar ? "is-open" : ""}`}>
      <a href="#" className="brand" onClick={e => { e.preventDefault(); navigate("beranda"); }}><Emblem /><span><strong>DUKCAPIL</strong><small>LAYANAN KELEMBAGAAN</small></span></a>
      <div className="sidebar-label">MENU UTAMA</div>
      <nav aria-label="Navigasi utama">{nav.filter(item => canAccessModule(item.id, account?.role)).map(item => <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => navigate(item.id)} aria-current={active === item.id ? "page" : undefined}><item.icon size={19} strokeWidth={1.8} /><span>{item.name}</span>{active === item.id && <ChevronRight size={16} />}{item.id === "pks" && active !== item.id && <span className="nav-count">3</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><span className="help-icon"><Headphones size={22} /></span><strong>Butuh bantuan?</strong><p>Tim kami siap membantu Anda.</p><button onClick={() => setDialog("help")}>Hubungi Helpdesk <ArrowRight size={14} /></button></div><div className="sidebar-foot"><ShieldCheck size={14} /><span>Data terlindungi & terintegrasi</span></div></div>
    </aside>

    <div className="main-shell">
      <header className="topbar"><div className="header-left"><button className="icon-button mobile-menu" aria-label="Buka navigasi" onClick={() => setSidebar(true)}><Menu size={22} /></button><div><strong>Portal Pemanfaatan Data Kependudukan</strong><p>Sistem Manajemen Kelembagaan</p></div></div><div className="header-actions"><span className="environment"><span /> Mode Demo</span><div className="popover-anchor"><button className="icon-button notification-button" aria-label="Buka notifikasi" aria-expanded={popover === "notifications"} onClick={() => setPopover(popover === "notifications" ? null : "notifications")}><Bell size={21} /><i /></button>{popover === "notifications" && <div className="popover"><strong>Notifikasi demo</strong><p>PKS Dinas Kesehatan telah diverifikasi.</p><p>3 pengajuan menunggu pemeriksaan.</p><button onClick={() => navigate("pks")}>Lihat pengajuan <ArrowRight size={14} /></button></div>}</div><div className="header-divider" />{signedIn ? <div className="popover-anchor"><button className="profile" aria-expanded={popover === "profile"} onClick={() => setPopover(popover === "profile" ? null : "profile")}><span className="avatar">{isUser ? "UL" : "AD"}</span><span className="profile-info"><strong>{account?.name}</strong><small>{isUser ? "Pengguna Lembaga" : "Administrator"}</small></span><ChevronDown size={15} /></button>{popover === "profile" && <div className="popover"><strong>{account?.name}</strong><p>Akun contoh · {isUser ? "Pengguna Lembaga" : "Administrator"}</p><p>Anda sedang menggunakan versi demo dengan data sintetis.</p><button onClick={() => { endDemoSession(); window.location.replace("/"); }}>Keluar dari akun <ArrowRight size={15} /></button><button onClick={() => { setPopover(null); setDialog("help"); }}>Pusat bantuan <CircleHelp size={15} /></button></div>}</div> : <button className="public-login-button" onClick={() => router.push("/login")}>Masuk Lembaga <ArrowRight size={15} /></button>}</div></header>

      <main>
        <div className="breadcrumb"><House size={14} /><ChevronRight size={12} /><span>{title}</span></div>
        <section className="page-heading"><div><div className="eyebrow">PORTAL LAYANAN KELEMBAGAAN</div><h1>{active === "beranda" ? (signedIn ? (isUser ? "Selamat datang, User Lembaga" : "Selamat datang, Admin") : "Selamat datang di Portal") : title}{active === "beranda" && <span className="greeting-dot">.</span>}</h1><p>{active === "beranda" ? "Kelola pemanfaatan data kependudukan dalam satu portal terintegrasi." : "Kelola dan pantau layanan kelembagaan Anda dengan mudah."}</p></div><div className="date-label"><Clock3 size={16} /><span>Jumat, 9 Oktober 2026</span></div></section>

        {active === "beranda" && <>
          <section className="welcome-banner"><div className="banner-copy"><span className="banner-label"><span /> TERHUBUNG UNTUK PELAYANAN YANG LEBIH BAIK</span><h2>Data yang terintegrasi.<br />Pelayanan yang lebih berarti.</h2><p>Akses layanan, kelola kerja sama, dan optimalkan pemanfaatan<br className="desktop-break" /> data kependudukan untuk pelayanan publik yang lebih baik.</p><button onClick={() => navigate(isUser ? "pks" : "prosedur")}>{isUser ? "Ajukan PKS" : "Prosedur layanan"} <ArrowRight size={16} /></button></div><div className="banner-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="art-line line-one" /><div className="art-line line-two" /><div className="art-central"><Landmark size={57} strokeWidth={1.25} /></div><div className="art-node node-one"><Users size={25} /></div><div className="art-node node-two"><ShieldCheck size={26} /></div><div className="art-node node-three"><FileCheck2 size={24} /></div><div className="art-node node-four"><Building2 size={23} /></div><span className="art-spark spark-one" /><span className="art-spark spark-two" /><span className="art-spark spark-three" /></div></section>
          <section className={`stats ${isUser ? "user-stats" : ""}`} aria-label="Ringkasan data contoh">{[
            { icon: Building2, value: "128", label: "Lembaga Pengguna", note: "+8 bulan ini", color: "blue" },
            { icon: FileCheck2, value: "24", label: "PKS Aktif", note: "+3 bulan ini", color: "teal" },
            { icon: KeyRound, value: "86", label: "Hak Akses Aktif", note: "Terintegrasi", color: "indigo" },
            { icon: Clock3, value: "7", label: "Pengajuan Diproses", note: "Menunggu tindak lanjut", color: "amber" },
          ].filter(stat => !isUser || stat.label !== "Hak Akses Aktif").map(stat => <div className="stat" key={stat.label}><span className={`stat-icon ${stat.color}`}><stat.icon size={22} /></span><div><div className="stat-value">{stat.value}<span className={stat.color === "amber" ? "stat-note neutral" : "stat-note"}>{stat.note}</span></div><p>{stat.label}</p></div></div>)}</section>
          <section className="services"><div className="section-heading"><div><h2>Layanan utama</h2><p>Akses cepat layanan pemanfaatan data kependudukan</p></div><span className="section-meta">{signedIn ? `${visibleModules.length} layanan tersedia` : "Layanan lembaga memerlukan login"}</span></div><div className="service-grid">{visibleModules.map((item, index) => <button className="service-card" key={item.id} style={{ animationDelay: `${index * 45}ms` }} onClick={() => navigate(item.id)}><div className="card-top"><span className={`service-icon ${item.color}`}><item.icon size={29} strokeWidth={1.7} /></span><span className="service-arrow"><ArrowRight size={19} /></span></div><h3>{item.name}</h3><p>{item.description}</p><div className="card-footer"><span className={`small-dot ${item.color}`} />{!signedIn && !isPublicModule(item.id) ? "Masuk untuk mengakses layanan" : item.count}<ChevronRight size={14} /></div></button>)}</div></section>
          <div className="bottom-grid"><section className="panel activity-panel"><div className="panel-heading"><h2>Aktivitas terbaru</h2><button className="text-button" onClick={() => navigate("monitoring")}>Lihat semua <ArrowRight size={14} /></button></div>{activity.filter(item => !isUser || item.color === "teal").map(item => <div className="activity-row" key={item.title}><span className={`activity-icon ${item.color}`}><item.icon size={19} /></span><div className="activity-text"><strong>{item.title}</strong><p>{item.detail}<span>·</span>{item.time}</p></div><Badge>{item.status}</Badge></div>)}</section><section className="panel announcement"><div className="panel-heading"><h2>Pengumuman</h2><span className="announcement-bell"><Bell size={17} /></span></div><span className="announcement-date">08 OKTOBER 2026</span><h3>Peningkatan layanan integrasi data</h3><p>Simulasi pemeliharaan layanan dijadwalkan pada 12 Oktober 2026, pukul 22.00–23.00 WIB.</p><button className="text-button" onClick={() => setSelected({ name: "Peningkatan layanan integrasi data", detail: "Pengumuman demo: pemeliharaan simulasi pada 12 Oktober 2026 pukul 22.00–23.00 WIB. Silakan menyesuaikan jadwal pengujian integrasi. Tidak ada layanan nyata yang terdampak.", date: "08 Okt 2026", status: "Terbit" })}>Baca selengkapnya <ArrowRight size={14} /></button></section></div>
        </>}

        {active === "prosedur" && <section className="panel procedure-panel"><div className="section-heading"><div><h2>Alur pemanfaatan data</h2><p>Lima langkah untuk memulai kerja sama kelembagaan.</p></div><span className="badge success">Panduan demo</span></div><div className="procedure-list">{[
          ["Daftarkan lembaga", "Siapkan profil lembaga dan identitas penanggung jawab.", "lembaga"],
          ["Ajukan perjanjian kerja sama", "Lengkapi tujuan pemanfaatan data dan dokumen persyaratan.", "pks"],
          ["Verifikasi dan persetujuan", "Tim akan meninjau kelengkapan administrasi dan ruang lingkup kerja sama.", "pks"],
          ["Aktivasi hak akses", "Hak akses layanan diberikan sesuai perjanjian yang telah disetujui.", "akses"],
          ["Uji integrasi dan monitoring", "Lakukan pengujian di sandbox dan pantau pemanfaatan layanan.", "sandbox"],
        ].map(([name, detail, destination], index) => <button className="procedure-step" key={name} onClick={() => navigate(destination as ModuleId)}><span>{index + 1}</span><div><h3>{name}</h3><p>{detail}</p></div><ArrowRight size={20} /></button>)}</div></section>}

        {active === "sandbox" && <section className="panel sandbox-panel"><div className="section-heading"><div><h2>Uji integrasi layanan</h2><p>Gunakan identitas sintetis untuk mencoba respons layanan.</p></div><span className="badge success">Sandbox tersedia</span></div><div className="demo-callout"><ShieldCheck size={19} /> Lingkungan demo. Jangan masukkan NIK atau data pribadi nyata.</div><form onSubmit={e => { e.preventDefault(); if (!/^DEMO-\d{4}$/.test(sandboxId)) { setSandboxError("Gunakan format identitas sintetis DEMO-0001."); setSandboxResult(false); return; } setSandboxError(""); setSandboxResult(true); }}><label htmlFor="endpoint">Endpoint layanan</label><div className="endpoint"><span>POST</span><code>/sandbox/v1/verifikasi-identitas</code></div><label htmlFor="demo-id">Identitas pengujian</label><input id="demo-id" value={sandboxId} onChange={e => { setSandboxId(e.target.value); setSandboxResult(false); }} required placeholder="DEMO-0001" /><p className="field-note">Format: DEMO diikuti empat angka, contoh DEMO-0001.</p>{sandboxError && <p role="alert" className="error-text">{sandboxError}</p>}<button className="primary-button" type="submit"><Send size={16} /> Jalankan pengujian</button></form><div className="response"><div><span>Respons layanan</span>{sandboxResult && <Badge>200 OK</Badge>}</div><pre>{sandboxResult ? JSON.stringify({ success: true, mode: "sandbox", data: { id: sandboxId, nama: "PENDUDUK CONTOH", status: "Terverifikasi", sumber: "Data sintetis — bukan data kependudukan" } }, null, 2) : "// Hasil simulasi akan ditampilkan di sini.\n// Isi identitas demo dan jalankan pengujian."}</pre></div></section>}

        {active !== "beranda" && active !== "prosedur" && active !== "sandbox" && <>
          {active === "monitoring" && <section className="monitoring-summary"><div className="panel"><span>Permintaan bulan ini</span><strong>1.248</strong><p>Data simulasi Oktober 2026</p></div><div className="panel"><span>Tingkat keberhasilan</span><strong>99,8<small>%</small></strong><p>1.245 permintaan berhasil</p></div><div className="panel"><span>Rata-rata respons</span><strong>124 <small>ms</small></strong><p>Lingkungan pengujian</p></div></section>}
          <section className="panel data-panel"><div className="section-heading"><div><h2>{active === "pengaduan" ? "Daftar pengaduan" : title}</h2><p>Data contoh untuk demonstrasi layanan portal.</p></div>{(active === "pks" || active === "pengaduan") && <button className="primary-button" onClick={() => setDialog(active)}><Plus size={17} />{active === "pks" ? "Ajukan PKS" : "Buat pengaduan"}</button>}</div><div className="table-tools"><label className="search-field"><Search size={18} /><input aria-label="Cari data" placeholder="Cari nama, lembaga, atau status..." value={search} onChange={e => setSearch(e.target.value)} />{search && <button aria-label="Hapus pencarian" onClick={() => setSearch("")}><X size={15} /></button>}</label><span>{currentRows.length} data ditampilkan</span></div><div className="table-scroll"><table><thead><tr><th>NAMA / KETERANGAN</th><th>TANGGAL</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody>{currentRows.map((row, index) => <tr key={`${row.name}-${index}`}><td><strong>{row.name}</strong><small>{row.detail}</small></td><td>{row.date}</td><td><Badge>{row.status}</Badge></td><td><button className="table-action" onClick={() => setSelected(row)}>Detail <ExternalLink size={14} /></button></td></tr>)}</tbody></table>{currentRows.length === 0 && <div className="empty-state"><Search size={28} /><h3>Tidak ada data ditemukan</h3><p>Coba kata kunci lain untuk mencari data.</p><button className="text-button" onClick={() => setSearch("")}>Reset pencarian</button></div>}</div><div className="table-bottom"><span>Seluruh data pada halaman ini adalah data dummy.</span><span>Halaman 1 dari 1</span></div></section>
        </>}
        <footer><span>© 2026 Portal Pemanfaatan Data Kependudukan</span><span>Sistem Manajemen Kelembagaan <i /> Versi Demo 1.0</span></footer>
      </main>
    </div>
    {toast && <div className="toast" role="status"><Check size={18} />{toast}<button aria-label="Tutup pemberitahuan" onClick={() => setToast("")}><X size={17} /></button></div>}
    {(dialog || selected) && <div className="modal-backdrop" onClick={() => { setDialog(null); setSelected(null); }}><section ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button autoFocus className="modal-close" aria-label="Tutup dialog" onClick={() => { setDialog(null); setSelected(null); }} onKeyDown={e => { if (e.key === "Escape") { setDialog(null); setSelected(null); } }}><X size={21} /></button>{selected ? <><span className="modal-icon blue"><FileText size={26} /></span><h2 id="modal-title">{selected.name}</h2><Badge>{selected.status}</Badge><p className="detail-copy">{selected.detail}</p>{selected.description && <p className="detail-copy">{selected.description}</p>}<div className="detail-date">Diperbarui: {selected.date}</div><div className="demo-callout">Dokumen dan informasi ini merupakan contoh untuk demonstrasi.</div><button className="primary-button" onClick={() => download(selected)}><ArrowDownToLine size={16} /> Unduh dokumen demo</button></> : dialog === "help" ? <><span className="modal-icon blue"><Headphones size={28} /></span><h2 id="modal-title">Pusat bantuan</h2><p className="detail-copy">Temukan panduan penggunaan portal atau sampaikan pertanyaan melalui menu pengaduan.</p><div className="help-options"><button onClick={() => { setDialog(null); navigate(isUser ? "pks" : "prosedur"); }}><BookOpen size={22} /><span><strong>{isUser ? "Pengajuan PKS" : "Panduan layanan"}</strong><small>{isUser ? "Kelola pengajuan kerja sama Anda" : "Pelajari alur kerja sama kelembagaan"}</small></span><ArrowRight size={18} /></button><button onClick={() => setDialog("pengaduan")}><MessageSquare size={22} /><span><strong>Buat pengaduan</strong><small>Kirim pertanyaan atau kendala demo</small></span><ArrowRight size={18} /></button></div></> : <><span className="modal-icon blue">{dialog === "pks" ? <FileCheck2 size={27} /> : <MessageSquare size={27} />}</span><h2 id="modal-title">{dialog === "pks" ? "Pengajuan kerja sama baru" : "Buat pengaduan"}</h2><p className="detail-copy">Lengkapi formulir demo berikut. Data hanya tersimpan selama sesi halaman ini.</p><form onSubmit={submit}><label htmlFor="institution">Nama lembaga</label><input id="institution" name="institution" required maxLength={100} placeholder="Contoh: Dinas Kesehatan" /><label htmlFor="title">{dialog === "pks" ? "Judul kerja sama" : "Judul pengaduan"}</label><input id="title" name="title" required maxLength={160} placeholder={dialog === "pks" ? "Tujuan pemanfaatan data" : "Ringkasan kendala Anda"} /><label htmlFor="description">Keterangan</label><textarea id="description" name="description" required maxLength={1000} rows={3} placeholder="Jelaskan kebutuhan atau kendala Anda..." /><p className="field-note">Gunakan data contoh. Jangan masukkan data pribadi nyata.</p><button className="primary-button" type="submit"><Send size={16} /> Kirim pengajuan demo</button></form></>}</section></div>}
  </div>;
}
