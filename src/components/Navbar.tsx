import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

export const Navbar: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  const { totalUnits, setIsCartOpen, subtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'extinguishers', label: 'Extinguishers' },
    { id: 'refilling', label: 'Refilling' },
    { id: 'equipment', label: 'Safety Gear' },
    { id: 'classifications', label: 'Classifications' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8 h-20">
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

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-400">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === link.id ? 'text-white' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Inquiry Cart Button) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all shadow-sm whitespace-nowrap shrink-0"
            aria-label="Open Inquiry Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Inquiry Cart</span>
            {totalUnits > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-zinc-950 text-white font-mono text-[10px] font-bold">
                {totalUnits}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090b] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
