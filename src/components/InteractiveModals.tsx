import { FormEvent, useEffect, useState } from 'react';
import {
  Building2,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Receipt,
  Search,
  Smartphone,
  X,
} from 'lucide-react';
import {
  GuidelineItem,
  JournalArticle,
  LabGuide,
  Language,
  MEMBERSHIP_TIERS,
  MembershipTier,
  SAMPLE_INVOICES,
  TRAINING_CENTERS,
  TRAINING_COURSES,
  TrainingCenter,
  TrainingCourse,
} from '../data/shaData';
import {
  lookupInvoiceById,
  PaymentReceiptRecord,
  signInMemberWithEmail,
  submitCongressRegistration,
  submitCourseReservation,
  submitMembershipApplication,
  submitPaymentTransaction,
} from '../lib/shaSupabaseService';

export type ActiveModal =
  | { type: 'portal'; preselectedTier?: MembershipTier; initialTab?: 'checkout' | 'invoices' | 'signin' }
  | { type: 'congress' }
  | { type: 'course'; course: TrainingCourse; center: TrainingCenter }
  | { type: 'guideline'; guideline: GuidelineItem }
  | { type: 'article'; article: JournalArticle }
  | { type: 'lab-guide'; guide: LabGuide }
  | null;

interface InteractiveModalsProps {
  modal: ActiveModal;
  lang: Language;
  onClose: () => void;
}

type PaymentMethod = 'mada_card' | 'sadad' | 'apple_pay';

