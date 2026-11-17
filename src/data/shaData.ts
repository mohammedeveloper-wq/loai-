export type Language = 'en' | 'ar';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface GuidelineItem {
  id: string;
  code: string;
  category: 'coronary' | 'heart-failure' | 'prevention' | 'electrophysiology';
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
  id: 'BLS' | 'ACLS' | 'PALS' | 'NRP' | 'HEARTSAVER';
  code: string;
  title: BilingualText;
  duration: BilingualText;
  cmeHours: number;
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
  courses: ('BLS' | 'ACLS' | 'PALS' | 'NRP' | 'HEARTSAVER')[];
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

export interface PatientGuide {
  id: string;
  topic: BilingualText;
  readingTime: string;
  title: BilingualText;
  summary: BilingualText;
  keySteps: BilingualText[];
}

export const HERO_IMAGE = '/src/assets/images/hero_cardiology_riyadh_1794942410135.jpg';
export const TRAINING_IMAGE = '/src/assets/images/training_cpr_simulation_1794942410441.jpg';
export const CONFERENCE_IMAGE = '/src/assets/images/conference_sha_symposium_1794942412971.jpg';
export const JOURNAL_IMAGE = '/src/assets/images/research_jsha_editorial_1794942411955.jpg';

export const UI_COPY = {
  brand: { en: 'Saudi Heart Association', ar: 'الجمعية السعودية للقلب' },
  nav: {
    about: { en: 'About', ar: 'عن الجمعية' },
    guidelines: { en: 'Guidelines', ar: 'الأدلة السريرية' },
    training: { en: 'CPR Training', ar: 'التدريب والإنعاش' },
    congress: { en: 'Congress', ar: 'المؤتمر السنوي' },
    journal: { en: 'Journal', ar: 'المجلة العلمية' },
    portal: { en: 'Member Portal', ar: 'بوابة الأعضاء' },
  },
  hero: {
    eyebrow: {
      en: 'Established 1989 · Riyadh, Kingdom of Saudi Arabia · SCFHS Accredited',
      ar: 'تأسست ١٩٨٩ · الرياض، المملكة العربية السعودية · معتمدة من الهيئة السعودية للتخصصات الصحية',
    },
    headline: {
      en: 'Advancing Cardiovascular Science & Heart Health Across the Kingdom',
      ar: 'الارتقاء بعلوم القلب والأوعية الدموية وصحة القلب في أنحاء المملكة',
    },
    subheadline: {
      en: 'The national scientific authority uniting cardiologists, cardiac surgeons, researchers, and life-support educators to set evidence-based clinical standards aligned with Vision 2030.',
      ar: 'المرجعية العلمية الوطنية التي تجمع أطباء وجراحي القلب والباحثين ومدربي دعم الحياة لوضع المعايير السريرية المبنية على البراهين وفق مستهدفات رؤية ٢٠٣٠.',
    },
    primaryCta: { en: 'Register for SHA37 Congress', ar: 'التسجيل في مؤتمر SHA37' },
    secondaryCta: { en: 'Explore Clinical Guidelines', ar: 'تصفح الأدلة السريرية' },
    imageCaption: {
      en: 'Fig. 1 — Cardiovascular Research & Education Atrium, Riyadh Medical Corridor',
      ar: 'شكل ١ — بهو أبحاث وتعليم أمراض القلب، الممر الطبي بالرياض',
    },
    kpis: [
      { value: '1989', label: { en: 'Founded at King Saud University', ar: 'تأسست في جامعة الملك سعود' } },
      { value: '4,850+', label: { en: 'Active Fellows & Members', ar: 'عضو وزميل نشط' } },
      { value: '142', label: { en: 'Accredited NCPR Centers', ar: 'مركز معتمد للإنعاش القلبي' } },
      { value: '24', label: { en: 'SCFHS CME Hours at SHA37', ar: 'ساعة تعليم طبي مستمر في SHA37' } },
    ],
  },
  sections: {
    guidelinesTitle: { en: 'Clinical Practice Guidelines & Working Groups', ar: 'الأدلة السريرية والمجموعات العلمية' },
    guidelinesSubtitle: {
      en: 'Evidence-based consensus documents tailored to Saudi and regional cardiovascular epidemiology, updated continuously by national sub-specialty taskforces.',
      ar: 'توصيات سريرية مبنية على البراهين ومصممة لخصائص أمراض القلب في المملكة والمنطقة، تحدثها اللجان التخصصية الوطنية.',
    },
    workingGroupsTitle: { en: 'Scientific Working Groups', ar: 'المجموعات العلمية التخصصية' },
    trainingTitle: { en: 'National CPR Committee (NCPR)', ar: 'اللجنة الوطنية للإنعاش القلبي الرئوي' },
    trainingSubtitle: {
      en: 'Standardized life-support certification across 142 accredited hospital training centers, overseen via the official shacpr.org.sa registry.',
      ar: 'شهادات دعم الحياة المعتمدة عبر ١٤٢ مركز تدريب مستشفوي في جميع مناطق المملكة، بإشراف السجل الرسمي shacpr.org.sa.',
    },
    congressTitle: { en: '37th Annual Scientific Congress — SHA37', ar: 'المؤتمر العلمي السنوي السابع والثلاثون — SHA37' },
    congressSubtitle: {
      en: 'March 25–27, 2027 · Crowne Plaza RDC, Riyadh · Theme: Global Heart: From Riyadh to the World',
      ar: '٢٥–٢٧ مارس ٢٠٢٧ · كراون بلازا المدينة الرقمية، الرياض · الشعار: قلب عالمي: من الرياض إلى العالم',
    },
    journalTitle: { en: 'Journal of the Saudi Heart Association (JSHA)', ar: 'مجلة الجمعية السعودية للقلب (JSHA)' },
    journalSubtitle: {
      en: 'Peer-reviewed open-access quarterly publishing regional clinical registries, consensus statements, and original cardiovascular investigations.',
      ar: 'دورية علمية محكمة متاحة للوصول المفتوح تنشر السجلات القلبية الإقليمية والبيانات التوافقية والأبحاث السريرية الأصيلة.',
    },
    governanceTitle: { en: 'Leadership, Membership & Patient Education', ar: 'مجلس الإدارة، العضوية وتثقيف المرضى' },
    governanceSubtitle: {
      en: 'Guided by senior cardiovascular leaders across Saudi medical cities, serving practitioners and empowering cardiac patients nationwide.',
      ar: 'بقيادة نخبة من استشاريي أمراض وجراحة القلب في المدن الطبية السعودية لخدمة الممارسين الصحيين وتوعية المرضى.',
    },
  },
};

export const GUIDELINES: GuidelineItem[] = [
  {
    id: 'ccs-2026',
    code: 'SHA-GL-2026-01',
    category: 'coronary',
    categoryLabel: { en: 'Coronary & ACS', ar: 'الشرايين التاجية' },
    year: '2026',
    pages: 84,
    title: {
      en: 'Focused Update on Diagnosis and Management of Chronic Coronary Syndromes',
      ar: 'التحديث المركز لتشخيص وعلاج متلازمات الشريان التاجي المزمنة',
    },
    summary: {
      en: 'Establishes structured pre-test clinical likelihood pathways prioritizing Coronary CT Angiography (CCTA), risk-stratified revascularization, and dual antiplatelet duration protocols for Saudi clinical centers.',
      ar: 'يحدد مسارات التقييم السريري المسبق مع أولوية التصوير المقطعي للشرايين التاجية (CCTA)، وإعادة التروية المبنية على المخاطر، وبروتوكولات مضادات الصفيحات.',
    },
    taskforce: {
      en: 'SHA Interventional & Coronary Working Group',
      ar: 'مجموعة العمل السعودية للقسطرة والشرايين التاجية',
    },
    citation: 'Saudi Heart Association CCS Taskforce. Focused Update on Chronic Coronary Syndromes. J Saudi Heart Assoc. 2026;38(1):12-95.',
    recommendations: [
      {
        classLevel: 'Class I',
        evidence: 'Level A',
        statement: {
          en: 'Perform Coronary CT Angiography (CCTA) as the primary non-invasive diagnostic test in symptomatic patients with low-to-intermediate clinical likelihood of obstructive CAD.',
          ar: 'اعتماد التصوير المقطعي للشرايين التاجية (CCTA) كفحص تشخيصي أولي غير جراحي للمرضى ذوي الاحتمالية السريرية المنخفضة إلى المتوسطة.',
        },
      },
      {
        classLevel: 'Class I',
        evidence: 'Level A',
        statement: {
          en: 'Initiate high-intensity statin therapy targeting LDL-C < 1.4 mmol/L (55 mg/dL) with early ezetimibe or PCSK9 inhibitor escalation if threshold is unmet at 6 weeks.',
          ar: 'البدء بعلاج الستاتين عالي الكثافة لتحقيق هدف LDL-C أقل من ١.٤ مليمول/لتر مع إضافة الإيزيتيميب أو مثبطات PCSK9 عند الحاجة.',
        },
      },
      {
        classLevel: 'Class I',
        evidence: 'Level B',
        statement: {
          en: 'Evaluate multidisciplinary Heart Team consensus prior to left-main or complex multivessel revascularization in patients with diabetes mellitus.',
          ar: 'مراجعة فريق القلب متعدد التخصصات قبل إعادة تروية الجذع الأيسر أو الشرايين المتعددة لدى مرضى السكري.',
        },
      },
    ],
  },
  {
    id: 'hf-2025',
    code: 'SHA-GL-2025-04',
    category: 'heart-failure',
    categoryLabel: { en: 'Heart Failure', ar: 'قصور القلب' },
    year: '2025',
    pages: 112,
    title: {
      en: 'National Consensus for Acute and Chronic Heart Failure Care Pathways',
      ar: 'التوافق الوطني لمسارات الرعاية في قصور القلب الحاد والمزمن',
    },
    summary: {
      en: 'Rapid quadruple foundational therapy initiation (ARNI/ACEi, Beta-blocker, MRA, SGLT2i) prior to hospital discharge and structured virtual heart failure clinic follow-up within 7 days.',
      ar: 'البدء السريع بالعلاج الرباعي الأساسي قبل الخروج من المستشفى مع المتابعة عبر عيادات قصور القلب الافتراضية خلال ٧ أيام.',
    },
    taskforce: {
      en: 'Saudi Heart Failure Working Group',
      ar: 'مجموعة العمل السعودية لقصور القلب',
    },
    citation: 'Al-Ghamdi S, Al-Saif S, et al. SHA National Consensus on Heart Failure Management. J Saudi Heart Assoc. 2025;37(3):188-299.',
    recommendations: [
      {
        classLevel: 'Class I',
        evidence: 'Level A',
        statement: {
          en: 'Initiate SGLT2 inhibitors across the full spectrum of symptomatic heart failure (HFrEF, HFmrEF, HFpEF) regardless of glycemic status.',
          ar: 'بدء مثبطات SGLT2 عبر جميع طيف قصور القلب المصحوب بأعراض بغض النظر عن حالة السكري.',
        },
      },
      {
        classLevel: 'Class I',
        evidence: 'Level A',
        statement: {
          en: 'Schedule structured virtual or in-person transitional care follow-up within 7–14 days following any acute decompensated heart failure hospitalization.',
          ar: 'جدولة متابعة انتقالية منظمة خلال ٧ إلى ١٤ يوماً بعد الخروج من المستشفى لحالات قصور القلب الحاد.',
        },
      },
    ],
  },
  {
    id: 'prev-2025',
    code: 'SHA-GL-2025-02',
    category: 'prevention',
    categoryLabel: { en: 'Prevention & Lipids', ar: 'الوقاية والدهون' },
    year: '2025',
    pages: 96,
    title: {
      en: 'Saudi Guidelines for Primary & Secondary Cardiovascular Prevention',
      ar: 'الأدلة السعودية للوقاية الأولية والثانوية من أمراض القلب والأوعية الدموية',
    },
    summary: {
      en: 'Regionally calibrated cardiovascular risk scoring accounting for early-onset metabolic syndrome, familial hypercholesterolemia screening, and strict blood pressure targets (<130/80 mmHg).',
      ar: 'تقييم مخاطر القلب المعاير إقليمياً مع فحص فرط كوليسترول الدم العائلي وأهداف ضغط الدم الصارمة.',
    },
    taskforce: {
      en: 'SHA Preventive Cardiology & National Heart Center Joint Panel',
      ar: 'اللجنة المشتركة للوقاية القلبية والمركز الوطني للقلب',
    },
    citation: 'Saudi Heart Association & National Heart Center. Primary & Secondary CVD Prevention Guidelines. 2025.',
    recommendations: [
      {
        classLevel: 'Class I',
        evidence: 'Level B',
        statement: {
          en: 'Screen all adults aged 20 years and older with a fasting lipid profile and HbA1c every 3–5 years, or annually if cardiometabolic risk factors are present.',
          ar: 'إجراء فحص الدهون والسكري التراكمي لجميع البالغين من عمر ٢٠ عاماً فأكثر كل ٣-٥ سنوات أو سنوياً عند وجود عوامل خطورة.',
        },
      },
      {
        classLevel: 'Class I',
        evidence: 'Level A',
        statement: {
          en: 'Target systolic blood pressure of 120–129 mmHg in treated hypertensive adults without orthostatic intolerance.',
          ar: 'استهداف ضغط دم انقباضي بين ١٢٠ و١٢٩ ملم زئبق لدى مرضى ارتفاع الضغط القادرين على تحمل العلاج.',
        },
      },
    ],
  },
  {
    id: 'ep-2024',
    code: 'SHA-GL-2024-06',
    category: 'electrophysiology',
    categoryLabel: { en: 'Electrophysiology', ar: 'كهربائية القلب' },
    year: '2024',
    pages: 76,
    title: {
      en: 'Atrial Fibrillation Anticoagulation & Catheter Ablation Standards',
      ar: 'معايير مميعات الدم والقسطرة الاستئصالية للرجفان الأذيني',
    },
    summary: {
      en: 'Practical guidance on direct oral anticoagulants (DOACs), early rhythm control via cryoablation or pulsed-field ablation, and device-detected subclinical atrial fibrillation.',
      ar: 'إرشادات عملية لمميعات الدم الفموية المباشرة والتحكم المبكر بنظم القلب عبر الاستئصال القسطري.',
    },
    taskforce: {
      en: 'Saudi Heart Rhythm Society (SHRS) Working Group',
      ar: 'مجموعة العمل السعودية لاضطرابات نظم القلب',
    },
    citation: 'Saudi Heart Rhythm Society. Atrial Fibrillation Management Standards. J Saudi Heart Assoc. 2024;36(4):301-376.',
    recommendations: [
      {
        classLevel: 'Class I',
        evidence: 'Level A',
        statement: {
          en: 'Prefer DOACs over vitamin K antagonists in eligible patients with non-valvular atrial fibrillation and CHA2DS2-VASc >= 2 (men) or >= 3 (women).',
          ar: 'تفضيل مميعات الدم الفموية المباشرة على الوارفارين في الرجفان الأذيني غير الصمامي عند ارتفاع مؤشر الخطورة.',
        },
      },
    ],
  },
];

export const WORKING_GROUPS: WorkingGroup[] = [
  {
    index: '01',
    name: { en: 'Interventional Cardiology & Structural Heart', ar: 'القسطرة التداخلية وأمراض القلب البنيوية' },
    chair: { en: 'Dr. Fahad Al-Khuwaiter, MD, FACC', ar: 'د. فهد الخويطر' },
    institution: { en: 'King Faisal Specialist Hospital & Research Centre', ar: 'مستشفى الملك فيصل التخصصي ومركز الأبحاث' },
    focus: { en: 'Primary PCI network metrics, TAVI registry, and complex CTO proctoring', ar: 'شبكات القسطرة الأولية وسجل الصمام الأورطي' },
    membersCount: 480,
  },
  {
    index: '02',
    name: { en: 'Heart Failure & Cardiac Transplantation', ar: 'قصور القلب وزراعة القلب' },
    chair: { en: 'Dr. Noura Al-Harbi, MD, FESC', ar: 'د. نورة الحربي' },
    institution: { en: 'King Abdulaziz Cardiac Center, Riyadh', ar: 'مركز الملك عبدالعزيز للقلب، الرياض' },
    focus: { en: 'National GDMT titration audits and mechanical circulatory support pathways', ar: 'تدقيق العلاج الدوائي ومسارات الدعم الميكانيكي للدورة الدموية' },
    membersCount: 365,
  },
  {
    index: '03',
    name: { en: 'Saudi Heart Rhythm & Electrophysiology', ar: 'كهربائية القلب واضطرابات النظم' },
    chair: { en: 'Dr. Tariq Al-Subaie, MD, FHRS', ar: 'د. طارق السبيعي' },
    institution: { en: 'Prince Sultan Cardiac Center, Riyadh', ar: 'مركز الأمير سلطان لمعالجة أمراض وجراحة القلب' },
    focus: { en: 'Catheter ablation standards, sudden cardiac death prevention, and ICD registries', ar: 'معايير الاستئصال القسطري والوقاية من الموت القلبي المفاجئ' },
    membersCount: 290,
  },
  {
    index: '04',
    name: { en: 'Preventive Cardiology & Lipidology', ar: 'الوقاية القلبية وأمراض الدهون' },
    chair: { en: 'Dr. Maha Al-Zahrani, MD, PhD', ar: 'د. مها الزهراني' },
    institution: { en: 'King Saud University Medical City', ar: 'المدينة الطبية بجامعة الملك سعود' },
    focus: { en: 'Familial hypercholesterolemia screening and Vision 2030 community risk reduction', ar: 'فحص الكوليسترول العائلي ومبادرات الوقاية المجتمعية' },
    membersCount: 510,
  },
  {
    index: '05',
    name: { en: 'Pediatric & Adult Congenital Heart Disease', ar: 'أمراض قلب الأطفال والعيوب الخلقية' },
    chair: { en: 'Dr. Khalid Al-Otaibi, MD', ar: 'د. خالد العتيبي' },
    institution: { en: 'King Abdullah Specialist Children Hospital', ar: 'مستشفى الملك عبدالله التخصصي للأطفال' },
    focus: { en: 'Fetal echocardiography screening and lifelong ACHD transition clinics', ar: 'فحص قلب الجنين وعيادات انتقال الرعاية للبالغين' },
    membersCount: 340,
  },
  {
    index: '06',
    name: { en: 'Cardiac Nursing & Allied Cardiovascular Health', ar: 'تمريض القلب والمهن الصحية المساندة' },
    chair: { en: 'Amina Al-Qahtani, MSN, RN', ar: 'أ. أمينة القحطاني' },
    institution: { en: 'Johns Hopkins Aramco Healthcare, Dhahran', ar: 'مركز جونز هوبكنز أرامكو الطبي، الظهران' },
    focus: { en: 'CCU clinical competencies, cardiac rehabilitation, and patient adherence', ar: 'كفاءات العناية المركزة للقلب وبرامج التأهيل القلبي' },
    membersCount: 820,
  },
];

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'BLS',
    code: 'NCPR-BLS',
    title: { en: 'Basic Life Support (BLS) Provider', ar: 'دورة دعم الحياة الأساسي (BLS)' },
    duration: { en: '4.5 Hours · Hands-on Simulation', ar: '٤.٥ ساعات · محاكاة عملية' },
    cmeHours: 4,
    validity: { en: '2 Years · SHA-NCPR Card', ar: 'سنتان · بطاقة معتمدة' },
    audience: { en: 'Physicians, nurses, paramedics, medical & dental students', ar: 'الأطباء والممرضين والمسعفين وطلاب الكليات الصحية' },
    description: {
      en: 'High-quality single and multi-rescuer CPR for adults, children, and infants, effective bag-mask ventilation, and rapid AED deployment.',
      ar: 'مهارات الإنعاش القلبي الرئوي عالي الجودة للبالغين والأطفال والرضع واستخدام جهاز الصدمات الكهربائية الآلي.',
    },
  },
  {
    id: 'ACLS',
    code: 'NCPR-ACLS',
    title: { en: 'Advanced Cardiovascular Life Support (ACLS)', ar: 'دورة دعم الحياة القلبي المتقدم (ACLS)' },
    duration: { en: '14 Hours · 2-Day Clinical Lab', ar: '١٤ ساعة · يومان تدريبيان' },
    cmeHours: 14,
    validity: { en: '2 Years · SCFHS Recognized', ar: 'سنتان · معتمدة مهنياً' },
    audience: { en: 'Emergency, ICU, CCU, anesthesia & internal medicine teams', ar: 'فرق الطوارئ والعناية المركزة والتخدير والباطنة' },
    description: {
      en: 'Algorithmic management of cardiac arrest, peri-arrest arrhythmias, acute coronary syndromes, stroke recognition, and resuscitation team dynamics.',
      ar: 'إدارة حالات توقف القلب واضطرابات النظم الحادة ومتلازمات الشريان التاجي وقيادة فريق الإنعاش.',
    },
  },
  {
    id: 'PALS',
    code: 'NCPR-PALS',
    title: { en: 'Pediatric Advanced Life Support (PALS)', ar: 'دورة دعم الحياة المتقدم للأطفال (PALS)' },
    duration: { en: '14 Hours · 2-Day Simulation', ar: '١٤ ساعة · يومان تدريبيان' },
    cmeHours: 14,
    validity: { en: '2 Years · SHA-NCPR Card', ar: 'سنتان · بطاقة معتمدة' },
    audience: { en: 'Pediatricians, PICU nurses, and emergency clinicians', ar: 'أطباء الأطفال وتمريض العناية المركزة والطوارئ' },
    description: {
      en: 'Systematic pediatric assessment, respiratory distress intervention, shock stabilization, and pediatric arrhythmia resuscitation.',
      ar: 'التقييم المنهجي للأطفال والتعامل مع الفشل التنفسي والصدمة واضطرابات النظم لدى الأطفال.',
    },
  },
  {
    id: 'NRP',
    code: 'NCPR-NRP',
    title: { en: 'Neonatal Resuscitation Program (NRP)', ar: 'برنامج إنعاش حديثي الولادة (NRP)' },
    duration: { en: '8 Hours · Delivery Suite Lab', ar: '٨ ساعات · تدريب غرف الولادة' },
    cmeHours: 8,
    validity: { en: '2 Years · SHA-NCPR Card', ar: 'سنتان · بطاقة معتمدة' },
    audience: { en: 'Neonatologists, obstetricians, NICU nurses & midwives', ar: 'أطباء حديثي الولادة والنساء والولادة والقابلات' },
    description: {
      en: 'Evidence-based stabilization of the newborn during the golden minute, positive-pressure ventilation, intubation, and umbilical access.',
      ar: 'الاستقرار التنفسي والدوراني لحديثي الولادة في الدقيقة الذهبية والتهوية بالضغط الإيجابي.',
    },
  },
  {
    id: 'HEARTSAVER',
    code: 'NCPR-HS',
    title: { en: 'Heartsaver CPR & AED Community Track', ar: 'برنامج منقذ القلب المجتمعي (CPR & AED)' },
    duration: { en: '3 Hours · Community Workshop', ar: '٣ ساعات · ورشة مجتمعية' },
    cmeHours: 0,
    validity: { en: '2 Years · Community Certificate', ar: 'سنتان · شهادة مجتمعية' },
    audience: { en: 'Educators, corporate safety officers, coaches & citizens', ar: 'المعلمون ومسؤولو السلامة والمدربون وأفراد المجتمع' },
    description: {
      en: 'Accessible hands-only CPR, choking relief, and public-access defibrillator readiness for schools, mosques, stadiums, and workplaces.',
      ar: 'الإنعاش اليدوي وإسعاف الغصة واستخدام أجهزة الصدمات العامة في المدارس والمساجد ومقرات العمل.',
    },
  },
];

