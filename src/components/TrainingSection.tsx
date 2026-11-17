import { FormEvent, useState } from 'react';
import { Calendar, CheckCircle2, CreditCard, MapPin, Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  CERTIFICATE_REGISTRY,
  CertificateRecord,
  Language,
  TRAINING_CENTERS,
  TRAINING_COURSES,
  TrainingCenter,
  TrainingCourse,
} from '../data/shaData';
import { verifyNcprCertificate } from '../lib/shaSupabaseService';
import { SiteContentConfig } from '../lib/siteContentService';
import { ResilientImage } from './ResilientImage';

interface TrainingSectionProps {
  lang: Language;
  siteContent: SiteContentConfig;
  onReserveCourse: (course: TrainingCourse, center: TrainingCenter) => void;
  onOpenPaymentPortal: () => void;
}

type RegionFilter = 'all' | 'riyadh' | 'makkah' | 'eastern' | 'asir' | 'madinah';

export function TrainingSection({
  lang,
  siteContent,
  onReserveCourse,
  onOpenPaymentPortal,
}: TrainingSectionProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<TrainingCourse['id']>('SIM-FAC');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');

  // Certificate verification state
  const [certQuery, setCertQuery] = useState('SSSH-2026-8841');
  const [verifiedCert, setVerifiedCert] = useState<CertificateRecord | null>(CERTIFICATE_REGISTRY[0]);
  const [certNotFound, setCertNotFound] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const selectedCourse =
    TRAINING_COURSES.find((c) => c.id === selectedCourseId) ?? TRAINING_COURSES[0];

  const matchingCenters = TRAINING_CENTERS.filter((center) => {
    const offersCourse = center.courses.includes(selectedCourseId);
    const matchesRegion = regionFilter === 'all' || center.region === regionFilter;
    return offersCourse && matchesRegion;
  });

  const regions: { key: RegionFilter; label: { en: string; ar: string } }[] = [
    { key: 'all', label: { en: 'All Regions', ar: 'جميع المناطق' } },
    { key: 'riyadh', label: { en: 'Riyadh', ar: 'الرياض' } },
    { key: 'makkah', label: { en: 'Makkah / Jeddah', ar: 'مكة / جدة' } },
    { key: 'eastern', label: { en: 'Eastern Province', ar: 'الشرقية' } },
    { key: 'asir', label: { en: 'Asir', ar: 'عسير' } },
    { key: 'madinah', label: { en: 'Madinah', ar: 'المدينة' } },
  ];

  const handleVerifySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const match = await verifyNcprCertificate(certQuery);
      if (match) {
        setVerifiedCert(match);
        setCertNotFound(false);
      } else {
        setVerifiedCert(null);
        setCertNotFound(true);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section id="training" className="py-16 lg:py-20 bg-[#FAF9F7] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-[#991B1B] mb-2">
              {lang === 'en' ? 'Accredited Simulation Academy · Online Payment' : 'أكاديمية المحاكاة المعتمدة · دفع إلكتروني'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
              {siteContent.sections.trainingTitle[lang]}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-5">
              {siteContent.sections.trainingSubtitle[lang]}
            </p>
            <button
              type="button"
              onClick={onOpenPaymentPortal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#991B1B]" />
              <span>
                {lang === 'en'
                  ? 'Open Payment & Invoice Lookup Portal'
                  : 'فتح بوابة الدفع والاستعلام عن الفواتير'}
              </span>
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white aspect-[4/3]">
              <ResilientImage
                src={siteContent.images.training}
                alt={
                  lang === 'en'
                    ? 'Clinical simulation team practicing high-fidelity crisis resource management in a training bay'
                    : 'فريق طبي يتدرب على إدارة الأزمات السريرية في مختبر المحاكاة'
                }
                fallbackTitle={siteContent.sections.trainingTitle[lang]}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 italic">
              {lang === 'en'
                ? 'Fig. 2 — Multidisciplinary simulation bay & Crisis Resource Management drill, Riyadh'
                : 'شكل ٢ — تمرين إدارة الأزمات السريرية متعدد التخصصات، الرياض'}
            </p>
          </div>
        </div>

        {/* Course Track Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            {TRAINING_COURSES.map((course) => {
              const active = course.id === selectedCourseId;
              const shortLabel: Record<TrainingCourse['id'], { en: string; ar: string }> = {
                'SIM-FAC': { en: 'Simulation & Debriefing', ar: 'أساسيات المحاكاة' },
                'SIM-OPS': { en: 'Operations & Moulage', ar: 'عمليات المحاكاة' },
                INSITU: { en: 'In-Situ Safety', ar: 'المحاكاة الميدانية' },
                'SP-EDUC': { en: 'SP & OSCE Design', ar: 'المرضى المعياريون' },
                'CRM-ACLS': { en: 'Code Blue CRM', ar: 'محاكاة الطوارئ' },
              };
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {shortLabel[course.id][lang]}
                </button>
              );
            })}
          </div>

          {/* Active Course Summary Bar */}
          <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-mono text-slate-700">{selectedCourse.code}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedCourse.duration[lang]}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedCourse.validity[lang]}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                {selectedCourse.title[lang]}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                {selectedCourse.description[lang]}
              </p>
              <p className="text-xs text-slate-500">
                <strong className="font-semibold text-slate-700">
                  {lang === 'en' ? 'Target Audience: ' : 'الفئة المستهدفة: '}
                </strong>
                {selectedCourse.audience[lang]}
              </p>
            </div>

            <div className="lg:col-span-4 lg:border-s lg:border-slate-200 lg:ps-6 flex flex-row lg:flex-col justify-between gap-4">
              <div>
                <div className="font-mono text-2xl font-medium text-slate-900 tabular-nums">
                  {selectedCourse.feeSar.toLocaleString()} {lang === 'en' ? 'SAR' : 'ريال'}
                </div>
                <div className="text-xs text-slate-500 tabular-nums">
                  {selectedCourse.cmeHours} {lang === 'en' ? 'SCFHS CME Hours · +15% VAT' : 'ساعة تعليم مستمر · +١٥٪ ضريبة'}
                </div>
              </div>
              <div className="text-xs text-slate-600">
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  {matchingCenters.length}
                </span>{' '}
                {lang === 'en' ? 'accredited centers open' : 'مراكز متاحة للتسجيل'}
              </div>
            </div>
          </div>
        </div>

        {/* Accredited Centers Explorer + Certificate Verifier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 Cols: Accredited Simulation Centers */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl font-semibold text-slate-900">
                {lang === 'en' ? 'Select Center & Register' : 'اختر المركز للتسجيل والدفع'}
              </h3>

              <div className="flex flex-wrap items-center gap-1.5">
                {regions.map((region) => (
                  <button
                    key={region.key}
                    type="button"
                    onClick={() => setRegionFilter(region.key)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      regionFilter === region.key
                        ? 'bg-[#991B1B] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {region.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {matchingCenters.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-sm text-slate-600 mb-3">
                  {lang === 'en'
                    ? 'No sessions found for this course in the selected region.'
                    : 'لا توجد مقاعد مجدولة لهذه الدورة في المنطقة المختارة حالياً.'}
                </p>
                <button
                  type="button"
                  onClick={() => setRegionFilter('all')}
                  className="text-xs font-semibold text-[#991B1B] hover:underline cursor-pointer"
                >
                  {lang === 'en' ? 'Show all Kingdom regions' : 'عرض جميع مناطق المملكة'}
                </button>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
                {matchingCenters.map((center) => (
                  <div
                    key={center.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-mono text-slate-700">{center.accreditationCode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {center.city[lang]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                          <Calendar className="w-3 h-3" />
                          {center.nextSession}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">
                        {center.name[lang]}
                      </h4>
                      <p className="text-xs text-slate-500 tabular-nums">
                        {center.seatsAvailable}{' '}
                        {lang === 'en' ? 'seats remaining' : 'مقعد متاح للتسجيل'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onReserveCourse(selectedCourse, center)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B]"
                    >
                      {lang === 'en' ? 'Register & Pay' : 'التسجيل والدفع'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right 5 Cols: Live Credential Verifier */}
          <div
            id="ncpr-verifier"
            className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6"
          >
            <h3 className="font-display text-xl font-semibold text-slate-900 mb-1.5">
              {lang === 'en' ? 'Verify Simulation Credential' : 'التحقق من شهادة المحاكاة'}
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              {lang === 'en'
                ? 'Validate official SSSH simulation educator & operations certificates issued across Saudi hubs.'
                : 'تحقق فورياً من صحة شهادات مدربي وفنيي المحاكاة الصحية المعتمدة.'}
            </p>

            <form onSubmit={handleVerifySubmit} className="space-y-3 mb-5">
              <label htmlFor="cert-id-input" className="sr-only">
                {lang === 'en' ? 'Certificate ID' : 'رقم الشهادة'}
              </label>
              <div className="flex gap-2">
                <input
                  id="cert-id-input"
                  type="text"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder="SSSH-2026-8841"
                  className="flex-1 min-w-0 px-3.5 py-2 text-sm font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#991B1B]"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>
                    {isVerifying
                      ? lang === 'en'
                        ? 'Checking...'
                        : 'جاري التحقق...'
                      : lang === 'en'
                      ? 'Verify'
                      : 'تحقق'}
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{lang === 'en' ? 'Sample IDs:' : 'أمثلة:'}</span>
                {CERTIFICATE_REGISTRY.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setCertQuery(sample.id);
                      setVerifiedCert(sample);
                      setCertNotFound(false);
                    }}
                    className="font-mono text-xs text-slate-700 hover:text-[#991B1B] underline underline-offset-2 cursor-pointer"
                  >
                    {sample.id}
                  </button>
                ))}
              </div>
            </form>

            {verifiedCert && (
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-500">{verifiedCert.id}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      verifiedCert.status === 'Valid' ? 'text-[#065F46]' : 'text-amber-800'
                    }`}
                  >
                    {verifiedCert.status === 'Valid' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <ShieldAlert className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {verifiedCert.status === 'Valid'
                        ? lang === 'en'
                          ? 'Active & Valid'
                          : 'شهادة سارية ومعتمدة'
                        : lang === 'en'
                        ? 'Renewal Window Open'
                        : 'قريبة الانتهاء (التجديد متاح)'}
                    </span>
                  </span>
                </div>

                <dl className="grid grid-cols-1 gap-2 text-xs pt-1">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">{lang === 'en' ? 'Holder' : 'حامل الشهادة'}</dt>
                    <dd className="font-semibold text-slate-900 text-end">
                      {verifiedCert.holderName[lang]}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">{lang === 'en' ? 'Credential' : 'الدورة'}</dt>
                    <dd className="font-medium text-slate-800 text-end">{verifiedCert.course}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">{lang === 'en' ? 'Center' : 'المركز'}</dt>
                    <dd className="text-slate-700 text-end">{verifiedCert.center[lang]}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">{lang === 'en' ? 'Valid Until' : 'تنتهي في'}</dt>
                    <dd className="font-mono text-slate-900 tabular-nums">
                      {verifiedCert.expiryDate}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {certNotFound && (
              <div className="pt-4 border-t border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                <p>
                  {lang === 'en'
                    ? 'No matching credential found in the active registry. Confirm the exact prefix (e.g., SSSH-2026-8841).'
                    : 'لم يتم العثور على شهادة مطابقة. تأكد من إدخال الرقم بالصيغة الصحيحة.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
