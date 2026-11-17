import { ArrowRight, Check, Users } from 'lucide-react';
import {
  BOARD_MEMBERS,
  Language,
  MEMBERSHIP_TIERS,
  MembershipTier,
  PATIENT_GUIDES,
  PatientGuide,
  UI_COPY,
} from '../data/shaData';

interface LeadershipAndMembershipSectionProps {
  lang: Language;
  onApplyMembership: (tier: MembershipTier) => void;
  onSelectPatientGuide: (guide: PatientGuide) => void;
}

export function LeadershipAndMembershipSection({
  lang,
  onApplyMembership,
  onSelectPatientGuide,
}: LeadershipAndMembershipSectionProps) {
  return (
    <section id="membership" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Governance & Board of Directors */}
        <div>
          <div className="max-w-3xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
              {UI_COPY.sections.governanceTitle[lang]}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {UI_COPY.sections.governanceSubtitle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOARD_MEMBERS.map((member) => (
              <div
                key={member.name.en}
                className="bg-[#FAF9F7] border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-[#991B1B] mb-2">{member.role[lang]}</p>
                  <h3 className="font-display text-lg font-semibold text-slate-900 mb-1.5">
                    {member.name[lang]}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{member.institution[lang]}</p>
                </div>
                <p className="mt-5 pt-4 border-t border-slate-200 text-xs text-slate-500">
                  {member.specialty[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Tiers */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en' ? 'Professional Membership Tiers' : 'فئات العضوية المهنية'}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {lang === 'en'
                  ? 'Annual society enrollment for cardiovascular specialists, trainees, and allied professionals.'
                  : 'العضوية السنوية لاستشاريي القلب والأطباء المتدربين والكوادر الصحية المساندة.'}
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{lang === 'en' ? 'SCFHS & Working Group Eligible' : 'معتمدة للمجموعات العلمية'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h4 className="font-display text-xl font-semibold text-slate-900">
                      {tier.name[lang]}
                    </h4>
                    <div className="font-mono text-lg font-medium text-slate-900 tabular-nums whitespace-nowrap shrink-0">
                      {tier.annualFeeSar} {lang === 'en' ? 'SAR/yr' : 'ريال/سنة'}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-5 pb-4 border-b border-slate-200">
                    {tier.eligibility[lang]}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <Check className="w-4 h-4 text-[#065F46] shrink-0 mt-0.5" />
                        <span>{benefit[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyMembership(tier)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-[#991B1B] hover:text-white rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B]"
                >
                  {lang === 'en' ? 'Apply for Membership' : 'التقديم على العضوية'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Heart Education */}
        <div className="bg-[#FAF9F7] border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900">
                {lang === 'en' ? 'Patient & Community Heart Education' : 'التوعية القلبية للمرضى والمجتمع'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {lang === 'en'
                  ? 'Clear, physician-reviewed Arabic and English guides for patients and families across Saudi Arabia.'
                  : 'أدلة مبسطة ومراجعة من أطباء الجمعية لدعم المرضى وعائلاتهم في أنحاء المملكة.'}
              </p>
            </div>
            <span className="font-mono text-xs text-slate-500 whitespace-nowrap shrink-0">
              {lang === 'en' ? 'Emergency: 997' : 'طوارئ الهلال الأحمر: ٩٩٧'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATIENT_GUIDES.map((guide) => (
              <article key={guide.id} className="flex flex-col justify-between bg-white border border-slate-200 rounded-lg p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-medium text-[#991B1B]">{guide.topic[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.readingTime}</span>
                  </div>
                  <h4 className="font-display text-lg font-semibold text-slate-900 mb-2">
                    {guide.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {guide.summary[lang]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectPatientGuide(guide)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-[#991B1B] transition-colors cursor-pointer w-fit"
                >
                  <span>{lang === 'en' ? 'Open Patient Guide' : 'قراءة الدليل التوعوي'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
