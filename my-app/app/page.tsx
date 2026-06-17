"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.card:not(.card-empty)');
      for (const card of Array.from(cards)) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="container">
      <div className="bg-glow"></div>
      
      <header className="header">
        <div className="logo">
          <div className="logo-icon">K</div>
          <span>KwitansiKu</span>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-badge">Versi 1.0.0</div>
          <h1 className="hero-title">
            Buat Kwitansi <span>Profesional</span>
          </h1>
          <p className="hero-subtitle">
            Pilih dari berbagai macam template kwitansi dan nota untuk kebutuhan bisnis Anda. Aplikasi akan terus berkembang dengan lebih banyak model di masa mendatang.
          </p>
        </section>

        <section className="templates-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Model Kwitansi</h2>
              <p className="section-desc">Pilih template yang paling sesuai dengan kebutuhan Anda saat ini</p>
            </div>
          </div>

          <div className="grid" ref={containerRef}>
            {/* BUMDes Tirta Utama Card */}
            <Link href="/bumdes-tirta-utama" className="card">
              <div className="card-icon">🚰</div>
              <h3 className="card-title">BUMDes Tirta Utama</h3>
              <p className="card-desc">Pembuat kwitansi pembayaran air Desa Mukiran. Input meter awal/akhir, tarif, dan cetak dengan format 9x7 cm.</p>
              <div className="card-footer">
                Buka Pembuat Kwitansi
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            {/* Coming Soon Card */}
            <div className="card card-empty">
              <div className="card-icon">✨</div>
              <h3 className="card-title">Lebih banyak segera hadir</h3>
              <p className="card-desc">Kami akan menambahkan berbagai template baru seiring berjalannya waktu.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
