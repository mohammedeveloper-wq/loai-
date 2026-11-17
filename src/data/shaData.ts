export type Language = 'en' | 'ar';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface GuidelineItem {
  id: string;
  code: string;
  category: 'debriefing' | 'insitu' | 'sp-osce' | 'operations';
  categoryLabel: BilingualText;
  year: string;
  pages: number;
  title: BilingualText;
  summary: BilingualText;
  taskforce: BilingualText;
  citation: string;
  recommendations: {
    classLevel: string;
    evidence: string;
    statement: BilingualText;
  }[];
}

export interface WorkingGroup {
  index: string;
  name: BilingualText;
  chair: BilingualText;
  institution: BilingualText;
  focus: BilingualText;
  membersCount: number;
}

export interface TrainingCourse {
  id: 'SIM-FAC' | 'SIM-OPS' | 'INSITU' | 'SP-EDUC' | 'CRM-ACLS';
  code: string;
  title: BilingualText;
  duration: BilingualText;
  cmeHours: number;
  feeSar: number;
  validity: BilingualText;
  audience: BilingualText;
  description: BilingualText;
}

export interface TrainingCenter {
  id: string;
  region: 'riyadh' | 'makkah' | 'eastern' | 'asir' | 'madinah';
  regionLabel: BilingualText;
  city: BilingualText;
  name: BilingualText;
  courses: ('SIM-FAC' | 'SIM-OPS' | 'INSITU' | 'SP-EDUC' | 'CRM-ACLS')[];
  nextSession: string;
  seatsAvailable: number;
  accreditationCode: string;
}

export interface CertificateRecord {
  id: string;
  holderName: BilingualText;
  course: string;
  center: BilingualText;
  issuedDate: string;
  expiryDate: string;
  status: 'Valid' | 'Renewal Due';
}

export interface ConferenceDay {
  dayKey: 'day1' | 'day2' | 'day3';
  label: BilingualText;
  date: BilingualText;
  theme: BilingualText;
  sessions: {
    time: string;
    hall: BilingualText;
    track: BilingualText;
    title: BilingualText;
    speaker: BilingualText;
  }[];
}

export interface JournalArticle {
  id: string;
  tier: 'lead' | 'secondary' | 'archive';
  volume: string;
  publishedDate: string;
  readTime: string;
  category: BilingualText;
  title: BilingualText;
  authors: string;
  deck: BilingualText;
  abstract: BilingualText;
  doi: string;
}

export interface BoardMember {
  name: BilingualText;
  role: BilingualText;
  institution: BilingualText;
  specialty: BilingualText;
}

export interface MembershipTier {
  id: string;
  name: BilingualText;
  annualFeeSar: number;
  eligibility: BilingualText;
  benefits: BilingualText[];
}

export interface LabGuide {
  id: string;
  topic: BilingualText;
  readingTime: string;
  title: BilingualText;
  summary: BilingualText;
  keySteps: BilingualText[];
}

export const HERO_IMAGE = '/src/assets/images/hero_healthcare_simulation_1794948999532.jpg';
export const TRAINING_IMAGE = '/src/assets/images/training_cpr_simulation_1794942410441.jpg';
export const CONFERENCE_IMAGE = '/src/assets/images/conference_sha_symposium_1794942412971.jpg';
export const JOURNAL_IMAGE = '/src/assets/images/simulation_debrief_lab_1794948999603.jpg';

export const UI_COPY = {
  brand: {
    en: 'Saudi Simulation Society',
    ar: 'الجمعية السعودية للمحاكاة الصحية',
  },
  nav: {
    about: { en: 'About', ar: 'عن الجمعية' },
    guidelines: { en: 'Standards', ar: 'المعايير العلمية' },
    training: { en: 'Courses', ar: 'التسجيل والدورات' },
    congress: { en: 'Forum', ar: 'الملتقى السنوي' },
    journal: { en: 'Journal', ar: 'الأبحاث' },
    portal: { en: 'Payment & Portal', ar: 'البوابة والدفع' },
  },
  hero: {
    eyebrow: {
      en: 'Saudi Society for Simulation in Healthcare (SSSH) · Riyadh · SCFHS Accredited',
      ar: 'الجمعية السعودية للمحاكاة الصحية · الرياض · معتمدة من الهيئة السعودية للتخصصات الصحية',
    },
    headline: {
      en: 'Advancing Healthcare Simulation, Clinical Training & Patient Safety',
      ar: 'الارتقاء بالمحاكاة الصحية والتدريب السريري وسلامة المرضى في المملكة',
    },
    subheadline: {
      en: 'The national society uniting simulation educators, clinical faculty, and operations specialists across accredited hospital simulation centers—offering certified courses, standards, and online registration & payment.',
      ar: 'الجمعية الوطنية التي تجمع ممارسي المحاكاة الصحية وأعضاء هيئة التدريس وفنيي التشغيل عبر مراكز المحاكاة المعتمدة، مع برامج تدريبية وبوابة تسجيل ودفع إلكتروني متكاملة.',
    },
    primaryCta: { en: 'Browse & Register Courses', ar: 'التسجيل والدفع للدورات' },
    secondaryCta: { en: 'Open Payment Portal', ar: 'بوابة الدفع والفواتير' },
    imageCaption: {
      en: 'Fig. 1 — High-Fidelity Clinical Simulation Suite, Riyadh Academic Medical Center',
      ar: 'شكل ١ — جناح المحاكاة السريرية عالية الدقة، المركز الطبي الأكاديمي بالرياض',
    },
    kpis: [
      { value: '2013', label: { en: 'National Society Established', ar: 'تأسيس الجمعية الوطنية' } },
      { value: '3,400+', label: { en: 'Certified Simulation Educators', ar: 'ممارس ومدرب محاكاة معتمد' } },
      { value: '68', label: { en: 'Accredited Simulation Centers', ar: 'مركز محاكاة صحي معتمد' } },
      { value: '30', label: { en: 'SCFHS CME Hours at Forum', ar: 'ساعة تعليم طبي مستمر في الملتقى' } },
    ],
  },
  sections: {
    guidelinesTitle: {
      en: 'Simulation Standards & Special Interest Groups',
      ar: 'معايير الممارسة الفضلى والمجموعات التخصصية',
    },
    guidelinesSubtitle: {
      en: 'Peer-reviewed healthcare simulation standards for scenario design, structured debriefing, standardized patients, and in-situ hospital safety testing.',
      ar: 'معايير علمية محكمة لتصميم سيناريوهات المحاكاة، واستخلاص المعلومات المنظم، والمرضى المعياريين، واختبارات السلامة داخل المستشفيات.',
    },
    workingGroupsTitle: { en: 'Special Interest Groups (SIGs)', ar: 'المجموعات العلمية التخصصية' },
    trainingTitle: {
      en: 'Course Registration & Accredited Simulation Centers',
      ar: 'التسجيل في الدورات ومراكز المحاكاة المعتمدة',
    },
    trainingSubtitle: {
      en: 'Select an SCFHS-accredited simulation course, pick your regional center, and complete registration with instant online payment or SADAD invoice generation.',
      ar: 'اختر الدورة المعتمدة، وحدد مركز المحاكاة في منطقتك، وأتمم التسجيل والدفع الإلكتروني أو إصدار فاتورة سداد فوراً.',
    },
    congressTitle: {
      en: '12th Annual Healthcare Simulation Forum — SSSH27',
      ar: 'الملتقى السنوي الثاني عشر للمحاكاة الصحية — SSSH27',
    },
    congressSubtitle: {
      en: 'February 16–18, 2027 · Riyadh · Theme: Next-Generation Simulation, AI Scenarios & Zero Preventable Harm',
      ar: '١٦–١٨ فبراير ٢٠٢٧ · الرياض · الشعار: الجيل القادم من المحاكاة الصحية وسلامة المرضى',
    },
    journalTitle: {
      en: 'Saudi Journal of Healthcare Simulation (SJHS)',
      ar: 'المجلة السعودية للمحاكاة الصحية (SJHS)',
    },
    journalSubtitle: {
      en: 'Open-access scholarly publication featuring simulation-based mastery learning trials, OSCE validity studies, and patient safety outcomes.',
      ar: 'دورية علمية محكمة متاحة للوصول المفتوح تنشر دراسات التعلم بالإتقان القائم على المحاكاة ونتائج سلامة المرضى.',
    },
    governanceTitle: {
      en: 'Board of Directors, Membership & Lab Guides',
      ar: 'مجلس الإدارة، العضوية وأدلة مراكز المحاكاة',
    },
    governanceSubtitle: {
      en: 'Led by clinical simulation directors across Saudi academic medical cities, supporting institutional lab accreditation and educator fellowships.',
      ar: 'بقيادة نخبة من مديري مراكز المحاكاة السريرية في المدن الطبية والجامعات السعودية لدعم اعتماد المراكز وتأهيل المدربين.',
    },
  },
};

