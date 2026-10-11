import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Wrench, CheckCircle2, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

interface RefillOption {
  id: string;
  name: string;
  type: string;
  size: string;
  pricePerUnit: number;
  testStandard: string;
}

const REFILL_OPTIONS: RefillOption[] = [
  {
    id: 'refill-abc-4kg',
    name: 'ABC Dry Powder Refilling (4 KG)',
    type: 'ABC Stored Pressure',
    size: '4 KG',
    pricePerUnit: 220,
    testStandard: 'Nitrogen 15 Bar + New O-Ring'
  },
  {
    id: 'refill-abc-6kg',
    name: 'ABC Dry Powder Refilling (6 KG)',
    type: 'ABC Stored Pressure',
    size: '6 KG',
    pricePerUnit: 255,
    testStandard: 'Nitrogen 15 Bar + Hydro Testing'
  },
  {
    id: 'refill-co2-45kg',
    name: 'CO₂ Gas Refilling & PESO Valve (4.5 KG)',
    type: 'CO2 High Pressure',
    size: '4.5 KG',
    pricePerUnit: 360,
    testStandard: 'Food Grade 99.9% CO2 + Tare Weight Check'
  },
  {
    id: 'refill-co2-2kg',
    name: 'CO₂ Gas Refilling (2 KG)',
    type: 'CO2 High Pressure',
    size: '2 KG',
    pricePerUnit: 180,
    testStandard: 'High Pressure Re-charge'
  },
  {
    id: 'refill-foam-9l',
    name: 'Mechanical Foam (AFFF) Refill (9 Litre)',
    type: 'AFFF Aqueous Blanket',
    size: '9 Litre',
    pricePerUnit: 295,
    testStandard: 'Foam Concentrate 3% + Chamber Flush'
  },
  {
    id: 'refill-modular-5kg',
    name: 'Automatic Modular Ceiling Refill (5 KG)',
    type: 'Ceiling Modular Sensor',
    size: '5 KG',
    pricePerUnit: 445,
    testStandard: 'Bulb Integrity Check + Dry Powder'
  }
];

export const RefillSection: React.FC = () => {
  const { addItem, setIsCartOpen } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'refill-abc-4kg': 4,
    'refill-co2-45kg': 2
  });

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const calculateSubtotal = () => {
    return REFILL_OPTIONS.reduce((sum, opt) => {
      const qty = quantities[opt.id] || 0;
      return sum + opt.pricePerUnit * qty;
    }, 0);
  };

  const refillSubtotal = calculateSubtotal();
  const refillGst = Math.round(refillSubtotal * 0.18);
  const refillTotal = refillSubtotal + refillGst;
  const totalRefillCylinders = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleAddAllToCart = () => {
    REFILL_OPTIONS.forEach((opt) => {
      const qty = quantities[opt.id] || 0;
      if (qty > 0) {
        addItem(
          {
            productId: opt.id,
            name: opt.name,
            serviceType: 'refill',
            capacityLabel: opt.size,
            capacityValue: opt.id,
            unitPrice: opt.pricePerUnit,
            fireClass: opt.type,
            standard: opt.testStandard,
            category: 'refilling'
          },
          qty
        );
      }
    });
    setIsCartOpen(true);
  };

  const handleDirectWhatsAppRefill = () => {
    const lines = REFILL_OPTIONS.filter((opt) => (quantities[opt.id] || 0) > 0)
      .map(
        (opt) =>
          `• ${opt.name} × ${quantities[opt.id]} = ₹${new Intl.NumberFormat('en-IN').format(opt.pricePerUnit * quantities[opt.id])}`
      )
      .join('\n');

    const msg = `*SLN FIRE SERVICE - REFILLING & HYDRO-TESTING INQUIRY*
Total Cylinders for Service: ${totalRefillCylinders}
*Office:* #18/1 Arehalli, Ittumadu Main Road, Near Basavanna Temple, Bengaluru 560061

*SELECTED CYLINDER REFILL BATCH:*
${lines}

*ESTIMATED REFILL QUOTE:*
• Base Subtotal: ₹${new Intl.NumberFormat('en-IN').format(refillSubtotal)}
• 18% GST: ₹${new Intl.NumberFormat('en-IN').format(refillGst)}
• Estimated Total: ₹${new Intl.NumberFormat('en-IN').format(refillTotal)}

Please confirm on-site pick up / technician visit for hydro-testing and certificate issuance.`;

    window.open(`https://wa.me/919945437741?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="refilling" className="py-16 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>On-Site Service & Hydro-Testing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white font-display mt-2 tracking-tight">
            Certified Refilling & Maintenance
          </h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Annual re-charging, hydraulic pressure testing at 35 to 250 Bar, nitrogen pressurization, and official Fire Department NOC compliance certificates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Refilling Cylinder Selection Matrix */}
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>Cylinder Type & Service Specification</span>
                <span>Select Quantity</span>
              </div>

              <div className="divide-y divide-zinc-800/60 p-2">
                {REFILL_OPTIONS.map((opt) => {
                  const qty = quantities[opt.id] || 0;
                  return (
                    <div
                      key={opt.id}
                      className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 rounded-xl transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-white">{opt.name}</h3>
                          <span className="text-[10px] text-zinc-400 font-mono font-medium">
                            {opt.size}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                          {opt.testStandard}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-white block">
                            ₹{new Intl.NumberFormat('en-IN').format(opt.pricePerUnit)}
                          </span>
                          <span className="text-[10px] text-zinc-500">per cylinder</span>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(opt.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg transition-colors text-xs"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-white font-mono">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(opt.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg transition-colors text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Service Features Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Hydro-testing at 35 Bar</span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Fresh Nitrogen Charge</span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Annual Audit NOC Tags</span>
              </div>
            </div>
          </div>

          {/* Real-time Refill Batch Calculator Card */}
          <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold font-mono block mb-1">
                Batch Estimate
              </span>
              <h3 className="text-lg font-bold text-white">Refill Calculation Summary</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Configured for {totalRefillCylinders} cylinder{totalRefillCylinders === 1 ? '' : 's'}.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Taxable Base Refill Amount:</span>
                <span className="font-mono text-zinc-200">
                  ₹{new Intl.NumberFormat('en-IN').format(refillSubtotal)}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>GST (18% Applicable):</span>
                <span className="font-mono text-amber-400 font-medium">
                  + ₹{new Intl.NumberFormat('en-IN').format(refillGst)}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400 text-[11px]">
                <span>On-Site Inspection & Pickup:</span>
                <span className="text-emerald-400 font-medium">Free for 5+ units</span>
              </div>

              <div className="pt-3 border-t border-zinc-700/80 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-white block">Total Estimated Quote:</span>
                  <span className="text-[10px] text-zinc-500">Includes replacement O-rings & tags</span>
                </div>
                <span className="text-xl font-black text-white font-mono">
                  ₹{new Intl.NumberFormat('en-IN').format(refillTotal)}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddAllToCart}
                disabled={totalRefillCylinders === 0}
                className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-white disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Add Refill Batch to Quote Cart
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppRefill}
                disabled={totalRefillCylinders === 0}
                className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                Inquire Refill on WhatsApp (9945437741)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
