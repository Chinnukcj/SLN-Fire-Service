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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-5xl w-full text-zinc-100 shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
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
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-zinc-800/40 flex justify-center">
          {/* A4 PAPER CONTAINER */}
          <div
            id="printable-quotation-root"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black p-8 sm:p-10 shadow-2xl rounded-sm flex flex-col justify-between"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: '#000000',
              backgroundColor: '#ffffff'
            }}
          >
            <div>
              {/* =============================================================== */}
              {/* 1. OFFICIAL LETTERHEAD HEADER                                   */}
              {/* =============================================================== */}
              <div className="relative border-b-2 border-red-600 pb-4 mb-5 min-h-[96px]">
                {/* Logo Block: Positioned absolute left-0 top-0, object-contain, with SINCE 2004 under */}
                <div className="absolute left-0 top-0 flex flex-col items-center z-10">
                  <div className="w-[58px] h-[58px] flex items-center justify-center">
                    <CompanyLogo size={58} className="object-contain" />
                  </div>
                  <div className="mt-1.5 text-center">
                    <span className="text-[10px] sm:text-[11px] font-black tracking-wider text-slate-900 uppercase block font-sans">
                      SINCE 2004
                    </span>
                    <span className="text-[8.5px] font-bold text-red-700 uppercase tracking-tight block leading-tight">
                      Fire Protection Engineers
                    </span>
                  </div>
                </div>

                {/* Main Title Block: Perfectly Centered on the page */}
                <div className="w-full text-center px-24 sm:px-28">
                  <h1
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#b91c1c] leading-none"
                    style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                  >
                    SLN Fire Service
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold italic text-slate-900 mt-1">
                    All Types of Fire Extinguishers and Equipments
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1.5 text-[11px] font-semibold text-slate-800">
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

                {/* Top Right Date Box: Lowered by mt-4 to visually align with title */}
                <div className="absolute right-0 top-0 mt-4 text-right z-10">
                  <div className="text-[11px] text-slate-500 font-mono">Date:</div>
                  <div className="text-xs font-bold text-slate-900 font-mono border-b border-slate-400 pb-0.5 min-w-[75px] text-right">
                    {quoteDate}
                  </div>
                </div>
              </div>

              {/* =============================================================== */}
              {/* 2. RECIPIENT & SUBJECT METADATA                                 */}
              {/* =============================================================== */}
              <div className="flex justify-between items-start mb-4 text-xs leading-relaxed">
                <div className="space-y-0.5">
                  <p className="text-slate-600 font-medium">To,</p>
                  <p className="text-slate-800 font-semibold">The Manager,</p>
                  <p className="text-sm font-bold text-black uppercase tracking-wide">
                    {customerName || 'CUSTOMER / COMPANY NAME'}
                  </p>
                  <p className="text-slate-700 whitespace-pre-line font-medium">
                    {customerAddress || 'Karnataka'}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <div className="inline-block bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-[11px] font-bold text-slate-800">
                    SINCE 2004
                  </div>
                </div>
              </div>

              {/* Salutation, Subject & Attention */}
              <div className="mb-3 space-y-1 text-xs">
                <p className="text-slate-800">Dear Sir/Madam,</p>
                <p className="font-extrabold text-black tracking-wide text-xs">
                  Sub: QUOTATION FOR SUPPLYING OF FIRE EQUIPMENTS
                </p>
                <p className="font-bold text-slate-900 text-xs">
                  Kind Attn: {attentionTo || 'Sir / Madam'}
                </p>
              </div>

              {/* Intro Text matching requested format */}
              <p className="text-[11px] text-slate-700 leading-relaxed mb-4 text-justify">
                Further to your discussion with Mr. Jagadish, we are pleased to present our official quotation for the supply and certified refilling of fire safety equipment. We look forward to securing your facility with ISI-certified protection and prompt service.
              </p>

              {/* =============================================================== */}
              {/* 3. EXACT QUOTATION TABLE                                        */}
              {/* =============================================================== */}
              <div className="mb-4 overflow-hidden border border-black">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-black text-black font-bold text-[11px]">
                      <th className="py-1.5 px-2 text-center border-r border-black w-12">
                        SL. NO.
                      </th>
                      <th className="py-1.5 px-3 border-r border-black">
                        DESCRIPTION
                      </th>
                      <th className="py-1.5 px-3 text-center border-r border-black w-20">
                        UNIT
                      </th>
                      <th className="py-1.5 px-3 text-right border-r border-black w-24">
                        RATE
                      </th>
                      <th className="py-1.5 px-3 text-right w-28">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-6 text-center text-slate-500 italic text-xs"
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
                            className="border-b border-black text-[11px] text-black"
                          >
                            <td className="py-1.5 px-2 text-center border-r border-black font-medium">
                              {index + 1}
                            </td>
                            <td className="py-1.5 px-3 border-r border-black font-medium">
                              <span className="font-semibold block">{desc}</span>
                              <span className="text-[10px] text-slate-600 font-mono">
                                Class: {item.fireClass} | {item.standard}
                              </span>
                            </td>
                            <td className="py-1.5 px-3 text-center border-r border-black font-semibold whitespace-nowrap">
                              {String(item.quantity).padStart(2, '0')} NOS
                            </td>
                            <td className="py-1.5 px-3 text-right border-r border-black font-mono">
                              {item.isPriceOnRequest ? (
                                <span className="italic text-slate-600 text-[10px]">On Request</span>
                              ) : (
                                `${formatInr(item.unitPrice)}`
                              )}
                            </td>
                            <td className="py-1.5 px-3 text-right font-mono font-semibold">
                              {item.isPriceOnRequest ? (
                                <span className="italic text-slate-600 text-[10px]">Quoted Sep.</span>
                              ) : (
                                `${formatInr(lineAmount)}`
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}

                    {/* THREE REQUIRED BOTTOM SUMMARY ROWS */}
                    <tr className="border-t-2 border-black font-bold text-xs bg-slate-50">
                      <td
                        colSpan={4}
                        className="py-1.5 px-3 text-right uppercase border-r border-black tracking-wider text-[11px]"
                      >
                        TOTAL AMOUNT
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono font-bold text-xs">
                        ₹ {formatInr(subtotal)}
                      </td>
                    </tr>
                    <tr className="border-t border-black font-bold text-xs bg-slate-50">
                      <td
                        colSpan={4}
                        className="py-1.5 px-3 text-right uppercase border-r border-black tracking-wider text-[11px]"
                      >
                        GSTIN @ 18%
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono font-bold text-xs">
                        ₹ {formatInr(gstAmount)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-black font-extrabold text-sm bg-slate-100">
                      <td
                        colSpan={4}
                        className="py-2 px-3 text-right uppercase border-r border-black tracking-wider text-xs"
                      >
                        GRAND TOTAL AMOUNT
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-extrabold text-sm text-black">
                        ₹ {formatInr(grandTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* =============================================================== */}
              {/* 4. TERMS & CONDITIONS SECTION (EXACT 2 COLUMNS)                 */}
              {/* =============================================================== */}
              <div className="grid grid-cols-2 gap-4 text-[11px] mb-6 pt-1 border-t border-slate-300">
                {/* Left Side */}
                <div className="space-y-1">
                  <h4 className="font-extrabold text-black text-[11px] uppercase tracking-wide">
                    WOULD YOU GIVE US ORDER...?
                  </h4>
                  <ol className="list-none space-y-0.5 text-slate-800 text-[10.5px]">
                    <li>1) We are fire extinguishers sales and service</li>
                    <li>2) We will give all products with high class quality</li>
                    <li>3) Our products will be supplied with ISI and Test certificate</li>
                    <li>4) We have 100+ satisfied clients</li>
                    <li>5) 50% Advance Payment</li>
                  </ol>
                </div>

                {/* Right Side */}
                <div className="space-y-1">
                  <h4 className="font-extrabold text-black text-[11px] uppercase tracking-wide">
                    TERMS &amp; CONDITION
                  </h4>
                  <ol className="list-none space-y-0.5 text-slate-800 text-[10.5px]">
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
            <div className="pt-2">
              {/* Signatory Box (Moved to bottom LEFT) & Note (Moved to bottom CENTER) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-3 gap-3">
                {/* Signatory Block - Bottom LEFT */}
                <div className="text-left">
                  <p className="text-[11px] text-slate-800 font-medium">Yours truly,</p>
                  <p className="text-xs font-extrabold text-black uppercase tracking-wider mt-0.5">
                    For SLN FIRE SERVICE
                  </p>
                  <div className="h-10 flex items-center justify-start">
                    <span className="text-[10px] text-slate-400 font-mono italic">
                      [Official Stamp / Seal]
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 border-t border-slate-500 pt-0.5 inline-block min-w-[150px]">
                    Authorized Signatory
                  </p>
                </div>
              </div>

              {/* Note: Perfectly CENTERED at the bottom */}
              <div className="text-center text-[10px] text-slate-600 italic py-1">
                Note:- Prices are subject to change without any prior intimation
              </div>

              {/* Bottom Center Bold Tag */}
              <div className="text-center py-1 border-t border-b border-black my-2">
                <span className="font-black text-xs tracking-widest text-black uppercase">
                  SAFETY IS OUR PRIORITY
                </span>
              </div>

              {/* Bottom Contact Details Footer with exact updated address */}
              <div className="text-center text-[10px] text-slate-800 leading-tight space-y-0.5 pt-1">
                <p className="font-semibold text-slate-900">
                  #18/1, Arehalli, ittumadu main road, near basavanna temple, Bengaluru 560061, Karnataka
                </p>
                <p className="font-semibold font-mono">
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
