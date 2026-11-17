/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CongressAndJournalSection } from './components/CongressAndJournalSection';
import { Footer } from './components/Footer';
import { GuidelinesSection } from './components/GuidelinesSection';
import { HeroSection } from './components/HeroSection';
import { ActiveModal, InteractiveModals } from './components/InteractiveModals';
import { LeadershipAndMembershipSection } from './components/LeadershipAndMembershipSection';
import { Navbar } from './components/Navbar';
import { TrainingSection } from './components/TrainingSection';
import { Language } from './data/shaData';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleJumpToVerifier = () => {
    const el = document.getElementById('ncpr-verifier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = document.getElementById('cert-id-input');
      if (input instanceof HTMLInputElement) {
        input.focus({ preventScroll: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#0F172A]">
      <Navbar
        lang={lang}
        onOpenPortal={() => setActiveModal({ type: 'portal' })}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenCongress={() => setActiveModal({ type: 'congress' })}
          onJumpToVerifier={handleJumpToVerifier}
        />

        <GuidelinesSection
          lang={lang}
          onSelectGuideline={(guideline) =>
            setActiveModal({ type: 'guideline', guideline })
          }
        />

        <TrainingSection
          lang={lang}
          onReserveCourse={(course, center) =>
            setActiveModal({ type: 'course', course, center })
          }
        />

        <CongressAndJournalSection
          lang={lang}
          onOpenCongress={() => setActiveModal({ type: 'congress' })}
          onSelectArticle={(article) =>
            setActiveModal({ type: 'article', article })
          }
        />

        <LeadershipAndMembershipSection
          lang={lang}
          onApplyMembership={(tier) =>
            setActiveModal({ type: 'portal', preselectedTier: tier })
          }
          onSelectPatientGuide={(guide) =>
            setActiveModal({ type: 'patient-guide', guide })
          }
        />
      </main>

      <Footer
        lang={lang}
        onOpenPortal={() => setActiveModal({ type: 'portal' })}
      />

      <InteractiveModals
        modal={activeModal}
        lang={lang}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