export const GUIDELINES: GuidelineItem[] = [
  {
    id: 'sim-debrief-2026',
    code: 'SSSH-STD-2026-01',
    category: 'debriefing',
    categoryLabel: { en: 'Debriefing & Faculty', ar: 'الاستخلاص والتدريب' },
    year: '2026',
    pages: 64,
    title: {
      en: 'National Standards for Psychological Safety & Structured Clinical Debriefing',
      ar: 'المعايير الوطنية للأمان النفسي واستخلاص المعلومات السريري المنظم',
    },
    summary: {
      en: 'Defines prebriefing contracts, advocacy-inquiry debriefing scripts, and objective competency rubrics for multidisciplinary healthcare simulation teams.',
      ar: 'يحدد ميثاق التمهيد المسبق، وأساليب الاستخلاص المبنية على الاستقصاء البناء، ومعايير تقييم الكفاءة للفرق الصحية متعددة التخصصات.',
    },
    taskforce: {
      en: 'SSSH Faculty Development & Debriefing Committee',
      ar: 'لجنة تطوير المدربين واستخلاص المعلومات',
    },
    citation:
      'Saudi Society for Simulation in Healthcare. National Standards for Structured Clinical Debriefing. SJHS. 2026;11(1):8-71.',
    recommendations: [
      {
        classLevel: 'Standard I',
        evidence: 'Core Practice',
        statement: {
          en: 'Conduct a documented 10-minute prebriefing establishing psychological safety, confidentiality, and fiction contract prior to every clinical scenario.',
          ar: 'إجراء تمهيد مسبق لمدة ١٠ دقائق يرسخ الأمان النفسي والسرية وميثاق المحاكاة قبل كل سيناريو سريري.',
        },
      },
      {
        classLevel: 'Standard II',
        evidence: 'Core Practice',
        statement: {
          en: 'Allocate at least twice the scenario runtime (minimum 2:1 debrief-to-simulation ratio) for structured reaction, analysis, and clinical summary phases.',
          ar: 'تخصيص ضعف مدة السيناريو على الأقل (نسبة ٢:١) لمراحل استخلاص المعلومات والتحليل والتلخيص السريري.',
        },
      },
    ],
  },
  {
    id: 'sim-insitu-2026',
    code: 'SSSH-STD-2026-03',
    category: 'insitu',
    categoryLabel: { en: 'In-Situ Safety', ar: 'المحاكاة الميدانية' },
    year: '2026',
    pages: 52,
    title: {
      en: 'In-Situ Hospital Simulation & Latent Safety Threat (LST) Audit Protocol',
      ar: 'بروتوكول المحاكاة الميدانية داخل المستشفيات ورصد مخاطر السلامة الكامنة',
    },
    summary: {
      en: 'Standardized safety checklist for running unannounced or scheduled mock drills inside live ICU, ED, OR, and obstetrics units without disrupting patient care.',
      ar: 'قائمة تحقق قياسية لتنفيذ تمارين المحاكاة في أقسام العناية والطوارئ والعمليات دون التأثير على رعاية المرضى الفعليين.',
    },
    taskforce: {
      en: 'SSSH Patient Safety & Hospital Quality Group',
      ar: 'مجموعة سلامة المرضى وجودة الرعاية الصحية',
    },
    citation:
      'Al-Mansour F, Al-Jasser S, et al. In-Situ Simulation & Latent Safety Threat Identification. SJHS. 2026;11(2):90-141.',
    recommendations: [
      {
        classLevel: 'Standard I',
        evidence: 'Safety Mandate',
        statement: {
          en: 'Label all simulated medications and equipment clearly with high-visibility simulation stickers and verify full restoration of crash carts within 15 minutes post-drill.',
          ar: 'تمييز جميع أدوية ومستلزمات المحاكاة بملصقات واضحة والتأكد من إعادة جاهزية عربة الطوارئ خلال ١٥ دقيقة.',
        },
      },
      {
        classLevel: 'Standard II',
        evidence: 'Quality Audit',
        statement: {
          en: 'Log every identified latent safety threat (equipment gap, escalation delay, medication look-alike) into the hospital risk register within 48 hours.',
          ar: 'توثيق كل خطر سلامة كامن يتم رصده في سجل المخاطر بالمستشفى خلال ٤٨ ساعة للمعالجة التصحيحية.',
        },
      },
    ],
  },
  {
    id: 'sim-sp-2025',
    code: 'SSSH-STD-2025-05',
    category: 'sp-osce',
    categoryLabel: { en: 'SP & OSCE', ar: 'المرضى المعياريون' },
    year: '2025',
    pages: 78,
    title: {
      en: 'Standardized Patient (SP) Recruitment, Portrayal & High-Stakes OSCE Reliability',
      ar: 'معايير تأهيل المرضى المعياريين وموثوقية اختبارات OSCE عالية الأهمية',
    },
    summary: {
      en: 'Evidence-based blueprints for Arabic/English clinical communication stations, SP calibration, inter-rater reliability scoring, and ethical safeguards.',
      ar: 'إرشادات علمية لمحطات التواصل السريري باللغتين العربية والإنجليزية ومعايرة الأداء وضمان موثوقية التقييم.',
    },
    taskforce: {
      en: 'SSSH Assessment & Standardized Patient Working Group',
      ar: 'مجموعة التقييم السريري والمرضى المعياريين',
    },
    citation:
      'Saudi Society for Simulation in Healthcare. Standardized Patient & OSCE Assessment Standards. 2025.',
    recommendations: [
      {
        classLevel: 'Standard I',
        evidence: 'Psychometrics',
        statement: {
          en: 'Require dual-rater calibration workshops achieving >= 0.85 inter-rater agreement prior to high-stakes national residency OSCE examinations.',
          ar: 'إلزامية ورش معايرة المقيمين لتحقيق توافق لا يقل عن ٠.٨٥ قبل الاختبارات السريرية الوطنية.',
        },
      },
    ],
  },
  {
    id: 'sim-ops-2025',
    code: 'SSSH-STD-2025-02',
    category: 'operations',
    categoryLabel: { en: 'Operations & Tech', ar: 'التشغيل والتقنية' },
    year: '2025',
    pages: 68,
    title: {
      en: 'Simulation Center AV Infrastructure, Manikin Maintenance & VR Integration',
      ar: 'البنية التقنية لمراكز المحاكاة وصيانة الدمى ودمج الواقع الافتراضي',
    },
    summary: {
      en: 'Technical specifications for multi-camera debriefing capture, HL7/telemetry overlays, preventative simulator servicing, and VR headset hygiene.',
      ar: 'المواصفات الفنية لأنظمة البث والتسجيل متعددة الكاميرات والصيانة الوقائية للدمى وتعقيم نظارات الواقع الافتراضي.',
    },
    taskforce: {
      en: 'SSSH Simulation Operations & Engineering SIG',
      ar: 'مجموعة عمليات المحاكاة والهندسة الطبية',
    },
    citation:
      'SSSH Operations Committee. Simulation Center Infrastructure & AV Specifications. SJHS. 2025;10(3):14-81.',
    recommendations: [
      {
        classLevel: 'Standard I',
        evidence: 'Technical Spec',
        statement: {
          en: 'Maintain an automated audiovisual retention and role-based access policy ensuring learner video recordings expire or anonymize within 30 days unless consented.',
          ar: 'تطبيق سياسة صلاحيات وحفظ آلي للتسجيلات تضمن حذفها أو إخفاء هويتها خلال ٣٠ يوماً ما لم توجد موافقة بحثية.',
        },
      },
    ],
  },
];

