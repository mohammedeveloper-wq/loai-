import { ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE, Language, UI_COPY } from '../data/shaData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenCongress: () => void;
  onJumpToVerifier: () => void;
}

export function HeroSection({
  lang,
  onToggleLang,
  onOpenCongress,
  onJumpToVerifier,
}: HeroSectionProps) {
  return (
    <section id="top" className="border-b border-slate-200 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Two-column editorial split with balanced stretch height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-slate-500 mb-5">
                {UI_COPY.hero.eyebrow[lang]}
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-slate-900 leading-[1.12] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)' }}
              >
                {UI_COPY.hero.headline[lang]}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                {UI_COPY.hero.subheadline[lang]}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenCongress}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#991B1B]"
                >
                  <span>{UI_COPY.hero.primaryCta[lang]}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href="#guidelines"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                >
                  {UI_COPY.hero.secondaryCta[lang]}
                </a>
              </div>
            </div>

            {/* Institutional Operational Controls (placed cleanly in hero below CTA) */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onJumpToVerifier}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#991B1B] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] rounded"
              >
                <ShieldCheck className="w-4 h-4 text-[#065F46]" />
                <span>
                  {lang === 'en'
                    ? 'Verify NCPR Life-Support Certificate'
                    : 'التحقق من شهادة الإنعاش القلبي NCPR'}
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleLang}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B]"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <ResilientImage
                src={HERO_IMAGE}
                alt={
                  lang === 'en'
                    ? 'Cardiologists walking through a sunlit architectural medical research atrium in Riyadh'
                    : 'أطباء قلب يسيرون في بهو طبي حديث مضاء بأشعة الشمس في الرياض'
                }
                fallbackTitle={UI_COPY.brand[lang]}
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
            <p className="mt-2.5 text-xs text-slate-500 italic">
              {UI_COPY.hero.imageCaption[lang]}
            </p>
          </div>
        </div>

        {/* Full-Width 4-Column KPI & Operational Proof Ribbon */}
        <div
          id="about"
          className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {UI_COPY.hero.kpis.map((kpi) => (
            <div key={kpi.value} className="space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 tabular-nums">
                {kpi.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600">{kpi.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
