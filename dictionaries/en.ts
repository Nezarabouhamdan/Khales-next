import type { Dictionary } from "./types";

export const dictionary: Dictionary = {
  navigation: {
    items: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Explore Projects", href: "/projects" },
      { label: "Estimate Villa Cost", href: "/calculator" },
      { label: "About us", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Media Center", href: "/media-center" },
      { label: "Careers", href: "/applications" },
      { label: "Contact us", href: "/contact" },
    ],
    ctaButton: "Book Consultation",
  },

  footer: {
    description:
      "Khales Group, your trusted partner in project management and engineering consultancy across the UAE.",
    servicesTitle: "Our Services",
    servicesLinks: [
      { text: "Project Management", href: "/contact" },
      { text: "Engineering Consultancy", href: "/contact" },
    ],
    companyTitle: "Company",
    companyLinks: [
      { text: "About", href: "/about" },
      { text: "Journal", href: "/blog" },
      { text: "Media Center", href: "/media-center" },
      { text: "Careers", href: "/applications" },
      { text: "Contact us", href: "/contact" },
      { text: "Estimate Villa Cost", href: "/calculator" },
    ],
    contactTitle: "Contact us",
    email: "info@khales.ae",
    phone: "+971 55 129 9880",
    copyright: "Copyright © {year} KHALES",
    legal: {
      rights: "All Rights Reserved",
      terms: { text: "Terms and Conditions", href: "#" },
      privacy: { text: "Privacy Policy", href: "#" },
    },
  },

  aboutUsPage: {
    metaTitle: "About Khales - Premier Architecture & Interior Design Company Dubai",
    metaDescription:
      "Learn about Khales, Dubai's leading architecture and interior design company. With years of experience in luxury residential and commercial projects across the UAE, we deliver exceptional design solutions and project management services.",
    metaKeywords: [
      "about Khales Dubai",
      "architecture company Dubai",
      "interior design company UAE",
      "Dubai architects",
      "UAE interior designers",
      "luxury design company Dubai",
      "project management company UAE",
    ],
    schemaName: "About Khales",
    schemaDescription:
      "Learn about Khales, Dubai's leading architecture and interior design company.",
    breadcrumbHome: "Home",
    breadcrumbAbout: "About",

    overview: {
      title: "Khales Group",
      subtitle: "Orchestrating Landmark Projects",
      intro:
        "Khales Group is a premier project management and engineering consultancy firm dedicated to navigating the complexities of large-scale construction. Our expertise is proven across two distinct realms: the demanding world of major commercial developments and the nuanced creation of luxury residential properties.",
      subsections: [
        {
          title: "Mastery in Commercial Developments",
          text: "Our team delivers high-stakes commercial ventures like malls, hospitals, and hotels, ensuring these projects are completed on schedule, within budget, and to the highest standards.",
        },
        {
          title: "Engineering Excellence for Luxury Residences",
          text: "We apply rigorous engineering to the art of luxury living, ensuring the flawless execution of exclusive villas and residential buildings with unparalleled structural integrity and finish.",
        },
      ],
      buttonText: "Explore Our Portfolio",
      buttonLink: "/projects",
    },

    hero: {
      eyebrow: "About Khales",
      headingLines: ["We shape spaces", "people feel", "at home in."],
      intro:
        "An international architecture and interior design boutique, crafting iconic residences and landmark interiors across the Gulf, Europe and beyond.",
      stats: ["Est. 2010", "240+ Projects", "12 Countries"],
      marqueeItems: ["ARCHITECTURE", "INTERIORS", "BESPOKE DESIGN", "EST. 2010"],
      heroImageAlt: "A Khales-designed residence",
      detailImageAlt: "Detail from a Khales project",
    },
    milestones: {
      eyebrow: "Our history",
      title: "Sixteen years, one studio",
      items: [
        { year: "2010", text: "Studio founded in Moscow with a single residential commission." },
        { year: "2014", text: "First international project completed, opening the Dubai studio." },
        { year: "2018", text: "In-house joinery and bespoke furniture workshop established." },
        { year: "2021", text: "Interiors formalised as its own department, run alongside architecture." },
        { year: "2023", text: "Portfolio passes 200 delivered projects across five countries." },
        { year: "2026", text: "A London studio opens, extending the practice into Europe." },
      ],
      scrollHint: "Scroll to travel through time →",
    },
    process: {
      eyebrow: "How we work",
      title: "Four steps, one team, start to finish",
      steps: [
        {
          index: "01",
          title: "Discover",
          body: "We start on site - walking the plot, listening to how you want to live, and mapping the constraints that will shape the design.",
        },
        {
          index: "02",
          title: "Design",
          body: "Concepts are tested in volume and material before a single wall is drawn in detail, so the big decisions are made early and made well.",
        },
        {
          index: "03",
          title: "Detail",
          body: "Every junction, finish and fixture is resolved on paper first - the fewer decisions left to the site, the cleaner the result.",
        },
        {
          index: "04",
          title: "Deliver",
          body: "Our team stays involved through construction and installation, so the finished space matches the drawings, not just the mood board.",
        },
      ],
    },
    spotlight: {
      eyebrow: "Materials",
      heading: "Move your cursor to see what a space is really made of.",
      imageAlt: "Material detail from a Khales project",
    },
    philosophy: {
      quote:
        "Good architecture disappears into the way you live. You shouldn't notice the walls - only how well the light, the layout and the material work for you.",
      attribution: "— The Khales Studio",
    },
    statsFlip: {
      eyebrow: "By the numbers",
      title: "A studio that keeps score",
      stats: [
        { value: "40+", label: "Craftspeople partners" },
        { value: "98%", label: "Client referral rate" },
        { value: "1200+", label: "Site visits logged" },
      ],
    },
    teamGrid: {
      headingLines: ["The people behind", "the work"],
      description:
        "A studio of architects, interior designers and craftspeople working as one team on every project.",
      memberLabel: "Team Member",
    },
    missionVision: {
      mission: {
        title: "Our Mission",
        description:
          "To deliver innovative, sustainable, and results-driven project management and consultancy solutions. We aim to exceed client expectations by combining strategic planning with professional execution, ensuring each project is delivered on time and within budget.",
        tags: ["Strategic Planning", "Team Collaboration", "Innovation"],
      },
      vision: {
        title: "Our Vision",
        description:
          "To be the leading project management consultancy that consistently turns visionary ideas into sustainable and successful projects, while fostering long-term relationships with our clients through trust and excellence.",
        tags: ["Visionary Leadership", "Sustainable Growth", "Excellence"],
      },
    },

    message: {
      department: "A Message from our Chairman and CEO",
      date: "Company Vision Statement",
      firstParagraph:
        "Khales began with a simple mission: to design and deliver homes that reflect the values and heritage of the UAE. From our first projects in Fujairah and Sharjah to our main hub in Dubai, we have grown into a company that now builds not only villas but also commercial structures that shape the future of our cities.",
      quoteText:
        "Our strength lies in combining tradition with innovation — honoring the roots of our journey while embracing the opportunities ahead.",
      thirdParagraph:
        "With dedicated teams across consultancy, design, and project management, we deliver projects with precision, integrity, and a vision that looks beyond today’s needs. As we step forward, our commitment is clear: from the UAE to the global stage, Khales will continue to build spaces that endure, inspire, and stand as lasting symbols of progress.",
      authorName: "Majed AlKindi",
      authorTitle: "Chairman and CEO of Khales Group",
    },
  },

  calcPage: {
    metaTitle: "Villa Construction Cost Calculator UAE | Instant Estimate | Khales",
    metaDescription:
      "Use the interactive Khales villa cost calculator for a detailed, instant price estimate. Customize rooms, finishes, and luxury add-ons to plan your budget for construction in Dubai, Abu Dhabi, & the UAE.",
    metaKeywords: [
      "villa construction cost calculator",
      "cost to build a villa in UAE",
      "building cost estimator Dubai",
      "villa construction calculator Abu Dhabi",
      "house building cost Sharjah",
      "construction prices UAE",
      "contracting cost calculator",
      "villa finishing cost",
      "modern villa construction cost",
      "Khales project management",
      "engineering consultancy cost estimation",
    ],
    schemaName: "Villa Construction Cost Calculator UAE",
    schemaDescription:
      "Get an instant cost estimate for building a custom villa in the UAE. Our interactive calculator lets you select rooms, dimensions, finishes, and add-ons for a detailed price breakdown.",
    title: "Estimate Your Villa Cost",
    subtitle: "Use our calculator to get a preliminary budget for your dream villa.",
  },

  calculator: {
    introTitle: "Unlock Your Dream Home",
    introDescription:
      "Use our interactive cost calculator to get an instant estimate for your villa. Choose the method that suits you and start planning today.",
    detailedModeTitle: "Detailed Cost Calculation",
    detailedModeDescription:
      "Enter all the details yourself, from the number and dimensions of rooms to additional facilities, for an accurate estimate.",
    quickModeTitle: "Cost Calculation by Area",
    quickModeDescription:
      "Have a total area in mind? Enter it directly with the location and finishing type for a quick cost estimate.",
    detailedTitle: "Villa Construction Cost Calculator",
    detailedDescription: "Enter your project details to get an instant cost estimate.",
    basicProperties: "Basic Properties",
    location: "Location",
    architecturalStyle: "Architectural Style",
    finishingLevel: "Finishing Level",
    roomsAndSpaces: "Rooms & Spaces",
    addonsAndFacilities: "Add-ons & Facilities",
    luxuryAddons: "Luxury Add-ons",
    parking: "Parking",
    quickTitle: "Calculate Cost by Area",
    quickDescription: "Enter the total area, location, and finishing level for a quick estimate.",
    projectDetails: "Project Details",
    totalBUA: "Total Built-Up Area",
    areaUnit: "Area Unit",
    units: { m2: "Square Meters (m²)", sqft: "Square Feet (sqft)" },
    resultsTitle: "Here is the Cost Estimate for Your Project",
    resultsDescription:
      "This is a preliminary estimate based on your choices. Contact us for a detailed quotation.",
    totalBUAResult: "Total Built-Up Area (BUA)",
    totalBUAResultSqft: "Total Built-Up Area (sqft)",
    totalCostResult: "Estimated Total Cost",
    extraAreaSectionTitle: "Add a Safety Margin",
    extraAreaLabel: "Additional Area (m²)",
    costBreakdownTitle: "Cost Breakdown Summary",
    back: "Back",
    next: "Next",
    showResult: "Show Result",
    startOver: "Start Over",
    bookConsultation: "Book a Free Consultation",
    downloadPdf: "Download PDF",
    downloadFreePdf: "Download Free PDF",
    generating: "Generating...",
    modalTitle: "Get Your Full Report",
    modalDescription:
      "Enter your details to see the results and download the complete PDF estimation.",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    proceedAndDownload: "Show Results",
    submitting: "Processing...",
    fillAllFields: "Please fill in all fields.",
    invalidEmail: "Please enter a valid email address.",
    feedbackTitle: "How does this estimate feel to you?",
    feedbackSubtitle: "Your input helps us improve our calculator accuracy.",
    feedbackTooLow: "Too Low",
    feedbackJustRight: "Looks Right",
    feedbackTooHigh: "Too High",
    feedbackCommentPlaceholder: "Tell us more (optional)...",
    feedbackSubmit: "Send Feedback",
    feedbackThankYou: "Thank you for your feedback!",
    feedbackThankYouSub: "Your input helps us serve you better.",
    feedbackSubmitting: "Sending...",
    locations: {
      abu_dhabi: "Abu Dhabi",
      dubai: "Dubai",
      sharjah: "Sharjah",
      ajman: "Ajman",
      umm_al_quwain: "Umm Al Quwain",
      ras_al_khaimah: "Ras Al Khaimah",
      fujairah: "Fujairah",
      al_ain: "Al Ain",
    },
    styles: { modern: "Modern", neoclassic: "Neoclassic", heritage: "Classic" },
    finishings: { standard: "Standard", medium: "Medium", high: "High-End" },
    roomNames: {
      bedroom: "Bedrooms",
      majlis: "Majlis",
      living: "Living Rooms",
      kitchen: "Kitchen",
      dining: "Dining Room",
      guest_bedroom: "Guest Bedroom",
    },
    otherRoomNames: {
      maid_room: "Maid Room",
      staircase_room: "Staircase Room",
      storage_room: "Storage Room",
      prep_kitchen: "Prep Kitchen",
      driver_room: "Driver Room",
    },
    fixedAddonNames: {
      pool: "Pool",
      office: "Office",
      elevator: "Elevator",
      cinema: "Cinema",
      gym: "Gym",
    },
    addBathroom: "Add Bathroom",
    addDressingRoom: "Add Dressing Room",
    widthLabel: "Width (m)",
    lengthLabel: "Length (m)",
    basement: "Basement",
    itemTranslations: {
      preparatory: "Preparatory Works",
      excavation_substructure: "Excavation & Substructure",
      superstructure: "Superstructure Works",
      blockwork: "Blockwork",
      waterproofing: "Waterproofing",
      main_finishing: "Finishing Works",
      carpentry: "Carpentry Works",
      aluminum_glass: "Aluminum & Glass",
      electrical: "Electrical Works",
      hvac: "HVAC Works",
      plumbing: "Plumbing Works",
      external_works: "External Works",
      contingencies: "Contingencies",
      consultant_fees: "Consultant Fees",
      fixed_addons_cost: "Fixed Add-ons Cost",
    },
  },

  homePage: {
    hero: {
      projects: [
        { location: "Mirbah, UAE", status: "Newly Completed", title: "Mirbah Prime", size: "~18,000 sqft" },
        {
          location: "Al Khawaneej, Dubai",
          status: "Completed",
          title: "The Al Khawaneej Organic Villa",
          size: "14,500 sqft",
        },
      ],
      faceProjects: [
        { title: "Jebel Ali Hills Villa", location: "Jebel Ali Hills, Dubai", status: "Newly Completed", size: "7,200 sqft" },
        { title: "The Abu Dhabi Grand Palace", location: "Abu Dhabi, UAE", status: "Completed", size: "55,000 sqft" },
      ],
      craftingLine1: "Crafting",
      craftingLine2: "Iconic",
      craftingLine3: "Spaces",
      finalHeadline: "We design unique modern places",
    },
    worldwide: {
      topParagraph:
        "Everyday practice shows that further development of various forms of activity requires the definition and clarification of further practice various development various directions.",
      brandName: "Khales",
      headline: "Worldwide",
      statNumber: "240",
      statDescription: "Projects were implemented all around the world.",
      latLabel: "LAT",
      lonLabel: "LON",
      pins: [{ name: "LONDON" }, { name: "DUBAI" }, { name: "USA" }, { name: "TURKEY" }, { name: "SPAIN" }],
    },
    interiorShowcase: {
      imageAlt: "Interior",
    },
    aboutTeam: {
      imageAlt: "The Khales team at work",
      kicker: "Arch. /",
      moreLabel: "More",
      aboutUsLabel: "about us",
      lineOne: "Turning dreams",
      lineTwo: "Into reality",
      teamLabel: "TEAM",
      viewAllLabel: "VIEW ALL",
    },
    teamGrid: {
      teamLabel: "Team",
      viewAllLabel: "View all",
      memberLabel: "Team Member",
    },
    projectsSection: {
      tabs: {
        Residential: "Residential",
        Commercial: "Commercial",
        Luxury_Villas: "Luxury Villas",
        Interior_Design: "Interior Design",
      },
      viewAllProjectsLabel: "View All Projects",
    },
    servicesSection: {
      eyebrow: "What We Do",
      title: "Our Services",
      tabs: {
        ProjectManagement: "Project Management",
        EngineeringConsultancy: "Engineering Consultancy",
      },
      viewAllServicesLabel: "View All Services",
    },
  },

  shared: {
    cta: {
      talkLabel: "Let's Talk",
      headingLine1: "Wherever you are, we make",
      headingLine2: "your dreams come true",
      phoneLabel: "Phone",
      phoneWhatsappNote: "whatsapp",
      phone: "+971 55 129 9880",
      phoneHref: "+971551299880",
      emailLabel: "Email",
      email: "info@khales.ae",
    },
  },

  contactPage: {
    split: {
      eyebrow: "Contact",
      headingLine1: "Let's design",
      headingLine2: "your next chapter.",
      intro:
        "Tell us about your project and a member of the studio will get back to you within one working day.",
      email: "info@khales.ae",
      phone: "+971 55 129 9880",
      phoneHref: "+971551299880",
      socialInstagram: "Instagram",
      socialPinterest: "Pinterest",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your full name",
        emailLabel: "Email",
        emailPlaceholder: "you@email.com",
        phoneLabel: "Phone",
        phonePlaceholder: "+971 5X XXX XXXX",
        projectTypeLabel: "Project type",
        projectTypes: ["Residential", "Interiors", "Commercial", "Other"],
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your project, location and timeline",
        submitButton: "Send message",
        submitting: "Sending...",
        errorMessage: "Something went wrong sending your message. Please try again or reach us directly.",
      },
      success: {
        heading: "Message sent.",
        message:
          "Thank you for reaching out. A member of the Khales team will be in touch within one working day.",
        resetButton: "Send another message",
      },
    },
    testimonials: {
      eyebrow: "In their words",
      heading: "What it's like to work with us",
      items: [
        {
          quote:
            "They treated our home like it was the only project on their desk. Every material decision was explained, and nothing felt like a default choice.",
          role: "Private Client — Villa, Dubai",
        },
        {
          quote:
            "We handed them a difficult, narrow plot and got back a house that feels twice the size it is. The team stayed hands-on through the entire build.",
          role: "Private Client — Family Home, Delhi",
        },
        {
          quote:
            "What stood out was how architecture and interiors moved together as one plan, instead of being handed off between two different studios.",
          role: "Developer — Residential Estate, Amman",
        },
        {
          quote:
            "Responsive, precise, and honest about timelines from day one - which mattered more to us than any single render they showed us.",
          role: "Private Client — Penthouse, Moscow",
        },
      ],
    },
    beforeAfter: {
      eyebrow: "From idea to reality",
      heading: "Drag to compare",
      beforeLabel: "Before",
      afterLabel: "After",
    },
    locations: {
      heading: "Our studios",
      subheading: "Three cities, one team",
      latLabel: "LAT",
      lonLabel: "LON",
      offices: [
        { city: "Dubai", address: "Business Bay, Dubai, UAE", lat: "25.2048", lon: "55.2708" },
        { city: "Moscow", address: "Ostozhenka Street, Moscow, Russia", lat: "55.7558", lon: "37.6173" },
        { city: "London", address: "Mayfair, London, United Kingdom", lat: "51.5074", lon: "-0.1278" },
      ],
    },
    orbit: {
      eyebrow: "Other ways to reach us",
      heading: "Always within reach",
      centerLabel: "Khales",
      centerText: "Reach us any way you like",
      methods: [
        { label: "Email", href: "mailto:info@khales.ae", icon: "✉" },
        { label: "Phone", href: "tel:+971551299880", icon: "☎" },
        { label: "Instagram", href: "#", icon: "◎" },
        { label: "Pinterest", href: "#", icon: "◈" },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common questions",
      items: [
        {
          q: "How long does a typical project take?",
          a: "A full residence, from first sketch to final handover, usually runs 12-24 months depending on scale and location. A pure interior fit-out can be considerably faster.",
        },
        {
          q: "Do you work outside the UAE?",
          a: "Yes - our studio has delivered projects across Russia, Europe and South Asia. Our teams travel for site visits and can manage a project fully remotely between milestones.",
        },
        {
          q: "Can you handle architecture and interiors together?",
          a: "That's how we prefer to work. Keeping both disciplines under one roof means the material and spatial language stays consistent from the shell all the way to the furniture.",
        },
        {
          q: "What information do you need to send a proposal?",
          a: "A rough location, size and budget range, and a sense of how you'd like the space to feel is enough to start. We'll ask for more as the conversation develops.",
        },
        {
          q: "Do you offer virtual consultations?",
          a: "Yes - most first conversations happen over video call. We only need to be on site for surveys, key design reviews and construction milestones.",
        },
      ],
    },
  },

  projectsPage: {
    index: {
      eyebrow: "Our Work",
      title: "Projects",
      tabLabels: {
        ALL: "All",
        Luxury_Villas: "Luxury Villas",
        Residential: "Residential",
        Commercial: "Commercial",
        Interior_Design: "Interior Design",
      },
    },
    cinematicReel: {
      scrollLabel: "Scroll →",
    },
    capabilities: {
      eyebrow: "What we do",
      title: "Three disciplines, one studio",
      capabilities: [
        {
          index: "01",
          title: "Architecture",
          body: "New-build residences and landmark buildings, designed from the plot up - massing, structure and facade resolved as one idea.",
        },
        {
          index: "02",
          title: "Interiors",
          body: "Full interior fit-outs and furniture schemes for existing shells, built around a consistent material and lighting language.",
        },
        {
          index: "03",
          title: "Bespoke Design",
          body: "Custom joinery, fixtures and detailing produced with our own workshop partners so nothing is an off-the-shelf compromise.",
        },
      ],
      stats: [
        { value: "8+", label: "Projects delivered" },
        { value: "5", label: "Countries" },
        { value: "14", label: "Years of practice" },
      ],
    },
    materials: {
      eyebrow: "Palette",
      title: "Materials we build with",
      materials: [
        { name: "Statuario Marble" },
        { name: "White Oak" },
        { name: "Brushed Brass" },
        { name: "Honed Limestone" },
        { name: "Smoked Glass" },
      ],
    },
    network: {
      eyebrow: "Global network",
      statsTemplate: "{count} projects, {cities} cities",
      projectSingular: "project",
      projectPlural: "projects",
    },
    detail: {
      projectBriefLabel: "Project brief",
      galleryViewLabel: "view",
      nextProjectLabel: "Next project",
      keyFeaturesLabel: "Key features",
    },
  },

  servicesPage: {
    index: {
      eyebrow: "What We Do",
      title: "Services",
      intro:
        "From the first feasibility study to the final coat of paint, Khales manages every discipline a project needs under one roof - project management, engineering and interior craft.",
      tabLabels: {
        ALL: "All",
        ProjectManagement: "Project Management",
        EngineeringConsultancy: "Engineering Consultancy",
      },
      learnMoreLabel: "Learn more",
    },
    detail: {
      serviceBriefLabel: "Service brief",
      keyFeaturesLabel: "What's included",
      processLabel: "Our process",
      faqLabel: "Frequently asked questions",
      galleryViewLabel: "view",
      nextServiceLabel: "Next service",
    },
  },

  blogsPage: {
    metaTitle: "Journal | Khales — Insights on Architecture, Design & Building in the UAE",
    metaDescription:
      "Ideas, case studies and practical guidance from the Khales studio — construction costs, materials, engineering supervision and project management across the UAE.",
    metaKeywords: [
      "Khales blog",
      "architecture blog Dubai",
      "villa construction insights UAE",
      "interior design tips Dubai",
    ],
    eyebrow: "Journal",
    title: "Notes from the studio",
    subtitle: "Ideas, case studies and practical guidance on building well in the UAE.",
    categoryAllLabel: "All",
    readTimeLabel: "{n} min read",
    featuredLabel: "Featured",
    latestLabel: "Latest articles",
    backToBlog: "Back to Journal",
    publishedLabel: "Published",
    nextArticleLabel: "Next article",
  },

  mediaCenterPage: {
    metaTitle: "Media Center | Khales — Videos, Design Insights & Construction Milestones",
    metaDescription:
      "Explore Khales' latest projects, design insights, and construction milestones through our curated collection of videos.",
    metaKeywords: ["Khales media center", "Khales videos", "Khales project videos"],
    eyebrow: "Media Center",
    title: "Media Center",
    subtitle:
      "Explore our latest projects, design insights, and construction milestones through our curated collection of videos.",
    liveLabel: "Live archive",
    statReelsLabel: "Videos",
    statCategoriesLabel: "Categories",
    categoryLabels: {
      All: "All",
      Design: "Design",
      Architecture: "Architecture",
      Construction: "Construction",
      Development: "Development",
      Sales: "Sales",
    },
  },

  applicationsPage: {
    metaTitle: "Job Application | Candidate Survey | Khales Group",
    metaDescription:
      "Apply for open positions at Khales Group. Fill out our quick candidate survey for the Executive Assistant and other positions.",
    metaKeywords: [
      "job application khales",
      "executive assistant dubai",
      "careers khales group",
      "apply for job dubai",
      "khales careers",
    ],
    schemaName: "Khales Group Job Application",
    schemaDescription:
      "Submit your job application to Khales Group. Fill out the candidate quick survey to apply for open positions.",
    eyebrow: "Careers",
    hiringBadge: "Now hiring",
    valuesMarquee: [
      "Financial Auditing",
      "AI Usage",
      "Time Management",
      "Document Control",
      "Personal Assistance",
    ],
    title: "Candidate Survey",
    subtitle: "Candidate Quick Survey · Executive Assistant Position",
    position: "Position Applied For",
    positionPlaceholder: "e.g. Executive Assistant",
    totalExperience: "Total Years of Experience",
    totalExperiencePlaceholder: "e.g. 5 years",
    availability: "When can you join?",
    availabilityOptions: {
      immediately: "Immediately",
      lessThan15Days: "Less than 15 days",
      oneMonth: "1 month",
      moreThanOneMonth: "More than 1 month",
    },
    aiKnowledge: "AI Knowledge Level?",
    aiKnowledgeOptions: {
      expert: "Expert",
      advanced: "Advanced",
      intermediate: "Intermediate",
      beginner: "Beginner",
      none: "No experience",
    },
    expectedSalary: "Expected Monthly Salary (AED)",
    expectedSalaryPlaceholder: "e.g. 10000",
    maritalStatus: "Marital Status",
    maritalStatusOptions: {
      single: "Single",
      married: "Married",
      divorced: "Divorced",
      widowed: "Widowed",
    },
    currentResidence: "Current Residence",
    district: "Area / District",
    districtPlaceholder: "e.g. Marina",
    city: "City",
    cityPlaceholder: "e.g. Dubai",
    nationality: "Nationality",
    nationalityPlaceholder: "e.g. Egyptian",
    arabicLevel: "Do you speak Arabic?",
    arabicLevelOptions: {
      native: "Native",
      fluent: "Very Fluent",
      proficient: "Proficient",
      basic: "Basic",
      none: "No Arabic",
    },
    submitWhatsApp: "Send via WhatsApp",
    clear: "Clear",
    successMessage: "Your application has been submitted successfully! We will contact you soon.",
    errorMessage: "An error occurred. Please try again.",
    submitting: "Submitting...",
    requiredField: "This field is required",
  },

  examPage: {
    metaTitle: "Knowledge Assessment | Khales Group",
    metaDescription:
      "Test your professional skills in financial auditing, AI usage, time management, document control, and personal assistance.",
    title: "Knowledge Assessment",
    subtitle: "Answer all 12 questions to complete your application",
    questionLabel: "Question",
    of: "of",
    next: "Next Question",
    submit: "Submit & See Score",
    resultTitle: "Assessment Complete",
    resultSubtitle: "Thank you for completing the knowledge assessment.",
    yourScore: "Your Score",
    sendResults: "Send Results via WhatsApp",
    messages: {
      perfect: "Outstanding! A truly exceptional result.",
      excellent: "Excellent! You demonstrated strong professional knowledge.",
      good: "Good effort. Some areas could use further development.",
      fair: "Keep learning. Review the key topics and look to improve.",
    },
    questions: [
      {
        id: 1,
        category: "Financial Auditing",
        question:
          "While reviewing a Supplier Invoice before the CEO's approval, you notice that the total amount does not match the sum of the individual items by a small margin (100 AED). How do you act?",
        options: {
          A: "I approve the invoice as is because the difference is very small and not worth the delay.",
          B: "I manually correct the final number with a pen and send it for approval.",
          C: "I stop the approval immediately, contact the supplier to request a corrected invoice, and inform the accounting department.",
          D: "I send it to the CEO and verbally inform him of the error so he can decide.",
        },
      },
      {
        id: 2,
        category: "Financial Auditing",
        question:
          "The CEO asked you to review the monthly Petty Cash report. What are the essential steps you will take?",
        options: {
          A: "I only add up the numbers to ensure the final total is correct.",
          B: "I match each expense with the original receipt, ensure necessary signatures are present, and categorize expenses by department.",
          C: "I sign the report directly if it was prepared by the company's accountant.",
          D: "I ask the accountant to review it again instead of me.",
        },
      },
      {
        id: 3,
        category: "Financial Auditing",
        question:
          "You noticed a recurring monthly subscription payment for software the team hasn't used in 3 months. What do you do?",
        options: {
          A: "I ignore it because it's not my personal money.",
          B: "I cancel the subscription immediately without consulting anyone.",
          C: "I prepare a short report highlighting the financial waste and suggest to the CEO to cancel or replace it with a free alternative.",
          D: "I send an angry email to the IT department.",
        },
      },
      {
        id: 4,
        category: "AI Usage",
        question:
          "The CEO asked you to summarize a 50-page engineering report in 15 minutes before an important meeting. How do you use AI to accomplish this?",
        options: {
          A: "I read the report quickly and write down what I can remember.",
          B: "I upload the report to a tool like ChatGPT or Claude, and ask it to extract the main points and recommendations in bullet points.",
          C: "I tell the CEO there is not enough time and ask to postpone the meeting.",
          D: "I copy the first and last page and present them as a summary.",
        },
      },
      {
        id: 5,
        category: "AI Usage",
        question:
          "You need to draft a formal and firm email to a client who is late on payment, while maintaining a good relationship. How can AI help you?",
        options: {
          A: "I ask AI to write a legal threat email.",
          B: "I write the email myself and do not trust AI for sensitive correspondence.",
          C: 'I give AI the details (amount, delay period) and ask for a "Professional, Firm but Polite" draft, then review and edit before sending.',
          D: "I send a short WhatsApp message instead of an email.",
        },
      },
      {
        id: 6,
        category: "AI Usage",
        question:
          "You want to organize an Excel spreadsheet containing hundreds of unorganized contacts. How do you speed up the process?",
        options: {
          A: "I organize them manually name by name.",
          B: "I use built-in AI tools in Excel or ask ChatGPT to write a formula or macro to automatically clean and categorize the data.",
          C: "I delete incomplete data to reduce the size of the table.",
          D: "I ask an intern to do it.",
        },
      },
      {
        id: 7,
        category: "Time Management",
        question:
          "You have 4 tasks today: 1. Book a flight for the CEO (flight is tomorrow). 2. Prepare a presentation for next week's meeting. 3. Reply to routine client emails. 4. Review an urgent contract to be signed today. What is the correct order?",
        options: {
          A: "Presentation → Emails → Flight booking → Contract.",
          B: "Flight booking → Contract → Emails → Presentation.",
          C: "Contract → Flight booking → Presentation → Emails.",
          D: "I start with the easy tasks (Emails) to finish them quickly.",
        },
      },
      {
        id: 8,
        category: "Time Management",
        question:
          "The CEO is in a closed meeting and asked not to be disturbed. A VIP client arrives at the office demanding to see him immediately. How do you act?",
        options: {
          A: "I interrupt the meeting immediately because it's a VIP client.",
          B: "I tell the client the CEO is busy and ask him to leave.",
          C: "I welcome the client warmly, offer hospitality, and send a quick text to the CEO informing him of the client's presence so he can decide when to step out.",
          D: "I ignore the client until the CEO comes out.",
        },
      },
      {
        id: 9,
        category: "Document Control",
        question:
          "A large engineering project has been completed. What is the best way to archive the project files (plans, contracts, invoices)?",
        options: {
          A: "I put all files in one folder on the desktop named after the project.",
          B: "I print everything and put it in a physical file only.",
          C: "I create an organized digital folder structure (Contracts, Plans, Financials) on the Cloud, name files with dates and versions, and keep a physical copy of original contracts.",
          D: "I leave the files in employees' emails to refer back to when needed.",
        },
      },
      {
        id: 10,
        category: "Document Control",
        question:
          "The design engineer sent you Version 3 of an architectural plan. How do you save it to ensure it doesn't get mixed up with previous versions?",
        options: {
          A: "I delete old versions and keep only the new one to save space.",
          B: 'I save it as "Final Last Plan."',
          C: "I save it with a standard name including project name, file type, version number, and date (e.g. ProjectX_ArchPlan_V3_20231025).",
          D: 'I save it in the "Downloads" folder.',
        },
      },
      {
        id: 11,
        category: "Personal Assistance",
        question:
          "The CEO forgot to bring a gift for an important client he is meeting in two hours. How do you save the situation?",
        options: {
          A: "I tell him he made a mistake and should have remembered.",
          B: "I suggest he cancels the meeting.",
          C: "I immediately search for a nearby premium gift shop or order express delivery for a suitable gift (luxury chocolate or a branded pen) to arrive before the meeting.",
          D: "I give him anything from the office as a gift.",
        },
      },
      {
        id: 12,
        category: "Personal Assistance",
        question:
          "The CEO asked you to organize a business dinner for 5 people of different nationalities (Arabs, Europeans, Asians). What is the most important point when choosing the restaurant?",
        options: {
          A: "I choose my favorite restaurant.",
          B: "I choose the most expensive restaurant in the city.",
          C: "I ensure diverse food options (vegetarian, halal, gluten-free) to suit everyone, and choose a quiet place that allows comfortable discussion.",
          D: "I choose a fast-food restaurant to save time.",
        },
      },
    ],
  },
};

export default dictionary;
