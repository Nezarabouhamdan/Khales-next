import type { ProjectCategory } from "@/data/projects";
import type { CityId } from "@/data/calculatorMarkets";
import type { ArchitecturalStyle, ExtraRoomId, OtherRoomId, RoomId } from "@/data/villaCalculator";
import type { EstimateInputError, ReadinessItemId } from "@/lib/calculator/engine";
import type { HandoffTemplates, RequestValidationError } from "@/lib/calculator/request";
import type {
  AreaUnit,
  Confidence,
  CountryCode,
  CurrencyCode,
  FinishTier,
  FloorsOption,
  InputMode,
  LandStatus,
  MarketMode,
  PreferredContact,
  ReviewGoal,
  SpecialItemId,
  StartTiming,
  VatMode,
} from "@/lib/calculator/types";

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

// Calculator v2 copy. Placeholders in {braces} are filled with
// fillTemplate() from lib/calculator/format.ts.
export type CalculatorDict = {
  // ---- Start screen ----
  introTitle: string; // spec headline: "A home that brings you together, and a budget you know from the start."
  introDescription: string;
  usageStatLabel: string; // contains "{n}"
  paths: Record<InputMode, { title: string; description: string }>;
  start: string; // call to action on each path card

  // ---- Shared navigation / small words ----
  back: string;
  next: string;
  showResult: string;
  startOver: string;
  editInputs: string;
  optional: string; // "(optional)"
  yes: string;
  no: string;

  // ---- Shared inputs ----
  countryLabel: string;
  countryPartnerBadge: string; // under Oman / Kuwait / Bahrain: no published number, partner estimate
  cityLabel: string;
  cityPlaceholder: string; // empty option of the city <select>
  countries: Record<CountryCode, string>;
  cities: Record<CityId, string>;
  currencies: Record<CurrencyCode, string>; // short label shown next to amounts
  landStatusLabel: string;
  landStatuses: Record<LandStatus, string>;
  areaLabel: string;
  areaHint: string;
  unitLabel: string;
  units: Record<AreaUnit, string>; // long names for the unit picker
  unitSymbols: Record<AreaUnit, string>; // "m²" / "sqft"
  budgetLabel: string; // contains "{currency}"
  budgetHint: string;
  tierLabel: string;
  tiers: Record<FinishTier, { name: string; description: string }>;
  houseTypeLabel: string;
  houseTypeFamilyVilla: string; // the only house type in v1
  floorsLabel: string;
  floors: Record<FloorsOption, string>;
  specialItemsLabel: string;
  specialItemsHint: string;
  specialItems: Record<SpecialItemId, string>;
  inputErrors: Record<EstimateInputError, string>;
  areaFormTitle: string;
  areaFormDescription: string;
  budgetFormTitle: string;
  budgetFormDescription: string;

  // ---- Result ----
  resultAreaTitle: string;
  resultBudgetTitle: string;
  disclaimer: string; // mandatory on every result, PDF and card page
  scopeTag: string; // "Building only · VAT per country · not a contractor quote"
  rangeLabel: string;
  planningFigureLabel: string;
  planningFigureNote: string;
  areaUsedLabel: string;
  budgetUsedLabel: string;
  budgetAreas: Record<"conservative" | "reference" | "maximum", { label: string; hint: string }>;
  budgetAreaNote: string;
  tagLabels: { country: string; currency: string; tier: string; anchorDate: string; confidence: string };
  confidenceLevels: Record<Confidence, string>;
  // {city} = selected city, {reference} = city the numbers come from
  marketModeNotes: Record<Exclude<MarketMode, "partner_review">, string>;
  unusualSizeNote: string;
  specialItemsSelectedNote: string; // contains "{items}"
  vatLabel: string;
  vatModes: Record<VatMode, string>;
  exclusionsTitle: string;
  exclusions: string[];
  driversTitle: string;
  drivers: string[];
  referenceLabel: string;
  referencePending: string;
  estimateDateLabel: string;

  // ---- Markets without a published number (Oman, Kuwait, Bahrain) ----
  partnerReviewTitle: string;
  partnerReviewBody: string;
  partnerReviewWhy: string;

  // ---- Planning checklist (never a verdict like "not ready") ----
  readinessTitle: string;
  readinessSubtitle: string;
  readiness: Record<ReadinessItemId, { question: string; tip: string }>;
  readinessAllSet: string;

  // ---- Next steps ----
  nextStepsTitle: string;
  ctaDesign: { title: string; description: string };
  ctaReview: { title: string; description: string };
  ctaShare: { title: string; description: string };
  shareCardButton: string;
  downloadCardButton: string;
  downloadPdfButton: string;
  generating: string;
  shareText: string; // contains "{reference}"
  shareCard: {
    brand: string;
    title: string;
    locationLabel: string;
    areaLabel: string;
    budgetLabel: string;
    tierLabel: string;
    rangeLabel: string;
    planningLabel: string;
    areaRangeLabel: string;
    dateLabel: string;
    referenceLabel: string;
    footer: string;
  };

  // ---- Service requests ----
  requestDesignTitle: string;
  requestDesignIntro: string;
  requestReviewTitle: string;
  requestReviewIntro: string;
  requestSummaryTitle: string;
  startTimingLabel: string;
  startTimings: Record<StartTiming, string>;
  hasPlanOrQuoteLabel: string;
  reviewGoalLabel: string;
  reviewGoals: Record<ReviewGoal, string>;
  quoteViaWhatsappNote: string;
  preferredContactLabel: string;
  preferredContacts: Record<PreferredContact, string>;
  firstNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  phoneHint: string;
  contactConsentLabel: string;
  marketingConsentLabel: string;
  submitRequest: string;
  submitting: string;
  requestErrors: Record<RequestValidationError | "generic", string>;
  requestSuccessTitle: string;
  requestSuccessWhatsapp: string;
  requestSuccessEmail: string;
  openWhatsapp: string;
  openEmail: string;
  whatsappNotSentNote: string;
  backToEstimate: string;
  handoff: HandoffTemplates & { emailSubject: string }; // emailSubject contains "{reference}"

  // ---- Family home plan ----
  familyPlanTitle: string;
  familyPlanDescription: string;
  familySteps: { basics: string; rooms: string; spaces: string; special: string };
  architecturalStyle: string;
  styles: Record<ArchitecturalStyle, string>;
  roomNames: Record<RoomId, string>;
  otherRoomNames: Record<OtherRoomId, string>;
  extraRoomNames: Record<ExtraRoomId, string>;
  servicesLabel: string;
  extraRoomsLabel: string;
  extraRoomsHint: string;
  addBathroom: string;
  addDressingRoom: string;
  familyRoomsWithBath: string; // family summary, contains "{n}"
  familyRoomsWithDressing: string; // family summary, contains "{n}"
  widthLabel: string;
  lengthLabel: string;
  parking: string;
  familySummaryTitle: string;
  familySummaryDescription: string;
  programTitle: string;
  indicativeAreaLabel: string;
  indicativeAreaNote: string;
  noCostNote: string;
  checkCostForArea: string; // contains "{area}"

  // ---- No-JavaScript fallback ----
  noscript: {
    title: string;
    body: string;
    tableCaption: string; // contains "{date}"
    perSqm: string;
    market: string;
    partnerReview: string;
    contact: string;
  };
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
  locations: Array<{ name: string; count: number }>;
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

export type HeroProjectDict = { location: string; status: string; title: string };
export type HeroFaceProjectDict = { title: string; location: string; status: string; size: string };

export type HeroSequenceDict = {
  projects: HeroProjectDict[];
  exploreProjectsLabel: string;
  faceProjects: HeroFaceProjectDict[];
  craftingLine1: string;
  craftingLine2: string;
  craftingLine3: string;
  craftingLine4: string;
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
  viewAllServicesLabel: string;
};

export type ServicesIndexDict = {
  eyebrow: string;
  title: string;
  intro: string;
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
