import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, FileText, Package, RefreshCw, PhoneCall, Printer } from 'lucide-react';
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
    setIsCheckoutOpen,
    setIsQuotationOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const formatInr = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2
    });
  };

  const hasPorItems = items.some((item) => item.isPriceOnRequest);

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
                  {totalUnits} {totalUnits === 1 ? 'unit' : 'units'} selected for RFQ
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
                    Configure Buy New or Refill items in the catalog to generate a formal GST quotation.
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
                const isBuyNew = item.serviceType === 'buy-new';

                return (
                  <div
                    key={item.id}
                    className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex gap-3.5 hover:border-zinc-700 transition-colors"
                  >
                    {/* Small preview thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                      {item.imageUrl ? (
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
                      ) : (
                        <ProductIllustration type={item.productId} className="w-full h-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-zinc-500 hover:text-rose-400 p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Badges: Service Type & Material */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold inline-flex items-center gap-1 ${
                              isBuyNew
                                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {isBuyNew ? <Package className="w-2.5 h-2.5" /> : <RefreshCw className="w-2.5 h-2.5" />}
                            {isBuyNew ? 'Buy New' : 'Refill'}
                          </span>

                          <span className="text-[10px] text-zinc-300 font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                            {item.capacityLabel}
                          </span>

                          {item.material && (
                            <span className="text-[10px] text-amber-400/90 font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                              {item.material}
                            </span>
                          )}
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

                        {/* Price or POR Display */}
                        <div className="text-right">
                          {item.isPriceOnRequest ? (
                            <div className="text-amber-400 text-xs font-semibold flex items-center gap-1 justify-end font-mono">
                              <PhoneCall className="w-3 h-3" />
                              <span>Quote on Req.</span>
                            </div>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-white font-mono">
                                ₹{formatInr(lineTotal)}
                              </span>
                              <span className="text-[10px] text-zinc-400 block font-mono">
                                (₹{formatInr(item.unitPrice)} ea)
                              </span>
                            </>
                          )}
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
                  <span className="font-mono text-zinc-200 font-semibold">
                    ₹{formatInr(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span>GST (18% Applicable)</span>
                    <span className="text-[10px] text-zinc-500 font-mono">(CGST 9% + SGST 9%)</span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">
                    + ₹{formatInr(gstAmount)}
                  </span>
                </div>

                {hasPorItems && (
                  <div className="text-[11px] text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg flex items-center gap-2">
                    <PhoneCall className="w-3 h-3 shrink-0" />
                    <span>Includes Price on Request items (quoted separately)</span>
                  </div>
                )}

                <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Estimated Total</span>
                    <span className="text-[10px] text-zinc-400">Inclusive of all taxes</span>
                  </div>
                  <span className="text-xl font-extrabold text-white font-mono">
                    ₹{formatInr(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsQuotationOpen(true);
                  }}
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-400/20 hover:scale-[1.01] cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>View &amp; Print Official Quotation</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-zinc-700 hover:border-zinc-600 cursor-pointer"
                >
                  <span>Online Inquiry &amp; WhatsApp Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-2 text-zinc-400 hover:text-zinc-200 text-xs transition-colors cursor-pointer"
                >
                  Clear Inquiry List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
