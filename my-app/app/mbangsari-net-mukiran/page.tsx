"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function MbangsariNetMukiranPage() {
  const [idTransaksi, setIdTransaksi] = useState("TRX1778561098903");
  const [tanggal, setTanggal] = useState("2026-05-12");
  const [pelanggan, setPelanggan] = useState("SDN MUKIRAN 03");
  const [idPelanggan, setIdPelanggan] = useState("7505");
  const [paket, setPaket] = useState("L_30");
  const [periode, setPeriode] = useState("Tagihan Bln 4 - Thn 2026");
  const [metode, setMetode] = useState("BCA");
  const [totalBayar, setTotalBayar] = useState<number | "">(175000);

  const totalBayarFormatted = useMemo(() => {
    if (totalBayar === "") return "Rp 0";
    return `Rp ${new Intl.NumberFormat("id-ID").format(totalBayar)}`;
  }, [totalBayar]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="isp-page-wrap">
      <aside className="isp-editor no-print">
        <div className="isp-editor-head">
          <Link href="/" className="isp-back-link">
            Kembali ke Home
          </Link>
          <h1>Pembuat Kwitansi ISP</h1>
          <p>Mbangsari Net - Cabang Mukiran</p>
        </div>

        <div className="isp-field">
          <label>ID Transaksi</label>
          <input
            type="text"
            value={idTransaksi}
            onChange={(e) => setIdTransaksi(e.target.value)}
          />
        </div>

        <div className="isp-field">
          <label>Tanggal</label>
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </div>

        <div className="isp-field">
          <label>Pelanggan</label>
          <input
            type="text"
            value={pelanggan}
            onChange={(e) => setPelanggan(e.target.value.toUpperCase())}
          />
        </div>

        <div className="isp-row-2">
          <div className="isp-field">
            <label>ID Pelanggan</label>
            <input
              type="text"
              value={idPelanggan}
              onChange={(e) => setIdPelanggan(e.target.value)}
            />
          </div>
          <div className="isp-field">
            <label>Paket</label>
            <input type="text" value={paket} onChange={(e) => setPaket(e.target.value)} />
          </div>
        </div>

        <div className="isp-field">
          <label>Periode</label>
          <input type="text" value={periode} onChange={(e) => setPeriode(e.target.value)} />
        </div>

        <div className="isp-row-2">
          <div className="isp-field">
            <label>Metode</label>
            <input type="text" value={metode} onChange={(e) => setMetode(e.target.value.toUpperCase())} />
          </div>
          <div className="isp-field">
            <label>Total Bayar</label>
            <input
              type="number"
              value={totalBayar}
              onChange={(e) => setTotalBayar(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
        </div>

        <button type="button" className="isp-print-btn" onClick={handlePrint}>
          Cetak Kwitansi
        </button>
      </aside>

      <main className="isp-preview-area">
        <div className="isp-preview-note no-print">
          Preview kwitansi akan mengikuti contoh struk pembayaran Mbangsari Net Cabang Mukiran.
        </div>

        <section className="isp-receipt" aria-label="Kwitansi ISP Mbangsari Net Cabang Mukiran">
          <div className="isp-logo-wrap">
            <Image
              src="/logogingsulnet.png"
              alt="Logo ISP"
              width={76}
              height={76}
              className="isp-logo-image"
            />
          </div>
          <h2 className="isp-brand">MBANGSARI.NET</h2>
          <p className="isp-branch">Cabang Mukiran</p>

          <h3 className="isp-title">STRUK PEMBAYARAN</h3>
          <div className="isp-divider" />

          <div className="isp-detail-list">
            <div className="isp-detail-row">
              <span>ID Transaksi</span>
              <span>:</span>
              <strong>{idTransaksi}</strong>
            </div>
            <div className="isp-detail-row">
              <span>Tanggal</span>
              <span>:</span>
              <strong>{tanggal}</strong>
            </div>

            <div className="isp-gap" />

            <div className="isp-detail-row">
              <span>Pelanggan</span>
              <span>:</span>
              <strong>{pelanggan}</strong>
            </div>
            <div className="isp-detail-row">
              <span>ID Pelanggan</span>
              <span>:</span>
              <strong>{idPelanggan}</strong>
            </div>
            <div className="isp-detail-row">
              <span>Paket</span>
              <span>:</span>
              <strong>{paket}</strong>
            </div>
            <div className="isp-detail-row">
              <span>Periode</span>
              <span>:</span>
              <strong>{periode}</strong>
            </div>
            <div className="isp-detail-row">
              <span>Metode</span>
              <span>:</span>
              <strong>{metode}</strong>
            </div>
          </div>

          <div className="isp-total-box">
            <span>TOTAL BAYAR</span>
            <strong>{totalBayarFormatted}</strong>
          </div>

          <p className="isp-footnote">Terima kasih atas pembayaran Anda.</p>
          <p className="isp-footnote">Simpan struk ini sebagai bukti pembayaran yang sah.</p>
        </section>
      </main>

      <style jsx>{`
        .isp-page-wrap {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 360px 1fr;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%);
          color: #0f172a;
        }

        .isp-editor {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(15, 23, 42, 0.15);
          padding: 1.4rem;
          overflow-y: auto;
        }

        .isp-editor-head h1 {
          font-size: 1.2rem;
          color: #0f172a;
          margin-top: 0.8rem;
        }

        .isp-editor-head p {
          font-size: 0.9rem;
          color: #475569;
          margin-top: 0.3rem;
          margin-bottom: 1.4rem;
        }

        .isp-back-link {
          color: #2563eb;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .isp-field {
          margin-bottom: 0.9rem;
        }

        .isp-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #334155;
          margin-bottom: 0.32rem;
        }

        .isp-field input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 0.55rem;
          padding: 0.58rem 0.7rem;
          color: #0f172a;
          font-size: 0.9rem;
          background: #ffffff;
          outline: none;
        }

        .isp-field input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .isp-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
        }

        .isp-print-btn {
          width: 100%;
          border: none;
          border-radius: 0.7rem;
          background: #0f172a;
          color: #f8fafc;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 0.72rem;
          margin-top: 0.6rem;
          cursor: pointer;
        }

        .isp-print-btn:hover {
          background: #1e293b;
        }

        .isp-preview-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          gap: 1rem;
        }

        .isp-preview-note {
          color: #e2e8f0;
          font-size: 0.9rem;
          text-align: center;
          max-width: 520px;
        }

        .isp-receipt {
          width: 317px;
          background: #d8d8d8;
          border-radius: 0;
          padding: 14px 11px 10px;
          box-shadow: 0 24px 55px rgba(2, 6, 23, 0.45);
          text-align: center;
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          color: #1d1d1d;
        }

        .isp-logo-wrap {
          width: fit-content;
          height: auto;
          margin: 0 auto 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .isp-logo-image {
          width: 58px;
          height: 58px;
          object-fit: contain;
        }

        .isp-brand {
          font-size: 34px;
          line-height: 0.92;
          font-weight: 800;
          margin: 0;
          font-family: "Arial Narrow", Arial, sans-serif;
          transform: scaleX(0.7);
          transform-origin: center;
          letter-spacing: 0.1px;
          color: #131313;
        }

        .isp-branch {
          margin-top: 1px;
          color: #5d5d5d;
          font-size: 24px;
          font-family: "Arial Narrow", Arial, sans-serif;
          transform: scaleX(0.56);
          transform-origin: center;
          margin-bottom: 6px;
        }

        .isp-title {
          margin: 0;
          font-size: 33px;
          font-weight: 800;
          font-family: "Arial Narrow", Arial, sans-serif;
          line-height: 0.92;
          transform: scaleX(0.72);
          transform-origin: center;
          color: #1f1f1f;
        }

        .isp-divider {
          margin: 10px auto 12px;
          border-top: 2px dashed #b7b7b7;
        }

        .isp-detail-list {
          text-align: left;
          font-size: 32px;
          line-height: 1.18;
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          transform: scale(0.41);
          transform-origin: top left;
          width: 244%;
          padding: 0;
          margin-bottom: -106px;
        }

        .isp-detail-row {
          display: grid;
          grid-template-columns: 256px 22px 1fr;
          gap: 0;
          margin-bottom: 7px;
          align-items: baseline;
          color: #6a6a6a;
        }

        .isp-detail-row strong {
          justify-self: end;
          text-align: right;
          letter-spacing: 0;
          font-weight: 700;
          color: #1f1f1f;
        }

        .isp-gap {
          height: 16px;
        }

        .isp-total-box {
          margin-top: 9px;
          border: 1px solid #c9c9c9;
          border-radius: 10px;
          background: #e6e6e6;
          padding: 13px 13px;
          min-height: 67px;
          display: grid;
          grid-template-columns: auto auto;
          justify-content: space-between;
          align-items: center;
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          color: #3f3f3f;
        }

        .isp-total-box span {
          font-size: 30px;
          font-weight: 700;
          font-family: "Arial Narrow", Arial, sans-serif;
          transform: scaleX(0.52);
          transform-origin: left;
          white-space: nowrap;
          color: #3f3f3f;
        }

        .isp-total-box strong {
          color: #1d84e2;
          font-size: 16px;
          transform: none;
          line-height: 0.9;
          font-weight: 700;
          white-space: nowrap;
        }

        .isp-footnote {
          margin-top: 9px;
          font-size: 12px;
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          transform: none;
          color: #444444;
          margin-bottom: 0;
        }

        .isp-footnote + .isp-footnote {
          margin-top: 1px;
        }

        @media (max-width: 980px) {
          .isp-page-wrap {
            grid-template-columns: 1fr;
          }

          .isp-editor {
            border-right: none;
            border-bottom: 1px solid rgba(15, 23, 42, 0.15);
          }

          .isp-preview-area {
            padding: 1.5rem 1rem 2rem;
          }
        }

        @media print {
          .no-print {
            display: none !important;
          }

          .isp-page-wrap {
            display: block;
            background: #ffffff;
            min-height: auto;
          }

          .isp-preview-area {
            padding: 0;
            min-height: auto;
          }

          .isp-receipt {
            box-shadow: none;
            margin: 0 auto;
            width: 80mm;
            min-height: 120mm;
          }
        }
      `}</style>
    </div>
  );
}
