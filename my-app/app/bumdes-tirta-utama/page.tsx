"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function BumdesTirtaUtama() {
  // Form States
  const [bulan, setBulan] = useState("JUNI 2026");
  const [noReg, setNoReg] = useState("TU.039");
  const [nama, setNama] = useState("SDN MUKIRAN III RT 8 RW 3");
  const [meterAwal, setMeterAwal] = useState<number | "">(4906);
  const [meterAkhir, setMeterAkhir] = useState<number | "">(4924);
  const [tarif, setTarif] = useState<2000 | 2500 | 3000>(2000);
  const [biayaAdmin, setBiayaAdmin] = useState<number>(3000);
  const [biayaMeter, setBiayaMeter] = useState<number>(3000);
  const [lembar, setLembar] = useState("Lembar 1 Pelanggan");

  // Calculations
  const totalPemakaian =
    meterAkhir !== "" && meterAwal !== "" ? Math.max(0, meterAkhir - meterAwal) : 0;

  const totalTarif = totalPemakaian * tarif;
  const totalBayar = totalTarif + biayaAdmin + biayaMeter;

  // Format helper
  const formatRupiah = (val: number | string) => {
    if (typeof val === "string") return val;
    return new Intl.NumberFormat("id-ID").format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-layout">
      {/* Sidebar Form (hidden on print) */}
      <div className="sidebar no-print">
        <div className="sidebar-header">
          <Link href="/" className="back-link">
            ← Kembali ke Home
          </Link>
          <h2>Input Kwitansi</h2>
          <p>BUMDes Tirta Utama - Desa Mukiran</p>
        </div>

        <div className="form-group">
          <label>Pemakaian Bulan</label>
          <input
            type="text"
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
            placeholder="Contoh: JUNI 2026"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nomor Reg.</label>
            <input
              type="text"
              value={noReg}
              onChange={(e) => setNoReg(e.target.value)}
              placeholder="Contoh: TU.039"
            />
          </div>
          <div className="form-group">
            <label>Tipe Lembar</label>
            <input
              type="text"
              value={lembar}
              onChange={(e) => setLembar(e.target.value)}
              placeholder="Contoh: Lembar 1 Pelanggan"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Nama Pelanggan</label>
          <input
            type="text"
            className="highlight-input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: SDN MUKIRAN III RT 8 RW 3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Meter Awal (M³)</label>
            <input
              type="number"
              value={meterAwal}
              onChange={(e) =>
                setMeterAwal(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
          <div className="form-group">
            <label>Meter Akhir (M³)</label>
            <input
              type="number"
              value={meterAkhir}
              onChange={(e) =>
                setMeterAkhir(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tarif Per M³</label>
          <div className="radio-group">
            {[2000, 2500, 3000].map((t) => (
              <label key={t} className={`radio-label ${tarif === t ? "active" : ""}`}>
                <input
                  type="radio"
                  name="tarif"
                  checked={tarif === t}
                  onChange={() => setTarif(t as 2000 | 2500 | 3000)}
                />
                Rp {formatRupiah(t)}
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Biaya Administrasi</label>
            <input
              type="number"
              value={biayaAdmin}
              onChange={(e) => setBiayaAdmin(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Biaya Meter</label>
            <input
              type="number"
              value={biayaMeter}
              onChange={(e) => setBiayaMeter(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="btn-primary btn-block" onClick={handlePrint}>
          🖨️ Cetak Kwitansi
        </button>
      </div>

      {/* Preview Container */}
      <div className="preview-container">
        <div className="preview-header no-print">
          <h3>Live Preview (Ukuran Asli 9cm × 7cm)</h3>
          <p>Tekan tombol Cetak di kiri atau Ctrl+P untuk mencetak langsung.</p>
        </div>

        {/* The Receipt (styled to print exactly at 9x7cm) */}
        <div className="receipt-wrapper">
          <div className="receipt-print-area">
            {/* Dotted border on the left representing tear-off perforation */}
            <div className="perforation-line"></div>
            
            <div className="receipt-content">
              {/* Header */}
              <div className="receipt-header">
                <div className="receipt-logo-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-bumdes.png" alt="Logo BUMDes" className="receipt-logo" />
                </div>
                <div className="receipt-title-container">
                  <h1 className="receipt-title-main">KUITANSI PEMBAYARAN AIR</h1>
                  <h2 className="receipt-title-sub">BUMDes &quot;TIRTA UTAMA&quot; Desa MUKIRAN</h2>
                </div>
              </div>

              {/* Double Horizontal Border */}
              <div className="double-divider"></div>

              {/* Receipt Details Table */}
              <div className="receipt-details">
                {/* Row 1 */}
                <div className="detail-row">
                  <div className="detail-label">Pemakaian Bulan</div>
                  <div className="detail-colon">:</div>
                  <div className="detail-value bold-text">{bulan.toUpperCase()}</div>
                  <div className="lembar-badge">{lembar}</div>
                </div>

                {/* Row 2 */}
                <div className="detail-row">
                  <div className="detail-label">Nomor Reg.</div>
                  <div className="detail-colon">:</div>
                  <div className="detail-value">{noReg}</div>
                </div>

                {/* Row 3 */}
                <div className="detail-row">
                  <div className="detail-label">Nama Pelanggan</div>
                  <div className="detail-colon">:</div>
                  <div className="detail-value customer-name bold-text">{nama.toUpperCase()}</div>
                </div>

                {/* Row 4 */}
                <div className="detail-row">
                  <div className="detail-label">Meter awal</div>
                  <div className="detail-colon">:</div>
                  <div className="detail-value-half">{meterAwal !== "" ? `${formatRupiah(meterAwal)} M3` : "-"}</div>
                </div>

                {/* Row 5 */}
                <div className="detail-row">
                  <div className="detail-label">Meter akhir</div>
                  <div className="detail-colon">:</div>
                  <div className="detail-value-half">{meterAkhir !== "" ? `${formatRupiah(meterAkhir)} M3` : "-"}</div>
                </div>

                {/* Row 6 */}
                <div className="detail-row underline-row">
                  <div className="detail-label bold-text">Total Pemakaian</div>
                  <div className="detail-colon">:</div>
                  <div className="detail-value-half bold-text italic-text">{totalPemakaian} M3</div>
                </div>

                {/* Row 7: Payment Breakdowns */}
                <div className="detail-row payment-subrow">
                  <div className="detail-label">Pembayaran</div>
                  <div className="detail-colon">:</div>
                  <div className="payment-calc-col">
                    {tarif === 2000 ? `${totalPemakaian} M3` : "- M3"} x Rp 2.000
                  </div>
                  <div className="payment-equal-col">= Rp</div>
                  <div className="payment-result-col align-right">
                    {tarif === 2000 ? formatRupiah(totalTarif) : "-"}
                  </div>
                </div>

                <div className="detail-row payment-subrow">
                  <div className="detail-label-empty"></div>
                  <div className="detail-colon-empty"></div>
                  <div className="payment-calc-col">
                    {tarif === 2500 ? `${totalPemakaian} M3` : "M3"} x Rp 2.500
                  </div>
                  <div className="payment-equal-col">= Rp</div>
                  <div className="payment-result-col align-right">
                    {tarif === 2500 ? formatRupiah(totalTarif) : "-"}
                  </div>
                </div>

                <div className="detail-row payment-subrow border-bottom-thin">
                  <div className="detail-label-empty"></div>
                  <div className="detail-colon-empty"></div>
                  <div className="payment-calc-col">
                    {tarif === 3000 ? `${totalPemakaian} M3` : "M3"} x Rp 3.000
                  </div>
                  <div className="payment-equal-col">= Rp</div>
                  <div className="payment-result-col align-right">
                    {tarif === 3000 ? formatRupiah(totalTarif) : "-"}
                  </div>
                </div>

                {/* Administrasi */}
                <div className="detail-row">
                  <div className="detail-label">Biaya Administrasi</div>
                  <div className="detail-colon">:</div>
                  <div className="payment-calc-col"></div>
                  <div className="payment-equal-col">= Rp</div>
                  <div className="payment-result-col align-right">{formatRupiah(biayaAdmin)}</div>
                </div>

                {/* Biaya Meter */}
                <div className="detail-row border-bottom-thin">
                  <div className="detail-label">Biaya Meter</div>
                  <div className="detail-colon">:</div>
                  <div className="payment-calc-col"></div>
                  <div className="payment-equal-col">= Rp</div>
                  <div className="payment-result-col align-right">{formatRupiah(biayaMeter)}</div>
                </div>

                {/* Total Bayar */}
                <div className="detail-row total-row">
                  <div className="detail-label bold-text">Total Bayar</div>
                  <div className="detail-colon">:</div>
                  <div className="payment-calc-col"></div>
                  <div className="payment-equal-col bold-text">= Rp</div>
                  <div className="payment-result-col align-right bold-text total-value">
                    {formatRupiah(totalBayar)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Web App UI Styling */
        .app-layout {
          display: flex;
          min-height: 100vh;
          background-color: #0c0a09;
          color: #f5f5f4;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .sidebar {
          width: 380px;
          background-color: #1c1917;
          border-right: 1px solid #2e2a24;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          overflow-y: auto;
          flex-shrink: 0;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
        }

        .sidebar-header {
          margin-bottom: 0.5rem;
        }

        .back-link {
          color: #3b82f6;
          text-decoration: none;
          font-size: 0.875rem;
          display: inline-block;
          margin-bottom: 0.75rem;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #60a5fa;
        }

        .sidebar h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
        }

        .sidebar p {
          color: #a8a29e;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-row .form-group {
          flex: 1;
        }

        .form-group label {
          font-size: 0.825rem;
          font-weight: 600;
          color: #d6d3d1;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group input[type="file"] {
          background-color: #292524;
          border: 1px solid #44403c;
          border-radius: 8px;
          padding: 0.75rem;
          color: white;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-group input[type="text"]:focus,
        .form-group input[type="number"]:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .highlight-input {
          border-color: #ea580c !important;
        }

        .radio-group {
          display: flex;
          gap: 0.5rem;
        }

        .radio-label {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: #292524;
          border: 1px solid #44403c;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .radio-label input {
          display: none;
        }

        .radio-label.active {
          background-color: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 0.875rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-secondary {
          background-color: transparent;
          border: 1px solid #44403c;
          color: #d6d3d1;
          padding: 0.5rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background-color: #292524;
          color: white;
        }

        .btn-block {
          width: 100%;
        }

        .preview-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          background: radial-gradient(circle at 50% 50%, #171513 0%, #0c0a09 100%);
          overflow-y: auto;
        }

        .preview-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .preview-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .preview-header p {
          color: #a8a29e;
          font-size: 0.875rem;
        }

        /* The 9x7cm Receipt Wrapping */
        .receipt-wrapper {
          background-color: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }

        .receipt-print-area {
          width: 9cm;
          height: 7cm;
          background: white;
          color: #000;
          position: relative;
          box-sizing: border-box;
          padding: 0.35cm 0.4cm 0.35cm 0.6cm; /* Extra left padding for tear-off margin */
          font-family: "Arial", sans-serif;
          font-size: 10.5px;
          line-height: 1.35;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Dotted perforation line simulating rip-off edge */
        .perforation-line {
          position: absolute;
          left: 0.2cm;
          top: 0;
          bottom: 0;
          width: 1px;
          border-left: 2px dotted #888;
          pointer-events: none;
        }

        .receipt-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Header Styling */
        .receipt-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.25rem;
        }

        .receipt-logo-container {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .receipt-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .receipt-logo-svg {
          width: 100%;
          height: 100%;
        }

        .receipt-title-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex: 1;
        }

        .receipt-title-main {
          font-size: 12.5px;
          font-weight: 900;
          letter-spacing: 0.02em;
          margin: 0;
          font-family: "Arial Black", "Arial", sans-serif;
          color: #111;
        }

        .receipt-title-sub {
          font-size: 9.5px;
          font-weight: 850;
          margin: 0;
          color: #222;
        }

        /* Double border divider */
        .double-divider {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
          height: 2px;
          margin-bottom: 0.35rem;
          width: 100%;
        }

        /* Details & Grid */
        .receipt-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .detail-row {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 14.5px;
        }

        .detail-label {
          width: 105px;
          flex-shrink: 0;
        }

        .detail-label-empty {
          width: 105px;
          flex-shrink: 0;
        }

        .detail-colon {
          width: 12px;
          flex-shrink: 0;
          text-align: left;
        }

        .detail-colon-empty {
          width: 12px;
          flex-shrink: 0;
        }

        .detail-value {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .detail-value-half {
          width: 100px;
        }

        .bold-text {
          font-weight: bold;
        }

        .italic-text {
          font-style: italic;
        }

        /* Specific styles matching the image */
        .lembar-badge {
          border: 1px solid #000;
          padding: 1px 4px;
          font-size: 8.5px;
          font-style: italic;
          float: right;
          margin-left: auto;
          line-height: 1;
        }

        .customer-name {
          color: #d32f2f; /* Red customer name as in image */
        }

        .underline-row {
          border-bottom: 1px solid #000;
          padding-bottom: 1px;
          margin-bottom: 2px;
        }

        .border-bottom-thin {
          border-bottom: 0.5px solid #ccc;
        }

        /* Payments grid */
        .payment-subrow {
          min-height: 13.5px;
          font-size: 10px;
        }

        .payment-calc-col {
          width: 110px;
          flex-shrink: 0;
        }

        .payment-equal-col {
          width: 32px;
          flex-shrink: 0;
        }

        .payment-result-col {
          flex: 1;
          padding-right: 5px;
        }

        .align-right {
          text-align: right;
        }

        .total-row {
          margin-top: auto;
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
          padding: 2px 0;
          min-height: 18px;
        }

        .total-value {
          color: #d32f2f; /* Red total price as in image */
          font-size: 12px;
        }

        /* Print Media Styles */
        @media print {
          @page {
            size: 9cm 7cm;
            margin: 0;
          }
          
          body {
            background: white;
            color: black;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .app-layout {
            background: white;
            min-height: auto;
            display: block;
          }

          .no-print {
            display: none !important;
          }

          .preview-container {
            padding: 0;
            background: none;
            display: block;
            overflow: visible;
          }

          .receipt-wrapper {
            padding: 0;
            box-shadow: none;
            border-radius: 0;
          }

          .receipt-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 9cm;
            height: 7cm;
            margin: 0;
            padding: 0.35cm 0.4cm 0.35cm 0.6cm;
            page-break-inside: avoid;
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
}