export const WORKING_GROUPS: WorkingGroup[] = [
  {
    index: '01',
    name: { en: 'Clinical Debriefing & Faculty Development', ar: 'استخلاص المعلومات وتطوير المدربين' },
    chair: { en: 'Dr. Norah Al-Qahtani, MD, CHSE', ar: 'د. نورة القحطاني' },
    institution: { en: 'King Saud University Clinical Skills & Sim Center', ar: 'مركز المهارات والمحاكاة بجامعة الملك سعود' },
    focus: { en: 'Debriefing with Good Judgment certification & peer-coaching metrics', ar: 'اعتماد مدربي الاستخلاص ومؤشرات التقييم الأقراني' },
    membersCount: 540,
  },
  {
    index: '02',
    name: { en: 'Surgical, Endoscopic & Procedural Simulation', ar: 'محاكاة الجراحة والمناظير والمهارات الإجرائية' },
    chair: { en: 'Dr. Saad Al-Ghamdi, FRCSC', ar: 'د. سعد الغامدي' },
    institution: { en: 'King Faisal Specialist Hospital & Research Centre', ar: 'مستشفى الملك فيصل التخصصي ومركز الأبحاث' },
    focus: { en: 'Laparoscopic box trainers, robotic curricula & microsurgery mastery', ar: 'مناهج المناظير والجراحة الروبوتية والإتقان الإجرائي' },
    membersCount: 390,
  },
  {
    index: '03',
    name: { en: 'In-Situ Patient Safety & Rapid Response', ar: 'المحاكاة الميدانية وسلامة المرضى' },
    chair: { en: 'Dr. Bandar Al-Otaibi, MD, FACEP', ar: 'د. بندر العتيبي' },
    institution: { en: 'King Abdulaziz Medical City, Riyadh', ar: 'مدينة الملك عبدالعزيز الطبية، الرياض' },
    focus: { en: 'Code Blue latency audits, maternal hemorrhage drills & trauma activation', ar: 'تدقيق استجابة الطوارئ وتمارين نزيف الولادة والإصابات' },
    membersCount: 470,
  },
  {
    index: '04',
    name: { en: 'Nursing & Interprofessional Education (IPE)', ar: 'التمريض والتعليم الصحي المشترك' },
    chair: { en: 'Fatimah Al-Harbi, PhD, RN, CHSE', ar: 'د. فاطمة الحربي' },
    institution: { en: 'Princess Nourah University Simulation Center', ar: 'مركز المحاكاة بجامعة الأميرة نورة' },
    focus: { en: 'TeamSTEPPS communication, ICU handoffs & undergraduate IPE tracks', ar: 'التواصل بين التخصصات وتسليم الحالات الحرجة' },
    membersCount: 680,
  },
  {
    index: '05',
    name: { en: 'Simulation Operations & AV Engineering', ar: 'عمليات المحاكاة والهندسة الصوتية والمرئية' },
    chair: { en: 'Eng. Abdullah Al-Zahrani, CHSOS', ar: 'م. عبدالله الزهراني' },
    institution: { en: 'King Fahad Medical City Simulation Hub', ar: 'مركز المحاكاة بمدينة الملك فهد الطبية' },
    focus: { en: 'Moulage realism, wireless manikin programming & debriefing AV systems', ar: 'برمجة الدمى اللاسلكية والمؤثرات الطبية وأنظمة البث' },
    membersCount: 310,
  },
  {
    index: '06',
    name: { en: 'Virtual Reality (VR), XR & AI Clinical Scenarios', ar: 'الواقع الافتراضي والسيناريوهات الذكية' },
    chair: { en: 'Dr. Yasser Al-Subaie, MD, PhD', ar: 'د. ياسر السبيعي' },
    institution: { en: 'Imam Abdulrahman Bin Faisal University, Dammam', ar: 'جامعة الإمام عبدالرحمن بن فيصل، الدمام' },
    focus: { en: 'Immersive triage simulations, adaptive AI patients & remote assessment', ar: 'محاكاة الفرز الإسعافي والمرضى الافتراضيين التفاعليين' },
    membersCount: 425,
  },
];

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'SIM-FAC',
    code: 'SSSH-FAC-101',
    title: {
      en: 'Foundations of Healthcare Simulation & Structured Debriefing',
      ar: 'أساسيات المحاكاة الصحية واستخلاص المعلومات المنظم',
    },
    duration: { en: '2 Days · 16 Hours Live Lab', ar: 'يومان · ١٦ ساعة تدريبية عملية' },
    cmeHours: 16,
    feeSar: 1800,
    validity: { en: '3 Years · SSSH Educator Credential', ar: '٣ سنوات · شهادة ممارس محاكاة' },
    audience: {
      en: 'Physicians, clinical educators, nursing instructors & residency directors',
      ar: 'الأطباء والمدربون السريريون وأعضاء هيئة التدريس ومديرو برامج الزمالة',
    },
    description: {
      en: 'Hands-on mastery of learning objectives, scenario authoring, prebriefing psychological safety, and Advocacy-Inquiry debriefing with live video playback.',
      ar: 'إتقان كتابة أهداف التعلم، وتصميم السيناريوهات، والتمهيد الآمن نفسياً، وتطبيق استخلاص المعلومات مع مراجعة الفيديو المباشر.',
    },
  },
  {
    id: 'SIM-OPS',
    code: 'SSSH-OPS-204',
    title: {
      en: 'Simulation Operations, Manikin Programming & Moulage Specialist',
      ar: 'أخصائي عمليات المحاكاة وبرمجة الدمى والمؤثرات السريرية',
    },
    duration: { en: '2 Days · 12 Hours Technical Lab', ar: 'يومان · ١٢ ساعة مختبر تقني' },
    cmeHours: 12,
    feeSar: 1500,
    validity: { en: '3 Years · SSSH Operations Certificate', ar: '٣ سنوات · شهادة تشغيل معتمدة' },
    audience: {
      en: 'Simulation technicians, biomedical engineers, AV coordinators & lab managers',
      ar: 'فنيو المحاكاة ومهندسو الأجهزة الطبية ومنسقو الأنظمة ومديرو المراكز',
    },
    description: {
      en: 'Configure physiological state trends, wireless monitor overrides, realistic trauma moulage, and multi-room debriefing capture workflows.',
      ar: 'برمجة المؤشرات الفسيولوجية، والتحكم بالشاشات السريرية، وإعداد المؤثرات الإصابية، وإدارة أنظمة البث والتسجيل.',
    },
  },
  {
    id: 'INSITU',
    code: 'SSSH-SAF-302',
    title: {
      en: 'In-Situ Hospital Simulation & Crisis Resource Management (CRM)',
      ar: 'المحاكاة الميدانية في المستشفيات وإدارة الأزمات السريرية',
    },
    duration: { en: '1.5 Days · 14 Hours Clinical Drill', ar: 'يوم ونصف · ١٤ ساعة تدريب ميداني' },
    cmeHours: 14,
    feeSar: 1400,
    validity: { en: '2 Years · SSSH Safety Lead', ar: 'سنتان · شهادة قائد سلامة ميدانية' },
    audience: {
      en: 'ED, ICU, OR, obstetrics teams & hospital patient safety officers',
      ar: 'فرق الطوارئ والعناية المركزة والعمليات ومسؤولو سلامة المرضى',
    },
    description: {
      en: 'Plan and execute safe unit-based clinical simulations, identify latent safety threats (LSTs), and strengthen closed-loop emergency team communication.',
      ar: 'تخطيط وتنفيذ تمارين المحاكاة داخل الأقسام الفعلية، واكتشاف مخاطر السلامة الكامنة، وتعزيز تواصل فرق الطوارئ.',
    },
  },
  {
    id: 'SP-EDUC',
    code: 'SSSH-SPE-210',
    title: {
      en: 'Standardized Patient (SP) Methodology & OSCE Station Design',
      ar: 'منهجية المرضى المعياريين وتصميم محطات اختبار OSCE',
    },
    duration: { en: '1 Day · 10 Hours Assessment Lab', ar: 'يوم واحد · ١٠ ساعات تقييم عملي' },
    cmeHours: 10,
    feeSar: 1200,
    validity: { en: '3 Years · SSSH Assessment Track', ar: '٣ سنوات · مسار التقييم السريري' },
    audience: {
      en: 'SP educators, medical school assessment coordinators & OSCE examiners',
      ar: 'منسقو المرضى المعياريين وأعضاء لجان الاختبارات السريرية',
    },
    description: {
      en: 'Train and calibrate Standardized Patients for difficult clinical conversations, checklist validation, and high-stakes OSCE reliability.',
      ar: 'تدريب ومعايرة المرضى المعياريين لمحطات التواصل الصعبة وبناء قوائم التحقق وضمان موثوقية الاختبار.',
    },
  },
  {
    id: 'CRM-ACLS',
    code: 'SSSH-CRM-115',
    title: {
      en: 'High-Fidelity Resuscitation & Code Blue Simulation Workshop',
      ar: 'ورشة محاكاة الإنعاش القلبي وإدارة حالات الطوارئ الحرجة',
    },
    duration: { en: '1 Day · 8 Hours Immersion', ar: 'يوم واحد · ٨ ساعات تطبيقية' },
    cmeHours: 8,
    feeSar: 950,
    validity: { en: '2 Years · SCFHS Accredited', ar: 'سنتان · معتمدة مهنياً' },
    audience: {
      en: 'Residents, critical care nurses, paramedics & rapid response teams',
      ar: 'الأطباء المقيمون وتمريض العناية الحرجة والمسعفون وفرق الاستجابة السريعة',
    },
    description: {
      en: 'Immersive high-fidelity resuscitation scenarios emphasizing airway leadership, defibrillation timing, role clarity, and post-event team debriefing.',
      ar: 'سيناريوهات إنعاش متقدمة عالية الدقة تركز على قيادة الفريق وإدارة مجرى الهواء والتوقيت الدقيق واستخلاص الأداء.',
    },
  },
];

