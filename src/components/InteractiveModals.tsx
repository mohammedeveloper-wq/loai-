import { FormEvent, useEffect, useState } from 'react';
import { Check, CheckCircle2, Copy, X } from 'lucide-react';
import {
  GuidelineItem,
  JournalArticle,
  Language,
  MEMBERSHIP_TIERS,
  MembershipTier,
  PatientGuide,
  TrainingCenter,
  TrainingCourse,
} from '../data/shaData';

export type ActiveModal =
  | { type: 'portal'; preselectedTier?: MembershipTier }
  | { type: 'congress' }
  | { type: 'course'; course: TrainingCourse; center: TrainingCenter }
  | { type: 'guideline'; guideline: GuidelineItem }
  | { type: 'article'; article: JournalArticle }
  | { type: 'patient-guide'; guide: PatientGuide }
  | null;

interface InteractiveModalsProps {
  modal: ActiveModal;
  lang: Language;
  onClose: () => void;
}

export function InteractiveModals({ modal, lang, onClose }: InteractiveModalsProps) {
  const [portalMode, setPortalMode] = useState<'apply' | 'signin'>('apply');
  const [selectedTierId, setSelectedTierId] = useState<string>('fellow');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [scfhsId, setScfhsId] = useState('');
  const [institution, setInstitution] = useState('');
  const [delegatePass, setDelegatePass] = useState('physician');
  const [formError, setFormError] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [copiedCitation, setCopiedCitation] = useState(false);

  useEffect(() => {
    setFormError('');
    setSubmittedMessage('');
    setCopiedCitation(false);
    if (modal?.type === 'portal' && modal.preselectedTier) {
      setPortalMode('apply');
      setSelectedTierId(modal.preselectedTier.id);
    }
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modal, onClose]);

  if (!modal) return null;

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handlePortalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setFormError(
        lang === 'en' ? 'Please enter a valid professional email address.' : 'يرجى إدخال بريد إلكتروني صحيح.'
      );
      return;
    }
    if (portalMode === 'apply' && (!fullName.trim() || !scfhsId.trim())) {
      setFormError(
        lang === 'en'
          ? 'Full name and SCFHS registration number are required.'
          : 'الاسم الكامل ورقم تسجيل الهيئة السعودية للتخصصات الصحية مطلوبان.'
      );
      return;
    }
    setFormError('');
    setSubmittedMessage(
      portalMode === 'signin'
        ? lang === 'en'
          ? `A one-time member portal access link has been sent to ${email}.`
          : `تم إرسال رابط الدخول الموحد لبوابة الأعضاء إلى ${email}.`
        : lang === 'en'
        ? `Application received for ${fullName}. Your SCFHS verification reference is SHA-MEM-2026-904.`
        : `تم استلام طلب العضوية للزميل ${fullName}. الرقم المرجعي للمتابعة: SHA-MEM-2026-904.`
    );
  };

  const handleCongressSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !validateEmail(email)) {
      setFormError(
        lang === 'en'
          ? 'Please provide your full name and a valid email address.'
          : 'يرجى إدخال الاسم الكامل والبريد الإلكتروني الصحيح.'
      );
      return;
    }
    setFormError('');
    setSubmittedMessage(
      lang === 'en'
        ? `SHA37 Delegate Seat Reserved for ${fullName}. Confirmation & CME barcode dispatched to ${email}.`
        : `تم حجز مقعد المؤتمر SHA37 باسم ${fullName} وإرسال التذكرة ورمز الساعات المعتمدة إلى ${email}.`
    );
  };

  const handleCourseSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !validateEmail(email)) {
      setFormError(
        lang === 'en'
          ? 'Please enter trainee full name and email address.'
          : 'يرجى إدخال اسم المتدرب الكامل والبريد الإلكتروني.'
      );
      return;
    }
    setFormError('');
    if (modal.type === 'course') {
      setSubmittedMessage(
        lang === 'en'
          ? `Seat confirmed for ${modal.course.code} at ${modal.center.name.en} (${modal.center.nextSession}).`
          : `تم تأكيد حجز المقعد لدورة ${modal.course.code} في ${modal.center.name.ar}.`
      );
    }
  };

  const copyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
          <div>
            {modal.type === 'portal' && (
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en' ? 'SHA Member Portal & Fellowship' : 'بوابة أعضاء الجمعية السعودية للقلب'}
              </h3>
            )}
            {modal.type === 'congress' && (
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en' ? 'SHA37 Annual Congress Registration' : 'التسجيل في المؤتمر السنوي SHA37'}
              </h3>
            )}
            {modal.type === 'course' && (
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en' ? 'Reserve NCPR Training Seat' : 'حجز مقعد تدريب الإنعاش القلبي'}
              </h3>
            )}
            {modal.type === 'guideline' && (
              <div>
                <p className="font-mono text-xs text-[#991B1B] mb-1">
                  {modal.guideline.code} · {modal.guideline.year}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900">
                  {modal.guideline.title[lang]}
                </h3>
              </div>
            )}
            {modal.type === 'article' && (
              <div>
                <p className="font-mono text-xs text-slate-500 mb-1">
                  {modal.article.volume} · DOI: {modal.article.doi}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900">
                  {modal.article.title[lang]}
                </h3>
              </div>
            )}
            {modal.type === 'patient-guide' && (
              <div>
                <p className="text-xs font-semibold text-[#991B1B] mb-1">
                  {modal.guide.topic[lang]} · {modal.guide.readingTime}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900">
                  {modal.guide.title[lang]}
                </h3>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Modal */}
        {modal.type === 'portal' && (
          <div>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-6 w-fit">
              <button
                type="button"
                onClick={() => {
                  setPortalMode('apply');
                  setSubmittedMessage('');
                  setFormError('');
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  portalMode === 'apply' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                {lang === 'en' ? 'New Membership' : 'طلب عضوية جديدة'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPortalMode('signin');
                  setSubmittedMessage('');
                  setFormError('');
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  portalMode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                {lang === 'en' ? 'Member Sign-In' : 'دخول الأعضاء'}
              </button>
            </div>

            {submittedMessage ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#065F46] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800">{submittedMessage}</p>
              </div>
            ) : (
              <form onSubmit={handlePortalSubmit} className="space-y-4">
                {portalMode === 'apply' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {lang === 'en' ? 'Membership Category' : 'فئة العضوية'}
                      </label>
                      <select
                        value={selectedTierId}
                        onChange={(e) => setSelectedTierId(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                      >
                        {MEMBERSHIP_TIERS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name[lang]} — {t.annualFeeSar} SAR/yr
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {lang === 'en' ? 'Full Name & Title' : 'الاسم الكامل واللقب'}
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={lang === 'en' ? 'Dr. Abdullah Al-Qahtani' : 'د. عبدالله القحطاني'}
                          className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {lang === 'en' ? 'SCFHS Registration No.' : 'رقم تصنيف الهيئة'}
                        </label>
                        <input
                          type="text"
                          value={scfhsId}
                          onChange={(e) => setScfhsId(e.target.value)}
                          placeholder="21-R-M-004821"
                          className="w-full px-3.5 py-2 text-sm font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {lang === 'en' ? 'Hospital / Medical City' : 'المستشفى / المدينة الطبية'}
                      </label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder={
                          lang === 'en'
                            ? 'King Fahad Medical City, Riyadh'
                            : 'مدينة الملك فهد الطبية، الرياض'
                        }
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Official Work Email' : 'البريد الإلكتروني المهني'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="physician@hospital.med.sa"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                {formError && <p className="text-xs font-medium text-[#991B1B]">{formError}</p>}

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    {lang === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg cursor-pointer"
                  >
                    {portalMode === 'apply'
                      ? lang === 'en'
                        ? 'Submit Application'
                        : 'إرسال طلب العضوية'
                      : lang === 'en'
                      ? 'Send Portal Link'
                      : 'إرسال رابط الدخول'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Congress Registration Modal */}
        {modal.type === 'congress' && (
          <div>
            <p className="text-sm text-slate-600 mb-5">
              {lang === 'en'
                ? 'March 25–27, 2027 · Crowne Plaza RDC, Riyadh · Includes 24 SCFHS CME Hours & Scientific Proceedings.'
                : '٢٥–٢٧ مارس ٢٠٢٧ · كراون بلازا المدينة الرقمية، الرياض · يشمل ٢٤ ساعة تعليم طبي مستمر.'}
            </p>

            {submittedMessage ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#065F46] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800">{submittedMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleCongressSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Delegate Pass Type' : 'فئة تذكرة المؤتمر'}
                  </label>
                  <select
                    value={delegatePass}
                    onChange={(e) => setDelegatePass(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="physician">
                      {lang === 'en'
                        ? 'SHA Member Physician — 950 SAR'
                        : 'طبيب عضو بالجمعية — ٩٥٠ ريال'}
                    </option>
                    <option value="non-member">
                      {lang === 'en'
                        ? 'Non-Member Specialist — 1,450 SAR'
                        : 'طبيب أخصائي غير عضو — ١,٤٥٠ ريال'}
                    </option>
                    <option value="fellow">
                      {lang === 'en'
                        ? 'Fellow / Resident / Allied Health — 550 SAR'
                        : 'طبيب زمالة / تمريض / مهن مساندة — ٥٥٠ ريال'}
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Delegate Name' : 'اسم المشارك'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'en' ? 'Dr. Salma Al-Mutairi' : 'د. سلمى المطيري'}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="delegate@hospital.sa"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                {formError && <p className="text-xs font-medium text-[#991B1B]">{formError}</p>}

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : 'إغلاق'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg cursor-pointer"
                  >
                    {lang === 'en' ? 'Confirm Registration' : 'تأكيد التسجيل'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* NCPR Course Reservation Modal */}
        {modal.type === 'course' && (
          <div>
            <div className="bg-[#FAF9F7] border border-slate-200 rounded-lg p-4 mb-5 space-y-1 text-xs">
              <div className="font-semibold text-slate-900">{modal.course.title[lang]}</div>
              <div className="text-slate-600">{modal.center.name[lang]}</div>
              <div className="font-mono text-slate-500">
                {modal.center.accreditationCode} · {modal.center.nextSession}
              </div>
            </div>

            {submittedMessage ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#065F46] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800">{submittedMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleCourseSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Trainee Full Name' : 'اسم المتدرب الكامل'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'en' ? 'Tariq Mohammed Al-Harthi' : 'طارق محمد الحارثي'}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Email for E-Card Delivery' : 'البريد الإلكتروني لاستلام البطاقة'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clinician@health.sa"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                {formError && <p className="text-xs font-medium text-[#991B1B]">{formError}</p>}

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    {lang === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg cursor-pointer"
                  >
                    {lang === 'en' ? 'Reserve Seat' : 'تأكيد الحجز'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Clinical Guideline Reader */}
        {modal.type === 'guideline' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {modal.guideline.summary[lang]}
            </p>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                {lang === 'en' ? 'Key Class I Recommendations' : 'أبرز توصيات الفئة الأولى (Class I)'}
              </h4>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-200">
                {modal.guideline.recommendations.map((rec, i) => (
                  <div key={i} className="p-4 space-y-1.5">
                    <div className="font-mono text-xs text-[#991B1B]">
                      {rec.classLevel} · {rec.evidence}
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed">{rec.statement[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-mono text-xs text-slate-500">{modal.guideline.citation}</p>
              <button
                type="button"
                onClick={() => copyText(modal.guideline.citation)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-[#065F46]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>
                  {copiedCitation
                    ? lang === 'en'
                      ? 'Citation Copied'
                      : 'تم نسخ المرجع'
                    : lang === 'en'
                    ? 'Copy Citation'
                    : 'نسخ المرجع'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* JSHA Article Abstract Reader */}
        {modal.type === 'article' && (
          <div className="space-y-5">
            <p className="text-xs font-medium text-slate-600">{modal.article.authors}</p>
            <div className="p-5 bg-[#FAF9F7] border border-slate-200 rounded-lg">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                {lang === 'en' ? 'Structured Abstract' : 'الملخص العلمي'}
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed">
                {modal.article.abstract[lang]}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="font-mono text-xs text-slate-500">
                https://doi.org/{modal.article.doi}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyText(`${modal.article.authors} ${modal.article.title.en}. J Saudi Heart Assoc. doi:${modal.article.doi}`)
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-[#065F46]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>
                  {copiedCitation
                    ? lang === 'en'
                      ? 'Copied'
                      : 'تم النسخ'
                    : lang === 'en'
                    ? 'Copy DOI Citation'
                    : 'نسخ الاستشهاد'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Patient Health Pamphlet */}
        {modal.type === 'patient-guide' && (
          <div className="space-y-5">
            <p className="text-sm text-slate-700 leading-relaxed">{modal.guide.summary[lang]}</p>
            <ol className="space-y-3">
              {modal.guide.keySteps.map((step, idx) => (
                <li
                  key={idx}
                  className="p-4 bg-[#FAF9F7] border border-slate-200 rounded-lg flex items-start gap-3"
                >
                  <span className="font-mono text-xs font-semibold text-[#991B1B] mt-0.5 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span className="text-sm text-slate-800 leading-relaxed">{step[lang]}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
