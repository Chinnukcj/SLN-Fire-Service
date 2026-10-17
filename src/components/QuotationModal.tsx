import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
import { CompanyLogo } from './CompanyLogo';
import {
  Printer,
  X,
  FileText,
  Download,
  Building2,
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export const QuotationModal: React.FC = () => {
  const {
    items,
    subtotal,
    gstRate,
    gstAmount,
    grandTotal,
    totalUnits,
    isQuotationOpen,
    setIsQuotationOpen
  } = useCart();

  // Printable Letterhead Customization Fields (blank defaults and placeholders)
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [attentionTo, setAttentionTo] = useState('');
  const [salesExecutive, setSalesExecutive] = useState('Mr. JAGADISH');
  const [quoteDate, setQuoteDate] = useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  });

  if (!isQuotationOpen) return null;

  const handlePrintQuotation = () => {
    // Remove any old print iframe
    const existingIframe = document.getElementById('sln-print-frame');
    if (existingIframe) existingIframe.remove();

    const iframe = document.createElement('iframe');
    iframe.id = 'sln-print-frame';
    // CRITICAL: Do NOT use visibility: hidden or display: none, or Chrome prints a blank page!
    iframe.style.position = 'fixed';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '210mm';
    iframe.style.height = '297mm';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const subTotal = items.reduce(
      (sum, item) => sum + (item.isPriceOnRequest ? 0 : item.unitPrice * item.quantity),
      0
    );
    const calculatedGst = subTotal * 0.18;
    const calculatedGrand = subTotal + calculatedGst;

    const rowsHtml = items.length > 0
      ? items.map((item, idx) => {
          const servicePrefix = item.serviceType === 'refill' ? 'Refilling of' : 'Supplying of';
          const materialText = item.material ? ` (${item.material})` : '';
          const desc = `${servicePrefix} ${item.name} ${item.capacityLabel}${materialText} ISI Marked`;
          const rateText = item.isPriceOnRequest ? 'On Request' : item.unitPrice.toFixed(2);
          const amountText = item.isPriceOnRequest
            ? 'Quoted Sep.'
            : (item.unitPrice * item.quantity).toFixed(2);

          return `
          <tr>
            <td style="text-align:center;">${idx + 1}</td>
            <td>
              <strong>${desc}</strong>
              <div style="font-size: 9.5px; color: #333; font-family: monospace;">Class: ${item.fireClass} | ${item.standard}</div>
            </td>
            <td style="text-align:center;">${item.quantity} NOS</td>
            <td style="text-align:right;">${rateText}</td>
            <td style="text-align:right; font-weight:bold;">${amountText}</td>
          </tr>
        `;
        }).join('')
      : `<tr><td colspan="5" style="text-align:center; padding: 12px;">No items selected</td></tr>`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>SLN Fire Service - Quotation</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #000000;
            background: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 12px;
            line-height: 1.35;
          }
          .header-banner {
            background-color: #eaf6fa !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            /* Stretch to the top, left, and right edges of the PDF page */
            margin: -10mm -12mm 10px -12mm;
            padding: 8mm 12mm 6px 12mm;
            border-bottom: 2.5px solid #cc0000;
          }
          .header-table {
            width: 100%;
            border-collapse: collapse;
            background-color: transparent;
          }
          .logo-box {
            width: 70px;
            border: 1.5px solid #1e3a8a;
            border-radius: 6px;
            overflow: hidden;
            text-align: center;
            font-weight: bold;
          }
          .logo-top { background: #1e3a8a; color: #fff; font-size: 18px; padding: 2px 0; letter-spacing: 1px; }
          .logo-mid { background: #dc2626; color: #fff; font-size: 9px; padding: 2px 0; font-style: italic; }
          .logo-bot { background: #fff; color: #1e3a8a; font-size: 6px; padding: 1px 0; }
          .company-title {
            color: #c00000;
            font-size: 30px;
            font-weight: 900;
            margin: 0;
            line-height: 1.05;
            letter-spacing: 0.5px;
          }
          .company-sub {
            font-size: 13px;
            font-weight: bold;
            font-style: italic;
            margin: 3px 0;
          }
          .isi-line {
            font-size: 11px;
            font-weight: bold;
            margin-top: 3px;
          }
          .isi-badge {
            display: inline-block;
            border: 1.5px solid #000;
            padding: 0px 4px;
            font-family: serif;
            font-weight: bold;
            font-size: 11px;
            margin: 0 3px;
          }
          .quote-table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          .quote-table th, .quote-table td {
            border: 1px solid #000000;
            padding: 5px 7px;
            font-size: 11.5px;
          }
          .quote-table th {
            background-color: #f3f4f6;
            font-weight: bold;
            text-transform: uppercase;
          }
          .terms-grid {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
          }
          .terms-grid td {
            width: 50%;
            vertical-align: top;
            padding-right: 10px;
            font-size: 11px;
            line-height: 1.45;
          }
          .footer-block {
            margin-top: 14px;
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body>
        <!-- HEADER -->
        <div class="header-banner">
          <table class="header-table">
            <tr>
              <td style="width: 24%; vertical-align: top;">
                <div class="logo-box">
                  <div class="logo-top">SLN</div>
                  <div class="logo-mid">Fire Service</div>
                  <div class="logo-bot">Fire Protection Engineers</div>
                </div>
                <div style="font-size: 10px; font-weight: bold; margin-top: 4px;">
                  SINCE 2004<br/>
                  <span style="font-size: 8.5px;">FIRE PROTECTION ENGINEERS</span>
                </div>
              </td>
              <td style="width: 56%; text-align: center; vertical-align: middle;">
                <h1 class="company-title">SLN Fire Service</h1>
                <div class="company-sub">All Types of Fire Extinguishers and Equipments</div>
                <div class="isi-line">We are supplying of all <span class="isi-badge">ISI</span> Marked products</div>
              </td>
              <td style="width: 20%; text-align: right; vertical-align: bottom; font-size: 12px;">
                <strong>Date:</strong> ${quoteDate || new Date().toLocaleDateString('en-GB')}
              </td>
            </tr>
          </table>
        </div>

        <!-- RECIPIENT & INTRO -->
        <div style="margin-bottom: 8px;">
          <div>To,</div>
          <div><strong>The Manager,</strong></div>
          <div style="font-weight: bold; font-size: 13px; text-transform: uppercase;">${customerName || 'CUSTOMER / COMPANY NAME'}</div>
          <div>${customerAddress || 'Bengaluru, Karnataka'}</div>
        </div>

        <div style="margin-bottom: 6px;">Dear Sir/Madam,</div>
        <div style="font-weight: bold; margin-bottom: 3px;">Sub: QUOTATION FOR SUPPLYING OF FIRE EQUIPMENTS</div>
        <div style="font-weight: bold; margin-bottom: 8px;">Kind Attn: ${attentionTo || 'Sir / Madam'}</div>

        <p style="margin: 0 0 10px 0; text-align: justify;">
          Further to your discussion with Mr. Jagadish, we are pleased to present our official quotation for the supply and certified refilling of fire safety equipment. We look forward to securing your facility with ISI-certified protection and prompt service.
        </p>

        <!-- ITEMS TABLE -->
        <table class="quote-table">
          <thead>
            <tr>
              <th style="width: 8%;">SL. NO.</th>
              <th style="width: 52%; text-align: left;">DESCRIPTION</th>
              <th style="width: 12%;">UNIT</th>
              <th style="width: 13%; text-align: right;">RATE</th>
              <th style="width: 15%; text-align: right;">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            <tr>
              <td colspan="4" style="text-align: right; font-weight: bold;">TOTAL AMOUNT</td>
              <td style="text-align: right; font-weight: bold;">₹ ${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right; font-weight: bold;">GSTIN @ 18%</td>
              <td style="text-align: right; font-weight: bold;">₹ ${calculatedGst.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right; font-weight: bold; font-size: 12.5px;">GRAND TOTAL AMOUNT</td>
              <td style="text-align: right; font-weight: bold; font-size: 12.5px;">₹ ${calculatedGrand.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <!-- TERMS & CONDITIONS -->
        <table class="terms-grid">
          <tr>
            <td>
              <div style="font-weight: bold; margin-bottom: 4px;">WOULD YOU GIVE US ORDER...?</div>
              1) We are fire extinguishers sales and service<br/>
              2) We will give all products with high class quality<br/>
              3) Our products will be supplied with ISI and Test certificate<br/>
              4) We have 100+ satisfied clients<br/>
              5) 50% Advance Payment
            </td>
            <td>
              <div style="font-weight: bold; margin-bottom: 4px;">TERMS & CONDITION</div>
              1) GSTIN @ 18% extra<br/>
              2) Warranty 1 year<br/>
              3) Delivery within 12 hours<br/>
              4) Payment after installation of fire extinguishers<br/>
              5) Quotation valid for 30 days.
            </td>
          </tr>
        </table>

        <!-- SIGNATORY & FOOTER -->
        <div class="footer-block">
          <div style="margin-top: 12px;">
            <div>Yours truly,</div>
            <div style="font-weight: bold; margin-top: 2px;">FOR SLN FIRE SERVICE</div>
            <div style="height: 35px;"></div>
            <div style="font-weight: bold; border-top: 1px solid #000; display: inline-block; padding-top: 3px;">Authorized Signatory</div>
          </div>

          <div style="text-align: center; margin-top: 10px;">
            <div style="font-size: 10px; font-style: italic;">Note:- Prices are subject to change without any prior intimation</div>
            <div style="font-weight: 900; font-size: 12px; letter-spacing: 1px; margin: 4px 0; border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; padding: 3px 0;">
              SAFETY IS OUR PRIORITY
            </div>
            <div style="font-weight: bold; font-size: 11px; margin-top: 4px;">
              #18/1, Arehalli, ittumadu main road, near basavanna temple, Bengaluru 560061, Karnataka<br/>
              Mob.: 9945437741, 9448536741 | E-mail: dhanush.slnfire@gmail.com
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const doc = iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 300);
  };

  const formatInr = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const modalContent = (
    <div
      id="quotation-print-root"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 print:static print:inset-auto print:overflow-visible print:h-auto print:bg-white print:p-0 print:m-0 print:block"
    >
      {/* Dark backdrop with qm-no-print and print:hidden */}
      <div
        className="qm-no-print print:hidden fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setIsQuotationOpen(false)}
        aria-hidden="true"
      />

      <div className="relative quotation-modal-dialog bg-zinc-900 border border-zinc-800 rounded-2xl max-w-5xl w-full text-zinc-100 shadow-2xl flex flex-col max-h-[96vh] overflow-hidden print:static print:bg-transparent print:border-none print:shadow-none print:max-w-full print:w-full print:max-h-none print:h-auto print:overflow-visible print:p-0 print:m-0">
        {/* =================================================================== */}
        {/* SCREEN-ONLY TOOLBAR / CONTROLS (HIDDEN DURING PRINT)                */}
        {/* =================================================================== */}
        <div className="qm-no-print print:hidden no-print p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-mono">
                  Official Letterhead Quotation
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                SLN Fire Service Letterhead Preview
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintQuotation}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Quotation</span>
            </button>

            <button
              type="button"
              onClick={() => setIsQuotationOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* EDITABLE DETAILS BAR FOR USER INPUT (CUSTOMER, ATTENTION, DATE)     */}
        {/* =================================================================== */}
        <div className="qm-no-print print:hidden no-print p-4 bg-zinc-950/50 border-b border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs shrink-0">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-amber-400" />
              Customer / Company Name:
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder=""
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-amber-400" />
              Customer City / Address:
            </label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder=""
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-amber-400" />
              Kind Attn (Recipient):
            </label>
            <input
              type="text"
              value={attentionTo}
              onChange={(e) => setAttentionTo(e.target.value)}
              placeholder=""
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              Quotation Date:
            </label>
            <input
              type="text"
              value={quoteDate}
              onChange={(e) => setQuoteDate(e.target.value)}
              placeholder=""
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* =================================================================== */}
        {/* SCROLLABLE PREVIEW CONTAINER (CONTAINING PRINTABLE ROOT)             */}
        {/* =================================================================== */}
        <div className="quotation-scroll-area flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-zinc-800/40 flex justify-center print:overflow-visible print:p-0 print:bg-transparent print:m-0">
          {/* SHEET WRAPPING CONTAINER */}
          <div className="qm-sheet-wrap w-full flex justify-center print:m-0 print:p-0 print:w-full print:max-w-none">
            {/* A4 PAPER CONTAINER */}
            <div
              id="printable-quotation"
              className="bg-white text-black w-full max-w-[210mm] mx-auto p-[10mm] text-[11px] leading-snug font-sans shadow-lg print:shadow-none print:p-0 print:max-w-full print:w-full"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: '#000000',
                backgroundColor: '#ffffff'
              }}
            >
            {/* =============================================================== */}
            {/* 1. TOP HEADER (3-COLUMN GRID) WITH LIGHT BLUE BANNER TINT       */}
            {/* =============================================================== */}
            <div className="-mx-[10mm] -mt-[10mm] px-[10mm] pt-[8mm] pb-4 mb-4 bg-[#eaf6fa] border-b-2 border-red-600 text-black">
              <div className="grid grid-cols-3 items-end">
                {/* Column 1 (Left): Logo & SINCE 2004 text */}
                <div className="text-left flex flex-col items-start justify-end">
                  <div className="w-[64px] h-[64px] flex items-center justify-start">
                    <CompanyLogo size={64} className="object-contain" />
                  </div>
                  <div className="mt-1 text-left">
                    <span className="text-xs font-black tracking-wider text-black uppercase block font-sans">
                      SINCE 2004
                    </span>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-tight block leading-tight">
                      Fire Protection Engineers
                    </span>
                  </div>
                </div>

                {/* Column 2 (Center): Main Title Block */}
                <div className="text-center">
                  <h1
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-600 leading-none"
                    style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                  >
                    SLN Fire Service
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold italic text-black mt-1">
                    All Types of Fire Extinguishers and Equipments
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1.5 text-xs font-semibold text-black">
                    <span>We are supplying of all</span>
                    {/* Realistic Official ISI Mark Inline SVG */}
                    <span className="inline-flex items-center mx-0.5" title="ISI Certified">
                      <svg
                        className="h-4.5 w-auto"
                        viewBox="0 0 72 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="ISI Mark"
                      >
                        <rect x="1" y="1" width="70" height="30" rx="3" stroke="#000000" strokeWidth="1.6" fill="#ffffff" />
                        <rect x="3.5" y="3.5" width="65" height="25" rx="1.5" stroke="#000000" strokeWidth="0.8" fill="none" />
                        <text
                          x="36"
                          y="21"
                          textAnchor="middle"
                          fill="#000000"
                          fontFamily="'Arial Black', Arial, sans-serif"
                          fontSize="17"
                          fontWeight="900"
                          letterSpacing="2.5"
                        >
                          ISI
                        </text>
                      </svg>
                    </span>
                    <span>Marked products</span>
                  </div>
                </div>

                {/* Column 3 (Right): Date field */}
                <div className="text-right flex flex-col items-end justify-end pb-1">
                  <div className="text-xs text-black font-mono">Date:</div>
                  <div className="text-sm font-bold text-black font-mono border-b border-black pb-0.5 min-w-[85px] text-right">
                    {quoteDate}
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* 2. RECIPIENT ("TO:" BLOCK), SUBJECT & INTRO PARAGRAPH           */}
            {/* =============================================================== */}
            <div className="mb-4 text-xs leading-relaxed text-black">
              <div className="space-y-0.5">
                <p className="text-black font-medium">To,</p>
                <p className="text-black font-semibold">The Manager,</p>
                <p className="text-sm font-bold text-black uppercase tracking-wide">
                  {customerName || 'CUSTOMER / COMPANY NAME'}
                </p>
                <p className="text-black whitespace-pre-line font-medium">
                  {customerAddress || 'Karnataka'}
                </p>
              </div>
            </div>

            {/* Salutation, Subject & Attention */}
            <div className="mb-2 space-y-0.5 text-xs text-black">
              <p className="text-black font-medium">Dear Sir/Madam,</p>
              <p className="font-extrabold text-black tracking-wide text-xs">
                Sub: QUOTATION FOR SUPPLYING OF FIRE EQUIPMENTS
              </p>
              <p className="font-bold text-black text-xs">
                Kind Attn: {attentionTo || 'Sir / Madam'}
              </p>
            </div>

            {/* Intro Text */}
            <p className="text-xs text-black leading-relaxed mb-3 text-justify font-medium">
              With Reference to the Discussion our Sales Executive {salesExecutive || 'Mr. JAGADISH'}, had, we are pleased to quote our lowest rate for the following items:
            </p>

            {/* =============================================================== */}
            {/* 3. EXACT QUOTATION TABLE WITH EXPLICIT WHITE BG & BLACK BORDERS  */}
            {/* =============================================================== */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black bg-white text-black mt-4 mb-4 text-xs">
                <thead>
                  <tr className="bg-white border-b border-black text-black font-bold text-xs">
                    <th className="py-2 px-3 text-center border-r border-black w-12 bg-white text-black">
                      SL. NO.
                    </th>
                    <th className="py-2 px-3 border-r border-black text-left bg-white text-black">
                      DESCRIPTION
                    </th>
                    <th className="py-2 px-3 text-center border-r border-black w-20 bg-white text-black">
                      UNIT
                    </th>
                    <th className="py-2 px-3 text-right border-r border-black w-24 bg-white text-black">
                      RATE
                    </th>
                    <th className="py-2 px-3 text-right w-28 bg-white text-black">
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black">
                  {items.length === 0 ? (
                    <tr className="bg-white text-black">
                      <td
                        colSpan={5}
                        className="py-6 text-center text-black italic text-xs bg-white"
                      >
                        No items added to quotation. Please add products from the catalog.
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => {
                      const lineAmount = item.isPriceOnRequest
                        ? 0
                        : item.unitPrice * item.quantity;

                      // Construct formal description matching official letterhead
                      const servicePrefix =
                        item.serviceType === 'refill' ? 'Refilling of' : 'Supplying of';
                      const materialText = item.material ? ` (${item.material})` : '';
                      const desc = `${servicePrefix} ${item.name} ${item.capacityLabel}${materialText} ISI Marked`;

                      return (
                        <tr
                          key={item.id}
                          className="border-b border-black text-xs text-black bg-white"
                        >
                          <td className="py-2 px-3 text-center border-r border-black font-medium bg-white text-black">
                            {index + 1}
                          </td>
                          <td className="py-2 px-3 border-r border-black font-medium bg-white text-black">
                            <span className="font-semibold block text-black">{desc}</span>
                            <span className="text-[10px] text-black font-mono block">
                              Class: {item.fireClass} | {item.standard}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center border-r border-black font-semibold whitespace-nowrap bg-white text-black">
                            {String(item.quantity).padStart(2, '0')} NOS
                          </td>
                          <td className="py-2 px-3 text-right border-r border-black font-mono bg-white text-black">
                            {item.isPriceOnRequest ? (
                              <span className="italic text-black text-[10px]">On Request</span>
                            ) : (
                              `${formatInr(item.unitPrice)}`
                            )}
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-semibold bg-white text-black">
                            {item.isPriceOnRequest ? (
                              <span className="italic text-black text-[10px]">Quoted Sep.</span>
                            ) : (
                              `${formatInr(lineAmount)}`
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}

                  {/* THREE REQUIRED BOTTOM SUMMARY ROWS */}
                  <tr className="border-t-2 border-black font-bold text-xs bg-white text-black">
                    <td
                      colSpan={4}
                      className="py-2 px-3 text-right uppercase border-r border-black tracking-wider text-xs bg-white text-black"
                    >
                      TOTAL AMOUNT
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-xs bg-white text-black">
                      ₹ {formatInr(subtotal)}
                    </td>
                  </tr>
                  <tr className="border-t border-black font-bold text-xs bg-white text-black">
                    <td
                      colSpan={4}
                      className="py-2 px-3 text-right uppercase border-r border-black tracking-wider text-xs bg-white text-black"
                    >
                      GSTIN @ 18%
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-xs bg-white text-black">
                      ₹ {formatInr(gstAmount)}
                    </td>
                  </tr>
                  <tr className="border-t-2 border-black font-extrabold text-sm bg-white text-black">
                    <td
                      colSpan={4}
                      className="py-2 px-3 text-right uppercase border-r border-black tracking-wider text-xs bg-white text-black"
                    >
                      GRAND TOTAL AMOUNT
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-extrabold text-sm text-black bg-white">
                      ₹ {formatInr(grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Wrap the signatory and bottom terms/address blocks with the class "qm-keep" to prevent page breaks */}
            <div className="qm-keep">
              {/* =============================================================== */}
              {/* 4. TERMS & CONDITIONS SECTION                                    */}
              {/* =============================================================== */}
              <div className="qm-keep mt-8 pt-4 border-t border-black bg-white text-black">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {/* Left Side */}
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-black text-xs uppercase tracking-wide">
                      WOULD YOU GIVE US ORDER...?
                    </h4>
                    <ol className="list-none space-y-0.5 text-black text-[11px]">
                      <li>1) We are fire extinguishers sales and service</li>
                      <li>2) We will give all products with high class quality</li>
                      <li>3) Our products will be supplied with ISI and Test certificate</li>
                      <li>4) We have 100+ satisfied clients</li>
                      <li>5) 50% Advance Payment</li>
                    </ol>
                  </div>

                  {/* Right Side */}
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-black text-xs uppercase tracking-wide">
                      TERMS &amp; CONDITION
                    </h4>
                    <ol className="list-none space-y-0.5 text-black text-[11px]">
                      <li>1) GSTIN @ 18% extra</li>
                      <li>2) Warranty 1 year</li>
                      <li>3) Delivery within 12 hours</li>
                      <li>4) Payment after installation of fire extinguishers</li>
                      <li>5) Quotation valid for 30 days.</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* =============================================================== */}
              {/* 5. SIGNATORY, TAGLINE & OFFICIAL FOOTER                         */}
              {/* =============================================================== */}
              <div className="qm-keep mt-6 pt-2 bg-white text-black">
                {/* Signatory Box (Bottom LEFT) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-3 gap-3">
                  <div className="text-left">
                    <p className="text-xs text-black font-medium">Yours truly,</p>
                    <p className="text-xs font-extrabold text-black uppercase tracking-wider mt-0.5">
                      For SLN FIRE SERVICE
                    </p>
                    <div className="h-12 flex items-center justify-start">
                      <span className="text-[10px] text-gray-500 font-mono italic">
                        [Official Stamp / Seal]
                      </span>
                    </div>
                    <p className="text-xs font-bold text-black border-t border-black pt-0.5 inline-block min-w-[150px]">
                      Authorized Signatory
                    </p>
                  </div>
                </div>

                {/* Note: Perfectly CENTERED at the bottom */}
                <div className="text-center text-[10px] text-gray-600 italic py-1">
                  Note:- Prices are subject to change without any prior intimation
                </div>

                {/* Bottom Center Bold Tag */}
                <div className="text-center py-1 border-t border-b border-black my-2">
                  <span className="font-black text-xs tracking-widest text-black uppercase">
                    SAFETY IS OUR PRIORITY
                  </span>
                </div>

                {/* Bottom Contact Details Footer with exact updated address */}
                <div className="text-center text-[10px] text-black leading-normal space-y-0.5 pt-1">
                  <p className="font-semibold text-black">
                    #18/1, Arehalli, ittumadu main road, near basavanna temple, Bengaluru 560061, Karnataka
                  </p>
                  <p className="font-semibold font-mono text-black">
                    Mob.: 9945437741, 9448536741 | E-mail: dhanush.slnfire@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCREEN FOOTER ACTIONS                                              */}
      {/* =================================================================== */}
      <div className="qm-no-print print:hidden no-print p-4 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Total {totalUnits} {totalUnits === 1 ? 'item' : 'items'} in quote | Total ₹{formatInr(grandTotal)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsQuotationOpen(false)}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrintQuotation}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Letterhead</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

return typeof document !== 'undefined'
  ? createPortal(modalContent, document.body)
  : modalContent;
};
