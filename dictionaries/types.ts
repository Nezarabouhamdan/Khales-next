import type { ProjectCategory } from "@/data/projects";
import type { ServiceCategory } from "@/data/services";

export type NavLink = { label: string; href: string };

export type NavigationDict = {
  items: NavLink[];
  ctaButton: string;
  faqLabel: string;
  privacyLabel: string;
  termsLabel: string;
};

export type FooterLinkDict = { text: string; href: string };

export type FooterDict = {
  description: string;
  servicesTitle: string;
  servicesLinks: FooterLinkDict[];
  companyTitle: string;
  companyLinks: FooterLinkDict[];
  contactTitle: string;
  email: string;
  phone: string;
  copyright: string;
  legal: {
    rights: string;
    terms: FooterLinkDict;
    privacy: FooterLinkDict;
  };
};

export type AboutSubsection = { title: string; text: string };

export type AboutOverviewDict = {
  title: string;
  subtitle: string;
  intro: string;
  subsections: AboutSubsection[];
  buttonText: string;
  buttonLink: string;
};

export type AboutMissionVisionDict = {
  mission: { title: string; description: string; tags: string[] };
  vision: { title: string; description: string; tags: string[] };
};

export type AboutMessageDict = {
  department: string;
  date: string;
  firstParagraph: string;
  quoteText: string;
  thirdParagraph: string;
  authorName: string;
  authorTitle: string;
};

export type AboutHeroDict = {
  eyebrow: string;
  headingLines: string[];
  intro: string;
  stats: string[];
  marqueeItems: string[];
  heroImageAlt: string;
  detailImageAlt: string;
};

export type AboutMilestoneItem = { year: string; text: string };

export type AboutMilestonesDict = {
  eyebrow: string;
  title: string;
  items: AboutMilestoneItem[];
  scrollHint: string;
};

export type AboutProcessStep = { index: string; title: string; body: string };

export type AboutProcessDict = {
  eyebrow: string;
  title: string;
  steps: AboutProcessStep[];
};

export type AboutSpotlightDict = {
  eyebrow: string;
  heading: string;
  imageAlt: string;
};

export type AboutPhilosophyDict = {
  quote: string;
  attribution: string;
};

export type AboutStatItem = { value: string; label: string };

export type AboutStatsFlipDict = {
  eyebrow: string;
  title: string;
  stats: AboutStatItem[];
};

export type AboutTeamGridDict = {
  headingLines: string[];
  description: string;
  memberLabel: string;
};

export type AboutPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbHome: string;
  breadcrumbAbout: string;
  overview: AboutOverviewDict;
  missionVision: AboutMissionVisionDict;
  message: AboutMessageDict;
  hero: AboutHeroDict;
  milestones: AboutMilestonesDict;
  process: AboutProcessDict;
  spotlight: AboutSpotlightDict;
  philosophy: AboutPhilosophyDict;
  statsFlip: AboutStatsFlipDict;
  teamGrid: AboutTeamGridDict;
};

export type CalcPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  schemaName: string;
  schemaDescription: string;
  title: string;
  subtitle: string;
};

export type CalculatorDict = {
  introTitle: string;
  introDescription: string;
  detailedModeTitle: string;
  detailedModeDescription: string;
  quickModeTitle: string;
  quickModeDescription: string;
  detailedTitle: string;
  detailedDescription: string;
  basicProperties: string;
  location: string;
  architecturalStyle: string;
  finishingLevel: string;
  roomsAndSpaces: string;
  addonsAndFacilities: string;
  luxuryAddons: string;
  parking: string;
  quickTitle: string;
  quickDescription: string;
  projectDetails: string;
  totalBUA: string;
  areaUnit: string;
  units: { m2: string; sqft: string };
  resultsTitle: string;
  resultsDescription: string;
  totalBUAResult: string;
  totalBUAResultSqft: string;
  totalCostResult: string;
  extraAreaSectionTitle: string;
  extraAreaLabel: string;
  costBreakdownTitle: string;
  back: string;
  next: string;
  showResult: string;
  startOver: string;
  bookConsultation: string;
  downloadPdf: string;
  downloadFreePdf: string;
  generating: string;
  modalTitle: string;
  modalDescription: string;
  emailLabel: string;
  phoneLabel: string;
  proceedAndDownload: string;
  submitting: string;
  fillAllFields: string;
  invalidEmail: string;
  feedbackTitle: string;
  feedbackSubtitle: string;
  feedbackTooLow: string;
  feedbackJustRight: string;
  feedbackTooHigh: string;
  feedbackCommentPlaceholder: string;
  feedbackSubmit: string;
  feedbackThankYou: string;
  feedbackThankYouSub: string;
  feedbackSubmitting: string;
  locations: Record<
    | "abu_dhabi"
    | "dubai"
    | "sharjah"
    | "ajman"
    | "umm_al_quwain"
    | "ras_al_khaimah"
    | "fujairah"
    | "al_ain",
    string
  >;
  styles: Record<"modern" | "neoclassic" | "heritage", string>;
  finishings: Record<"standard" | "medium" | "high", string>;
  roomNames: Record<
    "bedroom" | "majlis" | "living" | "kitchen" | "dining" | "guest_bedroom",
    string
  >;
  otherRoomNames: Record<
    "maid_room" | "staircase_room" | "storage_room" | "prep_kitchen" | "driver_room",
    string
  >;
  fixedAddonNames: Record<"pool" | "office" | "elevator" | "cinema" | "gym", string>;
  addBathroom: string;
  addDressingRoom: string;
  widthLabel: string;
  lengthLabel: string;
  basement: string;
  itemTranslations: Record<
    | "preparatory"
    | "excavation_substructure"
    | "superstructure"
    | "blockwork"
    | "waterproofing"
    | "main_finishing"
    | "carpentry"
    | "aluminum_glass"
    | "electrical"
    | "hvac"
    | "plumbing"
    | "external_works"
    | "contingencies"
    | "consultant_fees"
    | "fixed_addons_cost",
    string
  >;
};

