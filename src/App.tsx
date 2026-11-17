/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CongressAndJournalSection } from './components/CongressAndJournalSection';
import { ContentManagerModal } from './components/ContentManagerModal';
import { Footer } from './components/Footer';
import { GuidelinesSection } from './components/GuidelinesSection';
import { HeroSection } from './components/HeroSection';
import { ActiveModal, InteractiveModals } from './components/InteractiveModals';
import { LeadershipAndMembershipSection } from './components/LeadershipAndMembershipSection';
import { Navbar } from './components/Navbar';
import { TrainingSection } from './components/TrainingSection';
import { Language } from './data/shaData';
import {
  DEFAULT_SITE_CONTENT,
  fetchSiteContent,
  SiteContentConfig,
} from './lib/siteContentService';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(DEFAULT_SITE_CONTENT);
  const [contentManagerOpen, setContentManagerOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    let active = true;
    fetchSiteContent().then((loaded) => {
      if (active) {
        setSiteContent(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, []);

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
        siteContent={siteContent}
        onOpenPortal={() => setActiveModal({ type: 'portal', initialTab: 'checkout' })}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          siteContent={siteContent}
          onToggleLang={handleToggleLang}
          onOpenPaymentPortal={() => setActiveModal({ type: 'portal', initialTab: 'checkout' })}
          onJumpToVerifier={handleJumpToVerifier}
        />

        <GuidelinesSection
          lang={lang}
          siteContent={siteContent}
          onSelectGuideline={(guideline) =>
            setActiveModal({ type: 'guideline', guideline })
          }
        />

        <TrainingSection
          lang={lang}
          siteContent={siteContent}
          onReserveCourse={(course, center) =>
            setActiveModal({ type: 'course', course, center })
          }
          onOpenPaymentPortal={() => setActiveModal({ type: 'portal', initialTab: 'invoices' })}
        />

        <CongressAndJournalSection
          lang={lang}
          siteContent={siteContent}
          onOpenCongress={() => setActiveModal({ type: 'congress' })}
          onSelectArticle={(article) =>
            setActiveModal({ type: 'article', article })
          }
        />

        <LeadershipAndMembershipSection
          lang={lang}
          siteContent={siteContent}
          onApplyMembership={(tier) =>
            setActiveModal({ type: 'portal', preselectedTier: tier })
          }
          onSelectLabGuide={(guide) =>
            setActiveModal({ type: 'lab-guide', guide })
          }
        />
      </main>

      <Footer
        lang={lang}
        siteContent={siteContent}
        onOpenPortal={() => setActiveModal({ type: 'portal', initialTab: 'checkout' })}
        onOpenContentManager={() => setContentManagerOpen(true)}
      />

      <InteractiveModals
        modal={activeModal}
        lang={lang}
        onClose={() => setActiveModal(null)}
      />

      <ContentManagerModal
        isOpen={contentManagerOpen}
        lang={lang}
        content={siteContent}
        onUpdateContent={setSiteContent}
        onClose={() => setContentManagerOpen(false)}
      />
    </div>
  );
}
