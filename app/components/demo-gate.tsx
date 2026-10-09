"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasDemoSession } from "../lib/demo-session";

export default function DemoGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    function checkSession() {
      if (hasDemoSession()) setReady(true);
      else { setReady(false); router.replace("/login"); }
    }
    checkSession();
    window.addEventListener("focus", checkSession);
    const timer = window.setInterval(checkSession, 30_000);
    return () => { window.removeEventListener("focus", checkSession); window.clearInterval(timer); };
  }, [router]);
  if (!ready) return <div className="session-loading" role="status"><span />Memuat portal...</div>;
  return children;
}