export type ContactSplitSectionDict = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  email: string;
  phone: string;
  phoneHref: string;
  socialInstagram: string;
  socialPinterest: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    projectTypeLabel: string;
    projectTypes: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    errorMessage: string;
  };
  success: {
    heading: string;
    message: string;
    resetButton: string;
  };
};

export type ContactTestimonialItem = { quote: string; role: string };

export type ContactTestimonialsSectionDict = {
  eyebrow: string;
  heading: string;
  items: ContactTestimonialItem[];
};

export type ContactBeforeAfterSectionDict = {
  eyebrow: string;
  heading: string;
  beforeLabel: string;
  afterLabel: string;
};

export type ContactOffice = { city: string; address: string; lat: string; lon: string };

export type ContactLocationsSectionDict = {
  heading: string;
  subheading: string;
  latLabel: string;
  lonLabel: string;
  offices: ContactOffice[];
};

export type ContactOrbitMethod = { label: string; href: string; icon: string };

export type ContactOrbitSectionDict = {
  eyebrow: string;
  heading: string;
  centerLabel: string;
  centerText: string;
  methods: ContactOrbitMethod[];
};

export type ContactFAQItem = { q: string; a: string };

export type ContactFAQSectionDict = {
  eyebrow: string;
  heading: string;
  items: ContactFAQItem[];
};

export type ContactPageDict = {
  split: ContactSplitSectionDict;
  testimonials: ContactTestimonialsSectionDict;
  beforeAfter: ContactBeforeAfterSectionDict;
  locations: ContactLocationsSectionDict;
  orbit: ContactOrbitSectionDict;
  faq: ContactFAQSectionDict;
};

export type ProjectsIndexDict = {
  eyebrow: string;
  title: string;
  tabLabels: Record<ProjectCategory | "ALL", string>;
};

export type ProjectsCinematicReelDict = {
  scrollLabel: string;
};

export type ProjectsCapabilityItemDict = { index: string; title: string; body: string };
export type ProjectsCapabilityStatDict = { value: string; label: string };

export type ProjectsCapabilitiesDict = {
  eyebrow: string;
  title: string;
  capabilities: ProjectsCapabilityItemDict[];
  stats: ProjectsCapabilityStatDict[];
};

export type ProjectsMaterialItemDict = { name: string };

export type ProjectsMaterialsDict = {
  eyebrow: string;
  title: string;
  materials: ProjectsMaterialItemDict[];
};

export type ProjectsNetworkDict = {
  eyebrow: string;
  statsTemplate: string;
  projectSingular: string;
  projectPlural: string;
};

export type ProjectDetailDict = {
  projectBriefLabel: string;
  galleryViewLabel: string;
  nextProjectLabel: string;
  keyFeaturesLabel: string;
};

export type ProjectsPageDict = {
  index: ProjectsIndexDict;
  cinematicReel: ProjectsCinematicReelDict;
  capabilities: ProjectsCapabilitiesDict;
  materials: ProjectsMaterialsDict;
  network: ProjectsNetworkDict;
  detail: ProjectDetailDict;
};

export type HeroProjectDict = { location: string; status: string; title: string; size: string };
export type HeroFaceProjectDict = { title: string; location: string; status: string; size: string };

export type HeroSequenceDict = {
  projects: HeroProjectDict[];
  faceProjects: HeroFaceProjectDict[];
  craftingLine1: string;
  craftingLine2: string;
  craftingLine3: string;
  finalHeadline: string;
};

export type WorldwidePinDict = { name: string };

export type WorldwideSectionDict = {
  topParagraph: string;
  brandName: string;
  headline: string;
  statNumber: string;
  statDescription: string;
  latLabel: string;
  lonLabel: string;
  pins: WorldwidePinDict[];
};

export type InteriorShowcaseSectionDict = {
  imageAlt: string;
};

export type AboutTeamSectionDict = {
  imageAlt: string;
  kicker: string;
  moreLabel: string;
  aboutUsLabel: string;
  lineOne: string;
  lineTwo: string;
  teamLabel: string;
  viewAllLabel: string;
};

export type TeamGridSectionDict = {
  teamLabel: string;
  viewAllLabel: string;
  memberLabel: string;
};

