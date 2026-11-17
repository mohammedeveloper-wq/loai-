import {
  BilingualText,
  CONFERENCE_IMAGE,
  HERO_IMAGE,
  JOURNAL_IMAGE,
  TRAINING_IMAGE,
  UI_COPY,
} from '../data/shaData';
import { supabase } from './supabase';

export interface SiteImagesConfig {
  hero: string;
  training: string;
  conference: string;
  journal: string;
}

export interface SiteHeroConfig {
  eyebrow: BilingualText;
  headline: BilingualText;
  subheadline: BilingualText;
  primaryCta: BilingualText;
  secondaryCta: BilingualText;
  imageCaption: BilingualText;
  kpis: {
    value: string;
    label: BilingualText;
  }[];
}

export interface SiteSectionsConfig {
  guidelinesTitle: BilingualText;
  guidelinesSubtitle: BilingualText;
  workingGroupsTitle: BilingualText;
  trainingTitle: BilingualText;
  trainingSubtitle: BilingualText;
  congressTitle: BilingualText;
  congressSubtitle: BilingualText;
  journalTitle: BilingualText;
  journalSubtitle: BilingualText;
  governanceTitle: BilingualText;
  governanceSubtitle: BilingualText;
}

export interface SiteContactConfig {
  address: BilingualText;
  phone: string;
  email: string;
}

export interface SiteContentConfig {
  brand: BilingualText;
  images: SiteImagesConfig;
  hero: SiteHeroConfig;
  sections: SiteSectionsConfig;
  contact: SiteContactConfig;
}

const LOCAL_STORAGE_KEY = 'sha_site_content_v1';
const CONTENT_ROW_KEY = 'main';

export const DEFAULT_SITE_CONTENT: SiteContentConfig = {
  brand: { ...UI_COPY.brand },
  images: {
    hero: HERO_IMAGE,
    training: TRAINING_IMAGE,
    conference: CONFERENCE_IMAGE,
    journal: JOURNAL_IMAGE,
  },
  hero: {
    eyebrow: { ...UI_COPY.hero.eyebrow },
    headline: { ...UI_COPY.hero.headline },
    subheadline: { ...UI_COPY.hero.subheadline },
    primaryCta: { ...UI_COPY.hero.primaryCta },
    secondaryCta: { ...UI_COPY.hero.secondaryCta },
    imageCaption: { ...UI_COPY.hero.imageCaption },
    kpis: UI_COPY.hero.kpis.map((k) => ({ value: k.value, label: { ...k.label } })),
  },
  sections: {
    guidelinesTitle: { ...UI_COPY.sections.guidelinesTitle },
    guidelinesSubtitle: { ...UI_COPY.sections.guidelinesSubtitle },
    workingGroupsTitle: { ...UI_COPY.sections.workingGroupsTitle },
    trainingTitle: { ...UI_COPY.sections.trainingTitle },
    trainingSubtitle: { ...UI_COPY.sections.trainingSubtitle },
    congressTitle: { ...UI_COPY.sections.congressTitle },
    congressSubtitle: { ...UI_COPY.sections.congressSubtitle },
    journalTitle: { ...UI_COPY.sections.journalTitle },
    journalSubtitle: { ...UI_COPY.sections.journalSubtitle },
    governanceTitle: { ...UI_COPY.sections.governanceTitle },
    governanceSubtitle: { ...UI_COPY.sections.governanceSubtitle },
  },
  contact: {
    address: {
      en: 'Academic Medical Simulation Corridor, P.O. Box 7805, Riyadh 11472',
      ar: 'الممر الأكاديمي للمحاكاة الصحية، ص.ب ٧٨٠٥، الرياض ١١٤٧٢',
    },
    phone: '+966 11 467 1161',
    email: 'courses@saudisim.org.sa',
  },
};

