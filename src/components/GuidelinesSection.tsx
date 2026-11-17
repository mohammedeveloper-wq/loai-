import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  GUIDELINES,
  GuidelineItem,
  Language,
  UI_COPY,
  WORKING_GROUPS,
} from '../data/shaData';

interface GuidelinesSectionProps {
  lang: Language;
  onSelectGuideline: (guideline: GuidelineItem) => void;
}

type CategoryFilter = 'all' | 'coronary' | 'heart-failure' | 'prevention' | 'electrophysiology';

export function GuidelinesSection({ lang, onSelectGuideline }: GuidelinesSectionProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filterOptions: { key: CategoryFilter; label: { en: string; ar: string } }[] = [
    { key: 'all', label: { en: 'All Guidelines', ar: 'جميع الأدلة' } },
    { key: 'coronary', label: { en: 'Coronary & ACS', ar: 'الشرايين التاجية' } },
    { key: 'heart-failure', label: { en: 'Heart Failure', ar: 'قصور القلب' } },
    { key: 'prevention', label: { en: 'Prevention', ar: 'الوقاية والدهون' } },
    { key: 'electrophysiology', label: { en: 'Electrophysiology', ar: 'كهربائية القلب' } },
  ];

  const visibleGuidelines =
    filter === 'all' ? GUIDELINES : GUIDELINES.filter((g) => g.category === filter);

  return (
    <section id="guidelines" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
            {UI_COPY.sections.guidelinesTitle[lang]}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {UI_COPY.sections.guidelinesSubtitle[lang]}
          </p>
        </div>

        {/* Two-column layout: Guidelines List (7 cols) + Working Groups Index (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Clinical Guidelines */}
          <div className="lg:col-span-7">
            {/* Segmented Filter Tabs */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg mb-6 w-fit"
              role="tablist"
              aria-label={lang === 'en' ? 'Guideline specialties' : 'تخصصات الأدلة'}
            >
              {filterOptions.map((option) => {
                const isActive = filter === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(option.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {option.label[lang]}
                  </button>
                );
              })}
            </div>

            {/* Guideline Rows — clean hairline dividers, unboxed metadata */}
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {visibleGuidelines.map((item) => (
                <article
                  key={item.id}
                  className="py-6 group transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-mono text-slate-700">{item.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.categoryLabel[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {item.pages} {lang === 'en' ? 'pages' : 'صفحة'}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#991B1B] transition-colors">
                    {item.title[lang]}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.summary[lang]}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">{item.taskforce[lang]}</span>

                    <button
                      type="button"
                      onClick={() => onSelectGuideline(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#991B1B] hover:text-[#7F1D1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] rounded"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en' ? 'Read Summary & Class I Guidance' : 'قراءة الملخص والتوصيات'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: Scientific Working Groups Directory */}
          <aside className="lg:col-span-5 bg-[#FAF9F7] border border-slate-200 rounded-xl p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-slate-200 mb-4">
              <h3 className="font-display text-xl font-semibold text-slate-900">
                {UI_COPY.sections.workingGroupsTitle[lang]}
              </h3>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {WORKING_GROUPS.length} {lang === 'en' ? 'chapters' : 'مجموعات'}
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {WORKING_GROUPS.map((wg) => (
                <div key={wg.index} className="py-4 first:pt-1 last:pb-0">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h4 className="text-sm font-semibold text-slate-900">
                      <span className="font-mono text-xs text-[#991B1B] me-2 tabular-nums">
                        {wg.index}.
                      </span>
                      {wg.name[lang]}
                    </h4>
                    <span className="font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap shrink-0">
                      {wg.membersCount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{wg.focus[lang]}</p>
                  <p className="text-xs text-slate-500">
                    {wg.chair[lang]} · {wg.institution[lang]}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
