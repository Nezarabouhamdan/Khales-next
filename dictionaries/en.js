// dictionaries/en.js

// ======================= THE FIX IS HERE =======================
// We must import the data before we can use it.
import { projectsData as allProjects } from "@/components/Property Page/ProjectData";
// ===============================================================

export const dictionary = {
  navigation: {
    items: [
      {
        label: "Home",
        isDropdown: true,
        children: [
          { label: "About Khales", path: "/About-Us" },
          { label: "Blogs", path: "/blog" },
        ],
      },
      {
        label: "Project Management",
        isDropdown: true,
        children: [
          {
            label: "360 Project Management",
            path: "/services/ProjectManagement",
          },
          { label: "Project Manager", path: "/services/ProjectManager" },
          {
            label: "Development Planning",
            path: "/services/development-planning",
          },
          { label: "Feasibility Study", path: "/services/Projectfeasability" },
        ],
      },
      {
        label: "Engineering Consultancy",
        isDropdown: true,
        children: [
          { label: "Engineering Design", path: "/services/EngineeringDesign" },
          {
            label: "Engineering Supervision",
            path: "/services/EngineeringSupervision",
          },
          { label: "Interior Designing", path: "/services/InteriorDesign" },
          { label: "Landscaping", path: "/services/LandscapingDesign" },
        ],
      },
      { label: "Connect", path: "/Contact", isDropdown: false },
    ],
    ctaButton: "Book Consultation",
    languageButton: "Language",
  },
  hero: {
    slides: [
      {
        title: "Premier Architecture & Interior Design in Dubai",
        subtitle: "Transforming visions into reality...",
        buttonText: "Get in Touch",
        buttonLink: "/Contact",
      },
      {
        title: "Innovative Engineering, Flawless Execution",
        subtitle: "Our expert team ensures every detail is perfect...",
        buttonText: "Explore Services",
        buttonLink: "/#services",
      },
      {
        title: "Your Vision, Our Commitment",
        subtitle: "Let's build something extraordinary together.",
        buttonText: "Book a Consultation",
        buttonLink: "/booking",
      },
    ],
  },
  about: {
    title: "Khales Group",
    paragraph: "At Khales Project Management, we turn ideas into reality...",
    button: "Learn More",
  },
  services: {
    header: {
      title: "Our Services",
      subtitle:
        "Transforming complex challenges into strategic opportunities...",
    },
    items: [
      {
        slug: "engineering-consultancy",
        title: "Engineering",
        highlight: "Consultancy",
        description:
          "Our engineering team supports each project with clear, code-compliant...",
        showcaseSubtitle: "Technical solutions...",
        features: [
          {
            title: "Structural Analysis",
            description: "Detailed engineering checks...",
          },
          { title: "Quality Assurance", description: "Technical reviews..." },
        ],
        linkText: "Explore Engineering Solutions",
      },
      {
        slug: "project-management",
        title: "Project",
        highlight: "Management",
        description:
          "Managing projects with a clear structure, defined responsibilities...",
        showcaseSubtitle: "Complete oversight...",
        features: [
          {
            title: "Resource Planning",
            description: "Efficient allocation...",
          },
          {
            title: "Risk Management",
            description: "Early detection of risks...",
          },
        ],
        linkText: "Discover Project Excellence",
      },
    ],
  },
  projects: {
    title: "Featured Projects",
    tabs: ["Featured", "Commercial", "Interior Design", "Villas"],
    projectsData: allProjects,
  },
  whyUs: {
    label: "Why Choose Khales",
    title: "Building Beyond a Blueprint",
    features: [
      {
        title: "Quality You Can Measure ",
        description: "We apply clear standards at every stage...",
      },
      {
        title: "Design with Purpose and Precision ",
        description: "Every space is tailored to meet real needs...",
      },
      {
        title: "Clear Process. Reliable Delivery. ",
        description: "Our approach is transparent and deadline-driven...",
      },
    ],
  },
  testimonials: {
    title: "Clients & Partners",
    reviews: [
      {
        text: "From the very first consultation, Khales impressed me...",
        name: "IVAN K., RAS AL KHAIMAH",
        service: "ARCHITECTURAL DESIGN",
      },
      {
        text: "Working with Khales was a masterclass in professionalism...",
        name: "James W. , Dubai",
        service: "Landscaping",
      },
    ],
  },
  stats: {
    hero: {
      title: "Unlocking Your Potential",
      subtitle: "We combine deep industry expertise...",
    },
    stats: [
      {
        title: "Projects Completed",
        description:
          "Delivered across residential, architectural and interior scopes.",
      },
      {
        title: "Client Satisfaction",
        description:
          "Measured through completed handovers and client feedback.",
      },
      {
        title: "Years of Experience",
        description: "Delivering projects across the UAE.",
      },
    ],
  },
  cta: {
    heading: "Looking for expert solutions? Let’s talk!",
    buttonText: "Book Your Consultation",
  },
  footer: {
    description: "Khales Group, your trusted partner...",
    servicesTitle: "Our Services",
    servicesLinks: [
      { text: "Project Management", href: "/services/project-management" },
      {
        text: "Engineering Consultancy",
        href: "/services/engineering-consultancy",
      },
    ],
    companyTitle: "Company",
    companyLinks: [
      { text: "About", href: "/about-us" },
      { text: "Contact us", href: "/Contact" },
      { text: "Blogs", href: "/blog" },
      { text: "Book Consultation", href: "/booking" },
    ],
    contactTitle: "Contact us",
    copyright: "Copyright © 2025 KHALES",
    legal: {
      rights: "All Rights Reserved",
      terms: { text: "Terms and Conditions", href: "/terms-and-conditions" },
      privacy: { text: "Privacy Policy", href: "/privacy-policy" },
    },
  },
  developmentPlanningPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/j93MLS7t/5-Banner-Development.jpg",
        title: "Turn Land into a Project — With a Clear Plan",
        content: "Early Project Strategy",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Development Planning",
      description:
        "Before design or construction begins, every project needs a plan. Our Development Planning service helps landowners, investors, and private clients understand what’s possible on a site, based on regulations, project goals, market potential, and technical requirements.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      title: "Development Planning Process",
      highlight: "Work",
      steps: [
        {
          title: "Site Review & Initial Assessment",
          content:
            "We visit or study the site and gather data on size, location, zoning, utility access, topography, and authority requirements.",
        },
        {
          title: "Regulatory & Municipality Check",
          content:
            "We verify allowable FAR (floor area ratio), height limits, setbacks, building types, and special conditions based on local codes.",
        },
        {
          title: "Project Concept Direction",
          content:
            "We suggest development types (villa, residential block, mixed-use, etc.) that fit both the land and your goals.",
        },
        {
          title: "Time & Cost Planning (Optional)",
          content:
            "We can provide preliminary project timelines and rough cost bands to guide future planning and budgeting.",
        },
        {
          title: "Authority Strategy",
          content:
            "We advise on submission routes, timelines, and which approvals will be needed — helping you avoid process surprises later on.",
        },
        {
          title: "Summary Report & Recommendation",
          content:
            "We deliver a clear document summarizing your land’s potential, next steps, and how to move into design and execution.",
        },
      ],
    },
    faq: {
      title: "Development Planning FAQs",
      questions: [
        {
          title: "What is development planning?",
          content:
            "Development planning involves creating a strategic roadmap for your project, from initial concept to long-term performance, ensuring it meets market demands and regulatory requirements.",
        },
        {
          title: "Do you work on projects across all seven emirates?",
          content:
            "Yes, we provide building contracting services in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
        },
        {
          title: "How do you ensure my project aligns with market trends?",
          content:
            "We conduct tailored market research to analyze current trends, demands, and opportunities, ensuring your project meets investor and resident expectations.",
        },
        {
          title: "Can you handle both small and large-scale projects?",
          content:
            "Absolutely. Whether it’s a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
        },
        {
          title: "Do you offer sustainable development solutions?",
          content:
            "Yes, sustainability is a core part of our planning process. We integrate eco-friendly designs and energy-efficient systems into every project.",
        },
        {
          title: "How long does the development planning process take?",
          content:
            "Most basic development studies are completed in 1–2 weeks, depending on plot complexity and authority feedback.",
        },
      ],
    },
  },
  engineeringDesignPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/DHxsg44Y/1-Banner-Engineering-Design.jpg",
        title: "Precision-Driven Design That Builds with Confidence",
        content: "Engineering for Construction",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Engineering Design",
      description:
        "Every project needs more than a beautiful concept; it needs engineering that works. Khales Engineering Design service provides all the technical documents, calculations, and system layouts needed to take your project from vision to construction.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      title: "Engineering Design Process",
      highlight: "Work",
      steps: [
        {
          title: "Design Coordination & Review",
          content:
            "We start by studying the approved architectural design and identifying all engineering requirements based on the site, scale, and scope.",
        },
        {
          title: "Structural & MEP Design",
          content:
            "We produce detailed structural calculations, electrical and plumbing plans, HVAC layouts, and load analysis, customized to your project.",
        },
        {
          title: "Code Compliance & Authority Requirements",
          content:
            "We design according to UAE municipal standards and ensure all drawings meet submission and approval criteria.",
        },
        {
          title: "Cross-Discipline Integration",
          content:
            "We coordinate with other consultants to ensure that all technical systems align with design, function, and construction constraints.",
        },
        {
          title: "Final Issued for Construction (IFC) Drawings",
          content:
            "We submit finalized engineering drawings for contractor use, ready for site implementation.",
        },
      ],
    },
    faq: {
      title: "Engineering Design FAQs",
      questions: [
        {
          title:
            "What's the difference between architecture and engineering design?",
          content:
            "Architecture defines how a space looks and functions. Engineering design ensures the structure and systems behind it are buildable, safe, and compliant.",
        },
        {
          title:
            "Do you only offer engineering for projects designed by Khales?",
          content:
            "No. We can provide engineering design for external architectural concepts as well — ensuring your project moves forward technically and legally.",
        },
        {
          title: "Will you also submit drawings for authority approval?",
          content:
            "Yes. Our designs follow local municipality standards and are prepared specifically for UAE approval processes.",
        },
        {
          title:
            "What types of projects do you provide engineering design for?",
          content:
            "We work across villas, residential buildings, commercial projects, and mixed-use developments of various scales.",
        },
      ],
    },
  },
  engineeringSupervisionPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/fGNXpJH0/3-Banner-Site-Supervision.jpg",
        title: "Technical Oversight That Safeguards Quality On-Site",
        content: "Construction Quality Checks",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Engineering Supervision",
      description:
        "Our Engineering Supervision service provides hands-on technical monitoring throughout the construction phase. We visit the site regularly to check that work is being executed in line with approved engineering drawings, authority regulations, and material specifications.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      title: "Engineering Supervision Process",
      highlight: "Work",
      steps: [
        {
          title: "Review of Approved Drawings & Scope",
          content:
            "We begin by reviewing all IFC (Issued for Construction) engineering drawings and ensuring all parties are aligned on specifications.",
        },
        {
          title: "Regular Site Visits & Inspections",
          content:
            "Our engineers conduct scheduled site visits to monitor work execution, highlight technical issues, and ensure compliance.",
        },
        {
          title: "Material & Method Verification",
          content:
            "We confirm that materials on-site match what was approved and that work is being done using proper engineering methods.",
        },
        {
          title: "Progress Tracking & Reporting",
          content:
            "We track the actual percentage of work completed, assist in validating contractor claims, and prepare technical reports.",
        },
        {
          title: "Support for Interim Payments",
          content:
            "We provide technical documentation to support milestone payments, based on verified work progress and compliance.",
        },
        {
          title: "Final Technical Closeout",
          content:
            "We participate in final inspections to ensure the project meets engineering and authority standards before handover.",
        },
      ],
    },
    faq: {
      title: "Engineering Supervision FAQs",
      questions: [
        {
          title:
            "What's the difference between site supervision and engineering supervision?",
          content:
            "Site supervision looks at general construction and visual compliance. Engineering supervision is more detailed — focused on structural integrity, MEP accuracy, and technical compliance.",
        },
        {
          title: "Do you only provide supervision for your own designs?",
          content:
            "No. We can supervise any project where engineering drawings are available and authority-approved — regardless of who designed them.",
        },
        {
          title: "How often do your engineers visit the site?",
          content:
            "Visit frequency depends on the project phase and client needs — typically weekly or milestone-based unless daily oversight is required.",
        },
        {
          title: "Does this help with contractor accountability?",
          content:
            "Yes. Our reports and inspections help verify the quality and progress of the work, supporting informed client decisions and fair contractor payments.",
        },
      ],
    },
  },
  interiorDesignPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/zHxNY5Fp/5-Banner-Interior-Design.png",
        title: "Elegant Interiors Designed with Purpose",
        content: "Luxury Interior Solutions",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Interior Design",
      description:
        "We create unique interior designs that reflect your refined taste and meet your daily needs. We translate your vision into a tangible reality, creating spaces that combine elegance and functionality to turn your home into a comfortable and vibrant sanctuary.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      title: "Interior Design Process",
      highlight: "Work",
      steps: [
        {
          title: "Client Brief & Lifestyle Understanding",
          content:
            "We begin by learning about your style, goals, and how each space will be used — function always comes first.",
        },
        {
          title: "Moodboard & Concept Development",
          content:
            "We translate your preferences into design direction — with curated references, material palettes, and layout studies.",
        },
        {
          title: "Space Planning & Layout Optimization",
          content:
            "We ensure flow, usability, and comfort by organizing space logically and in harmony with structure and light.",
        },
        {
          title: "Material & Finish Selection",
          content:
            "We help select the right materials, colors, textures, and finishes — balancing beauty, durability, and context.",
        },
        {
          title: "Technical Drawings & Joinery Details",
          content:
            "We prepare detailed interior drawings (e.g., ceilings, elevations, joinery) ready for contractors and authority approvals.",
        },
        {
          title: "Design Supervision (Optional)",
          content:
            "We can also follow through with on-site visits, material submittal reviews, and built-work verification upon request.",
        },
      ],
    },
    faq: {
      title: "Interior Design FAQs",
      questions: [
        {
          title:
            "Do you work with existing architectural layouts or only your own?",
          content:
            "We can design interiors for both — whether the architecture was done by Khales or by another firm.",
        },
        {
          title: "Can you help select furniture and decor too?",
          content:
            "Yes. We can advise or fully curate furniture and accessory selections, especially if we are involved during the fit-out phase.",
        },
