import React, { useState, useEffect } from 'react';
import { Product, ServiceType } from '../data/products';
import { ProductIllustration } from './ProductIllustrations';
import { useCart } from '../context/CartContext';
import {
  Plus,
  Minus,
  Check,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Package,
  RefreshCw,
  PhoneCall
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  forcedServiceType?: ServiceType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, forcedServiceType }) => {
  const { addItem } = useCart();

  const supportsRefill =
    product.supportedServices?.includes('refill') ?? (product.category === 'extinguisher');

  // Service Type state: 'buy-new' or 'refill' - forced if supplied by category tab
  const [internalServiceType, setInternalServiceType] = useState<ServiceType>('buy-new');
  const serviceType: ServiceType = forcedServiceType || internalServiceType;
  const setServiceType = setInternalServiceType;

  // Selected capacity
  const [selectedCapacityIndex, setSelectedCapacityIndex] = useState(0);

  // Material selection (e.g. for K-Type Kitchen Extinguisher Buy New)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Normal');

  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  // Gallery state
  const images = product.images && product.images.length > 0 ? product.images : [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Current selected capacity item
  const currentCapacity =
    product.capacities[selectedCapacityIndex] || product.capacities[0] || {
      label: 'Standard',
      value: 'standard',
      buyNewPrice: 0,
      refillPrice: null
    };

  // Check if materials apply
  const hasMaterials =
    serviceType === 'buy-new' &&
    !!(currentCapacity.materials && currentCapacity.materials.length > 0);

  // Helper to fallback to local downloaded images if network fails
  const getLocalFallback = (url: string) => {
    const filename = url.split('/').pop();
    return filename ? `/images/${filename}` : url;
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  const currentImageUrl = images[activeImageIndex];

  // Resolve base unit price
  let resolvedPrice: number | 'POR' | null | undefined = null;

  if (serviceType === 'buy-new') {
    if (hasMaterials) {
      const mat =
        currentCapacity.materials?.find(
          (m) => m.material.toLowerCase() === selectedMaterial.toLowerCase()
        ) || currentCapacity.materials?.[0];
      resolvedPrice = mat ? mat.buyNewPrice : currentCapacity.buyNewPrice;
    } else {
      resolvedPrice = currentCapacity.buyNewPrice ?? currentCapacity.basePrice;
    }
  } else {
    // Refill mode
    resolvedPrice = currentCapacity.refillPrice;
  }

  const isPriceOnRequest =
    resolvedPrice === 'POR' || resolvedPrice === null || resolvedPrice === undefined;

  const unitBasePrice =
    !isPriceOnRequest && typeof resolvedPrice === 'number' ? resolvedPrice : 0;

  // Numeric Calculations
  const baseSubtotal = unitBasePrice * quantity;
  const gstAmount = Math.round(baseSubtotal * 0.18 * 100) / 100;
  const grandTotal = Math.round((baseSubtotal + gstAmount) * 100) / 100;

  // INR Currency Formatter (e.g. 510 -> 510, 601.8 -> 601.80)
  const formatInr = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2
    });
  };

  // Format exact labels for WhatsApp and UI
  const serviceLabel = serviceType === 'buy-new' ? 'Buy New' : 'Refill';
  const specLabel = hasMaterials
    ? `${currentCapacity.label} - ${selectedMaterial}`
    : currentCapacity.label;

  // Dynamic WhatsApp prefilled message
  // Example requested: "Hi SLN Fire Service, I am interested in [Buy New] [K-Type Extinguisher] [6L - Stainless Steel] - Qty: 2."
  const buildWhatsAppMessage = () => {
    let msg = `Hi SLN Fire Service, I am interested in [${serviceLabel}] [${product.name}] [${specLabel}] - Qty: ${quantity}.`;
    if (isPriceOnRequest) {
      msg += `\n\n• Status: Contact for Pricing (Price on Request)\nPlease share current official quote, stock availability, and lead time.`;
    } else {
      msg += `\n\n• Price Breakdown: Base: ₹${formatInr(baseSubtotal)} | +18% GST (₹${formatInr(gstAmount)}) | Total: ₹${formatInr(grandTotal)}\n\nPlease share formal quotation and delivery schedule.`;
    }
    return msg;
  };

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        serviceType,
        material: hasMaterials ? selectedMaterial : undefined,
        capacityLabel: currentCapacity.label,
        capacityValue: currentCapacity.value,
        unitPrice: unitBasePrice,
        isPriceOnRequest,
        fireClass: product.fireClass,
        standard: product.standard,
        category: product.category,
        imageUrl: currentImageUrl
      },
      quantity
    );

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleQuickWhatsApp = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/919945437741?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl flex flex-col justify-between hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
        <div>
          {/* Card Visual Header */}
          <div className="relative p-5 pb-2">
            {/* Main Photo Card Container */}
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="w-full h-60 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-center p-3 relative overflow-hidden group-hover:border-zinc-700 transition-colors cursor-zoom-in"
              title="Click to view full-size image preview"
            >
              {currentImageUrl ? (
                <img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt={`${product.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const fallback = getLocalFallback(currentImageUrl);
                    if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              ) : (
                <ProductIllustration type={product.id} className="w-full h-full max-h-44" />
              )}

              {/* Minimalist Fire Classification Marker */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-zinc-300 font-mono bg-zinc-900/90 px-2 py-0.5 rounded-md border border-zinc-800 backdrop-blur-sm shadow-sm">
                <span className="text-zinc-500 font-medium">Class:</span>
                <span className="text-white font-semibold">{product.fireClass}</span>
              </div>


              {/* Expand / Zoom Button Overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPreviewOpen(true);
                }}
                className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 transition-colors shadow-sm"
                aria-label="Open full-size image preview"
                title="Full-size image preview"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clickable Miniature Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 px-0.5">
                {images.map((imgUrl, idx) => {
                  const isSelected = idx === activeImageIndex;
                  return (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(idx);
                      }}
                      className={`relative w-14 h-14 rounded-xl border overflow-hidden p-1 transition-all ${
                        isSelected
                          ? 'border-amber-400 ring-2 ring-amber-400/50 bg-zinc-900 shadow-md scale-105'
                          : 'border-zinc-800 bg-zinc-950 hover:border-zinc-600 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Switch to image ${idx + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const fallback = getLocalFallback(imgUrl);
                          if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="px-5 py-3">
            <div className="mb-3">
              <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                {product.tagline}
              </p>
            </div>

            {/* 1. SERVICE TYPE TOGGLE (Buy New vs Refill) - Hidden if tab forces service type */}
            {!forcedServiceType && (
              <div className="mb-3.5">
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1.5 flex items-center justify-between">
                  <span>Service Type</span>
                  {supportsRefill ? (
                    <span className="text-[10px] text-amber-400 font-mono">
                      {serviceType === 'buy-new' ? 'Supply New Cylinder' : 'Recharge & Refill Service'}
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500 font-mono">Standard Hardware Supply</span>
                  )}
                </label>

                {supportsRefill ? (
                  <div className="grid grid-cols-2 p-1 bg-zinc-950 border border-zinc-800 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setServiceType('buy-new')}
                      className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        serviceType === 'buy-new'
                          ? 'bg-zinc-100 text-zinc-950 shadow-md font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Buy New</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('refill')}
                      className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        serviceType === 'refill'
                          ? 'bg-amber-400 text-zinc-950 shadow-md font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refill</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-1.5 px-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold">Buy New (Certified Unit)</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">Refill N/A</span>
                  </div>
                )}
              </div>
            )}

            {/* 2. CAPACITY SELECTOR */}
            <div className="mb-3.5">
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

            {/* 3. MATERIAL TYPE SELECTOR (e.g., K-Type Kitchen Extinguisher Buy New) */}
            {hasMaterials && (
              <div className="mb-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-2.5">
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1.5 flex items-center justify-between">
                  <span>Cylinder Body Material</span>
                  <span className="text-[10px] text-amber-400 font-mono">Choose Finish</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial('Normal')}
                    className={`px-3 py-1.5 text-xs rounded-lg border text-center transition-all ${
                      selectedMaterial === 'Normal'
                        ? 'bg-zinc-100 text-zinc-950 border-white font-bold shadow-sm'
                        : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    Normal (MS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial('Stainless Steel')}
                    className={`px-3 py-1.5 text-xs rounded-lg border text-center transition-all ${
                      selectedMaterial === 'Stainless Steel'
                        ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-sm'
                        : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    Stainless Steel (SS)
                  </button>
                </div>
              </div>
            )}

            {/* 4. QUANTITY & BASE / BREAKDOWN CALCULATION */}
            {product.contactOnly ? (
              /* CONTACT IF NEEDED BANNER - NO PRICE, NO QUANTITY */
              <div className="my-3 py-3 px-4 bg-zinc-900/90 border border-amber-500/30 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-400">Pricing & Order</span>
                  <span className="text-xs font-bold text-amber-400 font-mono tracking-wide">
                    Contact if needed
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Automatic modular ceiling units require site survey, ceiling height & hazard volume consultation.
                </p>
              </div>
            ) : isPriceOnRequest ? (
              /* PRICE ON REQUEST BANNER (Numerical calculations hidden) */
              <div className="my-3 py-3 px-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">
                      Contact for Pricing
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">Price on Request</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Specialized agent pricing. Inquire directly on WhatsApp for formal quotation, bulk pricing, and delivery schedule.
                </p>

                {/* Quantity selection still available for inquiry request */}
                <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-xs">
                  <span className="text-zinc-400">Required Quantity:</span>
                  <div className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded-xl p-0.5">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-semibold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* NUMERICAL CALCULATION & BREAKDOWN */
              <div className="space-y-2.5 my-3">
                {/* Unit Base & Quantity Stepper */}
                <div className="flex items-center justify-between gap-4 py-2 border-y border-zinc-800/80">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Unit Base Price</span>
                    <span className="text-sm font-semibold text-zinc-200 font-mono">
                      ₹{formatInr(unitBasePrice)}
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

                {/* EXACT BREAKDOWN CARD: Base: ₹510 | +18% GST | Total: ₹601.80 */}
                <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400 font-medium">Automatic 18% GST Math</span>
                    <span className="font-mono text-zinc-400 text-[10px]">
                      ({quantity} × ₹{formatInr(unitBasePrice)})
                    </span>
                  </div>

                  {/* Highlighted Breakdown line matching prompt request */}
                  <div className="text-xs font-mono font-semibold text-amber-400/95 bg-zinc-950/70 p-2 rounded-lg border border-zinc-800/80 text-center tracking-tight">
                    Base: ₹{formatInr(baseSubtotal)} | +18% GST | Total: ₹{formatInr(grandTotal)}
                  </div>

                  <div className="flex items-baseline justify-between pt-1 text-[11px] text-zinc-400">
                    <span>GST (CGST 9% + SGST 9%):</span>
                    <span className="font-mono text-zinc-300">₹{formatInr(gstAmount)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specs Accordion */}
            <div className="mt-2">
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
        <div className="p-5 pt-2 space-y-2">
          {product.contactOnly ? (
            /* CONTACT IF NEEDED ACTIONS */
            <>
              <a
                href={`https://wa.me/919945437741?text=${encodeURIComponent(
                  `Hi SLN Fire Service, I am inquiring about [${serviceLabel}] [${product.name}] [${specLabel}]. Contact if needed - please share details, site survey, and quotation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20"
              >
                <MessageSquare className="w-4 h-4 text-zinc-950" />
                <span>Contact if needed</span>
              </a>

              <a
                href="tel:9945437741"
                className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: +91 9945437741</span>
              </a>

              <p className="text-[10px] text-zinc-500 text-center font-mono truncate px-1">
                Direct Inquiry: [{serviceLabel}] [{product.name}]
              </p>
            </>
          ) : (
            <>
              {/* Add to Quote Button */}
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
                    Added to Quotation!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add {quantity} [{serviceLabel}] to Quote
                    </span>
                  </>
                )}
              </button>

              {/* DYNAMIC WHATSAPP BUTTON (Prompt Requirement 3) */}
              <button
                type="button"
                onClick={handleQuickWhatsApp}
                title={buildWhatsAppMessage()}
                className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors group/wa shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">
                  {isPriceOnRequest
                    ? 'Request Quote on WhatsApp (9945437741)'
                    : `WhatsApp: [${serviceLabel}] [${specLabel}]`}
                </span>
              </button>

              {/* Small live text preview of the WhatsApp quote draft */}
              <p className="text-[10px] text-zinc-500 text-center font-mono truncate px-1">
                RFQ: [{serviceLabel}] [{product.name}] [{specLabel}] - Qty: {quantity}
              </p>
            </>
          )}
        </div>
      </div>

      {/* FULL-SIZE PREVIEW MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          {/* Backdrop Click Dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsPreviewOpen(false)}
          />

          <div className="relative bg-[#121215] border border-zinc-800 rounded-3xl max-w-3xl w-full text-zinc-100 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
            {/* Modal Top Bar */}
            <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between shrink-0 bg-zinc-950/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold">
                    Class {product.fireClass}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {product.standard.split('/')[0]}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">
                  {product.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[440px] bg-zinc-950 flex items-center justify-center p-6 overflow-hidden">
              {currentImageUrl ? (
                <img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt={`${product.name} full view`}
                  className="max-h-[62vh] max-w-full object-contain drop-shadow-2xl"
                  onError={(e) => {
                    const fallback = getLocalFallback(currentImageUrl);
                    if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              ) : (
                <div className="w-full max-w-md h-72">
                  <ProductIllustration type={product.id} className="w-full h-full" />
                </div>
              )}

              {/* Prev / Next controls if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 backdrop-blur-sm transition-all"
                    aria-label="Previous angle"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 backdrop-blur-sm transition-all"
                    aria-label="Next angle"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Gallery Thumbnails Strip & Quick Action Bar */}
            <div className="p-5 border-t border-zinc-800 bg-zinc-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Miniature Preview Thumbnails */}
              {images.length > 1 ? (
                <div className="flex items-center gap-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl border overflow-hidden p-1 transition-all ${
                        idx === activeImageIndex
                          ? 'border-amber-400 ring-2 ring-amber-400/50 bg-zinc-900 scale-105'
                          : 'border-zinc-800 bg-zinc-950 hover:border-zinc-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const fallback = getLocalFallback(imgUrl);
                          if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Certified BIS / PESO Compliance</span>
                </div>
              )}

              {/* Quick Actions in Modal */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {product.contactOnly ? (
                  <a
                    href={`https://wa.me/919945437741?text=${encodeURIComponent(
                      `Hi SLN Fire Service, I am inquiring about [${serviceLabel}] [${product.name}] [${specLabel}]. Contact if needed - please share details, site survey, and quotation.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none py-2.5 px-5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-950" />
                    <span>Contact if needed</span>
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleQuickWhatsApp}
                      className="flex-1 sm:flex-none py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      {isPriceOnRequest ? 'Request Quote on WhatsApp' : 'Inquire on WhatsApp'}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 sm:flex-none py-2.5 px-5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