export const TRAINING_CENTERS: TrainingCenter[] = [
  {
    id: 'tc-riyadh-1',
    region: 'riyadh',
    regionLabel: { en: 'Riyadh', ar: 'الرياض' },
    city: { en: 'Riyadh', ar: 'الرياض' },
    name: { en: 'King Saud University Medical City Simulation Center', ar: 'مركز المحاكاة بالمدينة الطبية بجامعة الملك سعود' },
    courses: ['BLS', 'ACLS', 'PALS', 'NRP', 'HEARTSAVER'],
    nextSession: 'Nov 24, 2026',
    seatsAvailable: 14,
    accreditationCode: 'NCPR-RYD-001',
  },
  {
    id: 'tc-riyadh-2',
    region: 'riyadh',
    regionLabel: { en: 'Riyadh', ar: 'الرياض' },
    city: { en: 'Riyadh', ar: 'الرياض' },
    name: { en: 'Prince Sultan Cardiac Center Training Academy', ar: 'أكاديمية التدريب بمركز الأمير سلطان للقلب' },
    courses: ['BLS', 'ACLS', 'PALS'],
    nextSession: 'Nov 28, 2026',
    seatsAvailable: 8,
    accreditationCode: 'NCPR-RYD-014',
  },
  {
    id: 'tc-makkah-1',
    region: 'makkah',
    regionLabel: { en: 'Makkah / Jeddah', ar: 'مكة / جدة' },
    city: { en: 'Jeddah', ar: 'جدة' },
    name: { en: 'King Faisal Specialist Hospital Jeddah Life Support Lab', ar: 'مختبر دعم الحياة بمستشفى الملك فيصل التخصصي بجدة' },
    courses: ['BLS', 'ACLS', 'PALS', 'NRP'],
    nextSession: 'Nov 26, 2026',
    seatsAvailable: 11,
    accreditationCode: 'NCPR-JED-004',
  },
  {
    id: 'tc-eastern-1',
    region: 'eastern',
    regionLabel: { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
    city: { en: 'Dammam', ar: 'الدمام' },
    name: { en: 'Saud Al-Babtain Cardiac Center Resuscitation Unit', ar: 'وحدة الإنعاش بمركز البابطين للقلب بالدمام' },
    courses: ['BLS', 'ACLS', 'HEARTSAVER'],
    nextSession: 'Dec 02, 2026',
    seatsAvailable: 19,
    accreditationCode: 'NCPR-DMM-009',
  },
  {
    id: 'tc-asir-1',
    region: 'asir',
    regionLabel: { en: 'Asir', ar: 'عسير' },
    city: { en: 'Abha', ar: 'أبها' },
    name: { en: 'Aseer Central Hospital Clinical Skills & CPR Center', ar: 'مركز المهارات السريرية بمستشفى عسير المركزي' },
    courses: ['BLS', 'ACLS', 'NRP'],
    nextSession: 'Dec 05, 2026',
    seatsAvailable: 9,
    accreditationCode: 'NCPR-ABH-003',
  },
  {
    id: 'tc-madinah-1',
    region: 'madinah',
    regionLabel: { en: 'Madinah', ar: 'المدينة المنورة' },
    city: { en: 'Madinah', ar: 'المدينة المنورة' },
    name: { en: 'Madinah Cardiac Center Accredited Training Hub', ar: 'مركز التدريب المعتمد بمركز أمراض وجراحة القلب بالمدينة' },
    courses: ['BLS', 'ACLS', 'PALS', 'HEARTSAVER'],
    nextSession: 'Dec 07, 2026',
    seatsAvailable: 12,
    accreditationCode: 'NCPR-MED-002',
  },
];

export const CERTIFICATE_REGISTRY: CertificateRecord[] = [
  {
    id: 'SHA-NCPR-2026-8841',
    holderName: { en: 'Dr. Omar Abdulrahman Al-Mansour', ar: 'د. عمر عبدالرحمن المنصور' },
    course: 'ACLS Provider (NCPR-ACLS)',
    center: { en: 'King Saud University Medical City Simulation Center', ar: 'مركز المحاكاة بالمدينة الطبية بجامعة الملك سعود' },
    issuedDate: '2026-04-14',
    expiryDate: '2028-04-14',
    status: 'Valid',
  },
  {
    id: 'SHA-NCPR-2026-4109',
    holderName: { en: 'Sarah Mohammed Al-Dosari, RN', ar: 'أ. سارة محمد الدوسري' },
    course: 'PALS Provider (NCPR-PALS)',
    center: { en: 'King Faisal Specialist Hospital Jeddah Life Support Lab', ar: 'مختبر دعم الحياة بمستشفى الملك فيصل التخصصي بجدة' },
    issuedDate: '2026-02-09',
    expiryDate: '2028-02-09',
    status: 'Valid',
  },
  {
    id: 'SHA-NCPR-2025-7720',
    holderName: { en: 'Dr. Faisal Saad Al-Shehri', ar: 'د. فيصل سعد الشهري' },
    course: 'BLS Provider (NCPR-BLS)',
    center: { en: 'Saud Al-Babtain Cardiac Center Resuscitation Unit', ar: 'وحدة الإنعاش بمركز البابطين للقلب بالدمام' },
    issuedDate: '2025-01-20',
    expiryDate: '2027-01-20',
    status: 'Renewal Due',
  },
];

export const CONFERENCE_DAYS: ConferenceDay[] = [
  {
    dayKey: 'day1',
    label: { en: 'Day 01', ar: 'اليوم الأول' },
    date: { en: 'Thursday, March 25, 2027', ar: 'الخميس ٢٥ مارس ٢٠٢٧' },
    theme: { en: 'Global Heart Opening & Interventional Frontiers', ar: 'الافتتاح العلمي وآفاق القسطرة التداخلية' },
    sessions: [
      {
        time: '08:30 – 10:00',
        hall: { en: 'Diriyah Grand Ballroom', ar: 'قاعة الدرعية الكبرى' },
        track: { en: 'Plenary Keynote', ar: 'الجلسة الافتتاحية' },
        title: { en: 'Vision 2030 Cardiovascular Transformation: Tele-Cardiology & National Registries', ar: 'تحول رعاية القلب في رؤية ٢٠٣٠: طب القلب عن بُعد والسجلات الوطنية' },
        speaker: { en: 'Prof. Waleed Al-Habeeb · Riyadh', ar: 'أ.د. وليد الحبيب · الرياض' },
      },
      {
        time: '10:30 – 12:15',
        hall: { en: 'Hall B · Interventional', ar: 'قاعة ب · القسطرة' },
        track: { en: 'Live Case Transmission', ar: 'بث مباشر من القسطرة' },
        title: { en: 'Complex Left-Main Bifurcation PCI Guided by Intravascular Ultrasound', ar: 'قسطرة الجذع الأيسر المعقدة بتوجيه الموجات فوق الصوتية داخل الأوعية' },
        speaker: { en: 'KFSHRC Cath Lab Team · Riyadh', ar: 'فريق القسطرة بالتخصصي · الرياض' },
      },
      {
        time: '14:00 – 15:45',
        hall: { en: 'Hall C · Preventive', ar: 'قاعة ج · الوقاية' },
        track: { en: 'Guideline Symposium', ar: 'ندوة الأدلة السريرية' },
        title: { en: 'Implementing 2026 SHA Chronic Coronary & Lipid Targets in Primary Care', ar: 'تطبيق أهداف الدهون والشرايين التاجية ٢٠٢٦ في الرعاية الأولية' },
        speaker: { en: 'Dr. Maha Al-Zahrani · Riyadh', ar: 'د. مها الزهراني · الرياض' },
      },
    ],
  },
  {
    dayKey: 'day2',
    label: { en: 'Day 02', ar: 'اليوم الثاني' },
    date: { en: 'Friday, March 26, 2027', ar: 'الجمعة ٢٦ مارس ٢٠٢٧' },
    theme: { en: 'Heart Failure, Electrophysiology & Joint International Sessions', ar: 'قصور القلب وكهربائية القلب والجلسات الدولية المشتركة' },
    sessions: [
      {
        time: '09:00 – 10:45',
        hall: { en: 'Diriyah Grand Ballroom', ar: 'قاعة الدرعية الكبرى' },
        track: { en: 'SHA × ESC Joint Session', ar: 'جلسة مشتركة مع الجمعية الأوروبية' },
        title: { en: 'Cardiogenic Shock Networks & Mechanical Support Timing Across Gulf Centers', ar: 'شبكات الصدمة القلبية وتوقيت الدعم الميكانيكي في المراكز الخليجية' },
        speaker: { en: 'Dr. Noura Al-Harbi & International Faculty', ar: 'د. نورة الحربي ومتحدثون دوليون' },
      },
      {
        time: '11:15 – 13:00',
        hall: { en: 'Hall B · Electrophysiology', ar: 'قاعة ب · كهربائية القلب' },
        track: { en: 'SHRS Track', ar: 'مسار نظم القلب' },
        title: { en: 'Pulsed-Field Ablation Outcomes in Persistent Atrial Fibrillation', ar: 'نتائج الاستئصال بالمجال النبضي في الرجفان الأذيني المستمر' },
        speaker: { en: 'Dr. Tariq Al-Subaie · Riyadh', ar: 'د. طارق السبيعي · الرياض' },
      },
      {
        time: '15:00 – 17:00',
        hall: { en: 'Hall D · Fellows Forum', ar: 'قاعة د · منتدى الزملاء' },
        track: { en: 'Young Investigators Award', ar: 'جائزة الباحثين الشباب' },
        title: { en: 'Original Clinical Research Presentations & Cardiology Quiz Final', ar: 'عروض الأبحاث السريرية الأصلية ونهائي مسابقة الزمالة' },
        speaker: { en: 'SHA Scientific Committee', ar: 'اللجنة العلمية بالجمعية' },
      },
    ],
  },
  {
    dayKey: 'day3',
    label: { en: 'Day 03', ar: 'اليوم الثالث' },
    date: { en: 'Saturday, March 27, 2027', ar: 'السبت ٢٧ مارس ٢٠٢٧' },
    theme: { en: 'Structural Valve Care, Pediatric Cardiology & Cardiac Nursing', ar: 'أمراض الصمامات وقلب الأطفال وتمريض القلب' },
    sessions: [
      {
        time: '09:00 – 11:00',
        hall: { en: 'Hall A · Structural', ar: 'قاعة أ · الصمامات' },
        track: { en: 'Valvular Innovation', ar: 'ابتكارات الصمامات' },
        title: { en: 'Transcatheter Mitral & Tricuspid Edge-to-Edge Repair: 5-Year Saudi Registry', ar: 'إصلاح الصمام الميترالي وثلاثي الشرفات بالقسطرة: السجل السعودي لخمس سنوات' },
        speaker: { en: 'Dr. Fahad Al-Khuwaiter · Riyadh', ar: 'د. فهد الخويطر · الرياض' },
      },
      {
        time: '11:30 – 13:30',
        hall: { en: 'Hall C · Nursing & Allied', ar: 'قاعة ج · التمريض والمهن المساندة' },
        track: { en: 'Allied Health Track', ar: 'مسار المهن المساندة' },
        title: { en: 'Structured Cardiac Rehabilitation & Post-Discharge Adherence Models', ar: 'نماذج التأهيل القلبي المنظم والالتزام العلاجي بعد الخروج' },
        speaker: { en: 'Amina Al-Qahtani, MSN · Dhahran', ar: 'أ. أمينة القحطاني · الظهران' },
      },
    ],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'jsha-lead',
    tier: 'lead',
    volume: 'Vol. 38 · Issue 3',
    publishedDate: 'October 2026',
    readTime: '11 min read',
    category: { en: 'Original Research', ar: 'بحث أصيل' },
    title: {
      en: 'Ten-Year Survival and Door-to-Balloon Trends in the Saudi Acute Myocardial Infarction Registry (STARS-2)',
      ar: 'مؤشرات البقاء لعشر سنوات وأزمنة القسطرة الأولية في السجل السعودي لاحتشاء عضلة القلب',
    },
    authors: 'Al-Saif S, Al-Habib KF, Hersi A, Al-Murayeh M, et al.',
    deck: {
      en: 'Analysis of 18,420 STEMI admissions across 42 Saudi Ministry of Health and specialist cardiac hubs demonstrates a 34% reduction in in-hospital mortality following regional STEMI network integration.',
      ar: 'تحليل ١٨,٤٢٠ حالة احتشاء عضلة القلب في ٤٢ مركزاً بالمملكة يظهر انخفاضاً بنسبة ٣٤٪ في الوفيات داخل المستشفى بعد تكامل شبكات القسطرة.',
    },
    abstract: {
      en: 'Background: Regional STEMI care networks under Saudi Vision 2030 health clusters have expanded primary PCI access across urban and peripheral hospitals. Methods: Prospective multicenter cohort across 42 tertiary and spoke hospitals (2016–2026). Results: Median door-to-balloon time improved from 89 minutes to 54 minutes (p < 0.001), with 30-day mortality declining from 6.8% to 4.4%. Conclusion: Hub-and-spoke emergency ECG transmission and direct cath-lab activation substantially improve national acute coronary survival.',
      ar: 'الخلفية: أسهمت شبكات رعاية الجلطات القلبية ضمن التجمعات الصحية في توسيع الوصول للقسطرة الأولية. النتائج: انخفض متوسط زمن التدخل من ٨٩ دقيقة إلى ٥٤ دقيقة مع انخفاض ملموس في الوفيات خلال ٣٠ يوماً.',
    },
    doi: '10.37616/2212-5043.1408',
  },
  {
    id: 'jsha-sec-1',
    tier: 'secondary',
    volume: 'Vol. 38 · Issue 3',
    publishedDate: 'September 2026',
    readTime: '7 min read',
    category: { en: 'Clinical Review', ar: 'مراجعة سريرية' },
    title: {
      en: 'Virtual Heart Failure Clinics & Seha Virtual Hospital Integration in Rural Clusters',
      ar: 'عيادات قصور القلب الافتراضية وتكامل مستشفى صحة الافتراضي في المناطق الطرفية',
    },
    authors: 'Al-Harbi N, Al-Ghamdi S, Al-Jasser T.',
    deck: {
      en: 'Protocolized tele-titration of quadruple heart failure therapy reduced 90-day readmissions by 28% across six regional health clusters.',
      ar: 'قلصت المعايرة الافتراضية للعلاج الرباعي إعادة التنويم خلال ٩٠ يوماً بنسبة ٢٨٪ عبر ستة تجمعات صحية.',
    },
    abstract: {
      en: 'Tele-cardiology consultation paired with home-monitoring biomarkers enables safe uptitration of ARNI and SGLT2i therapy for patients residing over 150 km from tertiary cardiac centers.',
      ar: 'يتيح الطب القلبي عن بُعد مع المؤشرات الحيوية المنزلية زيادة جرعات أدوية قصور القلب بأمان للمرضى خارج المدن الرئيسية.',
    },
    doi: '10.37616/2212-5043.1409',
  },
  {
    id: 'jsha-sec-2',
    tier: 'secondary',
    volume: 'Vol. 38 · Issue 2',
    publishedDate: 'August 2026',
    readTime: '6 min read',
    category: { en: 'Consensus Statement', ar: 'بيان توافقي' },
    title: {
      en: 'Cardiac Screening Protocols for Competitive Athletes & Ramadan Fasting Cardiovascular Guidance',
      ar: 'بروتوكولات الفحص القلبي للرياضيين وإرشادات صيام رمضان لمرضى القلب',
    },
    authors: 'Al-Subaie T, Al-Otaibi K, SHA Preventive Panel.',
    deck: {
      en: 'Risk-stratified clinical pathways for pre-participation ECG evaluation and individualized medication timing during fasting hours.',
      ar: 'مسارات سريرية مصنفة للمخاطر لتقييم تخطيط القلب للرياضيين وتنظيم مواعيد الأدوية خلال شهر رمضان.',
    },
    abstract: {
      en: 'Provides clinicians with clear low, moderate, and high-risk stratification criteria for patients with coronary artery disease, heart failure, and anticoagulation therapy wishing to observe fasting safely.',
      ar: 'يوفر للأطباء معايير تصنيف واضحة لمستويات الخطورة لمرضى الشرايين التاجية وقصور القلب ومميعات الدم خلال الصيام.',
    },
    doi: '10.37616/2212-5043.1394',
  },
  {
    id: 'jsha-arch-1',
    tier: 'archive',
    volume: 'Vol. 38 · Issue 2',
    publishedDate: 'July 2026',
    readTime: '5 min read',
    category: { en: 'Registry Brief', ar: 'موجز سجل' },
    title: {
      en: 'Familial Hypercholesterolemia Cascade Screening Outcomes in Riyadh & Jeddah',
      ar: 'نتائج الفحص العائلي المتسلسل لفرط كوليسترول الدم الوراثي في الرياض وجدة',
    },
    authors: 'Al-Zahrani M, Al-Rasadi K.',
    deck: {
      en: 'Early genetic and lipid cascade screening identified 312 index families for timely PCSK9 pathway intervention.',
      ar: 'أسفر الفحص الوراثي المتسلسل عن اكتشاف ٣١٢ عائلة مؤهلة للتدخل العلاجي المبكر.',
    },
    abstract: {
      en: 'Multicenter Saudi Familial Hypercholesterolemia Registry data highlighting under-recognition of premature coronary risk and dramatic LDL-C reductions post-cascade screening.',
      ar: 'بيانات السجل السعودي لفرط الكوليسترول العائلي التي تبرز أهمية الاكتشاف المبكر لخفض مخاطر الشرايين التاجية.',
    },
    doi: '10.37616/2212-5043.1388',
  },
  {
    id: 'jsha-arch-2',
    tier: 'archive',
    volume: 'Vol. 38 · Issue 1',
    publishedDate: 'May 2026',
    readTime: '8 min read',
    category: { en: 'Original Research', ar: 'بحث أصيل' },
    title: {
      en: 'Long-Term Outcomes of Pediatric Transcatheter ASD & VSD Closure in Saudi Tertiary Hubs',
      ar: 'النتائج طويلة المدى لإغلاق ثقوب القلب لدى الأطفال بالقسطرة في المراكز السعودية',
    },
    authors: 'Al-Otaibi K, Al-Muhaya M.',
    deck: {
      en: 'Five-year echocardiographic follow-up across 1,140 pediatric interventions confirms 98.6% procedural freedom from re-intervention.',
      ar: 'متابعة خمس سنوات لـ ١,١٤٠ تدخلاً قسطرياً للأطفال تؤكد نجاحاً إجرائياً بنسبة ٩٨.٦٪.',
    },
    abstract: {
      en: 'Retrospective and prospective cohort evaluation of contemporary device closure safety and somatic growth recovery in congenital septal defects.',
      ar: 'تقييم سريري لسلامة أجهزة الإغلاق القسطري وتحسن النمو لدى الأطفال المصابين بعيوب الحاجز القلبي.',
    },
    doi: '10.37616/2212-5043.1371',
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: { en: 'Prof. Waleed Al-Habeeb, MD, FACC', ar: 'أ.د. وليد الحبيب' },
    role: { en: 'President, Saudi Heart Association', ar: 'رئيس مجلس إدارة الجمعية السعودية للقلب' },
    institution: { en: 'King Saud University Medical City, Riyadh', ar: 'المدينة الطبية بجامعة الملك سعود، الرياض' },
    specialty: { en: 'Heart Failure & Cardiac Transplantation', ar: 'قصور وزراعة القلب' },
  },
  {
    name: { en: 'Dr. Khalid Al-Shaibi, MD, FSCAI', ar: 'د. خالد الشعيبي' },
    role: { en: 'Vice President & Congress Chair', ar: 'نائب الرئيس ورئيس المؤتمر السنوي' },
    institution: { en: 'King Fahad Armed Forces Hospital, Jeddah', ar: 'مستشفى الملك فهد للقوات المسلحة، جدة' },
    specialty: { en: 'Interventional Cardiology', ar: 'القسطرة القلبية التداخلية' },
  },
  {
    name: { en: 'Dr. Husam Al-Faleh, MD, FRCPC', ar: 'د. حسام الفالح' },
    role: { en: 'Secretary General & JSHA Editor-in-Chief', ar: 'الأمين العام ورئيس تحرير المجلة' },
    institution: { en: 'King Khalid University Hospital, Riyadh', ar: 'مستشفى الملك خالد الجامعي، الرياض' },
    specialty: { en: 'Acute Coronary Syndromes & Outcomes', ar: 'متلازمات الشريان التاجي الحادة' },
  },
  {
    name: { en: 'Dr. Reem Al-Malki, MD, FESC', ar: 'د. ريم المالكي' },
    role: { en: 'Chair, National CPR Committee (NCPR)', ar: 'رئيسة اللجنة الوطنية للإنعاش القلبي' },
    institution: { en: 'King Abdulaziz Medical City, Riyadh', ar: 'مدينة الملك عبدالعزيز الطبية، الرياض' },
    specialty: { en: 'Critical Care Cardiology & Resuscitation', ar: 'العناية القلبية الحرجة والإنعاش' },
  },
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'fellow',
    name: { en: 'Active Consultant Fellow', ar: 'زميل استشاري عامل' },
    annualFeeSar: 500,
    eligibility: { en: 'Board-certified cardiologists & cardiac surgeons practicing in KSA', ar: 'استشاريو أمراض وجراحة القلب المرخصون في المملكة' },
    benefits: [
      { en: 'Full voting rights in SHA General Assembly & Working Groups', ar: 'حق التصويت الكامل في الجمعية العمومية والمجموعات العلمية' },
      { en: 'Complimentary registration priority for SHA37 Annual Congress', ar: 'أولوية وخصم التسجيل في المؤتمر السنوي SHA37' },
      { en: 'Access to SHA Research Grant funding & JSHA fast-track review', ar: 'التقديم على منح الأبحاث العلمية والنشر السريع في JSHA' },
    ],
  },
  {
    id: 'associate',
    name: { en: 'Associate & Fellow-in-Training', ar: 'عضو مشارك وطبيب زمالة' },
    annualFeeSar: 250,
    eligibility: { en: 'Cardiology fellows, internal medicine residents & specialist physicians', ar: 'أطباء الزمالة والمقيمون والأطباء الأخصائيون' },
    benefits: [
      { en: 'Complimentary access to monthly virtual ECG & Cath case webinars', ar: 'حضور مجاني للندوات الشهرية لتخطيط القلب والقسطرة' },
      { en: 'Eligibility for Young Investigators Travel Grants & Quiz Teams', ar: 'التأهل لمنح الباحثين الشباب ومسابقات الزمالة' },
      { en: '25% fee reduction across NCPR ACLS & PALS instructor tracks', ar: 'خصم ٢٥٪ على مسارات مدربي دعم الحياة المتقدم' },
    ],
  },
  {
    id: 'allied',
    name: { en: 'Allied Cardiac Health Member', ar: 'عضو التمريض والمهن الصحية المساندة' },
    annualFeeSar: 150,
    eligibility: { en: 'Cardiac nurses, perfusionists, echocardiographers & pharmacists', ar: 'تمريض القلب وفنيو القسطرة والأشعة والصيدلة السريرية' },
    benefits: [
      { en: 'Full access to Allied Health Working Group workshops & guidelines', ar: 'الوصول الكامل لورش عمل وأدلة المهن القلبية المساندة' },
      { en: 'SCFHS-accredited continuing education credit tracking', ar: 'تتبع ساعات التعليم الطبي المستمر المعتمدة من الهيئة' },
      { en: 'Reduced SHA37 Congress Allied Health delegate pass', ar: 'تذكرة مخفضة لحضور المؤتمر السنوي SHA37' },
    ],
  },
];

