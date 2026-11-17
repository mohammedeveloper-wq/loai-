import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  CheckCircle2,
  Image as ImageIcon,
  LogOut,
  RotateCcw,
  Save,
  Upload,
  X,
} from 'lucide-react';
import { BilingualText, Language } from '../data/shaData';
import {
  DEFAULT_SITE_CONTENT,
  resetSiteContent,
  saveSiteContent,
  SiteContentConfig,
  SiteImagesConfig,
  uploadSiteImage,
} from '../lib/siteContentService';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { ResilientImage } from './ResilientImage';

interface ContentManagerModalProps {
  isOpen: boolean;
  lang: Language;
  content: SiteContentConfig;
  onUpdateContent: (next: SiteContentConfig) => void;
  onClose: () => void;
}

type EditorTab = 'images' | 'hero' | 'sections' | 'contact';

export function ContentManagerModal({
  isOpen,
  lang,
  content,
  onUpdateContent,
  onClose,
}: ContentManagerModalProps) {
  const [draft, setDraft] = useState<SiteContentConfig>(content);
  const [activeTab, setActiveTab] = useState<EditorTab>('images');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<keyof SiteImagesConfig | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setDraft(content);
    setStatusMessage('');
    setErrorMessage('');
    setAuthMessage('');

    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        setSignedInEmail(data.user?.email ?? null);
      });
    }
  }, [isOpen, content]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const requiresAuth = isSupabaseConfigured && !signedInEmail;

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setErrorMessage('');
    setAuthMessage('');
    setAuthLoading(true);

    try {
      if (authMode === 'password') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail.trim(),
          password: authPassword,
        });
        if (error) {
          setErrorMessage(error.message);
          return;
        }
        setSignedInEmail(data.user?.email ?? authEmail.trim());
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: authEmail.trim(),
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) {
          setErrorMessage(error.message);
          return;
        }
        setAuthMessage(
          lang === 'en'
            ? `Magic sign-in link sent to ${authEmail}. Open the link to unlock live editing.`
            : `تم إرسال رابط الدخول إلى ${authEmail}. افتح الرابط لتفعيل التعديل المباشر.`
        );
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSignedInEmail(null);
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    slot: keyof SiteImagesConfig
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMessage('');
    setStatusMessage('');
    setUploadingSlot(slot);

    try {
      const { url, uploadedToSupabase } = await uploadSiteImage(file, slot);
      setDraft((prev) => ({
        ...prev,
        images: { ...prev.images, [slot]: url },
      }));
      setStatusMessage(
        uploadedToSupabase
          ? lang === 'en'
            ? 'Image uploaded to Supabase Storage. Click Save & Publish to apply live.'
            : 'تم رفع الصورة إلى Supabase Storage. اضغط حفظ ونشر لتطبيق التعديل.'
          : lang === 'en'
          ? 'Image loaded for preview. Click Save & Publish to apply.'
          : 'تم تحميل الصورة للمعاينة. اضغط حفظ ونشر للتطبيق.'
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setUploadingSlot(null);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setErrorMessage('');
    setStatusMessage('');
    setSaving(true);
    try {
      const { savedToSupabase } = await saveSiteContent(draft);
      onUpdateContent(draft);
      setStatusMessage(
        savedToSupabase
          ? lang === 'en'
            ? 'Changes saved to Supabase and published live.'
            : 'تم حفظ التعديلات في قاعدة بيانات Supabase ونشرها مباشرة.'
          : lang === 'en'
          ? 'Changes saved in browser preview. Add Supabase env keys to persist across visitors.'
          : 'تم الحفظ في المتصفح. أضف مفاتيح Supabase لحفظ التعديلات لجميع الزوار.'
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetAll = async () => {
    setErrorMessage('');
    setStatusMessage('');
    setSaving(true);
    try {
      const fresh = await resetSiteContent();
      setDraft(fresh);
      onUpdateContent(fresh);
      setStatusMessage(
        lang === 'en'
          ? 'All text and images restored to defaults.'
          : 'تمت استعادة النصوص والصور الافتراضية.'
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to reset content.');
    } finally {
      setSaving(false);
    }
  };

  const imageSlots: {
    key: keyof SiteImagesConfig;
    label: { en: string; ar: string };
    hint: { en: string; ar: string };
  }[] = [
    {
      key: 'hero',
      label: { en: 'Hero Simulation Suite Image', ar: 'صورة جناح المحاكاة الرئيسي' },
      hint: { en: 'Recommended 16:9 landscape', ar: 'الأبعاد المفضلة 16:9' },
    },
    {
      key: 'training',
      label: { en: 'Course & CRM Lab Image', ar: 'صورة مختبر الدورات والتدريب' },
      hint: { en: 'Recommended 4:3 landscape', ar: 'الأبعاد المفضلة 4:3' },
    },
    {
      key: 'conference',
      label: { en: 'SSSH27 Forum Auditorium Image', ar: 'صورة الملتقى السنوي SSSH27' },
      hint: { en: 'Recommended 4:3 landscape', ar: 'الأبعاد المفضلة 4:3' },
    },
    {
      key: 'journal',
      label: { en: 'SJHS Journal & Debrief Room Image', ar: 'صورة المجلة العلمية وغرفة الاستخلاص' },
      hint: { en: 'Recommended 16:10 or 4:3', ar: 'الأبعاد المفضلة 16:10 أو 4:3' },
    },
  ];

  const updateBilingualHero = (
    field: keyof Omit<SiteContentConfig['hero'], 'kpis'>,
    locale: keyof BilingualText,
    value: string
  ) => {
    setDraft((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: { ...prev.hero[field], [locale]: value },
      },
    }));
  };

  const updateBilingualSection = (
    field: keyof SiteContentConfig['sections'],
    locale: keyof BilingualText,
    value: string
  ) => {
    setDraft((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [field]: { ...prev.sections[field], [locale]: value },
      },
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-[#FAF9F7]">
          <div>
            <h3 className="font-display text-xl font-semibold text-slate-900">
              {lang === 'en' ? 'Site Content & Media Manager' : 'إدارة محتوى وصور الموقع'}
            </h3>
            <p className="text-xs text-slate-500">
              {signedInEmail
                ? `${lang === 'en' ? 'Signed in as' : 'مسجل الدخول:'} ${signedInEmail}`
                : isSupabaseConfigured
                ? lang === 'en'
                  ? 'Sign in with your Supabase editor account to publish live updates.'
                  : 'سجل الدخول بحساب المحرر في Supabase لنشر التعديلات مباشرة.'
                : lang === 'en'
                ? 'Local preview editor · Connect Supabase env vars to publish across all visitors.'
                : 'محرر المعاينة المحلية · أضف مفاتيح Supabase للنشر للجميع.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {signedInEmail && (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Sign Out' : 'خروج'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close content manager"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate or Editor Body */}
        {requiresAuth ? (
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-5">
              <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setAuthMode('password')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                    authMode === 'password' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {lang === 'en' ? 'Email & Password' : 'البريد وكلمة المرور'}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('otp')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                    authMode === 'otp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {lang === 'en' ? 'Magic Link' : 'رابط دخول سريع'}
                </button>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Supabase User Email' : 'البريد الإلكتروني في Supabase'}
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="editor@saudi-heart.com"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                {authMode === 'password' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Password' : 'كلمة المرور'}
                    </label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                )}

                {errorMessage && <p className="text-xs font-medium text-[#991B1B]">{errorMessage}</p>}
                {authMessage && <p className="text-xs font-medium text-[#065F46]">{authMessage}</p>}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-60 rounded-lg cursor-pointer"
                >
                  {authLoading
                    ? lang === 'en'
                      ? 'Authenticating...'
                      : 'جاري التحقق...'
                    : authMode === 'password'
                    ? lang === 'en'
                      ? 'Sign In to Content Editor'
                      : 'تسجيل الدخول لمحرر المحتوى'
                    : lang === 'en'
                    ? 'Send Magic Sign-In Link'
                    : 'إرسال رابط الدخول'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="px-6 pt-4 border-b border-slate-200 flex flex-wrap gap-2">
              {(
                [
                  { id: 'images', label: { en: 'Images & Media', ar: 'الصور والوسائط' } },
                  { id: 'hero', label: { en: 'Hero & KPIs', ar: 'القسم الرئيسي والإحصائيات' } },
                  { id: 'sections', label: { en: 'Section Headings', ar: 'عناوين الأقسام' } },
                  { id: 'contact', label: { en: 'Contact & Footer', ar: 'التواصل والتذييل' } },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#991B1B] text-[#991B1B]'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label[lang]}
                </button>
              ))}
            </div>

            {/* Scrollable Editor Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'images' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {imageSlots.map((slot) => (
                    <div
                      key={slot.key}
                      className="border border-slate-200 rounded-xl p-4 bg-[#FAF9F7] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-900">{slot.label[lang]}</h4>
                        <span className="text-xs text-slate-500">{slot.hint[lang]}</span>
                      </div>

                      <div className="aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 bg-white">
                        <ResilientImage
                          src={draft.images[slot.key]}
                          alt={slot.label[lang]}
                          fallbackTitle={slot.label[lang]}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          {lang === 'en' ? 'Image URL' : 'رابط الصورة'}
                        </label>
                        <input
                          type="text"
                          value={draft.images[slot.key]}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              images: { ...prev.images, [slot.key]: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg text-slate-800"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>
                            {uploadingSlot === slot.key
                              ? lang === 'en'
                                ? 'Uploading...'
                                : 'جاري الرفع...'
                              : lang === 'en'
                              ? 'Upload Image'
                              : 'رفع صورة'}
                          </span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(e) => handleImageUpload(e, slot.key)}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              images: {
                                ...prev.images,
                                [slot.key]: DEFAULT_SITE_CONTENT.images[slot.key],
                              },
                            }))
                          }
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#991B1B] cursor-pointer"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Default' : 'الافتراضية'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Brand Title (EN)
                      </label>
                      <input
                        type="text"
                        value={draft.brand.en}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, en: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Brand Title (AR)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={draft.brand.ar}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, ar: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hero Headline (EN)
                      </label>
                      <textarea
                        rows={2}
                        value={draft.hero.headline.en}
                        onChange={(e) => updateBilingualHero('headline', 'en', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hero Headline (AR)
                      </label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={draft.hero.headline.ar}
                        onChange={(e) => updateBilingualHero('headline', 'ar', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hero Subheadline (EN)
                      </label>
                      <textarea
                        rows={3}
                        value={draft.hero.subheadline.en}
                        onChange={(e) => updateBilingualHero('subheadline', 'en', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hero Subheadline (AR)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={draft.hero.subheadline.ar}
                        onChange={(e) => updateBilingualHero('subheadline', 'ar', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary CTA Button (EN)
                      </label>
                      <input
                        type="text"
                        value={draft.hero.primaryCta.en}
                        onChange={(e) => updateBilingualHero('primaryCta', 'en', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary CTA Button (AR)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={draft.hero.primaryCta.ar}
                        onChange={(e) => updateBilingualHero('primaryCta', 'ar', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                      {lang === 'en' ? 'Key Metrics Strip (4 Columns)' : 'شريط المؤشرات الرئيسية'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {draft.hero.kpis.map((kpi, idx) => (
                        <div key={idx} className="p-3 bg-[#FAF9F7] border border-slate-200 rounded-lg space-y-2">
                          <input
                            type="text"
                            value={kpi.value}
                            onChange={(e) => {
                              const nextKpis = [...draft.hero.kpis];
                              nextKpis[idx] = { ...kpi, value: e.target.value };
                              setDraft((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, kpis: nextKpis },
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 text-sm font-mono bg-white border border-slate-300 rounded"
                          />
                          <input
                            type="text"
                            value={kpi.label.en}
                            onChange={(e) => {
                              const nextKpis = [...draft.hero.kpis];
                              nextKpis[idx] = {
                                ...kpi,
                                label: { ...kpi.label, en: e.target.value },
                              };
                              setDraft((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, kpis: nextKpis },
                              }));
                            }}
                            placeholder="Label (EN)"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                          />
                          <input
                            type="text"
                            dir="rtl"
                            value={kpi.label.ar}
                            onChange={(e) => {
                              const nextKpis = [...draft.hero.kpis];
                              nextKpis[idx] = {
                                ...kpi,
                                label: { ...kpi.label, ar: e.target.value },
                              };
                              setDraft((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, kpis: nextKpis },
                              }));
                            }}
                            placeholder="الوصف (AR)"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sections' && (
                <div className="space-y-6">
                  {(
                    [
                      {
                        titleKey: 'guidelinesTitle',
                        subKey: 'guidelinesSubtitle',
                        label: 'Clinical Guidelines Section',
                      },
                      {
                        titleKey: 'trainingTitle',
                        subKey: 'trainingSubtitle',
                        label: 'National CPR Committee (NCPR) Section',
                      },
                      {
                        titleKey: 'congressTitle',
                        subKey: 'congressSubtitle',
                        label: 'SHA37 Annual Congress Section',
                      },
                      {
                        titleKey: 'journalTitle',
                        subKey: 'journalSubtitle',
                        label: 'JSHA Journal Section',
                      },
                      {
                        titleKey: 'governanceTitle',
                        subKey: 'governanceSubtitle',
                        label: 'Leadership & Membership Section',
                      },
                    ] as const
                  ).map((item) => (
                    <div
                      key={item.titleKey}
                      className="p-4 bg-[#FAF9F7] border border-slate-200 rounded-xl space-y-3"
                    >
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.label}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={draft.sections[item.titleKey].en}
                          onChange={(e) =>
                            updateBilingualSection(item.titleKey, 'en', e.target.value)
                          }
                          placeholder="Title (EN)"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
                        />
                        <input
                          type="text"
                          dir="rtl"
                          value={draft.sections[item.titleKey].ar}
                          onChange={(e) =>
                            updateBilingualSection(item.titleKey, 'ar', e.target.value)
                          }
                          placeholder="العنوان (AR)"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg"
                        />
                        <textarea
                          rows={2}
                          value={draft.sections[item.subKey].en}
                          onChange={(e) => updateBilingualSection(item.subKey, 'en', e.target.value)}
                          placeholder="Subtitle (EN)"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                        />
                        <textarea
                          rows={2}
                          dir="rtl"
                          value={draft.sections[item.subKey].ar}
                          onChange={(e) => updateBilingualSection(item.subKey, 'ar', e.target.value)}
                          placeholder="الوصف (AR)"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Address (EN)
                      </label>
                      <input
                        type="text"
                        value={draft.contact.address.en}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              address: { ...prev.contact.address, en: e.target.value },
                            },
                          }))
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Address (AR)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={draft.contact.address.ar}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              address: { ...prev.contact.address, ar: e.target.value },
                            },
                          }))
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={draft.contact.phone}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, phone: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 text-sm font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={draft.contact.email}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, email: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 text-sm font-mono bg-[#FAF9F7] border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="px-6 py-4 border-t border-slate-200 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAll}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Reset Defaults' : 'استعادة الافتراضي'}</span>
                </button>

                {errorMessage && <span className="text-xs font-medium text-[#991B1B]">{errorMessage}</span>}
                {statusMessage && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#065F46]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{statusMessage}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  {lang === 'en' ? 'Close' : 'إغلاق'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-60 rounded-lg cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>
                    {saving
                      ? lang === 'en'
                        ? 'Saving...'
                        : 'جاري الحفظ...'
                      : lang === 'en'
                      ? 'Save & Publish'
                      : 'حفظ ونشر'}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
