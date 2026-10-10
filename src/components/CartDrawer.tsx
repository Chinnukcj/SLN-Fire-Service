import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { ProductIllustration } from './ProductIllustrations';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    gstRate,
    gstAmount,
    grandTotal,
    totalUnits,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121215] border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300">
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-display">Inquiry & Quote Cart</h2>
                <p className="text-xs text-zinc-400">
                  {totalUnits} {totalUnits === 1 ? 'item' : 'items'} selected for RFQ
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-zinc-500">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-300">Your Inquiry Cart is Empty</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Add fire extinguishers, refilling batches, or safety gear to generate a full tax breakdown and quote request.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              items.map((item) => {
                const lineTotal = item.unitPrice * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex gap-3.5 hover:border-zinc-700 transition-colors"
                  >
                    {/* Small preview thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                      <ProductIllustration type={item.productId} className="w-full h-full" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-zinc-400 hover:text-red-400 p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                          <span className="text-amber-400/90 font-mono font-medium">{item.capacityLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>Class {item.fireClass}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/50">
                        {/* Stepper */}
                        <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-white font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-white font-mono">
                            ₹{new Intl.NumberFormat('en-IN').format(lineTotal)}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">
                            (₹{new Intl.NumberFormat('en-IN').format(item.unitPrice)} ea)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with GST & Price Breakdown */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800/80 bg-zinc-950/60 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Taxable Subtotal (Base)</span>
                  <span className="font-mono text-zinc-200">
                    ₹{new Intl.NumberFormat('en-IN').format(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span>GST (18% Applicable)</span>
                    <span className="text-[10px] text-zinc-400">(CGST 9% + SGST 9%)</span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">
                    + ₹{new Intl.NumberFormat('en-IN').format(gstAmount)}
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Estimated Total Quote</span>
                    <span className="text-[10px] text-zinc-400">Includes all taxes & standard certification</span>
                  </div>
                  <span className="text-lg font-black text-white font-mono">
                    ₹{new Intl.NumberFormat('en-IN').format(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero obligation inquiry. Formal quote & availability sent directly to you.</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Review Quote Breakdown & Inquire
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Clear All Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
