import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { Language, UI_COPY } from '../data/shaData';
import { subscribeNewsletter } from '../lib/shaSupabaseService';
import { SiteContentConfig } from '../lib/siteContentService';

interface FooterProps {
  lang: Language;
  siteContent: SiteContentConfig;
  onOpenPortal: () => void;
  onOpenContentManager: () => void;
}

export function Footer({
  lang,
  siteContent,
  onOpenPortal,
  onOpenContentManager,
}: FooterProps) {
  const [digestEmail, setDigestEmail] = useState('');
  const [digestError, setDigestError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(digestEmail.trim())) {
      setDigestError(
        lang === 'en' ? 'Please enter a valid email address.' : 'يرجى إدخال بريد إلكتروني صحيح.'
      );
      return;
    }
    setDigestError('');
    setIsSubscribing(true);
    try {
      await subscribeNewsletter(digestEmail);
      setSubscribed(true);
      setDigestEmail('');
    } catch (err) {
      setDigestError(err instanceof Error ? err.message : 'Unable to subscribe.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-xl font-semibold text-white">
              {siteContent.brand[lang]}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'National scientific society advancing healthcare simulation education, accredited courses, center standards, and patient safety across Saudi Arabia.'
                : 'الجمعية العلمية الوطنية لتطوير التعليم بالمحاكاة الصحية والدورات المعتمدة ومعايير سلامة المرضى في المملكة العربية السعودية.'}
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{siteContent.contact.address[lang]}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{siteContent.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{siteContent.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Society' : 'الجمعية'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {UI_COPY.nav.about[lang]}
                </a>
              </li>
              <li>
                <a href="#guidelines" className="hover:text-white transition-colors">
                  {UI_COPY.nav.guidelines[lang]}
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-white transition-colors">
                  {UI_COPY.nav.training[lang]}
                </a>
              </li>
              <li>
                <a href="#congress" className="hover:text-white transition-colors">
                  {UI_COPY.nav.congress[lang]}
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-white transition-colors">
                  {UI_COPY.nav.journal[lang]}
                </a>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Official Portals' : 'البوابات الرسمية'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#training" className="hover:text-white transition-colors font-mono text-xs">
                  courses.saudisim.org.sa
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-white transition-colors font-mono text-xs">
                  sjhs.saudisim.org.sa
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  {UI_COPY.nav.portal[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContentManager}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  {lang === 'en' ? 'Manage Content (CMS)' : 'إدارة المحتوى والصور'}
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Digest Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Simulation Courses & Forum Digest' : 'نشرة دورات المحاكاة والملتقى'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'en'
                ? 'Receive upcoming course dates, SJHS simulation publications, and SSSH27 Forum updates.'
                : 'احصل على مواعيد الدورات القادمة وإصدارات المجلة العلمية وأخبار الملتقى السنوي.'}
            </p>

            {subscribed ? (
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Subscribed to Saudi Simulation Society updates.'
                    : 'تم الاشتراك في نشرة الجمعية السعودية للمحاكاة الصحية.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={digestEmail}
                    onChange={(e) => setDigestEmail(e.target.value)}
                    placeholder="doctor@hospital.med.sa"
                    className="flex-1 min-w-0 px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isSubscribing
                      ? lang === 'en'
                        ? 'Saving...'
                        : 'جاري الحفظ...'
                      : lang === 'en'
                      ? 'Subscribe'
                      : 'اشتراك'}
                  </button>
                </div>
                {digestError && <p className="text-xs text-rose-400">{digestError}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {siteContent.brand[lang]}.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <p>
            {lang === 'en'
              ? 'Aligned with Saudi Vision 2030 Health Sector Transformation'
              : 'متوافق مع برنامج تحول القطاع الصحي في رؤية السعودية ٢٠٣٠'}
          </p>
        </div>
      </div>
    </footer>
  );
}