export const PATIENT_GUIDES: PatientGuide[] = [
  {
    id: 'pg-bp',
    topic: { en: 'Blood Pressure', ar: 'ضغط الدم' },
    readingTime: '4 min read',
    title: { en: 'Understanding Hypertension & Home Blood Pressure Monitoring', ar: 'فهم ارتفاع ضغط الدم وقياسه المنزلي الصحيح' },
    summary: {
      en: 'Practical steps for accurate morning and evening cuff readings, sodium moderation in Saudi cuisine, and medication consistency.',
      ar: 'خطوات عملية للقياس المنزلي الدقيق صباحاً ومساءً وتقليل الصوديوم والالتزام بالعلاج.',
    },
    keySteps: [
      { en: 'Rest quietly seated for 5 minutes with back supported and arm at heart level before measuring.', ar: 'الجلوس بهدوء لمدة ٥ دقائق مع إسناد الظهر والذراع بمستوى القلب قبل القياس.' },
      { en: 'Avoid caffeine, Arabic coffee, or smoking for 30 minutes prior to any home reading.', ar: 'تجنب القهوة والكافيين والتدخين قبل القياس بـ ٣٠ دقيقة.' },
      { en: 'Keep a 7-day log ahead of your cardiology clinic visit rather than relying on a single reading.', ar: 'تسجيل القراءات لمدة ٧ أيام متتالية لمشاركتها مع طبيب القلب.' },
    ],
  },
  {
    id: 'pg-cpr',
    topic: { en: 'Emergency Readiness', ar: 'الاستعداد للطوارئ' },
    readingTime: '3 min read',
    title: { en: 'Recognizing Heart Attack Symptoms & Calling 997 Immediately', ar: 'التعرف على أعراض الجلطة القلبية والاتصال الفوري بـ ٩٩٧' },
    summary: {
      en: 'Every minute of delay increases myocardial damage. Learn the red-flag signs and why ambulance dispatch outperforms private transport.',
      ar: 'كل دقيقة تأخير تؤثر على عضلة القلب؛ تعرف على العلامات التحذيرية وأهمية الإسعاف الفوري.',
    },
    keySteps: [
      { en: 'Central chest pressure, tightness, or burning lasting over 10 minutes—or radiating to jaw, shoulder, or back—requires urgent emergency care.', ar: 'ألم أو ضغط في منتصف الصدر يستمر أكثر من ١٠ دقائق أو يمتد للكتف أو الفك يستدعي الطوارئ فوراً.' },
      { en: 'Dial 997 (Saudi Red Crescent) immediately; paramedics perform 12-lead ECGs en route and pre-activate cardiac cath labs.', ar: 'اتصل على ٩٩٧ فوراً لتفعيل مسار القسطرة القلبية السريع قبل الوصول للمستشفى.' },
      { en: 'Never drive yourself to the emergency department during suspected acute chest pain.', ar: 'لا تقُد السيارة بنفسك أبداً عند الاشتباه بألم صدري حاد.' },
    ],
  },
  {
    id: 'pg-pci',
    topic: { en: 'Post-Procedure Recovery', ar: 'التعافي بعد القسطرة' },
    readingTime: '5 min read',
    title: { en: 'Life After Coronary Stenting: Dual Antiplatelet Adherence & Exercise', ar: 'الحياة بعد دعامات القلب: الالتزام بمميعات الصفيحات والنشاط البدني' },
    summary: {
      en: 'Essential guidance on never interrupting prescribed antiplatelet medication without cardiologist clearance and pacing structured walking.',
      ar: 'إرشادات حيوية حول عدم إيقاف مسيلات الصفيحات دون استشارة طبيب القلب والتدرج في المشي.',
    },
    keySteps: [
      { en: 'Never stop aspirin or your second antiplatelet agent (clopidogrel/ticagrelor) before dental or surgical procedures without your cardiologist approval.', ar: 'لا توقف الأسبرين أو الدواء الثاني المضاد للصفيحات قبل أي إجراء دون موافقة طبيب القلب.' },
      { en: 'Begin supervised cardiac rehabilitation or flat-surface walking at 10–15 minutes daily, advancing gradually.', ar: 'ابدأ برنامج التأهيل القلبي أو المشي المعتدل تدريجياً بإشراف طبي.' },
      { en: 'Monitor LDL cholesterol at 6–8 weeks post-discharge to confirm protective lipid targets are reached.', ar: 'افحص مستوى الكوليسترول الضار بعد ٦ إلى ٨ أسابيع للتأكد من تحقيق الهدف الوقائي.' },
    ],
  },
];