export const TRAINING_CENTERS: TrainingCenter[] = [
  {
    id: 'sim-riyadh-1',
    region: 'riyadh',
    regionLabel: { en: 'Riyadh', ar: 'الرياض' },
    city: { en: 'Riyadh', ar: 'الرياض' },
    name: {
      en: 'King Saud University Clinical Skills & Simulation Center',
      ar: 'مركز المهارات السريرية والمحاكاة بجامعة الملك سعود',
    },
    courses: ['SIM-FAC', 'SIM-OPS', 'INSITU', 'SP-EDUC', 'CRM-ACLS'],
    nextSession: 'Dec 06, 2026',
    seatsAvailable: 12,
    accreditationCode: 'SSSH-RYD-001',
  },
  {
    id: 'sim-riyadh-2',
    region: 'riyadh',
    regionLabel: { en: 'Riyadh', ar: 'الرياض' },
    city: { en: 'Riyadh', ar: 'الرياض' },
    name: {
      en: 'Princess Nourah University Simulation & Skills Academy',
      ar: 'أكاديمية المحاكاة والمهارات بجامعة الأميرة نورة',
    },
    courses: ['SIM-FAC', 'SP-EDUC', 'INSITU', 'CRM-ACLS'],
    nextSession: 'Dec 13, 2026',
    seatsAvailable: 9,
    accreditationCode: 'SSSH-RYD-008',
  },
  {
    id: 'sim-makkah-1',
    region: 'makkah',
    regionLabel: { en: 'Makkah / Jeddah', ar: 'مكة / جدة' },
    city: { en: 'Jeddah', ar: 'جدة' },
    name: {
      en: 'King Abdulaziz University Clinical Simulation Center',
      ar: 'مركز المحاكاة السريرية بجامعة الملك عبدالعزيز بجدة',
    },
    courses: ['SIM-FAC', 'SIM-OPS', 'SP-EDUC', 'CRM-ACLS'],
    nextSession: 'Dec 10, 2026',
    seatsAvailable: 15,
    accreditationCode: 'SSSH-JED-003',
  },
  {
    id: 'sim-eastern-1',
    region: 'eastern',
    regionLabel: { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
    city: { en: 'Dammam', ar: 'الدمام' },
    name: {
      en: 'Imam Abdulrahman Bin Faisal Simulation & Training Hub',
      ar: 'مركز المحاكاة والتدريب بجامعة الإمام عبدالرحمن بن فيصل',
    },
    courses: ['SIM-FAC', 'SIM-OPS', 'INSITU', 'CRM-ACLS'],
    nextSession: 'Dec 17, 2026',
    seatsAvailable: 14,
    accreditationCode: 'SSSH-DMM-005',
  },
  {
    id: 'sim-asir-1',
    region: 'asir',
    regionLabel: { en: 'Asir', ar: 'عسير' },
    city: { en: 'Abha', ar: 'أبها' },
    name: {
      en: 'King Khalid University Medical Simulation & Skills Lab',
      ar: 'مختبر المحاكاة الطبية بجامعة الملك خالد بأبها',
    },
    courses: ['SIM-FAC', 'INSITU', 'CRM-ACLS'],
    nextSession: 'Dec 20, 2026',
    seatsAvailable: 10,
    accreditationCode: 'SSSH-ABH-002',
  },
  {
    id: 'sim-madinah-1',
    region: 'madinah',
    regionLabel: { en: 'Madinah', ar: 'المدينة المنورة' },
    city: { en: 'Madinah', ar: 'المدينة المنورة' },
    name: {
      en: 'Taibah University Healthcare Simulation Center',
      ar: 'مركز المحاكاة الصحية بجامعة طيبة بالمدينة المنورة',
    },
    courses: ['SIM-FAC', 'SP-EDUC', 'CRM-ACLS'],
    nextSession: 'Dec 22, 2026',
    seatsAvailable: 11,
    accreditationCode: 'SSSH-MED-004',
  },
];

export const CERTIFICATE_REGISTRY: CertificateRecord[] = [
  {
    id: 'SSSH-2026-8841',
    holderName: { en: 'Dr. Omar Abdulrahman Al-Mansour', ar: 'د. عمر عبدالرحمن المنصور' },
    course: 'Healthcare Simulation & Debriefing (SSSH-FAC-101)',
    center: {
      en: 'King Saud University Clinical Skills & Simulation Center',
      ar: 'مركز المهارات السريرية والمحاكاة بجامعة الملك سعود',
    },
    issuedDate: '2026-04-14',
    expiryDate: '2029-04-14',
    status: 'Valid',
  },
  {
    id: 'SSSH-2026-4109',
    holderName: { en: 'Eng. Sarah Mohammed Al-Dosari', ar: 'م. سارة محمد الدوسري' },
    course: 'Simulation Operations Specialist (SSSH-OPS-204)',
    center: {
      en: 'King Abdulaziz University Clinical Simulation Center',
      ar: 'مركز المحاكاة السريرية بجامعة الملك عبدالعزيز بجدة',
    },
    issuedDate: '2026-02-09',
    expiryDate: '2029-02-09',
    status: 'Valid',
  },
  {
    id: 'SSSH-2025-7720',
    holderName: { en: 'Dr. Faisal Saad Al-Shehri', ar: 'د. فيصل سعد الشهري' },
    course: 'In-Situ Hospital Safety Lead (SSSH-SAF-302)',
    center: {
      en: 'Imam Abdulrahman Bin Faisal Simulation & Training Hub',
      ar: 'مركز المحاكاة والتدريب بجامعة الإمام عبدالرحمن بن فيصل',
    },
    issuedDate: '2025-01-20',
    expiryDate: '2027-01-20',
    status: 'Renewal Due',
  },
];

export const SAMPLE_INVOICES = [
  {
    invoiceId: 'INV-SSSH-2026-3041',
    itemTitle: 'Foundations of Healthcare Simulation & Debriefing (SSSH-FAC-101)',
    fullName: 'Dr. Omar Al-Mansour',
    totalSar: 2070,
    paymentMethod: 'mada / Credit Card',
    status: 'Paid' as const,
    date: '2026-11-12',
  },
  {
    invoiceId: 'INV-SSSH-2026-2984',
    itemTitle: 'Simulation Operations Specialist (SSSH-OPS-204)',
    fullName: 'Eng. Reem Al-Harbi',
    totalSar: 1725,
    paymentMethod: 'SADAD Biller 904',
    status: 'Pending SADAD' as const,
    date: '2026-11-15',
  },
];

export const CONFERENCE_DAYS: ConferenceDay[] = [
  {
    dayKey: 'day1',
    label: { en: 'Day 01', ar: 'اليوم الأول' },
    date: { en: 'Tuesday, February 16, 2027', ar: 'الثلاثاء ١٦ فبراير ٢٠٢٧' },
    theme: {
      en: 'National Simulation Governance, AI Scenarios & Patient Safety',
      ar: 'حوكمة المحاكاة الوطنية والسيناريوهات الذكية وسلامة المرضى',
    },
    sessions: [
      {
        time: '08:30 – 10:00',
        hall: { en: 'Diriyah Grand Ballroom', ar: 'قاعة الدرعية الكبرى' },
        track: { en: 'Plenary Keynote', ar: 'الجلسة الافتتاحية' },
        title: {
          en: 'National Simulation Accreditation Roadmap: Aligning Academic Hubs with Vision 2030',
          ar: 'خارطة اعتماد مراكز المحاكاة الوطنية ومواءمتها مع رؤية السعودية ٢٠٣٠',
        },
        speaker: { en: 'Dr. Norah Al-Qahtani · Riyadh', ar: 'د. نورة القحطاني · الرياض' },
      },
      {
        time: '10:30 – 12:15',
        hall: { en: 'Hall B · Debriefing Lab', ar: 'قاعة ب · مختبر الاستخلاص' },
        track: { en: 'Live Simulation Demo', ar: 'عرض محاكاة مباشر' },
        title: {
          en: 'Live Multidisciplinary Trauma Code & Real-Time Advocacy-Inquiry Debriefing',
          ar: 'تمرين حي لاستجابة الإصابات متعددة التخصصات واستخلاص الأداء المباشر',
        },
        speaker: { en: 'KAMC Simulation Team · Riyadh', ar: 'فريق المحاكاة بمدينة الملك عبدالعزيز الطبية' },
      },
      {
        time: '14:00 – 15:45',
        hall: { en: 'Hall C · XR & Technology', ar: 'قاعة ج · الواقع الممتد والذكاء الاصطناعي' },
        track: { en: 'Innovation Symposium', ar: 'ندوة الابتكار التقني' },
        title: {
          en: 'Integrating Adaptive Virtual Patients into Undergraduate Clinical Clerkships',
          ar: 'دمج المرضى الافتراضيين التفاعليين في التدريب السريري لطلبة الطب والتمريض',
        },
        speaker: { en: 'Dr. Yasser Al-Subaie · Dammam', ar: 'د. ياسر السبيعي · الدمام' },
      },
    ],
  },
  {
    dayKey: 'day2',
    label: { en: 'Day 02', ar: 'اليوم الثاني' },
    date: { en: 'Wednesday, February 17, 2027', ar: 'الأربعاء ١٧ فبراير ٢٠٢٧' },
    theme: {
      en: 'In-Situ Hospital Safety Audits & Procedural Mastery Learning',
      ar: 'المحاكاة الميدانية بالمستشفيات وإتقان المهارات الإجرائية',
    },
    sessions: [
      {
        time: '09:00 – 10:45',
        hall: { en: 'Diriyah Grand Ballroom', ar: 'قاعة الدرعية الكبرى' },
        track: { en: 'SSSH × International Faculty', ar: 'جلسة دولية مشتركة' },
        title: {
          en: 'Translational Simulation Outcomes: Reducing Hospital Serious Safety Events by 40%',
          ar: 'أثر المحاكاة الانتقالية في خفض أحداث السلامة الجسيمة بالمستشفيات بنسبة ٤٠٪',
        },
        speaker: { en: 'Dr. Bandar Al-Otaibi & International Panel', ar: 'د. بندر العتيبي ومتحدثون دوليون' },
      },
      {
        time: '11:15 – 13:00',
        hall: { en: 'Hall B · Surgical Sim', ar: 'قاعة ب · المحاكاة الجراحية' },
        track: { en: 'Procedural Track', ar: 'مسار الجراحة والمناظير' },
        title: {
          en: 'Competency-Based Surgical Simulation Benchmarks for Residency Promotion',
          ar: 'معايير الإتقان الجراحي بالمحاكاة لترقية أطباء الإقامة',
        },
        speaker: { en: 'Dr. Saad Al-Ghamdi · Riyadh', ar: 'د. سعد الغامدي · الرياض' },
      },
      {
        time: '15:00 – 17:00',
        hall: { en: 'Hall D · SimWars Arena', ar: 'قاعة د · تحدي فرق المحاكاة' },
        track: { en: 'National SimWars Final', ar: 'نهائي تحدي المحاكاة الوطني' },
        title: {
          en: 'Interprofessional Hospital Team Competition & Scenario Excellence Awards',
          ar: 'منافسة الفرق الصحية متعددة التخصصات وجوائز التميز في السيناريوهات',
        },
        speaker: { en: 'SSSH Scientific Committee', ar: 'اللجنة العلمية بالجمعية' },
      },
    ],
  },
  {
    dayKey: 'day3',
    label: { en: 'Day 03', ar: 'اليوم الثالث' },
    date: { en: 'Thursday, February 18, 2027', ar: 'الخميس ١٨ فبراير ٢٠٢٧' },
    theme: {
      en: 'Simulation Operations, Standardized Patients & OSCE Psychometrics',
      ar: 'عمليات المحاكاة والمرضى المعياريون واختبارات الكفاءة السريرية',
    },
    sessions: [
      {
        time: '09:00 – 11:00',
        hall: { en: 'Hall A · Operations', ar: 'قاعة أ · العمليات والتشغيل' },
        track: { en: 'CHSOS Prep Track', ar: 'مسار التشغيل والتقنية' },
        title: {
          en: 'Managing Multi-Campus Simulation Inventories, AV Telemetry & ROI Reporting',
          ar: 'إدارة أصول مراكز المحاكاة متعددة المقرات وأنظمة البث ومؤشرات الأثر',
        },
        speaker: { en: 'Eng. Abdullah Al-Zahrani · Riyadh', ar: 'م. عبدالله الزهراني · الرياض' },
      },
      {
        time: '11:30 – 13:30',
        hall: { en: 'Hall C · Assessment', ar: 'قاعة ج · التقييم السريري' },
        track: { en: 'SP & OSCE Workshop', ar: 'ورشة المرضى المعياريين' },
        title: {
          en: 'Calibrating Bilingual Arabic/English Standardized Patients for Communication OSCEs',
          ar: 'معايرة المرضى المعياريين ثنائيي اللغة لمحطات التواصل السريري',
        },
        speaker: { en: 'Dr. Fatimah Al-Harbi · Riyadh', ar: 'د. فاطمة الحربي · الرياض' },
      },
    ],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'sjhs-lead',
    tier: 'lead',
    volume: 'Vol. 11 · Issue 3',
    publishedDate: 'October 2026',
    readTime: '9 min read',
    category: { en: 'Original Research', ar: 'بحث أصيل' },
    title: {
      en: 'Multicenter In-Situ Simulation Audits Uncover 148 Latent Safety Threats Across Saudi Emergency & Obstetric Units',
      ar: 'تمارين المحاكاة الميدانية متعددة المراكز تكشف ١٤٨ خطراً كامناً للسلامة في أقسام الطوارئ والولادة',
    },
    authors: 'Al-Otaibi B, Al-Qahtani N, Al-Harbi F, Al-Zahrani A, et al.',
    deck: {
      en: 'A 12-month translational simulation initiative across 14 Saudi hospitals resolved equipment accessibility gaps and cut emergency escalation delays by 36%.',
      ar: 'أسفرت مبادرة محاكاة انتقالية خلال ١٢ شهراً في ١٤ مستشفى سعودياً عن سد فجوات التجهيز وخفض زمن الاستجابة الطارئة بنسبة ٣٦٪.',
    },
    abstract: {
      en: 'Background: In-situ simulation evaluates real clinical teams inside actual care environments. Methods: 96 unannounced and scheduled drills were executed across 14 tertiary and regional hospitals. Results: 148 latent safety threats were categorized (42% equipment/medication readiness, 35% role communication, 23% physical environment), with 91% remediated within 30 days. Conclusion: Systematic in-situ simulation acts as a proactive patient safety sensor.',
      ar: 'الخلفية: تختبر المحاكاة الميدانية الفرق السريرية في بيئة العمل الحقيقية. النتائج: تم تنفيذ ٩٦ تمريناً في ١٤ مستشفى ورصد ١٤٨ خطراً كامناً ومعالجة ٩١٪ منها خلال ٣٠ يوماً.',
    },
    doi: '10.4103/sjhs.2026.1103',
  },
  {
    id: 'sjhs-sec-1',
    tier: 'secondary',
    volume: 'Vol. 11 · Issue 3',
    publishedDate: 'September 2026',
    readTime: '7 min read',
    category: { en: 'Mastery Learning', ar: 'التعلم بالإتقان' },
    title: {
      en: 'Simulation-Based Mastery Learning for Central Venous Catheter Insertion Among Saudi Residents',
      ar: 'التعلم بالإتقان القائم على المحاكاة لإجراءات القسطرة الوريدية المركزية لدى الأطباء المقيمين',
    },
    authors: 'Al-Ghamdi S, Al-Subaie Y.',
    deck: {
      en: 'Ultrasound-guided task trainers with deliberate practice reduced mechanical complications by 62% during first-year ICU rotations.',
      ar: 'خفض التدريب المتعمد بالموجات فوق الصوتية المضاعفات الإجرائية بنسبة ٦٢٪ خلال مناوبات العناية المركزة.',
    },
    abstract: {
      en: 'Prospective cohort comparing traditional apprenticeship versus simulation-based mastery learning (SBML) with minimum passing standards prior to supervised patient procedures.',
      ar: 'دراسة مقارنة تثبت تفوق التعلم بالإتقان القائم على المحاكاة في رفع كفاءة الإجراءات السريرية قبل التطبيق على المرضى.',
    },
    doi: '10.4103/sjhs.2026.1092',
  },
  {
    id: 'sjhs-sec-2',
    tier: 'secondary',
    volume: 'Vol. 11 · Issue 2',
    publishedDate: 'August 2026',
    readTime: '6 min read',
    category: { en: 'Faculty Development', ar: 'تطوير المدربين' },
    title: {
      en: 'Objective Structured Debriefing Assessment (OSDA) Reliability Across Bilingual Saudi Centers',
      ar: 'موثوقية أداة التقييم المنظم لاستخلاص المعلومات عبر مراكز المحاكاة السعودية',
    },
    authors: 'Al-Qahtani N, Al-Harbi F.',
    deck: {
      en: 'Peer-observed debriefing coaching raised structured facilitator scores from 68% to 91% over two academic semesters.',
      ar: 'رفع التوجيه الأقراني لمدربي المحاكاة درجات جودة الاستخلاص من ٦٨٪ إلى ٩١٪ خلال فصلين أكاديميين.',
    },
    abstract: {
      en: 'Validates structured feedback rubrics for faculty leading clinical debriefings in both English and Arabic healthcare curricula.',
      ar: 'تحقق من موثوقية معايير تقييم جودة الاستخلاص التدريبي باللغتين العربية والإنجليزية.',
    },
    doi: '10.4103/sjhs.2026.1078',
  },
  {
    id: 'sjhs-arch-1',
    tier: 'archive',
    volume: 'Vol. 11 · Issue 2',
    publishedDate: 'July 2026',
    readTime: '5 min read',
    category: { en: 'Technology Brief', ar: 'موجز تقني' },
    title: {
      en: 'VR Triage Scenarios vs. Physical Moulage in Mass-Casualty Preparedness Drills',
      ar: 'مقارنة سيناريوهات الفرز بالواقع الافتراضي مع المحاكاة الفيزيائية في تمارين الكوارث',
    },
    authors: 'Al-Subaie Y, Al-Zahrani A.',
    deck: {
      en: 'Hybrid VR pre-training paired with physical ward drills lowered consumable costs by 38% while preserving decision accuracy.',
      ar: 'خفض التدريب الهجين بالواقع الافتراضي التكاليف التشغيلية بنسبة ٣٨٪ مع الحفاظ على دقة الفرز.',
    },
    abstract: {
      en: 'Compares learner triage accuracy, cognitive load, and per-trainee operational cost between VR and full-scale moulage exercises.',
      ar: 'مقارنة دقة الفرز والحمل المعرفي والتكلفة التشغيلية بين الواقع الافتراضي والمحاكاة الميدانية.',
    },
    doi: '10.4103/sjhs.2026.1064',
  },
  {
    id: 'sjhs-arch-2',
    tier: 'archive',
    volume: 'Vol. 11 · Issue 1',
    publishedDate: 'May 2026',
    readTime: '8 min read',
    category: { en: 'Consensus Paper', ar: 'ورقة توافقية' },
    title: {
      en: 'Minimum Technical & Staffing Standards for Hospital Simulation Labs in KSA',
      ar: 'الحد الأدنى للمعايير التقنية والكوادر لمختبرات المحاكاة في مستشفيات المملكة',
    },
    authors: 'SSSH Operations & Accreditation Taskforce.',
    deck: {
      en: 'Outlines technician-to-learner ratios, debriefing room acoustics, and preventative equipment lifecycle planning.',
      ar: 'يحدد نسب الفنيين للمتدربين وعزل غرف الاستخلاص وخطط الصيانة الدورية للأجهزة.',
    },
    abstract: {
      en: 'National reference blueprint for hospital administrators commissioning new clinical skills and simulation centers.',
      ar: 'مرجع وطني لمديري المستشفيات عند تأسيس وتشغيل مراكز المهارات والمحاكاة السريرية.',
    },
    doi: '10.4103/sjhs.2026.1041',
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: { en: 'Dr. Norah Al-Qahtani, MD, CHSE', ar: 'د. نورة القحطاني' },
    role: { en: 'President, SSSH', ar: 'رئيسة مجلس إدارة الجمعية' },
    institution: { en: 'King Saud University Medical City, Riyadh', ar: 'المدينة الطبية بجامعة الملك سعود، الرياض' },
    specialty: { en: 'Clinical Debriefing & Simulation Education', ar: 'التعليم بالمحاكاة واستخلاص المعلومات' },
  },
  {
    name: { en: 'Dr. Bandar Al-Otaibi, MD, FACEP', ar: 'د. بندر العتيبي' },
    role: { en: 'Vice President & Safety Chair', ar: 'نائب الرئيس ورئيس لجنة السلامة' },
    institution: { en: 'King Abdulaziz Medical City, Riyadh', ar: 'مدينة الملك عبدالعزيز الطبية، الرياض' },
    specialty: { en: 'Emergency Medicine & In-Situ Simulation', ar: 'طب الطوارئ والمحاكاة الميدانية' },
  },
  {
    name: { en: 'Dr. Fatimah Al-Harbi, PhD, RN', ar: 'د. فاطمة الحربي' },
    role: { en: 'Secretary General & SJHS Editor', ar: 'الأمينة العامة ورئيسة تحرير المجلة' },
    institution: { en: 'Princess Nourah University, Riyadh', ar: 'جامعة الأميرة نورة بنت عبدالرحمن، الرياض' },
    specialty: { en: 'Interprofessional Education & OSCEs', ar: 'التعليم المشترك والاختبارات السريرية' },
  },
  {
    name: { en: 'Eng. Abdullah Al-Zahrani, CHSOS', ar: 'م. عبدالله الزهراني' },
    role: { en: 'Director of Accreditation & Operations', ar: 'مدير الاعتماد والتشغيل التقني' },
    institution: { en: 'King Fahad Medical City, Riyadh', ar: 'مدينة الملك فهد الطبية، الرياض' },
    specialty: { en: 'Simulation Engineering & Lab Accreditation', ar: 'هندسة المحاكاة واعتماد المراكز' },
  },
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'fellow',
    name: { en: 'Simulation Educator Fellow', ar: 'زميل ممارس ومدرب محاكاة' },
    annualFeeSar: 500,
    eligibility: {
      en: 'Faculty, physicians & simulation directors leading accredited programs',
      ar: 'أعضاء هيئة التدريس والأطباء ومديرو برامج المحاكاة المعتمدة',
    },
    benefits: [
      { en: 'Voting rights in SSSH General Assembly & SIG leadership', ar: 'حق التصويت في الجمعية العمومية ورئاسة اللجان التخصصية' },
      { en: '20% fee discount on all SSSH workshops & Annual Forum registration', ar: 'خصم ٢٠٪ على جميع الدورات ورسوم الملتقى السنوي' },
      { en: 'Eligibility for SSSH Simulation Research Grants & lab peer-review', ar: 'التأهل لمنح أبحاث المحاكاة ولجان اعتماد المراكز' },
    ],
  },
  {
    id: 'associate',
    name: { en: 'Associate & Clinical Trainee', ar: 'عضو مشارك وطبيب متدرب' },
    annualFeeSar: 250,
    eligibility: {
      en: 'Residency trainees, clinical fellows & undergraduate health educators',
      ar: 'أطباء الإقامة والزمالة والمعيدون في الكليات الصحية',
    },
    benefits: [
      { en: 'Free access to monthly virtual scenario design & debriefing clinics', ar: 'حضور مجاني للندوات الشهرية لتصميم السيناريوهات' },
      { en: 'Priority team entry in National SimWars Championship', ar: 'أولوية التسجيل في بطولة تحدي المحاكاة الوطني' },
      { en: 'Discounted enrollment in SSSH Foundations & CRM workshops', ar: 'رسوم مخفضة في دورات التأسيس وإدارة الأزمات' },
    ],
  },
  {
    id: 'operations',
    name: { en: 'Simulation Operations & Allied Health', ar: 'عضو التشغيل والتمريض والمساندة' },
    annualFeeSar: 200,
    eligibility: {
      en: 'Simulation technicians, AV engineers, nurses & SP coordinators',
      ar: 'فنيو المحاكاة ومهندسو التشغيل والتمريض ومنسقو المرضى المعياريين',
    },
    benefits: [
      { en: 'Full access to Operations SIG technical blueprints & moulage library', ar: 'الوصول الكامل لمكتبة السيناريوهات والأدلة التقنية' },
      { en: 'SCFHS continuing education & CHSOS prep study group access', ar: 'ساعات تعليم مستمر ومجموعات التحضير للاعتماد المهني' },
      { en: 'Reduced Annual Simulation Forum delegate pass', ar: 'تذكرة مخفضة لحضور الملتقى السنوي للمحاكاة الصحية' },
    ],
  },
];

