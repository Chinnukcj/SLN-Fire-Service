import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Printer } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

export const Navbar: React.FC<{
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}> = () => {
  const { totalUnits, setIsCartOpen, setIsQuotationOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6 h-20">
        {/* Zone 1: Brand Wordmark with Official Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-white whitespace-nowrap shrink-0 group"
        >
          <CompanyLogo size={42} className="shadow-md transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-white leading-tight">
              SLN Fire Service
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">
              Fire Protection Engineers
            </span>
          </div>
        </a>

        {/* Zone 2: Premium Stylish Line "Safety is our priority" */}
        <div className="hidden md:flex items-center justify-center gap-3 lg:gap-4 px-2 select-none">
          <span className="h-[1px] w-6 lg:w-10 bg-gradient-to-r from-transparent via-amber-400/30 to-amber-400/80" />
          <span className="font-luxury text-xs lg:text-sm tracking-[0.24em] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-[0_2px_12px_rgba(251,191,36,0.22)] whitespace-nowrap">
            Safety is our priority
          </span>
          <span className="h-[1px] w-6 lg:w-10 bg-gradient-to-l from-transparent via-amber-400/30 to-amber-400/80" />
        </div>

        {/* Zone 3: Actions (Quotation Letterhead & Inquiry Cart Buttons) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsQuotationOpen(true)}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20 whitespace-nowrap cursor-pointer hover:scale-[1.02]"
            aria-label="View Quotation Letterhead"
            title="Open printable quotation letterhead"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">View Quotation</span>
            <span className="sm:hidden">Quote</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Open Inquiry Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Inquiry Cart</span>
            {totalUnits > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-zinc-950 text-white font-mono text-[10px] font-bold">
                {totalUnits}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Subtle Tagline Banner */}
      <div className="md:hidden flex items-center justify-center py-2 px-4 bg-zinc-950/80 border-t border-zinc-800/60 select-none">
        <span className="font-luxury text-[11px] tracking-[0.2em] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
          Safety is our priority
        </span>
      </div>
    </header>
  );
};
