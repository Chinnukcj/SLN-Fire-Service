import React from 'react';
import { FIRE_CLASSES_INFO } from '../data/products';
import { Shield, Flame } from 'lucide-react';

export const FireClassesGuide: React.FC = () => {
  return (
    <section id="classifications" className="py-16 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Hazard Assessment Guide</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white font-display tracking-tight">
            Understanding Fire Classifications
          </h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Selecting the wrong extinguisher can spread a blaze or create electrocution risks. Use this standard classification guide to assess your site risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIRE_CLASSES_INFO.map((item) => (
            <div
              key={item.code}
              className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-10 h-10 rounded-xl font-black text-base flex items-center justify-center border font-mono ${item.color}`}>
                    {item.code}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2">{item.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1 font-mono">
                  Recommended Protection:
                </span>
                <span className="text-xs font-semibold text-zinc-200">
                  {item.effectiveTypes}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Tip Bar */}
        <div className="mt-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-zinc-300">
              Unsure which fire safety equipment meets your building NOC or municipal safety audit? Contact our safety team for a complimentary site assessment.
            </p>
          </div>
          <a
            href="https://wa.me/919945437741?text=Hi%20SLN%20Fire%20Service,%20I%20would%20like%20guidance%20on%20fire%20equipment%20recommendations%20for%20my%20building%20facility."
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap shrink-0 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
          >
            Request Site Assessment
          </a>
        </div>
      </div>
    </section>
  );
};
