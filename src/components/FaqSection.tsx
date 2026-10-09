import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/gloamData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Title Area */}
          <div className="lg:col-span-5">
            <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
              ( 07 ) BEFORE YOU ASK
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f3ede2] font-light leading-tight">
              Questions at the gate.
            </h2>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 divide-y divide-white/10">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.number} className="py-6 group">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between text-left gap-6 group-hover:text-[#f3ede2] transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono-flight text-xs text-[#8c8378] group-hover:text-[#cbb292] transition-colors">
                        {item.number}
                      </span>
                      <span className="font-serif-editorial text-xl sm:text-2xl text-[#e5ded4] font-normal">
                        {item.question}
                      </span>
                    </div>

                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#8c8378] group-hover:text-[#f3ede2] group-hover:border-[#cbb292] transition-colors shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#cbb292]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pl-8 sm:pl-11 pr-8 animate-in fade-in-50 duration-200">
                      <p className="text-sm text-[#a49a8d] leading-relaxed font-light">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
