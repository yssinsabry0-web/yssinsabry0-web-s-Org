import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [homeCity, setHomeCity] = useState('Lisbon');
  const [flightFrequency, setFlightFrequency] = useState('6–12 flights');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#14110f] border border-[#2d251f] shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-6 sm:p-10 text-[#e5ded4]">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#8c8378] hover:text-[#f3ede2] hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#1c1814] border border-[#cbb292] text-[#cbb292] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(203,178,146,0.2)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-[10px] font-mono-flight tracking-widest text-[#cbb292] uppercase mb-2">
              APPLICATION DOCKET #GLM-{Math.floor(1000 + Math.random() * 9000)}
            </div>

            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f3ede2] mb-3">
              We answer before first light.
            </h3>

            <p className="text-sm text-[#8c8378] leading-relaxed max-w-sm mx-auto mb-8">
              Thank you, {name || 'Guest'}. Your profile for {homeCity} departures has been received. Our steward will contact {email} prior to astronomical twilight.
            </p>

            {/* Member preview card */}
            <div className="p-4 rounded-2xl bg-[#1a1613] border border-[#2e261f] text-left mb-6">
              <div className="flex justify-between items-center text-[10px] font-mono-flight text-[#cbb292] mb-2">
                <span>MEMBERS' AIR</span>
                <span>STATUS: UNDER REVIEW</span>
              </div>
              <div className="font-serif-editorial text-xl text-[#f3ede2]">{name || 'Prospective Member'}</div>
              <div className="text-xs text-[#8c8378]">{homeCity} · {flightFrequency}</div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-full bg-[#f3ede2] text-[#0b0a09] text-xs font-semibold hover:bg-white transition-colors"
            >
              Return to GLOAM
            </button>
          </div>
        ) : (
          <div>
            <div className="text-[10px] font-mono-flight tracking-widest text-[#cbb292] uppercase mb-2">
              MEMBERSHIP ADMISSIONS
            </div>

            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f3ede2] font-light leading-tight mb-2">
              Request membership.
            </h3>

            <p className="text-xs sm:text-sm text-[#8c8378] leading-relaxed mb-6">
              Thirty-eight suites a flight. We review invitations at each astronomical change. Share your travel profile below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1.5">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Countess Helena Vance"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1a1613] border border-[#2b241e] focus:border-[#cbb292] text-sm text-[#f3ede2] placeholder-[#5a5248] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="helena@vance.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1a1613] border border-[#2b241e] focus:border-[#cbb292] text-sm text-[#f3ede2] placeholder-[#5a5248] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1.5">
                    HOME CITY
                  </label>
                  <select
                    value={homeCity}
                    onChange={(e) => setHomeCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1a1613] border border-[#2b241e] focus:border-[#cbb292] text-sm text-[#f3ede2] outline-none transition-colors"
                  >
                    <option value="Lisbon">Lisbon</option>
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Zurich">Zurich</option>
                    <option value="Paris">Paris</option>
                    <option value="Tokyo">Tokyo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1.5">
                    LONG-HAUL FLIGHTS / YR
                  </label>
                  <select
                    value={flightFrequency}
                    onChange={(e) => setFlightFrequency(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1a1613] border border-[#2b241e] focus:border-[#cbb292] text-sm text-[#f3ede2] outline-none transition-colors"
                  >
                    <option value="1–5 flights">1–5 flights</option>
                    <option value="6–12 flights">6–12 flights</option>
                    <option value="13–24 flights">13–24 flights</option>
                    <option value="25+ flights">25+ flights</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#cbb292] hover:bg-[#d8c2a8] text-[#0b0a09] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Submit for Consideration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