export const LAB_GUIDES: LabGuide[] = [
  {
    id: 'lg-bay',
    topic: { en: 'Center Setup', ar: 'تأسيس المراكز' },
    readingTime: '4 min read',
    title: {
      en: 'Commissioning a Hospital Simulation Bay & Debriefing Room',
      ar: 'متطلبات تجهيز جناح المحاكاة السريرية وغرفة الاستخلاص بالمستشفى',
    },
    summary: {
      en: 'Essential spatial, acoustic, medical gas, and AV layout guidelines for hospitals launching an internal clinical simulation suite.',
      ar: 'إرشادات المساحة والعزل الصوتي والغازات الطبية وأنظمة البث للمستشفيات التي تؤسس وحدة محاكاة داخلية.',
    },
    keySteps: [
      {
        en: 'Separate control room visibility (one-way glass or IP PTZ camera feeds) from a sound-isolated debriefing room seating 8–12 learners.',
        ar: 'فصل غرفة التحكم والمراقبة عن قاعة الاستخلاص المعزولة صوتياً والمجهزة لـ ٨ إلى ١٢ متدرباً.',
      },
      {
        en: 'Use non-functional or clearly color-coded air-only medical headwall outlets so simulation learners practice safely without live oxygen hazards.',
        ar: 'تأمين مخارج الغازات الطبية في غرفة المحاكاة بالهواء الآمن فقط دون مخاطر الأكسجين الحي.',
      },
      {
        en: 'Standardize crash-cart drawers and infusion pumps to match the host hospital clinical wards for authentic transfer of learning.',
        ar: 'مواءمة تجهيز عربة الطوارئ ومضخات الأدوية مع أجهزة المستشفى الفعلية لتعزيز نقل المهارة للواقع.',
      },
    ],
  },
  {
    id: 'lg-safety',
    topic: { en: 'In-Situ Drills', ar: 'التمارين الميدانية' },
    readingTime: '3 min read',
    title: {
      en: 'Pre-Drill Safety Checklist for Live Hospital Wards',
      ar: 'قائمة السلامة المسبقة لتنفيذ تمارين المحاكاة داخل الأقسام الفعلية',
    },
    summary: {
      en: 'Mandatory no-go criteria, medication labeling safeguards, and unit charge-nurse signoff before launching an in-situ simulation.',
      ar: 'معايير الإلغاء الفوري وتمييز أدوية المحاكاة وموافقة رئيس القسم قبل بدء أي تمرين ميداني.',
    },
    keySteps: [
      {
        en: 'Confirm unit acuity with the charge nurse 30 minutes prior; postpone immediately if real clinical surge or code occurs.',
        ar: 'التنسيق مع تمريض القسم قبل التمرين بـ ٣٠ دقيقة والتأجيل الفوري عند ارتفاع ضغط الحالات الحقيقية.',
      },
      {
        en: 'Never leave simulated saline vials, unlabeled syringes, or training defibrillator pads inside a patient care bay after debriefing.',
        ar: 'عدم ترك أي مستلزمات أو محاليل تدريبية داخل غرف المرضى بعد انتهاء التمرين إطلاقاً.',
      },
      {
        en: 'Conduct a 5-minute safety sweep and log any discovered latent safety threats before leaving the clinical ward.',
        ar: 'إجراء مسح أمان لمدة ٥ دقائق وتوثيق أي ملاحظات سلامة مكتشفة قبل مغادرة القسم.',
      },
    ],
  },
  {
    id: 'lg-debrief',
    topic: { en: 'Faculty Practice', ar: 'مهارات المدربين' },
    readingTime: '5 min read',
    title: {
      en: 'Structured 3-Phase Debriefing: Reaction, Analysis & Summary',
      ar: 'مراحل الاستخلاص المنظم الثلاث: الانطباع، التحليل، والتلخيص',
    },
    summary: {
      en: 'A practical facilitator pocket guide for moving teams from emotional decompression to actionable clinical mental models.',
      ar: 'دليل عملي لمدير الجلسة للانتقال بالمتدربين من تفريغ التوتر إلى ترسيخ المفاهيم السريرية القابلة للتطبيق.',
    },
    keySteps: [
      {
        en: 'Open the Reaction Phase by asking how the team felt, allowing brief emotional decompression before reviewing clinical actions.',
        ar: 'بدء مرحلة الانطباع بالسؤال عن شعور الفريق وإتاحة التفريغ الهادئ قبل مناقشة الأداء السريري.',
      },
      {
        en: 'Use Advocacy-Inquiry ("I noticed... I was curious what was on your mind...") rather than judgmental questioning during Analysis.',
        ar: 'استخدام أسلوب الملاحظة والاستقصاء البناء لفهم دافع القرار السريري بدلاً من التوجيه المباشر.',
      },
      {
        en: 'Close the Summary Phase by having each participant state one clinical or teamwork takeaway for their next hospital shift.',
        ar: 'اختتام الجلسة بطلب ذكر نقطة تطبيقية واحدة من كل مشارك لتطبيقها في مناوبته القادمة.',
      },
    ],
  },
];
