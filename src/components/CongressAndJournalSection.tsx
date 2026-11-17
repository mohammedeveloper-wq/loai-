import { useState } from 'react';
import { ArrowUpRight, BookMarked, Calendar, Clock, MapPin } from 'lucide-react';
import {
  CONFERENCE_DAYS,
  JOURNAL_ARTICLES,
  JournalArticle,
  Language,
} from '../data/shaData';
import { SiteContentConfig } from '../lib/siteContentService';
import { ResilientImage } from './ResilientImage';

interface CongressAndJournalSectionProps {
  lang: Language;
  siteContent: SiteContentConfig;
  onOpenCongress: () => void;
  onSelectArticle: (article: JournalArticle) => void;
}

export function CongressAndJournalSection({
  lang,
  siteContent,
  onOpenCongress,
  onSelectArticle,
}: CongressAndJournalSectionProps) {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');

  const currentDay = CONFERENCE_DAYS.find((d) => d.dayKey === activeDay) ?? CONFERENCE_DAYS[0];
  const leadArticle = JOURNAL_ARTICLES.find((a) => a.tier === 'lead') ?? JOURNAL_ARTICLES[0];
  const secondaryArticles = JOURNAL_ARTICLES.filter((a) => a.tier === 'secondary');
  const archiveArticles = JOURNAL_ARTICLES.filter((a) => a.tier === 'archive');

  return (
    <>
      {/* SHA37 Annual Congress Section */}
      <section id="congress" className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 5 cols: Congress Visual & Overview */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="font-mono text-xs text-[#991B1B] mb-2">
                  {lang === 'en' ? 'February 16–18, 2027 · Riyadh' : '١٦–١٨ فبراير ٢٠٢٧ · الرياض'}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
                  {siteContent.sections.congressTitle[lang]}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {siteContent.sections.congressSubtitle[lang]}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3]">
                <ResilientImage
                  src={siteContent.images.conference}
                  alt={
                    lang === 'en'
                      ? 'International healthcare simulation keynote lecture inside the Riyadh forum auditorium'
                      : 'محاضرة رئيسية في الملتقى السعودي للمحاكاة الصحية بالرياض'
                  }
                  fallbackTitle={siteContent.sections.congressTitle[lang]}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-500 italic -mt-3">
                {lang === 'en'
                  ? 'Fig. 3 — Plenary simulation session at Riyadh Medical Convention Auditorium'
                  : 'شكل ٣ — الجلسة العلمية العامة في قاعة الملتقى بالرياض'}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="inline-flex items-center gap-1.5 font-medium text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-[#991B1B]" />
                    <span>
                      {lang === 'en' ? 'Crowne Plaza RDC, Riyadh' : 'كراون بلازا المدينة الرقمية، الرياض'}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-500 tabular-nums">
                    {lang === 'en' ? '30 SCFHS CME Accredited Hours' : '٣٠ ساعة تعليم طبي مستمر'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenCongress}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#991B1B]"
                >
                  <span>{lang === 'en' ? 'Register Delegate Pass' : 'تسجيل حضور المؤتمر'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 7 cols: Interactive 3-Day Scientific Track Schedule */}
            <div className="lg:col-span-7 bg-[#FAF9F7] border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-900">
                    {lang === 'en' ? 'Scientific Program Highlights' : 'أبرز جلسات البرنامج العلمي'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{currentDay.theme[lang]}</p>
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg" role="tablist">
                  {CONFERENCE_DAYS.map((day) => {
                    const isActive = day.dayKey === activeDay;
                    return (
                      <button
                        key={day.dayKey}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveDay(day.dayKey)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {day.label[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 mb-4">
                <Calendar className="w-3.5 h-3.5 text-[#991B1B]" />
                <span>{currentDay.date[lang]}</span>
              </div>

              <div className="divide-y divide-slate-200">
                {currentDay.sessions.map((session, idx) => (
                  <div key={idx} className="py-5 first:pt-2 last:pb-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="inline-flex items-center gap-1 font-mono text-slate-800 tabular-nums">
                        <Clock className="w-3 h-3" />
                        {session.time}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{session.hall[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#991B1B]">{session.track[lang]}</span>
                    </div>

                    <h4 className="font-display text-lg font-semibold text-slate-900 mb-1.5">
                      {session.title[lang]}
                    </h4>

                    <p className="text-xs text-slate-600">{session.speaker[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal of the Saudi Heart Association (JSHA) 3-Tier Editorial Section */}
      <section id="journal" className="py-16 lg:py-20 bg-[#FAF9F7] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-slate-500 mb-2">
                sjhs.saudisim.org.sa · ISSN 2468-9012
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-2">
                {siteContent.sections.journalTitle[lang]}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {siteContent.sections.journalSubtitle[lang]}
              </p>
            </div>
            <div className="text-xs text-slate-500 shrink-0">
              {lang === 'en'
                ? 'Open Access · Peer-Reviewed Simulation Research'
                : 'وصول مفتوح · أبحاث محكمة في المحاكاة الصحية'}
            </div>
          </div>

          {/* 3-Tier Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Tier 1: Lead Article (7 cols) */}
            <article className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200">
                <ResilientImage
                  src={siteContent.images.journal}
                  alt={
                    lang === 'en'
                      ? 'Medical simulation debriefing control room and clinical video evaluation console'
                      : 'غرفة التحكم والاستخلاص في مركز المحاكاة الطبية'
                  }
                  fallbackTitle={siteContent.sections.journalTitle[lang]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-medium text-[#991B1B]">
                    {leadArticle.category[lang]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{leadArticle.volume}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.readTime}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 leading-snug mb-3">
                  {leadArticle.title[lang]}
                </h3>

                <p className="text-xs font-medium text-slate-500 mb-4">{leadArticle.authors}</p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {leadArticle.deck[lang]}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <span className="font-mono text-xs text-slate-500">DOI: {leadArticle.doi}</span>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(leadArticle)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#991B1B] hover:text-[#7F1D1D] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Read Abstract & Cite' : 'قراءة الملخص والاستشهاد'}</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Tier 2 & 3: Secondary Features + Archive List (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
                {secondaryArticles.map((article) => (
                  <article key={article.id} className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-medium text-[#991B1B]">{article.category[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h4 className="font-display text-lg font-semibold text-slate-900 mb-2">
                      {article.title[lang]}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {article.deck[lang]}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 truncate">{article.authors}</span>
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="text-xs font-semibold text-[#991B1B] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {lang === 'en' ? 'Read Abstract' : 'عرض الملخص'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Tier 3: Compact Archive Rows */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="text-xs font-semibold tracking-wide text-slate-500 uppercase mb-4">
                  {lang === 'en' ? 'Recent Archive Issues' : 'أرشيف الأبحاث الحديثة'}
                </h4>
                <div className="divide-y divide-slate-200">
                  {archiveArticles.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span>{item.category[lang]}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.publishedDate}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectArticle(item)}
                        className="text-start text-sm font-semibold text-slate-900 hover:text-[#991B1B] transition-colors cursor-pointer"
                      >
                        {item.title[lang]}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
