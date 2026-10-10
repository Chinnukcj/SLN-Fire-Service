import React, { useState } from 'react';
import { Product } from '../data/products';
import { ProductIllustration } from './ProductIllustrations';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Check, MessageSquare, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedCapacityIndex, setSelectedCapacityIndex] = useState(
    Math.min(2, product.capacities.length - 1) // Default to a standard mid capacity if available
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const currentCapacity = product.capacities[selectedCapacityIndex] || product.capacities[0];
  const unitPrice = currentCapacity.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        capacityLabel: currentCapacity.label,
        capacityValue: currentCapacity.value,
        unitPrice: currentCapacity.basePrice,
        fireClass: product.fireClass,
        standard: product.standard,
        category: product.category
      },
      quantity
    );

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleQuickWhatsApp = () => {
    const formattedPrice = new Intl.NumberFormat('en-IN').format(totalPrice);
    const message = `Hi SLN Fire Service, I am interested in inquiring about:\n\n*${product.name}*\n• Capacity/Size: ${currentCapacity.label}\n• Quantity: ${quantity}\n• Base Subtotal: ₹${formattedPrice} (+ 18% GST)\n\nPlease share current stock availability, formal quotation, and delivery schedule.`;
    window.open(`https://wa.me/919945437741?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-xl overflow-hidden group">
      <div>
        {/* Card Visual Header */}
        <div className="relative p-6 pb-2">
          {/* Subtle glow on hover */}
          <div className="w-full h-52 bg-zinc-950/70 rounded-xl border border-zinc-800/80 flex items-center justify-center p-3 relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <ProductIllustration type={product.id} className="w-full h-full max-h-44" />
            
            {/* Minimalist Fire Classification Marker */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
              <span className="text-zinc-500 font-medium">Class:</span>
              <span className="text-white font-semibold">{product.fireClass}</span>
            </div>

            {/* Standard Compliance */}
            <div className="absolute top-3 right-3 text-[10px] text-zinc-400 font-mono">
              {product.standard.split('/')[0]}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-6 py-4">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
              {product.tagline}
            </p>
          </div>

          <p className="text-xs text-zinc-400/90 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Capacity Selector */}
          <div className="mb-4">
            <label className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
              Select Capacity / Specification
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {product.capacities.map((cap, idx) => (
                <button
                  key={cap.value}
                  type="button"
                  onClick={() => setSelectedCapacityIndex(idx)}
                  className={`px-2.5 py-1.5 text-xs rounded-lg border text-center transition-all ${
                    selectedCapacityIndex === idx
                      ? 'bg-zinc-100 text-zinc-950 border-white font-semibold shadow-sm'
                      : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>
            {currentCapacity.specs && (
              <p className="text-[10px] text-zinc-500 mt-1.5 font-mono">
                {currentCapacity.specs}
              </p>
            )}
          </div>

          {/* Quantity & Unit Math */}
          <div className="flex items-center justify-between gap-4 py-3 border-y border-zinc-800/80 my-3">
            <div>
              <span className="text-[11px] text-zinc-400 block">Unit Base Price</span>
              <span className="text-sm font-semibold text-zinc-200 font-mono">
                ₹{new Intl.NumberFormat('en-IN').format(unitPrice)}
              </span>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-semibold text-white font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Line Calculation Summary */}
          <div className="flex items-baseline justify-between bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-2.5">
            <div>
              <span className="text-xs text-zinc-400 block">Taxable Line Total</span>
              <span className="text-[10px] text-zinc-500">+ 18% GST on Checkout</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-white font-mono">
                ₹{new Intl.NumberFormat('en-IN').format(totalPrice)}
              </span>
            </div>
          </div>

          {/* Technical Specs Accordion */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowSpecs(!showSpecs)}
              className="w-full flex items-center justify-between py-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <span>Technical specifications & uses</span>
              {showSpecs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showSpecs && (
              <div className="pt-2 pb-1 space-y-2 text-xs text-zinc-400 border-t border-zinc-800/60 mt-1">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Recommended Environments
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-zinc-300">
                    {product.idealUses.map((use, i) => (
                      <li key={i}>{use}</li>
                    ))}
                  </ul>
                </div>
                {product.technicalSpecs && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/40 text-[10px] font-mono text-zinc-400">
                    {product.technicalSpecs.operatingPressure && (
                      <div>
                        <span className="text-zinc-500 block">Working Pressure:</span>
                        <span>{product.technicalSpecs.operatingPressure}</span>
                      </div>
                    )}
                    {product.technicalSpecs.dischargeRange && (
                      <div>
                        <span className="text-zinc-500 block">Discharge Range:</span>
                        <span>{product.technicalSpecs.dischargeRange}</span>
                      </div>
                    )}
                    {product.technicalSpecs.dischargeTime && (
                      <div>
                        <span className="text-zinc-500 block">Discharge Time:</span>
                        <span>{product.technicalSpecs.dischargeTime}</span>
                      </div>
                    )}
                    {product.technicalSpecs.testPressure && (
                      <div>
                        <span className="text-zinc-500 block">Test Pressure:</span>
                        <span>{product.technicalSpecs.testPressure}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Bottom */}
      <div className="p-6 pt-2 space-y-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            addedAnimation
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-100 hover:bg-white text-zinc-950 font-bold shadow-sm'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4" />
              Added to Inquiry Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add {quantity} to Inquiry Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleQuickWhatsApp}
          className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          Direct Item WhatsApp (9945437741)
        </button>
      </div>
    </div>
  );
};
