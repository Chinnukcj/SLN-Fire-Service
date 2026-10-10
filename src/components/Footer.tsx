import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-zinc-800 bg-[#0c0c0e] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Overview */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <CompanyLogo size={42} className="shadow-lg" />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-base tracking-tight text-white leading-tight">
                  SLN Fire Service
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-400 font-semibold">
                  Fire Protection Engineers
                </span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Complete industrial and commercial fire protection solutions, certified cylinder refilling, hydro-testing, and compliance safety equipment across Karnataka.
            </p>
            <div className="text-[11px] text-zinc-400 font-mono">
              Certifications: IS 15683 · BIS · PESO Approved
            </div>
          </div>

          {/* Office & Facility Address */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-zinc-200 font-bold block">
              Facility & Office Address
            </span>
            <div className="space-y-2 text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  #18/1 Arehalli, Ittumadu Main Road, Near Basavanna Temple, Bengaluru 560061
                </p>
              </div>
              <div className="pt-2 text-[11px] text-zinc-400 font-mono">
                Landmark: Near Basavanna Temple
              </div>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-zinc-200 font-bold block">
              Direct Contact
            </span>
            <div className="space-y-2 text-zinc-300">
              <a
                href="https://wa.me/919945437741"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 9945437741</span>
              </a>
              <a
                href="tel:+919945437741"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Hotline 1: +91 9945437741</span>
              </a>
              <a
                href="tel:+919448536741"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Hotline 2: +91 9448536741</span>
              </a>
              <a
                href="mailto:dhanush.slnfire@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>dhanush.slnfire@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Quote Card */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs uppercase tracking-wider text-zinc-200 font-bold block">
              Corporate Quotations
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Have an architectural blueprint or bulk requirement? Request a detailed quote with complete 18% GST tax breakdown.
            </p>
            <a
              href="mailto:dhanush.slnfire@gmail.com?subject=Bulk%20Quotation%20Request%20-%20SLN%20Fire%20Service&body=Hi%20Dhanush,%20we%20have%20a%20requirement%20for%20fire%20protection%20equipment.%20Please%20share%20quotation."
              className="inline-block w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-center text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Email dhanush.slnfire@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} SLN Fire Service. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>IS: 15683 Compliance</span>
            <span aria-hidden="true">·</span>
            <span>GST HSN: 8424 (18%)</span>
            <span aria-hidden="true">·</span>
            <span>Bengaluru 560061</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
