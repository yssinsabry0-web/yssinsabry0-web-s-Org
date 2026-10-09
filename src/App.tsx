/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TheIdeaSection } from './components/TheIdeaSection';
import { RoutesSection } from './components/RoutesSection';
import { CabinsSection } from './components/CabinsSection';
import { LoungeSection } from './components/LoungeSection';
import { MilesCalculatorSection } from './components/MilesCalculatorSection';
import { AppSection } from './components/AppSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { MembershipModal } from './components/MembershipModal';

export default function App() {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['the-idea', 'routes', 'cabins', 'lounge', 'miles', 'app'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 400) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0a09] text-[#e5ded4] selection:bg-[#cbb292]/30 selection:text-[#f8f5ee]">
      {/* Fixed Navigation */}
      <Navbar
        onRequestMembership={() => setMembershipModalOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* Section A & I: Hero — Always the window. */}
        <HeroSection onRequestMembership={() => setMembershipModalOpen(true)} />

        {/* Section C: (01) THE IDEA & Statistics */}
        <TheIdeaSection />

        {/* Section H: (02) ROUTES — Lisbon, then eleven cities. & 3D Globe */}
        <RoutesSection />

        {/* Section G: (03) CABINS — A room with three views. */}
        <CabinsSection />

        {/* Section B: (04) THE LOUNGE — Open before the first light. */}
        <LoungeSection />

        {/* Section F: (05) MILES — Your year, in miles. */}
        <MilesCalculatorSection />

        {/* Section E: (06) THE APP — The shade, from your pocket. */}
        <AppSection />

        {/* Section: (07) BEFORE YOU ASK — Questions at the gate. */}
        <FaqSection />
      </main>

      {/* Section D: GLOAM invitation and giant wordmark footer */}
      <FooterSection onRequestMembership={() => setMembershipModalOpen(true)} />

      {/* Membership request modal */}
      <MembershipModal
        isOpen={membershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
      />
    </div>
  );
}