export function InteractiveModals({ modal, lang, onClose }: InteractiveModalsProps) {
  const [portalTab, setPortalTab] = useState<'checkout' | 'invoices' | 'signin'>('checkout');

  // Checkout item selection (for unified Payment Portal)
  const [checkoutCategory, setCheckoutCategory] = useState<'course' | 'symposium' | 'membership'>('course');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(TRAINING_COURSES[0].id);
  const [selectedCenterId, setSelectedCenterId] = useState<string>(TRAINING_CENTERS[0].id);
  const [selectedTierId, setSelectedTierId] = useState<string>(MEMBERSHIP_TIERS[0].id);
  const [delegatePass, setDelegatePass] = useState<'physician' | 'non-member' | 'fellow'>('physician');

  // Registrant details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scfhsId, setScfhsId] = useState('');
  const [promoCode, setPromoCode] = useState('');

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mada_card');

  // Status & Receipt
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceiptRecord | null>(null);
  const [signinMessage, setSigninMessage] = useState('');
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Invoice lookup state
  const [invoiceQuery, setInvoiceQuery] = useState('INV-SSSH-2026-3041');
  const [lookedUpInvoice, setLookedUpInvoice] = useState<PaymentReceiptRecord | null>(SAMPLE_INVOICES[0]);
  const [invoiceNotFound, setInvoiceNotFound] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);

  useEffect(() => {
    setFormError('');
    setReceipt(null);
    setSigninMessage('');
    setIsSubmitting(false);
    setCopiedCitation(false);

    if (modal?.type === 'portal') {
      if (modal.preselectedTier) {
        setPortalTab('checkout');
        setCheckoutCategory('membership');
        setSelectedTierId(modal.preselectedTier.id);
      } else {
        setPortalTab(modal.initialTab ?? 'checkout');
      }
    } else if (modal?.type === 'course') {
      setCheckoutCategory('course');
      setSelectedCourseId(modal.course.id);
      setSelectedCenterId(modal.center.id);
    } else if (modal?.type === 'congress') {
      setCheckoutCategory('symposium');
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

  // Calculate active line item & SAR breakdown
  const getActiveBillingItem = () => {
    if (modal.type === 'course') {
      return {
        registrationType: 'course' as const,
        itemCode: modal.course.code,
        itemTitle: `${modal.course.title[lang]} — ${modal.center.city[lang]} (${modal.center.nextSession})`,
        baseFee: modal.course.feeSar,
      };
    }

    if (modal.type === 'congress' || (modal.type === 'portal' && checkoutCategory === 'symposium')) {
      const fees = { physician: 950, 'non-member': 1450, fellow: 550 };
      const labels = {
        physician: lang === 'en' ? 'SSSH27 Member Physician Pass' : 'تذكرة طبيب عضو بالملتقى',
        'non-member': lang === 'en' ? 'SSSH27 Non-Member Specialist Pass' : 'تذكرة أخصائي غير عضو',
        fellow: lang === 'en' ? 'SSSH27 Trainee / Operations Pass' : 'تذكرة متدرب / تشغيل محاكاة',
      };
      return {
        registrationType: 'symposium' as const,
        itemCode: `SSSH27-${delegatePass.toUpperCase()}`,
        itemTitle: labels[delegatePass],
        baseFee: fees[delegatePass],
      };
    }

    if (checkoutCategory === 'membership') {
      const tier = MEMBERSHIP_TIERS.find((t) => t.id === selectedTierId) ?? MEMBERSHIP_TIERS[0];
      return {
        registrationType: 'membership' as const,
        itemCode: `SSSH-MEM-${tier.id.toUpperCase()}`,
        itemTitle: tier.name[lang],
        baseFee: tier.annualFeeSar,
      };
    }

    const course = TRAINING_COURSES.find((c) => c.id === selectedCourseId) ?? TRAINING_COURSES[0];
    const center = TRAINING_CENTERS.find((c) => c.id === selectedCenterId) ?? TRAINING_CENTERS[0];
    return {
      registrationType: 'course' as const,
      itemCode: course.code,
      itemTitle: `${course.title[lang]} — ${center.city[lang]} (${center.nextSession})`,
      baseFee: course.feeSar,
    };
  };

  const billingItem = getActiveBillingItem();
  const hasDiscount = promoCode.trim().toUpperCase() === 'SSSH10';
  const discountSar = hasDiscount ? Number((billingItem.baseFee * 0.1).toFixed(2)) : 0;
  const taxableSar = Number((billingItem.baseFee - discountSar).toFixed(2));
  const vatSar = Number((taxableSar * 0.15).toFixed(2));
  const totalSar = Number((taxableSar + vatSar).toFixed(2));



  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !validateEmail(email)) {
      setFormError(
        lang === 'en'
          ? 'Please enter your full name and a valid email address.'
          : 'يرجى إدخال الاسم الكامل وبريد إلكتروني صحيح.'
      );
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      // Save registration record in its specific table as well as payment_transactions
      if (billingItem.registrationType === 'course') {
        const activeCourse =
          modal.type === 'course'
            ? modal.course
            : TRAINING_COURSES.find((c) => c.id === selectedCourseId) ?? TRAINING_COURSES[0];
        const activeCenter =
          modal.type === 'course'
            ? modal.center
            : TRAINING_CENTERS.find((c) => c.id === selectedCenterId) ?? TRAINING_CENTERS[0];

        await submitCourseReservation({
          courseCode: activeCourse.code,
          centerCode: activeCenter.accreditationCode,
          centerName: activeCenter.name.en,
          sessionDate: activeCenter.nextSession,
          traineeName: fullName,
          email,
        });
      } else if (billingItem.registrationType === 'symposium') {
        await submitCongressRegistration({
          delegatePass,
          fullName,
          email,
        });
      } else {
        await submitMembershipApplication({
          tierId: selectedTierId,
          fullName,
          scfhsId: scfhsId || 'PENDING',
          institution: 'Healthcare Simulation Member',
          email,
        });
      }

      const generatedReceipt = await submitPaymentTransaction({
        registrationType: billingItem.registrationType,
        itemCode: billingItem.itemCode,
        itemTitle: billingItem.itemTitle,
        fullName,
        email,
        phone,
        scfhsId,
        paymentMethod,
        subtotalSar: billingItem.baseFee,
        discountSar,
        vatSar,
        totalSar,
      });

      setReceipt(generatedReceipt);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to process registration payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setFormError(
        lang === 'en' ? 'Please enter a valid professional email address.' : 'يرجى إدخال بريد إلكتروني صحيح.'
      );
      return;
    }
    setFormError('');
    setIsSubmitting(true);
    try {
      const result = await signInMemberWithEmail(email);
      if (!result.sent) {
        setFormError(result.errorMessage ?? 'Unable to send portal link.');
        return;
      }
      setSigninMessage(
        lang === 'en'
          ? `One-time member access link dispatched to ${email}.`
          : `تم إرسال رابط الدخول الموحد لبوابة الأعضاء إلى ${email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvoiceLookup = async (e: FormEvent) => {
    e.preventDefault();
    setIsLookingUp(true);
    try {
      const match = await lookupInvoiceById(invoiceQuery);
      if (match) {
        setLookedUpInvoice(match);
        setInvoiceNotFound(false);
      } else {
        setLookedUpInvoice(null);
        setInvoiceNotFound(true);
      }
    } finally {
      setIsLookingUp(false);
    }
  };

  const copyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const isCheckoutFlow =
    modal.type === 'course' ||
    modal.type === 'congress' ||
    (modal.type === 'portal' && portalTab === 'checkout');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
          <div>
            {modal.type === 'portal' && (
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en'
                  ? 'Registration, Payment & Member Portal'
                  : 'بوابة التسجيل والدفع وخدمات الأعضاء'}
              </h3>
            )}
            {modal.type === 'congress' && (
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en'
                  ? 'SSSH27 Annual Forum Registration & Checkout'
                  : 'التسجيل والدفع للملتقى السنوي SSSH27'}
              </h3>
            )}
            {modal.type === 'course' && (
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {lang === 'en'
                  ? 'Simulation Course Registration & Payment'
                  : 'التسجيل والدفع لدورة المحاكاة الصحية'}
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
            {modal.type === 'lab-guide' && (
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

        {/* Portal Top Tabs */}
        {modal.type === 'portal' && (
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg mb-6 w-fit">
            <button
              type="button"
              onClick={() => {
                setPortalTab('checkout');
                setReceipt(null);
                setFormError('');
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                portalTab === 'checkout' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              {lang === 'en' ? 'Register & Pay' : 'التسجيل والدفع'}
            </button>
            <button
              type="button"
              onClick={() => {
                setPortalTab('invoices');
                setFormError('');
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                portalTab === 'invoices' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              {lang === 'en' ? 'Invoice Lookup' : 'الاستعلام عن الفواتير'}
            </button>
            <button
              type="button"
              onClick={() => {
                setPortalTab('signin');
                setSigninMessage('');
                setFormError('');
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                portalTab === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              {lang === 'en' ? 'Member Sign-In' : 'دخول الأعضاء'}
            </button>
          </div>
        )}

        {/* Unified Registration & Payment Checkout Flow */}
        {isCheckoutFlow && (
          <div>
            {receipt ? (
              <div className="space-y-5">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#065F46] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {receipt.status === 'Paid'
                        ? lang === 'en'
                          ? 'Payment Confirmed & Seat Registered'
                          : 'تم تأكيد الدفع وإتمام التسجيل بنجاح'
                        : lang === 'en'
                        ? 'SADAD Invoice Generated — Seat Held for 48 Hours'
                        : 'تم إصدار فاتورة سداد — المقعد محجوز لمدة ٤٨ ساعة'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Keep your invoice reference below for verification or reimbursement.'
                        : 'احتفظ برقم الفاتورة المرجعي أدناه للمراجعة أو الاستعلام.'}
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF9F7] border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-mono font-semibold text-slate-900">{receipt.invoiceId}</span>
                    <span className="font-mono text-slate-600 tabular-nums">{receipt.date}</span>
                  </div>
                  <dl className="space-y-2">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">{lang === 'en' ? 'Registrant' : 'المسجل'}</dt>
                      <dd className="font-semibold text-slate-900 text-end">{receipt.fullName}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">{lang === 'en' ? 'Item' : 'البند'}</dt>
                      <dd className="text-slate-800 text-end">{receipt.itemTitle}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">{lang === 'en' ? 'Method' : 'طريقة الدفع'}</dt>
                      <dd className="text-slate-800 text-end">{receipt.paymentMethod}</dd>
                    </div>
                    <div className="flex justify-between gap-4 pt-2 border-t border-slate-200">
                      <dt className="font-semibold text-slate-900">
                        {lang === 'en' ? 'Total (incl. 15% VAT)' : 'الإجمالي (شامل الضريبة)'}
                      </dt>
                      <dd className="font-mono font-semibold text-base text-[#991B1B] tabular-nums">
                        {receipt.totalSar.toFixed(2)} SAR
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `SSSH Receipt ${receipt.invoiceId} | ${receipt.fullName} | ${receipt.itemTitle} | ${receipt.totalSar.toFixed(2)} SAR (${receipt.status})`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    {copiedCitation ? <Check className="w-3.5 h-3.5 text-[#065F46]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCitation ? 'Receipt Copied' : 'Copy Receipt'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                  >
                    {lang === 'en' ? 'Done' : 'تم'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                {/* Item Selection when opened from Portal */}
                {modal.type === 'portal' && (
                  <div className="p-4 bg-[#FAF9F7] border border-slate-200 rounded-xl space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'course', label: { en: 'Course Seat', ar: 'دورة تدريبية' } },
                          { id: 'symposium', label: { en: 'SSSH27 Forum', ar: 'الملتقى السنوي' } },
                          { id: 'membership', label: { en: 'Membership', ar: 'العضوية' } },
                        ] as const
                      ).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCheckoutCategory(cat.id)}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                            checkoutCategory === cat.id
                              ? 'bg-white border-[#991B1B] text-[#991B1B]'
                              : 'bg-transparent border-slate-200 text-slate-600'
                          }`}
                        >
                          {cat.label[lang]}
                        </button>
                      ))}
                    </div>

                    {checkoutCategory === 'course' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={selectedCourseId}
                          onChange={(e) => setSelectedCourseId(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        >
                          {TRAINING_COURSES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title[lang]} ({c.feeSar} SAR)
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedCenterId}
                          onChange={(e) => setSelectedCenterId(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        >
                          {TRAINING_CENTERS.map((ctr) => (
                            <option key={ctr.id} value={ctr.id}>
                              {ctr.city[lang]} — {ctr.nextSession}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {checkoutCategory === 'membership' && (
                      <select
                        value={selectedTierId}
                        onChange={(e) => setSelectedTierId(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                      >
                        {MEMBERSHIP_TIERS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name[lang]} — {t.annualFeeSar} SAR/yr
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}

                {(modal.type === 'congress' ||
                  (modal.type === 'portal' && checkoutCategory === 'symposium')) && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Delegate Pass Category' : 'فئة تذكرة الملتقى'}
                    </label>
                    <select
                      value={delegatePass}
                      onChange={(e) =>
                        setDelegatePass(e.target.value as 'physician' | 'non-member' | 'fellow')
                      }
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                    >
                      <option value="physician">
                        {lang === 'en'
                          ? 'SSSH Member Physician — 950 SAR'
                          : 'طبيب عضو بالجمعية — ٩٥٠ ريال'}
                      </option>
                      <option value="non-member">
                        {lang === 'en'
                          ? 'Non-Member Specialist — 1,450 SAR'
                          : 'أخصائي غير عضو — ١,٤٥٠ ريال'}
                      </option>
                      <option value="fellow">
                        {lang === 'en'
                          ? 'Trainee / Simulation Operations — 550 SAR'
                          : 'متدرب / عمليات محاكاة — ٥٥٠ ريال'}
                      </option>
                    </select>
                  </div>
                )}

                {/* Order Summary Box */}
                <div className="bg-[#FAF9F7] border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between gap-4 font-semibold text-slate-900">
                    <span>{billingItem.itemTitle}</span>
                    <span className="font-mono tabular-nums whitespace-nowrap">
                      {billingItem.baseFee.toFixed(2)} SAR
                    </span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between gap-4 text-[#065F46]">
                      <span>{lang === 'en' ? 'SSSH Member Discount (10%)' : 'خصم الأعضاء (١٠٪)'}</span>
                      <span className="font-mono tabular-nums">-{discountSar.toFixed(2)} SAR</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>{lang === 'en' ? 'VAT (15%)' : 'ضريبة القيمة المضافة (١٥٪)'}</span>
                    <span className="font-mono tabular-nums">{vatSar.toFixed(2)} SAR</span>
                  </div>
                  <div className="flex justify-between gap-4 pt-2 border-t border-slate-200 text-sm font-semibold text-slate-900">
                    <span>{lang === 'en' ? 'Total Due' : 'المبلغ الإجمالي'}</span>
                    <span className="font-mono text-[#991B1B] tabular-nums">
                      {totalSar.toFixed(2)} SAR
                    </span>
                  </div>
                </div>

                {/* Registrant Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'Full Name' : 'الاسم الكامل'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'en' ? 'Dr. Abdullah Al-Qahtani' : 'د. عبدالله القحطاني'}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'Email for Receipt & Certificate' : 'البريد الإلكتروني'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="educator@hospital.med.sa"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'Mobile Number' : 'رقم الجوال'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 123 4567"
                      className="w-full px-3.5 py-2 text-sm font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'SCFHS ID / Promo (Try SSSH10)' : 'رقم الهيئة / كود خصم (SSSH10)'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={scfhsId}
                        onChange={(e) => setScfhsId(e.target.value)}
                        placeholder="21-R-M-0481"
                        className="w-1/2 px-3 py-2 text-xs font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="SSSH10"
                        className="w-1/2 px-3 py-2 text-xs font-mono uppercase bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3 pt-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    {lang === 'en' ? 'Payment Method (not connected yet)' : 'وسيلة الدفع (غير مفعلة بعد)'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mada_card')}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg border cursor-pointer ${
                        paymentMethod === 'mada_card'
                          ? 'border-[#991B1B] bg-[#991B1B]/5 text-[#991B1B]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'mada / Card' : 'مدى / بطاقة'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('sadad')}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg border cursor-pointer ${
                        paymentMethod === 'sadad'
                          ? 'border-[#991B1B] bg-[#991B1B]/5 text-[#991B1B]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'SADAD / PO' : 'سداد'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg border cursor-pointer ${
                        paymentMethod === 'apple_pay'
                          ? 'border-[#991B1B] bg-[#991B1B]/5 text-[#991B1B]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Apple Pay</span>
                    </button>
                  </div>

                  {paymentMethod === 'sadad' && (
                    <p className="text-xs text-slate-600 p-3 bg-[#FAF9F7] border border-slate-200 rounded-lg">
                      {lang === 'en'
                        ? 'SADAD payment integration is not connected yet. This request will be recorded as pending and no payment will be collected.'
                        : 'خدمة سداد غير مربوطة حاليًا. سيتم تسجيل الطلب كعملية معلقة ولن يتم تحصيل أي مبلغ.'}
                    </p>
                  )}
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
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-60 rounded-lg cursor-pointer tabular-nums"
                  >
                    {isSubmitting
                      ? lang === 'en'
                        ? 'Processing...'
                        : 'جاري التنفيذ...'
                      : paymentMethod === 'sadad'
                      ? lang === 'en'
                        ? `Submit Registration — Payment Pending (${totalSar.toFixed(2)} SAR)`
                        : `تسجيل الطلب — الدفع معلق (${totalSar.toFixed(2)} ريال)`
                      : lang === 'en'
                      ? `Submit Registration — Payment Pending (${totalSar.toFixed(2)} SAR)`
                      : `تسجيل الطلب — الدفع معلق (${totalSar.toFixed(2)} ريال)`}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Invoice Lookup Tab */}
        {modal.type === 'portal' && portalTab === 'invoices' && (
          <div className="space-y-5">
            <form onSubmit={handleInvoiceLookup} className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'en' ? 'Search Invoice / Payment Reference' : 'البحث برقم الفاتورة المرجعي'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={invoiceQuery}
                  onChange={(e) => setInvoiceQuery(e.target.value)}
                  placeholder="INV-SSSH-2026-3041"
                  className="flex-1 min-w-0 px-3.5 py-2 text-sm font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg"
                />
                <button
                  type="submit"
                  disabled={isLookingUp}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isLookingUp ? '...' : lang === 'en' ? 'Lookup' : 'بحث'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span>{lang === 'en' ? 'Samples:' : 'أمثلة:'}</span>
                {SAMPLE_INVOICES.map((inv) => (
                  <button
                    key={inv.invoiceId}
                    type="button"
                    onClick={() => {
                      setInvoiceQuery(inv.invoiceId);
                      setLookedUpInvoice(inv);
                      setInvoiceNotFound(false);
                    }}
                    className="font-mono text-slate-700 hover:text-[#991B1B] underline cursor-pointer"
                  >
                    {inv.invoiceId}
                  </button>
                ))}
              </div>
            </form>

            {lookedUpInvoice && (
              <div className="p-5 bg-[#FAF9F7] border border-slate-200 rounded-xl space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-slate-900">
                    <Receipt className="w-3.5 h-3.5 text-[#991B1B]" />
                    {lookedUpInvoice.invoiceId}
                  </span>
                  <span
                    className={`font-semibold ${
                      lookedUpInvoice.status === 'Paid' ? 'text-[#065F46]' : 'text-amber-800'
                    }`}
                  >
                    {lookedUpInvoice.status}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">{lang === 'en' ? 'Registrant' : 'المستفيد'}</span>
                  <span className="font-semibold text-slate-900">{lookedUpInvoice.fullName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">{lang === 'en' ? 'Registration' : 'الدورة / البند'}</span>
                  <span className="text-slate-800 text-end">{lookedUpInvoice.itemTitle}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">{lang === 'en' ? 'Amount Paid' : 'المبلغ'}</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {lookedUpInvoice.totalSar.toFixed(2)} SAR ({lookedUpInvoice.paymentMethod})
                  </span>
                </div>
              </div>
            )}

            {invoiceNotFound && (
              <p className="text-xs text-[#991B1B]">
                {lang === 'en'
                  ? 'No invoice found with that reference ID.'
                  : 'لم يتم العثور على فاتورة بهذا الرقم.'}
              </p>
            )}
          </div>
        )}

        {/* Member Sign-In Tab */}
        {modal.type === 'portal' && portalTab === 'signin' && (
          <div>
            {signinMessage ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#065F46] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800">{signinMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Registered Member Email' : 'البريد الإلكتروني للعضو'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="educator@hospital.med.sa"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                  />
                </div>
                {formError && <p className="text-xs font-medium text-[#991B1B]">{formError}</p>}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg cursor-pointer"
                  >
                    {isSubmitting
                      ? lang === 'en'
                        ? 'Sending...'
                        : 'جاري الإرسال...'
                      : lang === 'en'
                      ? 'Send Magic Portal Link'
                      : 'إرسال رابط الدخول'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Simulation Standards Reader */}
        {modal.type === 'guideline' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {modal.guideline.summary[lang]}
            </p>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                {lang === 'en' ? 'Key Simulation Practice Standards' : 'أبرز المعايير التطبيقية'}
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

        {/* Journal Abstract Reader */}
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
                  copyText(`${modal.article.authors} ${modal.article.title.en}. SJHS. doi:${modal.article.doi}`)
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

        {/* Lab Guide Reader */}
        {modal.type === 'lab-guide' && (
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
