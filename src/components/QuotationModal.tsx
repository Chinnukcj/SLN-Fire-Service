import React, { useState } from 'react';
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

  const handlePrint = () => {
    window.print();
  };

  const formatInr = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="quotation-modal-backdrop fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="quotation-modal-dialog bg-zinc-900 border border-zinc-800 rounded-2xl max-w-5xl w-full text-zinc-100 shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* =================================================================== */}
        {/* SCREEN-ONLY TOOLBAR / CONTROLS (HIDDEN DURING PRINT)                */}
        {/* =================================================================== */}
        <div className="no-print p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
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
              onClick={handlePrint}
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
        <div className="no-print p-4 bg-zinc-950/50 border-b border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs shrink-0">
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
        <div className="quotation-scroll-area flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-zinc-800/40 flex justify-center">
          {/* A4 PAPER CONTAINER */}
          <div
            id="printable-quotation"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black p-4 sm:p-6 shadow-2xl rounded-sm flex flex-col justify-between"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: '#000000',
              backgroundColor: '#ffffff'
            }}
          >
            <div>
              {/* =============================================================== */}
              {/* 1. OFFICIAL LETTERHEAD HEADER (AGGRESSIVELY COMPRESSED)         */}
              {/* =============================================================== */}
              <div className="grid grid-cols-3 items-end border-b-2 border-red-600 pb-2 mb-2">
                {/* Column 1 (Left): Logo & SINCE 2004 text */}
                <div className="text-left flex flex-col items-start justify-end">
                  <div className="w-[42px] h-[42px] flex items-center justify-start">
                    <CompanyLogo size={42} className="object-contain" />
                  </div>
                  <div className="mt-0.5 text-left">
                    <span className="text-[9.5px] font-black tracking-wider text-slate-900 uppercase block font-sans leading-tight">
                      SINCE 2004
                    </span>
                    <span className="text-[8px] font-bold text-red-700 uppercase tracking-tight block leading-tight">
                      Fire Protection Engineers
                    </span>
                  </div>
                </div>

                {/* Column 2 (Center): Main Title Block strictly on ONE line */}
                <div className="text-center">
                  <h1
                    className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#b91c1c] leading-none whitespace-nowrap"
                    style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                  >
                    SLN Fire Service
                  </h1>
                  <p className="text-[10px] sm:text-[11px] font-semibold italic text-slate-900 mt-0.5 whitespace-nowrap leading-tight">
                    All Types of Fire Extinguishers and Equipments
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-0.5 text-[9.5px] font-semibold text-slate-800 leading-tight">
                    <span>We are supplying of all</span>
                    {/* Realistic Official ISI Mark Inline SVG */}
                    <span className="inline-flex items-center mx-0.5" title="ISI Certified">
                      <svg
                        className="h-3.5 w-auto"
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
                <div className="text-right flex flex-col items-end justify-end pb-0.5">
                  <div className="text-[9.5px] text-slate-500 font-mono leading-tight">Date:</div>
                  <div className="text-[11px] font-bold text-slate-900 font-mono border-b border-slate-400 pb-0.5 min-w-[70px] text-right leading-tight">
                    {quoteDate}
                  </div>
                </div>
              </div>

              {/* =============================================================== */}
              {/* 2. RECIPIENT & SUBJECT METADATA (TIGHT LINE SPACING)            */}
              {/* =============================================================== */}
              <div className="flex justify-between items-start mb-1 text-[11px] leading-tight">
                <div className="space-y-0.5">
                  <p className="text-slate-600 font-medium text-[10px] leading-none">To,</p>
                  <p className="text-slate-800 font-semibold text-[10.5px] leading-tight">The Manager,</p>
                  <p className="text-[11px] font-bold text-black uppercase tracking-wide leading-tight">
                    {customerName || 'CUSTOMER / COMPANY NAME'}
                  </p>
                  <p className="text-slate-700 whitespace-pre-line font-medium text-[10px] leading-tight">
                    {customerAddress || 'Karnataka'}
                  </p>
                </div>
              </div>

              {/* Salutation, Subject & Attention */}
              <div className="mb-1 space-y-0.5 text-[10.5px] leading-tight">
                <p className="text-slate-800 text-[10px]">Dear Sir/Madam,</p>
                <p className="font-extrabold text-black tracking-wide text-[10.5px]">
                  Sub: QUOTATION FOR SUPPLYING OF FIRE EQUIPMENTS
                </p>
                <p className="font-bold text-slate-900 text-[10px]">
                  Kind Attn: {attentionTo || 'Sir / Madam'}
                </p>
              </div>

              {/* Intro Text matching requested format with snug line-height */}
              <p className="text-[10px] text-slate-700 leading-snug mb-1.5 text-justify">
                Further to your discussion with Mr. Jagadish, we are pleased to present our official quotation for the supply and certified refilling of fire safety equipment. We look forward to securing your facility with ISI-certified protection and prompt service.
              </p>

              {/* =============================================================== */}
              {/* 3. EXACT QUOTATION TABLE (ABSOLUTE MINIMAL px-2 py-1 PADDING)   */}
              {/* =============================================================== */}
              <div className="mb-1.5 overflow-hidden border border-black">
                <table className="w-full text-left text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-black text-black font-bold text-[10px]">
                      <th className="py-1 px-2 text-center border-r border-black w-10">
                        SL. NO.
                      </th>
                      <th className="py-1 px-2 border-r border-black">
                        DESCRIPTION
                      </th>
                      <th className="py-1 px-2 text-center border-r border-black w-16">
                        UNIT
                      </th>
                      <th className="py-1 px-2 text-right border-r border-black w-20">
                        RATE
                      </th>
                      <th className="py-1 px-2 text-right w-24">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                       <tr>
                        <td
                          colSpan={5}
                          className="py-3 text-center text-slate-500 italic text-[10px]"
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
                            className="border-b border-black text-[10px] text-black leading-tight"
                          >
                            <td className="py-1 px-2 text-center border-r border-black font-medium">
                              {index + 1}
                            </td>
                            <td className="py-1 px-2 border-r border-black font-medium">
                              <span className="font-semibold block leading-tight">{desc}</span>
                              <span className="text-[9px] text-slate-600 font-mono leading-none">
                                Class: {item.fireClass} | {item.standard}
                              </span>
                            </td>
                            <td className="py-1 px-2 text-center border-r border-black font-semibold whitespace-nowrap">
                              {String(item.quantity).padStart(2, '0')} NOS
                            </td>
                            <td className="py-1 px-2 text-right border-r border-black font-mono whitespace-nowrap">
                              {item.isPriceOnRequest ? (
                                <span className="italic text-slate-600 text-[9px]">On Request</span>
                              ) : (
                                `${formatInr(item.unitPrice)}`
                              )}
                            </td>
                            <td className="py-1 px-2 text-right font-mono font-semibold whitespace-nowrap">
                              {item.isPriceOnRequest ? (
                                <span className="italic text-slate-600 text-[9px]">Quoted Sep.</span>
                              ) : (
                                `${formatInr(lineAmount)}`
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}

                    {/* THREE REQUIRED BOTTOM SUMMARY ROWS */}
                    <tr className="border-t-2 border-black font-bold text-[10px] bg-slate-50 leading-tight">
                      <td
                        colSpan={4}
                        className="py-1 px-2 text-right uppercase border-r border-black tracking-wider text-[10px]"
                      >
                        TOTAL AMOUNT
                      </td>
                      <td className="py-1 px-2 text-right font-mono font-bold text-[10.5px]">
                        ₹ {formatInr(subtotal)}
                      </td>
                    </tr>
                    <tr className="border-t border-black font-bold text-[10px] bg-slate-50 leading-tight">
                      <td
                        colSpan={4}
                        className="py-1 px-2 text-right uppercase border-r border-black tracking-wider text-[10px]"
                      >
                        GSTIN @ 18%
                      </td>
                      <td className="py-1 px-2 text-right font-mono font-bold text-[10.5px]">
                        ₹ {formatInr(gstAmount)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-black font-extrabold text-[11px] bg-slate-100 leading-tight">
                      <td
                        colSpan={4}
                        className="py-1 px-2 text-right uppercase border-r border-black tracking-wider text-[10.5px]"
                      >
                        GRAND TOTAL AMOUNT
                      </td>
                      <td className="py-1 px-2 text-right font-mono font-extrabold text-[11px] text-black">
                        ₹ {formatInr(grandTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* =============================================================== */}
            {/* 4. TERMS, SIGNATURE & OFFICIAL FOOTER (PAGE-BREAK-AVOID BLOCK)  */}
            {/* =============================================================== */}
            <div className="break-inside-avoid page-break-inside-avoid mt-auto pt-0.5 space-y-1">
              {/* TERMS & CONDITIONS SECTION (EXACT 2 COLUMNS) */}
              <div className="grid grid-cols-2 gap-2 text-[9.5px] pt-1 border-t border-slate-300 leading-tight">
                {/* Left Side */}
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-black text-[9.5px] uppercase tracking-wide leading-tight">
                    WOULD YOU GIVE US ORDER...?
                  </h4>
                  <ol className="list-none space-y-0.5 text-slate-800 text-[9px] leading-tight">
                    <li>1) We are fire extinguishers sales and service</li>
                    <li>2) We will give all products with high class quality</li>
                    <li>3) Our products will be supplied with ISI and Test certificate</li>
                    <li>4) We have 100+ satisfied clients</li>
                    <li>5) 50% Advance Payment</li>
                  </ol>
                </div>

                {/* Right Side */}
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-black text-[9.5px] uppercase tracking-wide leading-tight">
                    TERMS &amp; CONDITION
                  </h4>
                  <ol className="list-none space-y-0.5 text-slate-800 text-[9px] leading-tight">
                    <li>1) GSTIN @ 18% extra</li>
                    <li>2) Warranty 1 year</li>
                    <li>3) Delivery within 12 hours</li>
                    <li>4) Payment after installation of fire extinguishers</li>
                    <li>5) Quotation valid for 30 days.</li>
                  </ol>
                </div>
              </div>

              {/* Signatory Box (Bottom LEFT) - Squeezed height */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1 pt-0.5 leading-tight">
                <div className="text-left">
                  <p className="text-[9.5px] text-slate-800 font-medium leading-none">Yours truly,</p>
                  <p className="text-[10px] font-extrabold text-black uppercase tracking-wider mt-0.5 leading-tight">
                    For SLN FIRE SERVICE
                  </p>
                  <div className="h-7 flex items-center justify-start">
                    <span className="text-[9px] text-slate-400 font-mono italic leading-none">
                      [Official Stamp / Seal]
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-900 border-t border-slate-500 pt-0.5 inline-block min-w-[130px] leading-tight">
                    Authorized Signatory
                  </p>
                </div>
              </div>

              {/* Note: Perfectly CENTERED at the bottom */}
              <div className="text-center text-[9px] text-slate-600 italic py-0.5 leading-none">
                Note:- Prices are subject to change without any prior intimation
              </div>

              {/* Bottom Center Bold Tag */}
              <div className="text-center py-0.5 border-t border-b border-black my-0.5 leading-none">
                <span className="font-black text-[10px] tracking-widest text-black uppercase">
                  SAFETY IS OUR PRIORITY
                </span>
              </div>

              {/* Bottom Contact Details Footer with exact updated address & zero bottom margin */}
              <div className="text-center text-[9px] text-slate-800 leading-tight space-y-0.5 pt-0 pb-0 mb-0">
                <p className="font-semibold text-slate-900 leading-tight">
                  #18/1, Arehalli, ittumadu main road, near basavanna temple, Bengaluru 560061, Karnataka
                </p>
                <p className="font-semibold font-mono leading-tight">
                  Mob.: 9945437741, 9448536741 | E-mail: dhanush.slnfire@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SCREEN FOOTER ACTIONS                                              */}
        {/* =================================================================== */}
        <div className="no-print p-4 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs">
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
              onClick={handlePrint}
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
};
