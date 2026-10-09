"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Check, CircleHelp, Eye, EyeOff, KeyRound, Landmark, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import Emblem from "../components/emblem";
import { DEMO_PASSWORD, DEMO_USERNAME, startDemoSession } from "../lib/demo-session";
import { requestedModule } from "../lib/portal-access";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [help, setHelp] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (username.trim() !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setError("Username atau kata sandi tidak sesuai. Silakan gunakan akun demo di bawah.");
      return;
    }
    setSubmitting(true);
    try { startDemoSession(); const destination = requestedModule(window.location.search); router.replace(destination === "beranda" ? "/" : `/?layanan=${destination}`); }
    catch { setError("Penyimpanan sesi tidak tersedia. Aktifkan penyimpanan situs di browser untuk mencoba login demo."); setSubmitting(false); }
  }

  return <div className="login-page">
    <section className="login-story" aria-label="Portal layanan kelembagaan">
      <div className="login-brand"><div className="login-logo"><Emblem /></div><div><strong>KEMENTERIAN DALAM NEGERI</strong><span>DIREKTORAT JENDERAL DUKCAPIL</span></div></div>
      <div className="login-story-content"><span className="login-kicker">SATU PORTAL. PELAYANAN TERINTEGRASI.</span><h1>Menghubungkan data.<br />Meningkatkan<br /><span>pelayanan publik.</span></h1><p>Kelola kerja sama kelembagaan dan pemanfaatan data kependudukan dalam satu platform terintegrasi.</p><div className="login-illustration" aria-hidden="true"><div className="login-ring" /><div className="login-ring outer" /><div className="login-building"><Landmark size={70} strokeWidth={1.2} /></div><div className="login-float float-a"><ShieldCheck size={27} /></div><div className="login-float float-b"><Building2 size={26} /></div><div className="login-connection"><span /><span /><span /></div></div><div className="login-benefits"><span><Check size={14} /> Layanan terintegrasi</span><span><Check size={14} /> Administrasi lebih mudah</span></div></div>
      <div className="login-story-footer"><ShieldCheck size={16} /><span>Portal Pemanfaatan Data Kependudukan</span><span className="login-version">DEMO 1.0</span></div>
    </section>

    <section className="login-form-section"><div className="login-topline"><span className="login-demo-dot" /> MODE DEMO <span>LAYANAN KELEMBAGAAN</span></div><div className="login-form-container"><Link href="/" className="login-back-link">← Kembali ke beranda publik</Link><div className="login-mobile-brand"><Emblem /><span>DUKCAPIL<small>Layanan Kelembagaan</small></span></div><span className="login-lock"><LockKeyhole size={25} strokeWidth={1.7} /></span><div className="eyebrow">AKSES LAYANAN LEMBAGA</div><h2>Masuk ke akun Anda</h2><p className="login-intro">Silakan masuk untuk mengakses layanan<br />pemanfaatan data dan manajemen kelembagaan.</p>
      <form onSubmit={submit} className="login-form">
        <label htmlFor="username">Username</label><div className={`login-input ${error ? "has-error" : ""}`}><UserRound size={18} /><input id="username" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} placeholder="Masukkan username Anda" required maxLength={100} value={username} onChange={event => { setUsername(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "login-error" : undefined} /></div>
        <label htmlFor="password">Kata sandi</label><div className={`login-input ${error ? "has-error" : ""}`}><KeyRound size={18} /><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Masukkan kata sandi Anda" required maxLength={100} value={password} onChange={event => { setPassword(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "login-error" : undefined} /><button type="button" aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        <div className="login-form-meta"><span>Sesi demo berlaku selama 8 jam</span><button type="button" onClick={() => setHelp(!help)} aria-expanded={help}>Bantuan masuk</button></div>
        {help && <p className="login-help" role="status"><CircleHelp size={17} /> Gunakan akun contoh di bawah. Pemulihan kata sandi belum tersedia pada versi demo.</p>}
        {error && <p id="login-error" className="login-error" role="alert">{error}</p>}
        <button type="submit" className="login-submit" disabled={submitting}>{submitting ? "Membuka dashboard..." : "Masuk ke dashboard"}<ArrowRight size={18} /></button>
      </form>
      <div className="login-divider"><span />COBA PORTAL DENGAN AKUN DEMO<span /></div><div className="demo-credentials"><div><span>Username</span><code>{DEMO_USERNAME}</code></div><div><span>Kata sandi</span><code>{DEMO_PASSWORD}</code></div><button type="button" onClick={() => { setUsername(DEMO_USERNAME); setPassword(DEMO_PASSWORD); setError(""); }}>Isi akun demo <ArrowRight size={14} /></button></div><p className="login-demo-note">Halaman demonstrasi dengan data dummy. Gunakan akun contoh, bukan kredensial pribadi Anda.</p>
    </div><footer className="login-footer">© 2026 Ditjen Dukcapil <span>Sistem Manajemen Kelembagaan</span></footer></section>
  </div>;
}
