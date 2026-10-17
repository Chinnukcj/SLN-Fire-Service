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

    const itemCount = items.length;
    const isSpacious = itemCount <= 3;
    const isMedium = itemCount >= 4 && itemCount <= 7;
    const isCompact = itemCount >= 8;

    // Dynamic Density Configuration based on item count
    const density = {
      baseFontSize: isCompact ? '10px' : isMedium ? '11.5px' : '12.5px',
      baseLineHeight: isCompact ? '1.25' : isMedium ? '1.4' : '1.5',
      headerPadding: isCompact ? '5mm 12mm 4px 12mm' : isMedium ? '7mm 12mm 6px 12mm' : '9mm 12mm 8px 12mm',
      companyTitleSize: isCompact ? '24px' : isMedium ? '28px' : '32px',
      companySubSize: isCompact ? '11px' : isMedium ? '12px' : '13px',
      logoSize: isCompact ? 50 : isMedium ? 58 : 64,
      introMarginBottom: isCompact ? '6px' : isMedium ? '10px' : '16px',
      introLineHeight: isCompact ? '1.25' : isMedium ? '1.45' : '1.65',
      introFontSize: isCompact ? '10.5px' : isMedium ? '11.5px' : '12px',
      tableFontSize: isCompact ? '9.5px' : isMedium ? '11px' : '12px',
      tableCellPadding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px',
      tableMargin: isCompact ? '6px 0' : isMedium ? '10px 0' : '14px 0',
      bottomSectionMarginTop: isSpacious ? '18px' : 'auto',
      termsFontSize: isCompact ? '9px' : isMedium ? '10px' : '11px',
      termsLineHeight: isCompact ? '1.2' : isMedium ? '1.35' : '1.45',
      termsMarginTop: isCompact ? '4px' : isMedium ? '8px' : '12px',
      signatoryGap: isCompact ? '16px' : isMedium ? '28px' : '42px',
      footerMarginTop: isCompact ? '6px' : isMedium ? '10px' : '14px',
    };

    const rowsHtml = items.length > 0
      ? items.map((item, idx) => {
          const servicePrefix = item.serviceType === 'refill' ? 'Refilling of' : 'Supplying of';
          const materialText = item.material ? ` (${item.material})` : '';
          const desc = `${servicePrefix} ${item.name} ${item.capacityLabel}${materialText} ISI Marked`;
          const rateText = item.isPriceOnRequest ? 'On Request' : item.unitPrice.toFixed(2);
          const amountText = item.isPriceOnRequest
            ? 'Quoted Sep.'
            : (item.unitPrice * item.quantity).toFixed(2);

          const descHtml = isCompact
            ? `<strong>${desc}</strong> <span style="font-size: 8.5px; color: #444; font-family: monospace; margin-left: 6px;">[Class: ${item.fireClass} | ${item.standard}]</span>`
            : `<strong>${desc}</strong>
               <div style="font-size: 9.5px; color: #333; font-family: monospace; margin-top: 2px;">Class: ${item.fireClass} | ${item.standard}</div>`;

          return `
          <tr>
            <td style="text-align:center; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">${idx + 1}</td>
            <td style="padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">
              ${descHtml}
            </td>
            <td style="text-align:center; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize}; white-space: nowrap;">${String(item.quantity).padStart(2, '0')} NOS</td>
            <td style="text-align:right; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">${rateText}</td>
            <td style="text-align:right; font-weight:bold; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">${amountText}</td>
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
            margin: 0 !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm;
            ${itemCount <= 14 ? 'height: 297mm; max-height: 297mm; overflow: hidden;' : 'min-height: 297mm;'}
            display: flex;
            flex-direction: column;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif;
            font-size: ${density.baseFontSize};
            line-height: ${density.baseLineHeight};
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .header-banner {
            width: 100%;
            background-color: #dcebf7 !important;
            margin: 0 !important;
            padding: ${density.headerPadding} !important;
            border-bottom: 2.5px solid #cc0000;
            box-sizing: border-box;
            flex-shrink: 0;
          }
          .header-table {
            width: 100%;
            border-collapse: collapse;
            background: transparent;
          }
          .content-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: ${isCompact ? '8px 12mm 6mm 12mm' : isMedium ? '10px 12mm 8mm 12mm' : '14px 12mm 10mm 12mm'} !important;
            box-sizing: border-box;
          }
          .intro-section {
            line-height: ${density.introLineHeight};
            margin-bottom: ${density.introMarginBottom};
            font-size: ${density.introFontSize};
          }
          .quote-table {
            width: 100%;
            border-collapse: collapse;
            margin: ${density.tableMargin};
          }
          .quote-table th, .quote-table td {
            border: 1px solid #000000;
            padding: ${density.tableCellPadding};
            font-size: ${density.tableFontSize};
          }
          .quote-table th {
            background-color: #f3f4f6;
            font-weight: bold;
            text-transform: uppercase;
          }
          .bottom-pinned-section {
            margin-top: ${density.bottomSectionMarginTop};
            padding-top: ${isCompact ? '4px' : '8px'};
            page-break-inside: avoid;
          }
          .terms-grid {
            width: 100%;
            margin-top: ${density.termsMarginTop};
            border-collapse: collapse;
          }
          .terms-grid td {
            width: 50%;
            vertical-align: top;
            padding-right: 10px;
            font-size: ${density.termsFontSize};
            line-height: ${density.termsLineHeight};
          }
          .footer-block {
            margin-top: ${density.footerMarginTop};
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
                <svg width="${density.logoSize}" height="${density.logoSize}" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 6px; border: 1.5px solid #1c398e; display: block;">
                  <rect width="400" height="400" fill="#ffffff" rx="16" />
                  <rect x="6" y="6" width="388" height="388" fill="none" stroke="#1c398e" stroke-width="8" rx="12" />
                  <rect x="22" y="22" width="356" height="180" fill="#1b3992" />
                  <text x="200" y="152" text-anchor="middle" fill="#ffffff" font-family="'Times New Roman', Georgia, serif" font-size="148" font-weight="800" letter-spacing="-3">SLN</text>
                  <rect x="22" y="202" width="356" height="142" fill="#e01e2b" />
                  <text x="200" y="300" text-anchor="middle" fill="#ffffff" font-family="'Brush Script MT', cursive" font-size="76" font-weight="700" font-style="italic">Fire Service</text>
                  <rect x="22" y="344" width="356" height="34" fill="#ffffff" />
                  <text x="200" y="370" text-anchor="middle" fill="#1b3992" font-family="Arial, sans-serif" font-size="24" font-weight="700">Fire Protection Engineers</text>
                </svg>
                <div style="font-size: 10px; font-weight: bold; margin-top: 3px;">
                  SINCE 2004<br/>
                  <span style="font-size: 8.5px; color: #cc0000;">FIRE PROTECTION ENGINEERS</span>
                </div>
              </td>
              <td style="width: 56%; text-align: center; vertical-align: middle;">
                <h1 style="color: #c00000; font-size: ${density.companyTitleSize}; font-weight: 900; margin: 0; line-height: 1.05; letter-spacing: 0.5px; font-family: 'Arial Black', Arial, sans-serif;">SLN Fire Service</h1>
                <div style="font-size: ${density.companySubSize}; font-weight: bold; font-style: italic; margin: 2px 0;">All Types of Fire Extinguishers and Equipments</div>
                <div style="font-size: 11px; font-weight: bold; margin-top: 2px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <span>We are supplying of all</span>
                  <svg style="height: 17px; width: 42px; vertical-align: middle;" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="70" height="30" rx="3" stroke="#000000" stroke-width="1.6" fill="#ffffff" />
                    <rect x="3.5" y="3.5" width="65" height="25" rx="1.5" stroke="#000000" stroke-width="0.8" fill="none" />
                    <text x="36" y="21" text-anchor="middle" fill="#000000" font-family="'Arial Black', Arial, sans-serif" font-size="17" font-weight="900" letter-spacing="2.5">ISI</text>
                  </svg>
                  <span>Marked products</span>
                </div>
              </td>
              <td style="width: 20%; text-align: right; vertical-align: bottom; font-size: 12px;">
                <strong>Date:</strong> ${quoteDate || new Date().toLocaleDateString('en-GB')}
              </td>
            </tr>
          </table>
        </div>

      <!-- Padded wrapper for everything below the red line -->
      <div class="content-body">
        <!-- RECIPIENT & INTRO (BALANCED BREATHING ROOM) -->
        <div class="intro-section">
          <div style="margin-bottom: ${isCompact ? '4px' : '8px'};">
            <div>To,</div>
            <div style="font-weight: 600;">The Manager,</div>
            <div style="font-weight: bold; font-size: ${isCompact ? '12px' : '13.5px'}; text-transform: uppercase;">${customerName || 'CUSTOMER / COMPANY NAME'}</div>
            <div style="white-space: pre-line;">${customerAddress || 'Bengaluru, Karnataka'}</div>
          </div>

          <div style="margin-bottom: ${isCompact ? '4px' : '8px'};">
            <div>Dear Sir/Madam,</div>
            <div style="font-weight: 800; font-size: ${isCompact ? '11px' : '12.5px'}; margin-top: 2px;">Sub: QUOTATION FOR SUPPLYING OF FIRE EQUIPMENTS</div>
            <div style="font-weight: 700; margin-top: 2px;">Kind Attn: ${attentionTo || 'Sir / Madam'}</div>
          </div>

          <p style="margin: 0; text-align: justify; line-height: ${density.introLineHeight};">
            Further to your discussion with Mr. Jagadish, we are pleased to present our official quotation for the supply and certified refilling of fire safety equipment. We look forward to securing your facility with ISI-certified protection and prompt service.
          </p>
        </div>

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
              <td colspan="4" style="text-align: right; font-weight: bold; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">TOTAL AMOUNT</td>
              <td style="text-align: right; font-weight: bold; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">₹ ${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right; font-weight: bold; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">GSTIN @ 18%</td>
              <td style="text-align: right; font-weight: bold; padding: ${density.tableCellPadding}; font-size: ${density.tableFontSize};">₹ ${calculatedGst.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right; font-weight: bold; padding: ${density.tableCellPadding}; font-size: ${isCompact ? '11px' : '12.5px'};">GRAND TOTAL AMOUNT</td>
              <td style="text-align: right; font-weight: bold; padding: ${density.tableCellPadding}; font-size: ${isCompact ? '11px' : '12.5px'};">₹ ${calculatedGrand.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <!-- BOTTOM SECTION (TERMS, SIGNATORY & FOOTER WITH DYNAMIC BALANCED DISTRIBUTION) -->
        <div class="bottom-pinned-section">
          <!-- TERMS & CONDITIONS -->
          <table class="terms-grid">
            <tr>
              <td>
                <div style="font-weight: bold; margin-bottom: 2px;">WOULD YOU GIVE US ORDER...?</div>
                1) We are fire extinguishers sales and service<br/>
                2) We will give all products with high class quality<br/>
                3) Our products will be supplied with ISI and Test certificate<br/>
                4) We have 100+ satisfied clients<br/>
                5) 50% Advance Payment
              </td>
              <td>
                <div style="font-weight: bold; margin-bottom: 2px;">TERMS & CONDITION</div>
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
            <div style="margin-top: ${isCompact ? '4px' : '8px'};">
              <div style="font-size: ${isCompact ? '10px' : '11.5px'};">Yours truly,</div>
              <div style="font-weight: bold; font-size: ${isCompact ? '10px' : '11.5px'}; margin-top: 1px;">FOR SLN FIRE SERVICE</div>
              <div style="height: ${density.signatoryGap};"></div>
              <div style="font-weight: bold; font-size: ${isCompact ? '10px' : '11.5px'}; border-top: 1px solid #000; display: inline-block; padding-top: 2px;">Authorized Signatory</div>
            </div>

            <div style="text-align: center; margin-top: ${isCompact ? '4px' : '8px'};">
              <div style="font-size: ${isCompact ? '8.5px' : '9.5px'}; font-style: italic;">Note:- Prices are subject to change without any prior intimation</div>
              <div style="font-weight: 900; font-size: ${isCompact ? '10px' : '11.5px'}; letter-spacing: 1px; margin: 3px 0; border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; padding: 2px 0;">
                SAFETY IS OUR PRIORITY
              </div>
              <div style="font-weight: bold; font-size: ${isCompact ? '9px' : '10.5px'}; margin-top: 3px;">
                #18/1, Arehalli, ittumadu main road, near basavanna temple, Bengaluru 560061, Karnataka<br/>
                Mob.: 9945437741, 9448536741 | E-mail: dhanush.slnfire@gmail.com
              </div>
            </div>
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

  const itemCount = items.length;
  const isSpacious = itemCount <= 3;
  const isMedium = itemCount >= 4 && itemCount <= 7;
  const isCompact = itemCount >= 8;

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
              className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] mx-auto p-0 overflow-hidden font-sans shadow-lg flex flex-col print:shadow-none print:p-0 print:max-w-full print:w-full"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: '#000000',
                backgroundColor: '#ffffff',
                minHeight: '297mm',
                fontSize: isCompact ? '10px' : isMedium ? '11.5px' : '12.5px',
                lineHeight: isCompact ? '1.25' : isMedium ? '1.4' : '1.5'
              }}
            >
            {/* =============================================================== */}
            {/* 1. TOP HEADER BANNER (FULL-BLEED LIGHT BLUE #dcebf7)           */}
            {/* =============================================================== */}
            <div
              className="w-full bg-[#dcebf7] px-[12mm] border-b-2 border-red-600 text-black shrink-0"
              style={{
                paddingTop: isCompact ? '5mm' : isMedium ? '7mm' : '9mm',
                paddingBottom: isCompact ? '5px' : isMedium ? '7px' : '8px'
              }}
            >
              <div className="grid grid-cols-3 items-end">
                {/* Column 1 (Left): Logo & SINCE 2004 text */}
                <div className="text-left flex flex-col items-start justify-end">
                  <div className="flex items-center justify-start">
                    <CompanyLogo size={isCompact ? 52 : isMedium ? 60 : 66} className="object-contain" />
                  </div>
                  <div className="mt-1 text-left">
                    <span className="text-[11px] font-black tracking-wider text-black uppercase block font-sans">
                      SINCE 2004
                    </span>
                    <span className="text-[9.5px] font-bold text-red-600 uppercase tracking-tight block leading-tight">
                      Fire Protection Engineers
                    </span>
                  </div>
                </div>

                {/* Column 2 (Center): Main Title Block */}
                <div className="text-center">
                  <h1
                    className="font-extrabold tracking-tight text-red-600 leading-none"
                    style={{
                      fontFamily: "'Arial Black', Arial, sans-serif",
                      fontSize: isCompact ? '24px' : isMedium ? '28px' : '32px'
                    }}
                  >
                    SLN Fire Service
                  </h1>
                  <p
                    className="font-semibold italic text-black mt-1"
                    style={{ fontSize: isCompact ? '11px' : isMedium ? '12px' : '13px' }}
                  >
                    All Types of Fire Extinguishers and Equipments
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1 font-semibold text-black" style={{ fontSize: isCompact ? '10px' : '11px' }}>
                    <span>We are supplying of all</span>
                    {/* Realistic Official ISI Mark Inline SVG */}
                    <span className="inline-flex items-center mx-0.5" title="ISI Certified">
                      <svg
                        className="w-auto"
                        style={{ height: isCompact ? '15px' : '18px' }}
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

            {/* PADDED CONTENT BODY FOR EVERYTHING BELOW THE RED LINE */}
            <div
              className="content-body flex-1 flex flex-col px-[12mm] text-black"
              style={{
                paddingTop: isCompact ? '8px' : isMedium ? '10px' : '14px',
                paddingBottom: isCompact ? '6mm' : isMedium ? '8mm' : '10mm'
              }}
            >

            {/* =============================================================== */}
            {/* 2. RECIPIENT ("TO:" BLOCK), SUBJECT & INTRO PARAGRAPH           */}
            {/* =============================================================== */}
            <div
              className="intro-section text-black"
              style={{
                marginBottom: isCompact ? '6px' : isMedium ? '10px' : '16px',
                lineHeight: isCompact ? 1.25 : isMedium ? 1.45 : 1.65,
                fontSize: isCompact ? '10.5px' : isMedium ? '11.5px' : '12px'
              }}
            >
              <div style={{ marginBottom: isCompact ? '4px' : '8px' }}>
                <p className="text-black font-medium">To,</p>
                <p className="text-black font-semibold">The Manager,</p>
                <p className="font-bold text-black uppercase tracking-wide" style={{ fontSize: isCompact ? '12px' : '13.5px' }}>
                  {customerName || 'CUSTOMER / COMPANY NAME'}
                </p>
                <p className="text-black whitespace-pre-line font-medium">
                  {customerAddress || 'Bengaluru, Karnataka'}
                </p>
              </div>

              <div style={{ marginBottom: isCompact ? '4px' : '8px' }}>
                <p className="text-black font-medium">Dear Sir/Madam,</p>
                <p className="font-extrabold text-black tracking-wide" style={{ fontSize: isCompact ? '11px' : '12.5px', marginTop: '2px' }}>
                  Sub: QUOTATION FOR SUPPLYING OF FIRE EQUIPMENTS
                </p>
                <p className="font-bold text-black" style={{ fontSize: isCompact ? '10.5px' : '11.5px', marginTop: '2px' }}>
                  Kind Attn: {attentionTo || 'Sir / Madam'}
                </p>
              </div>

              <p className="text-black text-justify font-medium" style={{ margin: 0 }}>
                Further to your discussion with Mr. Jagadish, we are pleased to present our official quotation for the supply and certified refilling of fire safety equipment. We look forward to securing your facility with ISI-certified protection and prompt service.
              </p>
            </div>

            {/* =============================================================== */}
            {/* 3. EXACT QUOTATION TABLE WITH EXPLICIT WHITE BG & BLACK BORDERS  */}
            {/* =============================================================== */}
            <div className="overflow-x-auto">
              <table
                className="w-full border-collapse border border-black bg-white text-black"
                style={{
                  margin: isCompact ? '6px 0' : isMedium ? '10px 0' : '14px 0',
                  fontSize: isCompact ? '9.5px' : isMedium ? '11px' : '12px'
                }}
              >
                <thead>
                  <tr className="bg-white border-b border-black text-black font-bold">
                    <th style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }} className="text-center border-r border-black w-12 bg-white text-black">
                      SL. NO.
                    </th>
                    <th style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }} className="border-r border-black text-left bg-white text-black">
                      DESCRIPTION
                    </th>
                    <th style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }} className="text-center border-r border-black w-20 bg-white text-black">
                      UNIT
                    </th>
                    <th style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }} className="text-right border-r border-black w-24 bg-white text-black">
                      RATE
                    </th>
                    <th style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }} className="text-right w-28 bg-white text-black">
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black">
                  {items.length === 0 ? (
                    <tr className="bg-white text-black">
                      <td
                        colSpan={5}
                        className="py-6 text-center text-black italic bg-white"
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
                          className="border-b border-black text-black bg-white"
                        >
                          <td
                            style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                            className="text-center border-r border-black font-medium bg-white text-black"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                            className="border-r border-black font-medium bg-white text-black"
                          >
                            {isCompact ? (
                              <div>
                                <span className="font-semibold text-black">{desc}</span>
                                <span className="text-[8.5px] text-zinc-600 font-mono ml-1.5 font-normal whitespace-nowrap">
                                  [Class: {item.fireClass} | {item.standard}]
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span className="font-semibold block text-black">{desc}</span>
                                <span className="text-[9.5px] text-zinc-600 font-mono block mt-0.5">
                                  Class: {item.fireClass} | {item.standard}
                                </span>
                              </div>
                            )}
                          </td>
                          <td
                            style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                            className="text-center border-r border-black font-semibold whitespace-nowrap bg-white text-black"
                          >
                            {String(item.quantity).padStart(2, '0')} NOS
                          </td>
                          <td
                            style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                            className="text-right border-r border-black font-mono bg-white text-black"
                          >
                            {item.isPriceOnRequest ? (
                              <span className="italic text-black text-[10px]">On Request</span>
                            ) : (
                              `${formatInr(item.unitPrice)}`
                            )}
                          </td>
                          <td
                            style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                            className="text-right font-mono font-semibold bg-white text-black"
                          >
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
                  <tr className="border-t-2 border-black font-bold bg-white text-black">
                    <td
                      colSpan={4}
                      style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                      className="text-right uppercase border-r border-black tracking-wider bg-white text-black"
                    >
                      TOTAL AMOUNT
                    </td>
                    <td
                      style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                      className="text-right font-mono font-bold bg-white text-black"
                    >
                      ₹ {formatInr(subtotal)}
                    </td>
                  </tr>
                  <tr className="border-t border-black font-bold bg-white text-black">
                    <td
                      colSpan={4}
                      style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                      className="text-right uppercase border-r border-black tracking-wider bg-white text-black"
                    >
                      GSTIN @ 18%
                    </td>
                    <td
                      style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                      className="text-right font-mono font-bold bg-white text-black"
                    >
                      ₹ {formatInr(gstAmount)}
                    </td>
                  </tr>
                  <tr className="border-t-2 border-black font-extrabold bg-white text-black">
                    <td
                      colSpan={4}
                      style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                      className="text-right uppercase border-r border-black tracking-wider bg-white text-black"
                    >
                      GRAND TOTAL AMOUNT
                    </td>
                    <td
                      style={{ padding: isCompact ? '2.5px 5px' : isMedium ? '4.5px 6px' : '8px 8px' }}
                      className="text-right font-mono font-extrabold text-black bg-white"
                    >
                      ₹ {formatInr(grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BOTTOM PINNED SECTION (TERMS, SIGNATORY & FOOTER WITH DYNAMIC BALANCED DISTRIBUTION) */}
            <div
              className="bottom-pinned-section qm-keep"
              style={{
                marginTop: isSpacious ? '18px' : 'auto',
                paddingTop: isCompact ? '4px' : '8px'
              }}
            >
              {/* =============================================================== */}
              {/* 4. TERMS & CONDITIONS SECTION                                    */}
              {/* =============================================================== */}
              <div
                className="qm-keep border-t border-black bg-white text-black"
                style={{
                  paddingTop: isCompact ? '4px' : '8px',
                  fontSize: isCompact ? '9px' : isMedium ? '10px' : '11px',
                  lineHeight: isCompact ? 1.2 : isMedium ? 1.35 : 1.45
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Side */}
                  <div className="space-y-0.5">
                    <h4
                      className="font-extrabold text-black uppercase tracking-wide"
                      style={{ fontSize: isCompact ? '9.5px' : isMedium ? '10.5px' : '11.5px', marginBottom: '2px' }}
                    >
                      WOULD YOU GIVE US ORDER...?
                    </h4>
                    <ol className="list-none space-y-0.5 text-black">
                      <li>1) We are fire extinguishers sales and service</li>
                      <li>2) We will give all products with high class quality</li>
                      <li>3) Our products will be supplied with ISI and Test certificate</li>
                      <li>4) We have 100+ satisfied clients</li>
                      <li>5) 50% Advance Payment</li>
                    </ol>
                  </div>

                  {/* Right Side */}
                  <div className="space-y-0.5">
                    <h4
                      className="font-extrabold text-black uppercase tracking-wide"
                      style={{ fontSize: isCompact ? '9.5px' : isMedium ? '10.5px' : '11.5px', marginBottom: '2px' }}
                    >
                      TERMS &amp; CONDITION
                    </h4>
                    <ol className="list-none space-y-0.5 text-black">
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
              <div
                className="qm-keep bg-white text-black"
                style={{ marginTop: isCompact ? '6px' : isMedium ? '10px' : '14px' }}
              >
                {/* Signatory Box (Bottom LEFT) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                  <div className="text-left">
                    <p className="text-black font-medium" style={{ fontSize: isCompact ? '10px' : '11.5px' }}>Yours truly,</p>
                    <p
                      className="font-extrabold text-black uppercase tracking-wider mt-0.5"
                      style={{ fontSize: isCompact ? '10px' : '11.5px' }}
                    >
                      For SLN FIRE SERVICE
                    </p>
                    <div
                      style={{ height: isCompact ? '18px' : isMedium ? '28px' : '42px' }}
                      className="flex items-center justify-start"
                    >
                      <span
                        className="text-gray-400 font-mono italic"
                        style={{ fontSize: isCompact ? '8.5px' : '9.5px' }}
                      >
                        [Authorized Seal / Stamp]
                      </span>
                    </div>
                    <p
                      className="font-bold text-black border-t border-black pt-0.5 inline-block"
                      style={{ fontSize: isCompact ? '10px' : '11.5px', minWidth: isCompact ? '120px' : '150px' }}
                    >
                      Authorized Signatory
                    </p>
                  </div>
                </div>

                {/* Note: Perfectly CENTERED at the bottom */}
                <div
                  className="text-center text-gray-600 italic"
                  style={{
                    fontSize: isCompact ? '8.5px' : '9.5px',
                    padding: isCompact ? '1px 0' : '2px 0',
                    marginTop: isCompact ? '3px' : '6px'
                  }}
                >
                  Note:- Prices are subject to change without any prior intimation
                </div>

                {/* Bottom Center Bold Tag */}
                <div
                  className="text-center border-t border-b border-black"
                  style={{
                    padding: isCompact ? '1.5px 0' : '3px 0',
                    margin: isCompact ? '2px 0' : '4px 0'
                  }}
                >
                  <span
                    className="font-black tracking-widest text-black uppercase"
                    style={{ fontSize: isCompact ? '10px' : '11.5px' }}
                  >
                    SAFETY IS OUR PRIORITY
                  </span>
                </div>

                {/* Bottom Contact Details Footer with exact updated address */}
                <div
                  className="text-center text-black leading-normal space-y-0.5"
                  style={{ fontSize: isCompact ? '9px' : '10.5px' }}
                >
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