export type ProjectsSectionDict = {
  tabs: Record<ProjectCategory, string>;
  viewAllProjectsLabel: string;
};

export type ServicesSectionDict = {
  eyebrow: string;
  title: string;
  tabs: Record<ServiceCategory, string>;
  viewAllServicesLabel: string;
};

export type ServicesIndexDict = {
  eyebrow: string;
  title: string;
  intro: string;
  tabLabels: Record<ServiceCategory | "ALL", string>;
  learnMoreLabel: string;
};

export type ServiceDetailDict = {
  serviceBriefLabel: string;
  keyFeaturesLabel: string;
  processLabel: string;
  faqLabel: string;
  galleryViewLabel: string;
  nextServiceLabel: string;
};

export type ServicesPageDict = {
  index: ServicesIndexDict;
  detail: ServiceDetailDict;
};

export type HomePageDict = {
  hero: HeroSequenceDict;
  worldwide: WorldwideSectionDict;
  interiorShowcase: InteriorShowcaseSectionDict;
  aboutTeam: AboutTeamSectionDict;
  teamGrid: TeamGridSectionDict;
  projectsSection: ProjectsSectionDict;
  servicesSection: ServicesSectionDict;
};

export type SharedCtaDict = {
  talkLabel: string;
  headingLine1: string;
  headingLine2: string;
  phoneLabel: string;
  phoneWhatsappNote: string;
  phone: string;
  phoneHref: string;
  emailLabel: string;
  email: string;
};

export type SharedDict = {
  cta: SharedCtaDict;
};

export type BlogsPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  eyebrow: string;
  title: string;
  subtitle: string;
  categoryAllLabel: string;
  readTimeLabel: string; // contains "{n}"
  featuredLabel: string;
  latestLabel: string;
  backToBlog: string;
  publishedLabel: string;
  nextArticleLabel: string;
};

export type MediaCenterPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  eyebrow: string;
  title: string;
  subtitle: string;
  liveLabel: string;
  statReelsLabel: string;
  statCategoriesLabel: string;
  categoryLabels: Record<"All" | "Design" | "Architecture" | "Construction" | "Development" | "Sales", string>;
};

// Ported faithfully from Khales-next's real recruiting flow: a single-role
// (Executive Assistant) 9-question candidate survey submitted via
// WhatsApp + a CRM lead, not a generic multi-job listing form.
export type ApplicationsPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  schemaName: string;
  schemaDescription: string;
  eyebrow: string;
  hiringBadge: string;
  valuesMarquee: string[];
  title: string;
  subtitle: string;
  position: string;
  positionPlaceholder: string;
  totalExperience: string;
  totalExperiencePlaceholder: string;
  availability: string;
  availabilityOptions: Record<"immediately" | "lessThan15Days" | "oneMonth" | "moreThanOneMonth", string>;
  aiKnowledge: string;
  aiKnowledgeOptions: Record<"expert" | "advanced" | "intermediate" | "beginner" | "none", string>;
  expectedSalary: string;
  expectedSalaryPlaceholder: string;
  maritalStatus: string;
  maritalStatusOptions: Record<"single" | "married" | "divorced" | "widowed", string>;
  currentResidence: string;
  district: string;
  districtPlaceholder: string;
  city: string;
  cityPlaceholder: string;
  nationality: string;
  nationalityPlaceholder: string;
  arabicLevel: string;
  arabicLevelOptions: Record<"native" | "fluent" | "proficient" | "basic" | "none", string>;
  submitWhatsApp: string;
  clear: string;
  successMessage: string;
  errorMessage: string;
  submitting: string;
  requiredField: string;
};

// The companion (unlinked, standalone) 12-question knowledge quiz at /exam -
// same real recruiting funnel, also ported from Khales-next.
export type ExamQuestion = {
  id: number;
  category: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
};

export type ExamPageDict = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  questionLabel: string;
  of: string;
  next: string;
  submit: string;
  resultTitle: string;
  resultSubtitle: string;
  yourScore: string;
  sendResults: string;
  messages: { perfect: string; excellent: string; good: string; fair: string };
  questions: ExamQuestion[];
};

export type LegalSection = {
  heading: string;
  content: string;
  list?: string[];
  extra?: string;
  contactDetails?: string[];
};

export type LegalPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export type FaqGroup = {
  heading: string;
  items: ContactFAQItem[];
};

export type FaqPageDict = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  groups: FaqGroup[];
};

export type Dictionary = {
  navigation: NavigationDict;
  footer: FooterDict;
  aboutUsPage: AboutPageDict;
  calcPage: CalcPageDict;
  calculator: CalculatorDict;
  contactPage: ContactPageDict;
  projectsPage: ProjectsPageDict;
  servicesPage: ServicesPageDict;
  homePage: HomePageDict;
  shared: SharedDict;
  blogsPage: BlogsPageDict;
  mediaCenterPage: MediaCenterPageDict;
  examPage: ExamPageDict;
  applicationsPage: ApplicationsPageDict;
  privacyPolicyPage: LegalPageDict;
  termsPage: LegalPageDict;
  faqPage: FaqPageDict;
};
