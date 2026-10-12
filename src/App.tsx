// vercel trigger
import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuotationModal } from './components/QuotationModal';
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
  FileText,
  Printer
} from 'lucide-react';

function AppContent() {
  const { totalUnits, subtotal, setIsCartOpen, setIsCheckoutOpen, setIsQuotationOpen } = useCart();
  const [activeTab, setActiveTab] = useState('extinguishers');
  // Active category navigation tab: 'extinguishers' | 'refilling' | 'safety' | 'hydrant'
  const [activeCategoryTab, setActiveCategoryTab] = useState<'extinguishers' | 'refilling' | 'safety' | 'hydrant'>('extinguishers');

  // Filter products for Tab 1 & Tab 2 (Extinguishers)
  const extinguisherProducts = PRODUCTS.filter((p) => p.category === 'extinguisher');

  const categoryTabs = [
    { id: 'extinguishers', label: 'Fire Extinguishers', icon: Flame },
    { id: 'refilling', label: 'Refilling and Testing', icon: Wrench },
    { id: 'safety', label: 'Safety Equipment', icon: PackageCheck },
    { id: 'hydrant', label: 'Hydrant System', icon: ShieldAlert }
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-red-950 selection:text-red-200">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Cart Drawer, Checkout Modal & Printable Quotation Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <QuotationModal />

      {/* ========================================================================= */}
      {/* CLEAN MINIMALIST HERO SECTION                                            */}
      {/* ========================================================================= */}
      <section id="home-view" className="relative pt-12 pb-10 md:pt-16 md:pb-14 overflow-hidden border-b border-zinc-800/60">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Official Company Logo Badge */}
            <div className="flex justify-center items-center">
              <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-sm hover:border-zinc-700 transition-all">
                <CompanyLogo size={72} className="shadow-lg" />
              </div>
            </div>

            {/* Clean, Premium Hero Title */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,255,255,0.06)] leading-tight select-none">
                SLN Fire Service
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-zinc-400 font-semibold font-mono mt-2">
                Fire Protection Engineers • Since 2004
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Certified ISI &amp; BIS compliant fire fighting systems, rapid refilling, hydro-testing, and commercial facility safety.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PREMIUM CATEGORY NAVIGATION (4 TABS)                                     */}
      {/* ========================================================================= */}
      <section className="sticky top-20 z-30 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-3 gap-2 sm:gap-3">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategoryTab(tab.id)}
                  className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-in-out cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 shadow-md font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'text-zinc-950' : 'text-zinc-400 group-hover:text-white'
                    }`}
                  />
                  <span>{tab.label}</span>

                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute -bottom-3 left-4 right-4 h-0.5 bg-red-600 rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DYNAMIC TAB CONTENT & PRODUCT CATALOG                                     */}
      {/* ========================================================================= */}
      <section id="catalog-view" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* TAB 1: Fire Extinguishers (Buy New Mode) */}
          {activeCategoryTab === 'extinguishers' && (
            <div key="tab-extinguishers" className="animate-fade-in space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/60">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium">
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                    <span>Brand New Certified Cylinders</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 tracking-tight">
                    Fire Extinguishers
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Supplying all brand new ISI-marked portable and modular fire extinguishers.
                  </p>
                </div>
                <div className="text-xs text-zinc-400 font-mono bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-auto">
                  Catalog: <span className="text-white font-semibold">{extinguisherProducts.length} Items</span> • Supply New
                </div>
              </div>

              {/* Product Grid - Forced to 'buy-new' */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {extinguisherProducts.map((product) => (
                  <ProductCard
                    key={`new-${product.id}`}
                    product={product}
                    forcedServiceType="buy-new"
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Refilling and Testing (Refill Mode) */}
          {activeCategoryTab === 'refilling' && (
            <div key="tab-refilling" className="animate-fade-in space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/60">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>Certified Recharge & Hydro-Testing</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 tracking-tight">
                    Refilling &amp; Testing Services
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Certified gas recharging, chemical replenishment, and pressure hydro-testing with inspection tags.
                  </p>
                </div>
                <div className="text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 self-start sm:self-auto">
                  Mode: <span className="font-semibold text-white">Refill Service</span> • Factory Tested
                </div>
              </div>

              {/* Product Grid - Forced to 'refill' */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {extinguisherProducts.map((product) => (
                  <ProductCard
                    key={`refill-${product.id}`}
                    product={product}
                    forcedServiceType="refill"
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Safety Equipment (Coming Soon) */}
          {activeCategoryTab === 'safety' && (
            <div key="tab-safety" className="animate-fade-in py-16 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-xl">
                <PackageCheck className="w-8 h-8" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-amber-400 font-bold block mb-2">
                Under Curation
              </span>
              <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mb-3">
                Safety Equipment Coming Soon
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                We are curating our certified inventory of fire safety blankets, emergency response gear, personal protective kits, and emergency illumination hardware.
              </p>
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400">
                For custom corporate equipment inquiries or bulk orders, contact Dhanush directly at{' '}
                <a href="tel:9945437741" className="text-white font-semibold underline underline-offset-2 hover:text-amber-400">
                  +91 9945437741
                </a>.
              </div>
            </div>
          )}

          {/* TAB 4: Hydrant System (Coming Soon) */}
          {activeCategoryTab === 'hydrant' && (
            <div key="tab-hydrant" className="animate-fade-in py-16 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 mx-auto mb-6 shadow-xl">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-red-400 font-bold block mb-2">
                Commercial Engineering
              </span>
              <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mb-3">
                Hydrant System Coming Soon
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Our complete commercial hydrant layout systems, landing valves, swinging hose reels, and branch pipes engineering catalog is currently being updated for online specifications.
              </p>
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400">
                To request an on-site commercial hydrant survey or turnkey installation quotation, reach our engineering desk at{' '}
                <a href="mailto:dhanush.slnfire@gmail.com" className="text-white font-semibold underline underline-offset-2 hover:text-red-400">
                  dhanush.slnfire@gmail.com
                </a>.
              </div>
            </div>
          )}
        </div>
      </section>

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
              onClick={() => setIsQuotationOpen(true)}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
              title="Open Printable Letterhead Quotation"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>View Quotation</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Cart
            </button>
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              Inquire
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
