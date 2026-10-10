import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { RefillSection } from './components/RefillSection';
import { FireClassesGuide } from './components/FireClassesGuide';
import { Footer } from './components/Footer';
import { CompanyLogo } from './components/CompanyLogo';
import { PRODUCTS } from './data/products';
import {
  ShieldAlert,
  Flame,
  Wrench,
  PackageCheck,
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  Mail,
  CheckCircle2,
  FileText
} from 'lucide-react';

function AppContent() {
  const { totalUnits, subtotal, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const [activeTab, setActiveTab] = useState('extinguishers');
  const [filterCategory, setFilterCategory] = useState<'all' | 'extinguisher' | 'refilling' | 'equipment'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-red-950 selection:text-red-200">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Cart Drawer & Checkout Modal Overlays */}
      <CartDrawer />
      <CheckoutModal />

      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Official Company Logo Badge */}
            <div className="flex justify-center items-center">
              <div className="p-2 bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-sm hover:border-zinc-700 transition-all">
                <CompanyLogo size={78} className="shadow-lg" />
              </div>
            </div>

            {/* Premium, Expensive-Look Hero Title */}
            <div>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,255,255,0.06)] leading-tight select-none">
                SLN Fire Service
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-zinc-400 font-semibold font-mono mt-3">
                Fire Protection Engineers
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href="#extinguishers"
                className="px-7 py-3.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                Explore Product Catalog
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="px-7 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 hover:border-zinc-500"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                Build Quote & Inquire
              </button>
            </div>
          </div>

          {/* 3 Interactive Quick Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {/* Pillar 1: Extinguishers */}
            <a
              href="#extinguishers"
              onClick={() => setFilterCategory('extinguisher')}
              className="group bg-[#121215] border border-zinc-800/80 rounded-2xl p-7 flex flex-col items-center text-center hover:border-zinc-600 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-400 mb-5 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white mb-1.5 font-display">
                Fire Extinguishers
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Brand new ABC, CO₂, Clean Agent & Foam units with valid factory inspection tags.
              </p>
              <span className="mt-5 text-xs font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                View Extinguishers <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Pillar 2: Refilling */}
            <a
              href="#refilling"
              className="group bg-[#121215] border border-zinc-800/80 rounded-2xl p-7 flex flex-col items-center text-center hover:border-zinc-600 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white mb-1.5 font-display">
                Refilling & Testing
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hydro-testing up to 35-250 Bar, gas re-charging, seal replacements, and NOC reports.
              </p>
              <span className="mt-5 text-xs font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                Calculate Refill Costs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Pillar 3: Industrial Equipment */}
            <a
              href="#equipment"
              onClick={() => setFilterCategory('equipment')}
              className="group bg-[#121215] border border-zinc-800/80 rounded-2xl p-7 flex flex-col items-center text-center hover:border-zinc-600 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white mb-1.5 font-display">
                Safety Equipment
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fire blankets, swinging hose reels, automated ceiling sprinklers & accessories.
              </p>
              <span className="mt-5 text-xs font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                View Equipment <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT CATALOG SECTION                                                  */}
      {/* ========================================================================= */}
      <section id="extinguishers" className="py-16 border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                <span>Commercial Safety Store</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white font-display mt-2 tracking-tight">
                Equipment & Extinguishers Catalog
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Configure cylinder capacity, choose quantities, and add items to your Inquiry Cart for a complete 18% GST quotation.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterCategory === 'all'
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Products
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('extinguisher')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterCategory === 'extinguisher'
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Extinguishers
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('refilling')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterCategory === 'refilling'
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Refilling
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('equipment')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterCategory === 'equipment'
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Gear & Reels
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REFILLING SERVICES & HYDRO-TESTING CALCULATOR                            */}
      {/* ========================================================================= */}
      <RefillSection />

      {/* ========================================================================= */}
      {/* FIRE CLASSIFICATIONS & HAZARD GUIDE                                      */}
      {/* ========================================================================= */}
      <FireClassesGuide />

      {/* ========================================================================= */}
      {/* CORPORATE TRUST & COMPLIANCE PROOF                                       */}
      {/* ========================================================================= */}
      <section className="py-16 border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">IS: 15683 Compliance Guarantee</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every cylinder delivered is strictly pressure tested, serialized, and furnished with a dated inspection compliance certificate suitable for state fire safety NOC approvals.
              </p>
            </div>

            <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-emerald-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Transparent 18% GST Invoicing</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We provide complete tax breakdowns with HSN 8424 codes. Companies and factories can smoothly claim their 18% Input Tax Credit (ITC) with valid corporate GSTIN.
              </p>
            </div>

            <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-blue-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Direct Communication with Dhanush</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No slow ticketing portals. Quotes and availability requests reach our senior lead Dhanush instantly over WhatsApp (+91 9945437741) and email (dhanush.slnfire@gmail.com).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Quick Quote Bar (Appears when cart has items) */}
      {totalUnits > 0 && (
        <aside
          aria-label="Inquiry summary"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs shrink-0">
              {totalUnits}
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Quote Subtotal: ₹{new Intl.NumberFormat('en-IN').format(subtotal)}
              </span>
              <span className="text-[10px] text-zinc-400">
                + 18% GST (₹{new Intl.NumberFormat('en-IN').format(Math.round(subtotal * 0.18))})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition-colors"
            >
              View Cart
            </button>
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              Review & Inquire
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
