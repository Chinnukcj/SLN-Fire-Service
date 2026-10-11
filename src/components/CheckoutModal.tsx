import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  MessageSquare,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  PhoneCall,
  Building,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    subtotal,
    gstRate,
    gstAmount,
    cgstAmount,
    sgstAmount,
    grandTotal,
    totalUnits,
    isCheckoutOpen,
    setIsCheckoutOpen
  } = useCart();

  // Client inquiry form details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [gstin, setGstin] = useState('');
  const [requirements, setRequirements] = useState('');

  const [copiedQuote, setCopiedQuote] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [rfqNumber] = useState(
    () => `SLN-RFQ-${Math.floor(100000 + Math.random() * 900000)}`
  );

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    const errors: string[] = [];
    if (!clientName.trim()) errors.push('Please enter your full contact name.');
    if (!clientPhone.trim()) errors.push('Please enter your WhatsApp/Phone number.');
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      errors.push('Please enter a valid email address.');
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const generateQuoteText = () => {
    const formattedSubtotal = new Intl.NumberFormat('en-IN').format(subtotal);
    const formattedGst = new Intl.NumberFormat('en-IN').format(gstAmount);
    const formattedTotal = new Intl.NumberFormat('en-IN').format(grandTotal);

    let itemsText = items
      .map((item, idx) => {
        const sType = item.serviceType === 'buy-new' ? 'Buy New' : 'Refill';
        const mat = item.material ? ` - ${item.material}` : '';
        const priceInfo = item.isPriceOnRequest
          ? 'Price on Request / RFQ'
          : `Unit Base: ₹${new Intl.NumberFormat('en-IN').format(item.unitPrice)} | Subtotal: ₹${new Intl.NumberFormat('en-IN').format(item.unitPrice * item.quantity)}`;
        return `${idx + 1}. [${sType}] ${item.name} [${item.capacityLabel}${mat}]\n   Qty: ${item.quantity} | ${priceInfo}`;
      })
      .join('\n');

    return (
`==============================================
FORMAL RFQ & QUOTATION INQUIRY
SLN FIRE SERVICE | Ref: ${rfqNumber}
==============================================

FACILITY & OFFICE:
#18/1 Arehalli, Ittumadu Main Road, Near Basavanna Temple, Bengaluru 560061

CLIENT DETAILS:
• Contact Name: ${clientName || 'Not specified'}
• Phone/WhatsApp: ${clientPhone || 'Not specified'}
• Email ID: ${clientEmail || 'Not specified'}
• Company/Site: ${companyName || 'Not specified'}
• Location: ${location || '#18/1 Arehalli, Ittumadu Main Road, Near Basavanna Temple, Bengaluru 560061'}
• GSTIN: ${gstin || 'Unregistered / Not provided'}

ITEMS SUMMARY (${totalUnits} Total Units):
${itemsText}

TAX & PRICE BREAKDOWN:
• Taxable Subtotal (Base): ₹${formattedSubtotal}
• GST (18% Applicable): ₹${formattedGst} (CGST 9% + SGST 9%)
• Estimated Grand Total Quote: ₹${formattedTotal}

SPECIAL REQUIREMENTS / SCOPE:
${requirements ? `• ${requirements}` : '• Please verify current stock availability, formal quotation, and dispatch schedule.'}

Direct Contact:
SLN Fire Service | Dhanush
Phone: +91 9945437741 / +91 9448536741
Email: dhanush.slnfire@gmail.com
Address: #18/1 Arehalli, Ittumadu Main Road, Near Basavanna Temple, Bengaluru 560061
==============================================`
    );
  };

  const handleWhatsAppInquiry = () => {
    if (!validateForm()) return;

    const formattedSubtotal = new Intl.NumberFormat('en-IN').format(subtotal);
    const formattedGst = new Intl.NumberFormat('en-IN').format(gstAmount);
    const formattedTotal = new Intl.NumberFormat('en-IN').format(grandTotal);

    const itemsSummary = items
      .map((item, idx) => {
        const sType = item.serviceType === 'buy-new' ? 'Buy New' : 'Refill';
        const mat = item.material ? ` - ${item.material}` : '';
        const priceStr = item.isPriceOnRequest
          ? 'Price on Request'
          : `₹${new Intl.NumberFormat('en-IN').format(item.unitPrice * item.quantity)}`;
        return `${idx + 1}. *[${sType}]* ${item.name} (${item.capacityLabel}${mat}) × ${item.quantity} = ${priceStr}`;
      })
      .join('\n');

    const message = (
`*SLN FIRE SERVICE - QUOTATION & AVAILABILITY INQUIRY*
*Ref:* ${rfqNumber}
*Office:* #18/1 Arehalli, Ittumadu Main Road, Near Basavanna Temple, Bengaluru 560061

*CLIENT DETAILS:*
• *Name:* ${clientName}
• *Phone:* ${clientPhone}
• *Email:* ${clientEmail}
${companyName ? `• *Company:* ${companyName}\n` : ''}${location ? `• *Location:* ${location}\n` : ''}${gstin ? `• *GSTIN:* ${gstin}\n` : ''}
*PRODUCTS & SERVICES SUMMARY (${totalUnits} Units):*
${itemsSummary}

*PRICE & GST (18%) BREAKDOWN:*
• *Taxable Subtotal:* ₹${formattedSubtotal}
• *GST (18%):* ₹${formattedGst} (9% CGST + 9% SGST)
• *Grand Total Quote:* *₹${formattedTotal}*

${requirements ? `*Notes / Scope:* ${requirements}\n\n` : ''}Please verify stock availability, dispatch timeline, and share the official tax invoice quote to my email/WhatsApp.`
    );

    const waUrl = `https://wa.me/919945437741?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setInquirySubmitted(true);
  };

  const handleEmailInquiry = () => {
    if (!validateForm()) return;

    const subject = `[RFQ ${rfqNumber}] Fire Protection Equipment & Quote Request - ${companyName || clientName}`;
    const body = generateQuoteText();

    const mailtoUrl = `mailto:dhanush.slnfire@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setInquirySubmitted(true);
  };

  const handleCopyQuote = () => {
    const text = generateQuoteText();
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#121215] border border-zinc-800 rounded-3xl max-w-4xl w-full text-zinc-100 shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0 bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono">
                Formal RFQ Inquiry
              </span>
              <span className="text-zinc-500">/</span>
              <span className="text-xs text-amber-400 font-mono font-medium">{rfqNumber}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
              Review Quote & Inquire
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {inquirySubmitted ? (
            <div className="p-8 text-center space-y-4 bg-zinc-900/50 border border-emerald-500/30 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Successfully Initiated!</h3>
              <p className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed">
                Your quote request for reference <strong className="text-white font-mono">{rfqNumber}</strong> has been routed directly to <strong>Dhanush</strong> at SLN Fire Service via your selected channel.
              </p>
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Direct WhatsApp:</span>
                  <a href="https://wa.me/919945437741" target="_blank" rel="noreferrer" className="text-emerald-400 font-mono hover:underline">
                    +91 9945437741
                  </a>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Direct Email:</span>
                  <a href="mailto:dhanush.slnfire@gmail.com" className="text-zinc-200 font-mono hover:underline">
                    dhanush.slnfire@gmail.com
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setInquirySubmitted(false);
                    setIsCheckoutOpen(false);
                  }}
                  className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl transition-all"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* SECTION 1: DETAILED PRODUCTS SUMMARY */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      1. Products & Services Summary
                    </h3>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">
                    {totalUnits} Total Units
                  </span>
                </div>

                <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/70">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 font-mono text-[11px]">
                          <th className="py-3 px-4">Item & Specification</th>
                          <th className="py-3 px-3">Class / Standard</th>
                          <th className="py-3 px-3 text-right">Unit Base</th>
                          <th className="py-3 px-3 text-center">Qty</th>
                          <th className="py-3 px-4 text-right">Line Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {items.map((item) => (
                          <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                {item.imageUrl && (
                                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 p-0.5 overflow-hidden">
                                    <img
                                      src={item.imageUrl}
                                      alt={item.name}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        const filename = item.imageUrl?.split('/').pop();
                                        if (filename && !e.currentTarget.src.endsWith(`/images/${filename}`)) {
                                          e.currentTarget.src = `/images/${filename}`;
                                        }
                                      }}
                                    />
                                  </div>
                                )}
                                <div>
                                  <span className="font-semibold text-zinc-100 block">{item.name}</span>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[10px] font-mono px-1 rounded bg-zinc-800 text-zinc-300 font-semibold">
                                      {item.serviceType === 'buy-new' ? 'Buy New' : 'Refill'}
                                    </span>
                                    <span className="text-[11px] text-amber-400 font-mono">{item.capacityLabel}</span>
                                    {item.material && (
                                      <span className="text-[10px] text-zinc-400 font-mono">({item.material})</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-zinc-400 font-mono text-[11px]">
                              <span>Class {item.fireClass}</span>
                              <span className="block text-[10px] text-zinc-400">{item.standard.split('/')[0]}</span>
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-zinc-300">
                              {item.isPriceOnRequest ? (
                                <span className="text-amber-400 text-[11px]">Quote on Req.</span>
                              ) : (
                                `₹${new Intl.NumberFormat('en-IN').format(item.unitPrice)}`
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-semibold text-white">
                              {item.quantity}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-white">
                              {item.isPriceOnRequest ? (
                                <span className="text-amber-400 text-[11px]">POR</span>
                              ) : (
                                `₹${new Intl.NumberFormat('en-IN').format(item.unitPrice * item.quantity)}`
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* SECTION 2: FULL DESCRIPTION ABOUT PRICE & GST (18%) */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-zinc-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    2. Price & GST (18%) Tax Description
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Detailed Calculation Card */}
                  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <span className="text-xs font-semibold text-zinc-300 block mb-1">
                      Statutory Commercial Computation
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>Taxable Value (Base Price):</span>
                        <span className="font-mono text-zinc-200">
                          ₹{new Intl.NumberFormat('en-IN').format(subtotal)}
                        </span>
                      </div>

                      <div className="flex justify-between text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <span>Central GST (CGST @ 9%):</span>
                        </div>
                        <span className="font-mono text-zinc-200">
                          ₹{new Intl.NumberFormat('en-IN').format(cgstAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <span>State GST (SGST @ 9%):</span>
                        </div>
                        <span className="font-mono text-zinc-200">
                          ₹{new Intl.NumberFormat('en-IN').format(sgstAmount)}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-zinc-800 flex justify-between text-amber-400 font-semibold">
                        <span>Total 18% GST Amount:</span>
                        <span className="font-mono">
                          + ₹{new Intl.NumberFormat('en-IN').format(gstAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between text-zinc-400 text-[11px]">
                        <span>Delivery & Refilling Logistics:</span>
                        <span className="text-emerald-400 font-medium">Included in City Quote</span>
                      </div>

                      <div className="pt-3 border-t border-zinc-700/80 flex justify-between items-baseline">
                        <div>
                          <span className="text-sm font-extrabold text-white block">
                            Grand Total Estimated Quote:
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Inclusive of all taxes & certificates
                          </span>
                        </div>
                        <span className="text-2xl font-black text-white font-mono">
                          ₹{new Intl.NumberFormat('en-IN').format(grandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* GST & Regulatory Terms Explanatory Card */}
                  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between text-xs text-zinc-400 leading-relaxed space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-200 mb-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        GST Compliance & Tax Invoice Note
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Under Indian Tax Regulations for Fire Fighting Equipment (HSN Code 8424), all new fire extinguishers and certified refilling services attract a standard <strong>18% GST</strong>.
                      </p>
                      <ul className="mt-2 space-y-1.5 text-[11px] text-zinc-300">
                        <li className="flex items-start gap-1.5">
                          <span className="text-zinc-500">✓</span>
                          <span><strong>100% Input Tax Credit (ITC) Eligible:</strong> If you supply your company GSTIN, an official tax invoice will be issued so your business can claim back the 18% tax credit.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-zinc-500">✓</span>
                          <span><strong>IS: 15683 Testing & Warranty:</strong> Includes valid annual inspection tag, ISI marking, and manufacturer pressure compliance certificate.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 flex items-center gap-2">
                      <span className="text-emerald-400 font-semibold shrink-0 font-mono">Karnataka / Inter-State:</span>
                      <span>Intrastate quotes bill CGST 9% + SGST 9%. Inter-state delivery bills 18% IGST directly.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: CLIENT DETAILS FOR INQUIRY */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  3. Your Contact & Site Information
                </h3>

                {formErrors.length > 0 && (
                  <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <div>
                      {formErrors.map((err, i) => (
                        <p key={i}>{err}</p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Phone / WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Company / Organization Name <span className="text-zinc-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Tech Park / Apex Industries"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Site Location / City <span className="text-zinc-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Peenya Industrial Area, Bangalore"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Company GSTIN <span className="text-zinc-500">(For 18% Input Tax Credit Quote)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 29AAAAA0000A1Z5"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Additional Requirements / Scope Notes <span className="text-zinc-500">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need urgent installation on 3 floors; NOC fire audit renewal due next week; requesting on-site cylinder hydro testing."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors text-xs"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 4: SEAMLESS COMMUNICATION ACTIONS */}
              <section className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      4. Send Formal Quote Inquiry
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Dispatched instantly to Dhanush at SLN Fire Services for immediate quote & stock confirmation.
                    </p>
                  </div>

                  {/* Copy Quote Button */}
                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    {copiedQuote ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied RFQ Summary!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Quote Text</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Primary Dual Inquiry CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp Action */}
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Inquire via WhatsApp</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-100/90 font-normal">
                      Send breakdown to +91 9945437741
                    </span>
                  </button>

                  {/* Email Action */}
                  <button
                    type="button"
                    onClick={handleEmailInquiry}
                    className="py-3.5 px-6 bg-zinc-100 hover:bg-white text-zinc-950 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>Inquire via Email Request</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-600 font-normal">
                      dhanush.slnfire@gmail.com
                    </span>
                  </button>
                </div>

                {/* Direct Communication Hotline Bar */}
                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-amber-400" />
                    <span>Direct Call Hotline (Dhanush):</span>
                  </div>
                  <div className="flex items-center gap-4 font-mono font-semibold text-zinc-200">
                    <a href="tel:+919945437741" className="hover:text-white transition-colors">
                      +91 9945437741
                    </a>
                    <span className="text-zinc-600">|</span>
                    <a href="tel:+919448536741" className="hover:text-white transition-colors">
                      +91 9448536741
                    </a>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