function mergeWithDefaults(partial?: Partial<SiteContentConfig> | null): SiteContentConfig {
  if (!partial) return DEFAULT_SITE_CONTENT;

  return {
    brand: { ...DEFAULT_SITE_CONTENT.brand, ...partial.brand },
    images: { ...DEFAULT_SITE_CONTENT.images, ...partial.images },
    hero: {
      eyebrow: { ...DEFAULT_SITE_CONTENT.hero.eyebrow, ...partial.hero?.eyebrow },
      headline: { ...DEFAULT_SITE_CONTENT.hero.headline, ...partial.hero?.headline },
      subheadline: { ...DEFAULT_SITE_CONTENT.hero.subheadline, ...partial.hero?.subheadline },
      primaryCta: { ...DEFAULT_SITE_CONTENT.hero.primaryCta, ...partial.hero?.primaryCta },
      secondaryCta: { ...DEFAULT_SITE_CONTENT.hero.secondaryCta, ...partial.hero?.secondaryCta },
      imageCaption: { ...DEFAULT_SITE_CONTENT.hero.imageCaption, ...partial.hero?.imageCaption },
      kpis:
        Array.isArray(partial.hero?.kpis) && partial.hero.kpis.length === 4
          ? partial.hero.kpis
          : DEFAULT_SITE_CONTENT.hero.kpis,
    },
    sections: {
      guidelinesTitle: {
        ...DEFAULT_SITE_CONTENT.sections.guidelinesTitle,
        ...partial.sections?.guidelinesTitle,
      },
      guidelinesSubtitle: {
        ...DEFAULT_SITE_CONTENT.sections.guidelinesSubtitle,
        ...partial.sections?.guidelinesSubtitle,
      },
      workingGroupsTitle: {
        ...DEFAULT_SITE_CONTENT.sections.workingGroupsTitle,
        ...partial.sections?.workingGroupsTitle,
      },
      trainingTitle: {
        ...DEFAULT_SITE_CONTENT.sections.trainingTitle,
        ...partial.sections?.trainingTitle,
      },
      trainingSubtitle: {
        ...DEFAULT_SITE_CONTENT.sections.trainingSubtitle,
        ...partial.sections?.trainingSubtitle,
      },
      congressTitle: {
        ...DEFAULT_SITE_CONTENT.sections.congressTitle,
        ...partial.sections?.congressTitle,
      },
      congressSubtitle: {
        ...DEFAULT_SITE_CONTENT.sections.congressSubtitle,
        ...partial.sections?.congressSubtitle,
      },
      journalTitle: {
        ...DEFAULT_SITE_CONTENT.sections.journalTitle,
        ...partial.sections?.journalTitle,
      },
      journalSubtitle: {
        ...DEFAULT_SITE_CONTENT.sections.journalSubtitle,
        ...partial.sections?.journalSubtitle,
      },
      governanceTitle: {
        ...DEFAULT_SITE_CONTENT.sections.governanceTitle,
        ...partial.sections?.governanceTitle,
      },
      governanceSubtitle: {
        ...DEFAULT_SITE_CONTENT.sections.governanceSubtitle,
        ...partial.sections?.governanceSubtitle,
      },
    },
    contact: {
      address: { ...DEFAULT_SITE_CONTENT.contact.address, ...partial.contact?.address },
      phone: partial.contact?.phone ?? DEFAULT_SITE_CONTENT.contact.phone,
      email: partial.contact?.email ?? DEFAULT_SITE_CONTENT.contact.email,
    },
  };
}

export async function fetchSiteContent(): Promise<SiteContentConfig> {
  if (supabase) {
    const { data, error } = await supabase
      .from('site_content')
      .select('value')
      .eq('key', CONTENT_ROW_KEY)
      .maybeSingle();

    if (!error && data?.value) {
      return mergeWithDefaults(data.value as Partial<SiteContentConfig>);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return mergeWithDefaults(JSON.parse(raw) as Partial<SiteContentConfig>);
    }
  } catch {
    // Ignore storage access errors
  }

  return DEFAULT_SITE_CONTENT;
}

export async function saveSiteContent(
  config: SiteContentConfig
): Promise<{ savedToSupabase: boolean }> {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage quota errors
  }

  if (!supabase) {
    return { savedToSupabase: false };
  }

  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.from('site_content').upsert(
    {
      key: CONTENT_ROW_KEY,
      value: config,
      updated_at: new Date().toISOString(),
      updated_by: userData.user?.id ?? null,
    },
    { onConflict: 'key' }
  );

  if (error) {
    throw new Error(error.message);
  }

  return { savedToSupabase: true };
}

export async function resetSiteContent(): Promise<SiteContentConfig> {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }

  if (supabase) {
    const { error } = await supabase.from('site_content').upsert(
      {
        key: CONTENT_ROW_KEY,
        value: DEFAULT_SITE_CONTENT,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );
    if (error) {
      throw new Error(error.message);
    }
  }

  return DEFAULT_SITE_CONTENT;
}

export async function uploadSiteImage(
  file: File,
  slot: keyof SiteImagesConfig
): Promise<{ url: string; uploadedToSupabase: boolean }> {
  if (!supabase) {
    if (file.size > 1_200_000) {
      throw new Error('Image exceeds 1.2 MB for local preview. Connect Supabase Storage for larger uploads.');
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Unable to read image file.'));
      reader.readAsDataURL(file);
    });
    return { url: dataUrl, uploadedToSupabase: false };
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `${slot}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('site-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from('site-media').getPublicUrl(filePath);
  return { url: data.publicUrl, uploadedToSupabase: true };
}
