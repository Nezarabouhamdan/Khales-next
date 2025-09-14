// dictionaries/en.js

// ======================= THE FIX IS HERE =======================
// We must import the data before we can use it.
import { projectsData as allProjects } from "@/components/Property Page/ProjectData";
// ===============================================================

export const dictionary = {
  // dictionaries/en.js

  comprehensiveAbout: {
    title: "Khales Group",
    subtitle: "Orchestrating Landmark Projects",
    intro:
      " Khales Group is a premier project management and engineering consultancy firm dedicated to navigating the complexities of large-scale construction. Our expertise is proven across two distinct realms: the demanding world of major commercial developments and the nuanced creation of luxury residential properties.",
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
  valueProposition: {
    title: "The Khales",
    subtitle: "Advantage",
    intro:
      "Beyond construction, we build strategic partnerships founded on transparency, accountability, and a relentless pursuit of excellence. We are your advocates from day one to final handover.",
    subsections: [
      {
        title: "Strategic Foresight",
        text: "We anticipate challenges before they arise, providing proactive solutions that protect your investment and maximize long-term value.",
      },
      {
        title: "Uncompromising Quality",
        text: "Our commitment to superior craftsmanship, premium materials, and rigorous supervision ensures your project becomes a lasting legacy.",
      },
      {
        title: "Seamless Execution",
        text: "We serve as your single point of contact, transforming complex processes into a streamlined, clear, and predictable journey to success.",
      },
    ],
    buttonText: "Book a Consultation",
    buttonLink: "/Contact",
  },
  navigation: {
    items: [
      {
        label: "About us",
        isDropdown: true,
        children: [
          { label: "Home", path: "/" },

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
      {
        label: "Project Types",
        isDropdown: true,
        children: [
          { label: "Residential", path: "/Residential" },
          { label: "Commercial", path: "/Commercial" },
          { label: "Luxury Villas", path: "/Luxury-Villas" },
        ],
      },
      {
        label: "Contact us",
        path: "/Contact",
        isDropdown: false,
      },
      // FIX: New "Company" dropdown containing About, Blogs, and Connect
    ],
    ctaButton: "Book Consultation",
    // FIX: Changed label to be more generic for an icon
    languageButton: "Language",
  },

  hero: {
    slides: [
      {
        title: "Full Project Management Services ",
        subtitle:
          "We manage every detail of your project with precision, from initial concept to the moment we hand you the keys to your new home.",
        buttonText: "Get in Touch",
        buttonLink: "/Contact",
      },
      {
        title: "Engineering Consultancy ",
        subtitle: "Your vision, expertly engineered",
        buttonText: "Explore Services",
        buttonLink: "/#services",
      },

      {
        title: "Hire A Professional Project Manager",
        subtitle:
          "We ensure you're a part of the process, with consistent updates and a commitment to clear communication.",
        buttonText: "Book a Consultation",
        buttonLink: "/Contact",
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
      {
        slug: "EngineeringConsultancy",
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
    subheading:
      "Ready to take the next step? Our team is here to help you turn your vision into a reality. Let's build something extraordinary together.",
    buttonText: "Book Your Consultation",
  },
  footer: {
    description: "Khales Group, your trusted partner...",
    servicesTitle: "Our Services",
    servicesLinks: [
      { text: "Project Management", href: "/services/project-management" },
      {
        text: "Engineering Consultancy",
        href: "/services/EngineeringConsultancy",
      },
    ],
    companyTitle: "Company",
    companyLinks: [
      { text: "About", href: "/About-Us" },
      { text: "Contact us", href: "/Contact" },
      { text: "Blogs", href: "/blog" },
      { text: "Book Consultation", href: "/Contact" },
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
        image: "https://i.ibb.co/ymhSpp0t/BAN-DEV.png",
        title: "Turn Land into a Project — With a Clear Plan",
        content: "Early Project Strategy",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Development Planning",
      // FIX: Removed empty subtitle to prevent an empty heading tag.
      description1:
        "Before design or construction begins, every project needs a plan. Our Development Planning service helps landowners, investors, and private clients understand what’s possible on a site, based on regulations, project goals, market potential, and technical requirements.",
      description2:
        "Khales guides you through zoning laws, land use restrictions, authority procedures, and development options, turning a raw plot into a viable project direction. This service helps avoid delays, wasted costs, or design mistakes by making sure your vision is feasible and aligned from the start.",
      images: [
        "https://i.ibb.co/HTw0dm03/Whats-App-Image-2025-08-14-at-16-23-14-127b4151.jpg",
        "https://i.ibb.co/Vpb0LnMG/Whats-App-Image-2025-08-14-at-16-23-44-66fcc5f6.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique and avoid duplication.
      title: "Our Development Planning Process",
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
      // FIX: Changed title to be unique and avoid duplication.
      title: " Development Planning",
      highlight: "FAQ",
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
            "The timeline depends on the project’s complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
        },
        {
          title: "Do you provide facility management planning?",
          content:
            "Yes, we integrate facility management planning from the start, ensuring your project’s long-term performance and connecting you with leading property management companies.",
        },
        {
          title: "Can you work within my budget?",
          content:
            "We create plans that align with your budget without compromising on quality. During the consultation, we discuss your financial parameters and tailor our solutions accordingly.",
        },
        {
          title: "What makes your building contracting services stand out?",
          content:
            "Our commitment to precision, innovation, and excellence sets us apart. We combine award-winning expertise with a client-centric approach to deliver exceptional results.",
        },
        {
          title: "How can I get started with Khales Building Contracting?",
          content:
            "Simply contact us for a consultation. We’ll discuss your vision, provide a customized plan, and guide you through the process of creating your dream project.",
        },
        {
          title: "Is this only for large developments?",
          content:
            "No — this is helpful for any landowner, whether you’re building one villa or planning a full investment project.",
        },
        {
          title: "Can you help us compare multiple land plots?",
          content:
            "Yes. We can provide basic development potential comparisons so you can decide which plot is more suitable.",
        },
        {
          title: "Do you also help with concept design after this?",
          content:
            "Yes. After the development plan is clear, we can proceed with full design, approvals, and project management.",
        },
        {
          title: "How long does a development plan take?",
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
        image: "https://i.ibb.co/rGFt2Dk3/ban-eng-des.png",
        title: "Precision-Driven Design That Builds with Confidence",
        content: "Engineering for Construction",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Engineering Design",
      // FIX: Removed empty subtitle.
      description1:
        "Every project needs more than a beautiful concept; it needs engineering that works. Khales Engineering Design service provides all the technical documents, calculations, and system layouts needed to take your project from vision to construction.",
      description2:
        "We prepare structural, civil, mechanical, electrical, and plumbing designs, coordinated with architectural plans and in line with local authority codes. Whether you’re building a villa or a multi-use development, we ensure your project is safe, compliant, efficient, and ready for execution.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our Engineering Design Process",
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
      // FIX: Changed title to be unique.
      title: "Engineering Design ",
      highlight: "FAQ",
      questions: [
        {
          title:
            "What’s the difference between architecture and engineering design?",
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
        image: "https://i.ibb.co/MkyXq4d1/ban-engsupre.png",
        title: "Technical Oversight That Safeguards Quality On-Site",
        content: "Construction Quality Checks",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Engineering Supervision",
      // FIX: Removed empty subtitle.
      description1:
        "Our Engineering Supervision service provides hands-on technical monitoring throughout the construction phase. We visit the site regularly to check that work is being executed in line with approved engineering drawings, authority regulations, and material specifications.",
      description2:
        "From structural details to mechanical and electrical systems, our engineers ensure that your project is progressing safely, accurately, and efficiently. We track the percentage of work completed, verify materials used, and support interim payment evaluations, protecting your investment and reinforcing long-term reliability.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our Engineering Supervision Process",
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
      // FIX: Changed title to be unique.
      title: " Engineering Supervision",
      highlight: "FAQ",
      questions: [
        {
          title:
            "What’s the difference between site supervision and engineering supervision?",
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
        image: "https://i.ibb.co/wrzKMJRz/interior.png",
        title: "Elegant Interiors Designed with Purpose",
        content: "Luxury Interior Solutions",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Interior Design",
      // FIX: Removed empty subtitle.
      description1:
        "Interior design at Khales is about more than selecting finishes; it’s about shaping how people live, feel, and experience space. Our interior designers work closely with clients to create interiors that are functional, refined, and aligned with the architectural identity of the project.",
      description2:
        "We handle everything from spatial planning and mood concepts to material selection and technical drawings. Whether for a private villa, commercial space, or full development, we ensure the design reflects both the client’s taste and the project’s context, while staying practical, buildable, and regulation-ready.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our Interior Design Process",
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
            "We produce detailed interior drawings (e.g., ceilings, elevations, joinery) ready for contractors and authority approvals.",
        },
        {
          title: "Design Supervision (Optional)",
          content:
            "We can also follow through with on-site visits, material submittal reviews, and built-work verification upon request.",
        },
      ],
    },
    faq: {
      // FIX: Changed title to be unique.
      title: "Interior Design ",
      highlight: "FAQ",
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
        {
          title: "Do you submit drawings for authority approval?",
          content:
            "Yes. All technical drawings are prepared in line with UAE authority standards and submission formats.",
        },
        {
          title: "What kinds of interiors do you specialize in?",
          content:
            "We design for private villas, apartments, offices, and select commercial spaces — always tailored to the project and client lifestyle.",
        },
      ],
    },
  },
  landscapeDesignPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/qLpSLzr9/7-Landscape.jpg",
        title: "Thoughtfully Designed Outdoor Spaces That Endure",
        content: "Softscape & Hardscape Plans",
        button: "Start Your Project Today",
      },
    ],
    intro: {
      title: "Landscape Design",
      // FIX: Changed subtitle from "Service" to be more descriptive and avoid being a generic heading.
      subtitle: "Outdoor Experiences by Khales",
      description1:
        "At Khales, landscape design is not an afterthought; it’s an essential part of the experience. We design outdoor spaces that are elegant, functional, and aligned with the architecture and environment around them.",
      description2:
        "From gardens and entrances to terraces and pool decks, our landscape team balances natural elements with built features to enhance usability, flow, and visual character. Every detail, from plant selection to lighting and materials, is tailored to your climate, space, and personal vision.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our Landscape Design Process",
      highlight: "Work",
      steps: [
        {
          title: "Site Assessment & Briefing",
          content:
            "We evaluate your outdoor space in relation to your architecture, sun exposure, wind, access, and views.",
        },
        {
          title: "Concept Design & Functional Layout",
          content:
            "We define the purpose of each area — seating, pathways, greenery, water features — and arrange them into a cohesive, usable plan.",
        },
        {
          title: "Planting Design & Material Selection",
          content:
            "We select plants and finishes that are climate-appropriate, low-maintenance, and visually aligned with the property’s identity.",
        },
        {
          title: "Technical Drawings & Coordination",
          content:
            "We prepare detailed landscape drawings for contractors, including levels, hardscape, planting, irrigation, and lighting.",
        },
        {
          title: "Authority Submissions (if applicable)",
          content:
            "We assist with municipality approvals if required — ensuring your landscape meets local guidelines.",
        },
        {
          title: "On-Site Supervision (Optional)",
          content:
            "We can support the implementation phase by reviewing shop drawings, material submittals, and site progress.",
        },
      ],
    },
    projectHighlight: {
      // FIX: Changed title to be unique.
      title: "Landscape Design Case Study",
      button: "Get in touch with us",
      subtitle: "Arabian Ranches Villa",
      subheader: "Landscape Design",
      description: [
        "A villa in Arabian Ranches lacked a functional outdoor space. Although the family had children and enjoyed being outdoors, the backyard was underused and didn’t reflect their lifestyle. They wanted a garden that was family-friendly, practical, and visually appealing.",
        "The challenge was creating a multi-purpose garden that included play space for kids, relaxing seating areas, and water features, all while being mindful of irrigation, maintenance, and climate-adapted planting.",
        "We started with a clear layout focused on flow and comfort. Native, heat-tolerant plants were selected for sustainability. Covered lounge areas were integrated, and a mix of hardscaping and softscaping created balance. Ambient lighting was added to enhance the mood without excess energy use.",
        "The landscape was completed in six weeks with long-term durability and low maintenance in mind.",
        "The service covered full landscape design, plant selection, lighting, water elements, and execution with a practical and elegant approach.",
      ],
      mainimage: "https://i.ibb.co/qLpSLzr9/7-Landscape.jpg",
      images: [
        "https://placehold.co/400x300/aaaaaa/aaaaaa",
        "https://placehold.co/400x300/bbbbbb/bbbbbb",
        "https://placehold.co/400x300/cccccc/cccccc",
      ],
    },
    faq: {
      // FIX: Changed title to be unique.
      title: "Landscape Design ",
      highlight: "FAQ",
      questions: [
        {
          title: "Do you design small gardens or only full landscapes?",
          content:
            "We design all scales — from compact courtyards to full property masterplans.",
        },
        {
          title: "Can I request a low-maintenance or water-saving garden?",
          content:
            "Absolutely. We consider both aesthetic and maintenance needs when selecting plants and materials.",
        },
        {
          title: "Do you handle lighting and irrigation as well?",
          content:
            "Yes. These systems are included in our landscape design and coordinated with the rest of the project.",
        },
        {
          title: "Will my landscape be approved by authorities?",
          content:
            "If approvals are required in your area, we prepare the drawings according to UAE standards and assist with submission.",
        },
      ],
    },
  },
  projectManagementPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/FL5BsmnZ/BAN-360.png",
        title: "Complete Project Delivery: From Concept to Handover",
        content: "Full Project Delivery",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "360 Project Management",
      // FIX: Removed empty subtitle.
      description1:
        "Our 360 Project Management service is a fully integrated solution that covers the entire lifecycle of your project. From early planning and design coordination to authority approvals, construction management, and final handover, we handle it all. You deal with one trusted partner while we manage all consultants, contractors, documents, timelines, and decisions on your behalf.",
      description2:
        "This service is ideal for clients who want peace of mind, fewer headaches, and a professional team ensuring that the work is done right — on time, on budget, and to the standard you expect.",
      images: [
        "https://i.ibb.co/1frFMZZw/Screenshot-2025-08-14-165439.png",
        "https://i.ibb.co/vCXdS2Zt/Screenshot-2025-08-14-165411.png",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our 360 PM Process",
      highlight: "Work",
      steps: [
        {
          title: "Project Setup & Briefing",
          content:
            "We begin by understanding your goals, site conditions, and expectations. We then build a delivery strategy that matches your timeline and budget.",
        },
        {
          title: "Design Coordination",
          content:
            "We manage architects, engineers, and consultants to ensure the design process is aligned, efficient, and technically sound.",
        },
        {
          title: "Approvals & Permitting",
          content:
            "We prepare and submit all necessary documents to local authorities, handling follow-ups and compliance.",
        },
        {
          title: "Procurement & Contractor Selection",
          content:
            "We identify qualified contractors, evaluate bids, and negotiate the best options to balance cost and quality.",
        },
        {
          title: "Construction Management",
          content:
            "We monitor site work daily, review progress, resolve conflicts, and make sure timelines and specs are followed.",
        },
        {
          title: "Final Handover",
          content:
            "We ensure the project is completed properly — with quality checks, documentation, and smooth handover to the client.",
        },
      ],
    },
    projectHighlight: {
      // FIX: Changed title to be unique.
      title: "Project Management Case Study",
      button: "Get in touch with us",
      subtitle: "Dubai Hills Estate",
      subheader: "A Turnkey Success Story",
      description: [
        "In Dubai Hills Estate, a 1,100 sqm luxury villa needed to be built from the ground up. The client, based overseas, owned the land but didn’t have time to handle permits, design approvals, or coordinate contractors. They were looking for a smooth process with one team to manage everything while they stayed informed remotely.",
        "One of the biggest challenges was communication. The client was in a different time zone, and the design was still evolving during construction. Material sourcing also needed to match their high-end taste without going over budget or missing deadlines.",
        "To fix this, we kept things simple. A dedicated project manager became their single point of contact, and we built a live dashboard with weekly updates, progress videos, and instant approvals. That meant no chasing teams, no missed updates, and full control without having to be on-site.",
        "We handled all design changes quickly, fast-tracked municipality approvals, and stayed on top of contractors with a tight schedule. In just 14 months, the villa was delivered fully complete, designed, built, and finished to luxury standards. This was a full turnkey project management service, including architecture coordination, construction, interior fit-out, and handover, tailored for anyone looking for luxury villa construction in Dubai without the usual stress.",
      ],
      mainimage: "https://placehold.co/400x300/eeeeee/eeeeee",
      images: [
        "https://placehold.co/400x300/eeeeee/eeeeee",
        "https://placehold.co/400x300/ffffff/ffffff",
        "https://placehold.co/400x300/8b4513/8b4513",
      ],
    },
    faq: {
      // FIX: Changed title to be unique.
      title: "360 Project Management ",
      highlight: "FAQ",
      questions: [
        {
          title:
            "What’s the difference between 360 Project Management and hiring a contractor directly?",
          content:
            "With 360 Project Management, you’re not just hiring a builder — you’re hiring a professional team to plan, oversee, and control every step of your project. We coordinate all parties, not just execute construction.",
        },
        {
          title: "Will I still be involved in decisions?",
          content:
            "Yes. You remain in control, and we provide structured updates and recommendations so you can make informed decisions without dealing with daily project stress.",
        },
        {
          title: "Does this include authority approvals?",
          content:
            "Yes. We handle all approval processes — drawings, permits, inspections, and submissions — as part of the full-service scope.",
        },
        {
          title: "What types of projects is this service best for?",
          content:
            "360 Project Management is ideal for private villas, luxury residences, commercial properties, or any project that requires clear coordination and accountability across all phases.",
        },
      ],
    },
  },
  projectManagerPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/8JfxX3q/BAN-PM.png",
        title: "Professional Representation for Your Project",
        content: "Expert guidance from start to finish.",
        button: "Book Appointment",
      },
    ],
    intro: {
      title: "Project Manager Service",
      // FIX: Removed empty subtitle.
      description1:
        "The Project Manager service is designed for clients who want to stay in control of their project, without managing the daily tasks and coordination themselves. Acting as your official representative, we oversee the project on your behalf, making sure all consultants, contractors, and site teams are aligned and performing according to the plan.",
      description2:
        "We handle the complexities, site meetings, document reviews, progress tracking, and approvals, while keeping you informed and supported at every step. You make the final decisions. We make sure everything else moves forward smoothly, with clarity and accountability.",
      images: [
        "https://i.ibb.co/fdgYgxYc/Whats-App-Image-2025-08-14-at-16-20-22-b6bc1ffa.jpg",
        "https://i.ibb.co/hxXGS82B/Whats-App-Image-2025-08-14-at-16-21-14-49744c17.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our Project Manager Service Process",
      highlight: "Work",
      steps: [
        {
          title: "Project Brief & Role Definition",
          content:
            "We align with your project goals and define how we’ll act on your behalf throughout the duration of the project.",
        },
        {
          title: "Team Coordination",
          content:
            "We serve as the main contact between all consultants, contractors, and suppliers — ensuring clarity and direction.",
        },
        {
          title: "Progress Monitoring",
          content:
            "We review schedules, track milestones, flag risks early, and keep your project moving forward efficiently.",
        },
        {
          title: "On-Site Representation",
          content:
            "We attend key meetings, verify site work against the contract, and ensure your standards are met.",
        },
        {
          title: "Client Reporting & Approvals",
          content:
            "You receive clear updates with only the information you need — and we support you in making informed decisions.",
        },
        {
          title: "Final Delivery & Closeout Support",
          content:
            "We ensure the project is finalized properly — including punch-list coordination, handover documentation, and closing all contractual items.",
        },
      ],
    },
    faq: {
      // FIX: Changed title to be unique.
      title: "Project Manager Service ",
      highlight: "FAQ",
      questions: [
        {
          title: "How is this different from full 360 Project Management?",
          content:
            "With 360, we handle every part of the project from design to construction. As your Project Manager, we represent your interests within a project that may already have its own team — keeping everything on track while you remain the final decision-maker.",
        },
        {
          title: "Do I still have to be involved in every step?",
          content:
            "No — we manage all daily tasks and coordination. You’re only involved when key decisions or approvals are needed.",
        },
        {
          title: "Do you attend meetings and communicate with the contractor?",
          content:
            "Yes. We attend all major meetings, review reports, and manage contractor communication on your behalf.",
        },
        {
          title: "What types of projects is this service suited for?",
          content:
            "It’s ideal for private villa owners, international clients, or developers who want experienced oversight without being hands-on every day.",
        },
      ],
    },
  },
  feasibilityStudyPage: {
    slides: [
      {
        id: 1,
        image: "https://i.ibb.co/39sLhVqb/BANNER-STUDY.png",
        title: "Know the Potential Before You Build",
        content: "Project Viability Analysis",
        button: "Start Your Project Today",
      },
    ],
    intro: {
      title: "Feasibility Study Service",
      // FIX: Removed empty subtitle.
      description1:
        "A great idea is not always a viable project; that is where our Feasibility Study comes in. Before you invest in land, design, or construction, we help you evaluate whether the project is achievable, profitable, and aligned with your budget, site conditions, and regulatory framework.",
      description2:
        "Khales' team reviews all key factors: land potential, design requirements, authority constraints, estimated costs, and timeframes. We then prepare a clear, data-backed summary of your project’s risks, strengths, and practical next steps, so you can move forward with clarity and confidence.",
      images: [
        "https://i.ibb.co/BX4wndc/Whats-App-Image-2025-08-14-at-16-25-30-15956dbe.jpg",
        "https://i.ibb.co/BH2XX2hF/Whats-App-Image-2025-08-14-at-16-33-19-dd217380.jpg",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      // FIX: Changed title to be unique.
      title: "Our Feasibility Study Process",
      highlight: "Work",
      steps: [
        {
          title: "Project Objective Review",
          content:
            "We begin by understanding what you want to build, why, and what your targets are — financial, functional, or strategic.",
        },
        {
          title: "Site & Location Analysis",
          content:
            "We assess site constraints, access, zoning, exposure, and local market dynamics.",
        },
        {
          title: "Design & Regulatory Considerations",
          content:
            "We study what’s allowed, what design challenges may arise, and what approvals will be required.",
        },
        {
          title: "Budget & Cost Estimate",
          content:
            "We develop a high-level cost estimate, factoring in design, construction, approvals, and key risks.",
        },
        {
          title: "Timeline Mapping",
          content:
            "We provide a realistic delivery timeline, including design, permitting, and construction phases.",
        },
        {
          title: "Viability Report",
          content:
            "You receive a full summary of findings — with a clear go/no-go recommendation and action plan.",
        },
      ],
    },
    projectHighlight: {
      // FIX: Changed title to be unique.
      title: "Feasibility Study Case Study",
      button: "Get in touch with us",
      subtitle: "Sharjah Residential Compound",
      subheader: "A Viability Success Story",
      description: [
        "A landowner in Sharjah was unsure whether to develop a residential community or hold the property. There were concerns about zoning, costs, and buyer demand.",
        "We conducted a full feasibility study covering land analysis, design options, construction phases, cost estimates, and ROI projections. We also assessed market demand based on buyer trends and neighborhood competition.",
        "The study showed phased development was viable and allowed the client to secure approvals and attract potential investors confidently.",
      ],
      mainimage: "https://placehold.co/400x300/eeeeee/eeeeee",
      images: [
        "https://placehold.co/400x300/eeeeee/eeeeee",
        "https://placehold.co/400x300/ffffff/ffffff",
        "https://placehold.co/400x300/8b4513/8b4513",
      ],
    },
    faq: {
      // FIX: Changed title to be unique.
      title: "Feasibility Study ",
      highlight: "FAQ",
      questions: [
        {
          title: "Who needs a feasibility study?",
          content:
            "Anyone considering a new project — villa owners, landowners, investors, or developers — should do this before committing large time or capital.",
        },
        {
          title: "Does this include financial returns or ROI projections?",
          content:
            "Yes. For investment-oriented projects, we can include basic return projections, sale/rental values, or holding cost scenarios.",
        },
        {
          title: "Will you help move forward if the project is viable?",
          content:
            "Absolutely. If the study shows green lights, we can continue with design, approvals, and full project management.",
        },
        {
          title: "How accurate are the cost and timeline estimates?",
          content:
            "They are based on current market conditions and Khales’ experience across the UAE — offering a realistic early-stage forecast.",
        },
      ],
    },
  },
  contactPage: {
    header: {
      title: ["Contact", "Us"],
      description:
        "Have a question or need expert guidance? Contact us for consultations, project inquiries, and bookings.",
    },
    info: {
      general: {
        title: "General Inquiries",
        email: "info@khales.ae",
        phone: "+971 4 557 1184",
      },
      customer: {
        title: "24/7 Customer Service",
        phone: "+971 55 129 9880",
      },
      hours: {
        title: "Working Hours",
        text: "Sunday to Thursday - 9:00 AM - 6:00 PM",
      },
    },
    form: {
      inquiryPlaceholder: "Type of Inquiry",
      namePlaceholder: "Full Name",
      phonePlaceholder: "Phone Number",
      emailPlaceholder: "Email Address",
      messagePlaceholder: "Message",
      submitText: "Submit",
      inquiryOptions: [
        "General Question",
        "Project Inquiry",
        "Consultation Request",
        "Booking",
        "Other",
      ],
    },
    locations: {
      titlePart1: "Our ",
      titlePart2: " Offices",
      comingSoonText: "Coming Soon",
      offices: [
        {
          titlePart1: "Dubai",
          titlePart2: "Majlis",
          description:
            "Office M03, Building 5 Block B, Design District, Dubai, UAE\n\n+971 4 580 6307",
          link: "https://maps.app.goo.gl/mJ2i9EfLTbooABVM9",
        },
        {
          titlePart1: "Dubai",
          titlePart2: "Branch",
          description:
            "Office 113, SIT Tower, Dubai Silicon Oasis, Dubai, UAE\n\n+971 4 557 1184",
          link: "https://maps.app.goo.gl/2Rgo7ZE5KSgVNDD37",
        },
        {
          titlePart1: "Sharjah",
          titlePart2: "Branch",
          description:
            "Shop 11, Block C, Al Saud Head Office, Muwaileh, Sharjah, UAE\n\n+971 6 551 8070",
          link: "https://maps.app.goo.gl/SD2R8ZKmym2NPLUu7",
        },

        {
          titlePart1: "Fujairah",
          titlePart2: "Branch",
          description:
            "Office 202, Creative Tower, Hamad Bin Abdulla St., Fujairah, UAE\n\n+971 9 501 0762",
          link: "https://maps.app.goo.gl/xELTzMrDSxsC7o1x6",
        },
        {
          titlePart1: "Abu Dhabi",
          titlePart2: "Branch",
          description: "Al Qana, Rabdan, Abu Dhabi, UAE\n(Opening Soon)",
          link: "/coming-soon",
          isComingSoon: true,
        },
        {
          titlePart1: "London,",
          titlePart2: "UK Branch",
          description: "London, UK\n(Opening Soon)",
          link: "/coming-soon",
          isComingSoon: true,
        },
      ],
    },
  },
  bookingPage: {
    metaTitle: "Book an Appointment - Khales",
    metaDescription:
      "Schedule your consultation with Khales's expert team for project management, architecture, or interior design services in Dubai and the UAE.",
    metaKeywords: [
      "book appointment",
      "schedule consultation",
      "Khales booking",
      "engineering consultant appointment",
      "interior design meeting Dubai",
    ],
    schemaName: "Book a Consultation with Khales Group",
    schemaDescription:
      "Use this form to schedule a professional consultation for your architecture, engineering, or design project with Khales Group.",
    title: "Book an Appointment",
    steps: ["Service & Location", "Personal Info", "Review & Confirm"],
    buttons: { back: "Back", next: "Next", submit: "Submit" },
    errors: { required: "Please fill out all required fields." },
    stepOne: {
      title: "Step 1: Service & Location",
      labels: { service: "Select a Service", branch: "Select a Branch" },
      serviceOptions: [
        "Projects Management",
        "Interior Design",
        "Landscaping",
        "Development Planning",
        "Engineering Consultancy",
        "Investing",
        "Project Feasibility",
      ],
      branchOptions: [
        "Dubai Majlis",
        "Dubai Branch",
        "Fujairah Branch",
        "Sharjah Branch",
        "Abu Dhabi Branch",
      ],
    },
    stepTwo: {
      title: "Step 2: Personal & Appointment Details",
      labels: {
        name: "Full Name",
        phone: "Phone Number",
        date: "Appointment Date",
        time: "Appointment Time",
      },
    },
    stepThree: {
      title: "Step 3: Review & Confirm",
      fields: {
        name: "Name",
        phone: "Phone Number",
        date: "Appointment Date",
        time: "Time",
        branch: "Branch",
        service: "Service",
      },
    },
    successModal: {
      title: "Success!",
      text: "Your appointment has been booked.",
      close: "Close",
    },
    errorModal: {
      title: "Oops!",
      text: "Something went wrong. Please try again.",
      close: "Close",
    },
  },
  aboutUsPage: {
    metaTitle:
      "About Khales - Premier Architecture & Interior Design Company Dubai",
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
    breadcrumbAbout: "About", // Add this inside your main `dictionary` object in en.js
    // ...

    successStory: {
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
  },

  blogsPage: {
    metaTitle: "Khales Group Blog | Architecture & Design Insights",
    metaDescription:
      "Explore articles on luxury design, project management, and architecture trends in Dubai and the UAE from the experts at Khales Group.",
    metaKeywords: [
      "khales blog",
      "architecture blog dubai",
      "interior design articles",
      "project management tips",
      "uae construction news",
      "luxury real estate dubai",
      "engineering consultancy blog",
      "sustainable design uae",
    ],
    breadcrumbHome: "Home",
    breadcrumbBlogs: "Blogs",
    followUs: "Follow Us",
    posts: [
      {
        id: 1,
        slug: "modern-architectural-trends-residential-design",
        coverImage:
          "https://i.ibb.co/nMq11458/Whats-App-Image-2025-08-19-at-17-26-05-cc5d2f30.jpg",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Architecture Department",
        date: "June 28, 2023",
        tags: ["Design", "Architecture"],
        title: "Modern Architectural Trends in Residential Design",
        description:
          "In the ever-evolving landscape of residential design, staying abreast of modern architectural trends is paramount...",
        postMeta: {
          title:
            "Modern Architectural Trends in Residential Design | Khales Blog",
          description:
            "Discover key modern architectural trends like open-concept living, biophilic design, and smart home integration for luxury residential spaces in Dubai.",
          keywords: [
            "modern architecture trends",
            "residential design dubai",
            "open concept living",
            "sustainable home design",
            "biophilic design uae",
            "smart home integration",
            "minimalist aesthetics",
            "luxury villa design",
            "contemporary living spaces",
            "khales architecture",
            "eco-friendly building materials",
            "rooftop gardens dubai",
            "natural light architecture",
            "uae residential design",
            "innovative home design",
          ],
        },
        fullContent: {
          subtitle: "Crafting contemporary luxury living spaces",
          paragraphs: [
            "In the ever-evolving landscape of residential design, staying abreast of modern architectural trends is paramount to crafting homes that seamlessly blend style, functionality, and innovation. Khales is committed to transforming living spaces into timeless expressions of contemporary luxury.",
            "Open Concept Living: Modern residential design embraces open-concept living spaces. Removing barriers between the kitchen, dining, and living areas fosters a sense of spaciousness, promoting fluidity and connectivity within the home.",
          ],
          quote:
            "In the pursuit of modern architectural excellence, Khales Project Management invites you to explore a world where innovation meets elegance.",
          paragraphAfterQuote:
            "Our commitment to staying at the forefront of residential design trends ensures that your home is not just a place to live but a testament to the artistry of contemporary living. Welcome to a new era of residential luxury.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Key Trends in Modern Residential Design",
          thirdParagraph:
            "Sustainable and Eco-Friendly Practices: Khales leads the way in integrating sustainable and eco-friendly practices into residential design. From energy-efficient appliances to eco-conscious building materials, our commitment to environmentally responsible design ensures homes that are both luxurious and sustainable.",
          listItems: [
            "Biophilic Design: Connecting residents with nature through large windows and natural materials",
            "Smart Home Integration: Automated lighting and security systems for enhanced comfort",
            "Minimalist Aesthetics: Clean lines and simple color palettes for tranquility",
          ],
          fourthParagraph:
            "Flexibility and Multifunctionality: Spaces are crafted with versatility in mind. Mixed Materials and Textures: Combining wood, metal, glass and stone creates visual interest. Innovative Use of Natural Light: Employing skylights and glass walls to maximize daylight. Rooftop Gardens: Enhancing aesthetics while contributing to sustainable living.",
        },
      },
      {
        id: 2,
        slug: "advancements-structural-steel-design-villas",
        coverImage:
          "https://i.ibb.co/1Jjmw6BL/Whats-App-Image-2025-08-19-at-17-26-04-cb6b7148.jpg",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Engineering Department",
        date: "July 15, 2023",
        tags: ["Construction", "Engineering"],
        title: "Advancements in Structural Steel Design for Villas",
        description:
          "In the realm of villa construction, the use of structural steel has evolved dramatically...",
        postMeta: {
          title:
            "Advancements in Structural Steel Design for Villas | Khales Engineering",
          description:
            "Explore the benefits and innovations of using structural steel in luxury villa construction, including design versatility, BIM precision, and cost-efficiency.",
          keywords: [
            "structural steel design",
            "villa construction uae",
            "steel frame villas",
            "architectural freedom",
            "BIM in construction",
            "HSLA steel",
            "prefabricated construction",
            "modern villa construction",
            "engineering consultancy dubai",
            "khales project management",
            "durable building materials",
            "expansive glass facades",
            "open floor plans",
            "cost-efficient construction",
            "future of construction",
          ],
        },
        fullContent: {
          subtitle: "Innovations in modern villa construction",
          paragraphs: [
            "In the realm of villa construction, the use of structural steel has evolved dramatically, offering not just strength but also unmatched versatility in design. At Khales Project Management, we understand the pivotal role of structural steel in crafting luxurious and enduring villas.",
            "Tailored Design Solutions: Advancements allow Khales to offer customized solutions for villa construction. Whether it's sleek modern lines or timeless classic elegance, structural steel can be adapted to each client's vision.",
          ],
          quote:
            "Steel is not just a material, it's a design philosophy that enables architectural freedom.",
          paragraphAfterQuote:
            "The integration of steel structures in luxury villas has opened new possibilities for open floor plans and expansive glass facades. Architects can now create cantilevers and large spans previously impossible with traditional materials.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "The Future of Villa Construction",
          thirdParagraph:
            "As urbanization increases and land becomes more valuable, steel structures allow for taller, more efficient villa designs. These designs maximize space while minimizing environmental impact through efficient material usage.",
          listItems: [
            "High-Strength Low-Alloy (HSLA) steels for exceptional strength",
            "3D Modeling and BIM for precision engineering",
            "Fire-resistant coatings for enhanced safety",
          ],
          fourthParagraph:
            "Cost-Efficiency and Time Savings: Construction is accelerated through precise prefabrication. Looking ahead, we anticipate innovations in composite materials and smart steel technologies that respond dynamically to environmental conditions.",
        },
      },
      {
        id: 3,
        slug: "innovative-approaches-high-rise-building-structures",
        coverImage:
          "https://i.ibb.co/G4CrSXX1/Whats-App-Image-2025-08-19-at-17-26-04-94ea9f47.jpg",
        tags: ["Construction", "Engineering"],
        title: "Innovative Approaches to High-Rise Building Structures",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Engineering Department",
        date: "August 5, 2023",
        description:
          "In the dynamic landscape of construction, the demand for high-rise buildings continues to soar...",
        postMeta: {
          title:
            "Innovative Approaches to High-Rise Building Structures | Khales Engineering",
          description:
            "Discover cutting-edge foundation technologies for high-rise buildings, including advanced pile foundations, soil-structure interaction studies, and SCC.",
          keywords: [
            "high-rise building construction",
            "foundation technology",
            "structural engineering dubai",
            "helical piles",
            "auger-cast piles",
            "soil-structure interaction",
            "geotechnical engineering uae",
            "self-compacting concrete (SCC)",
            "modular foundation systems",
            "khales engineering",
            "tower construction",
            "urban construction",
            "building stability",
            "advanced monitoring construction",
            "proactive issue resolution",
          ],
        },
        fullContent: {
          subtitle: "Redefining the bedrock of towering structures",
          paragraphs: [
            "In the dynamic landscape of construction, the demand for high-rise buildings continues to soar, driven by urbanization and the need for efficient space utilization. As we reach new heights, Khales recognizes the importance of innovative approaches to high-rise building foundations.",
            "Advanced Pile Foundations: Advancements in technology have ushered in new methods such as helical piles and auger-cast piles. These techniques provide enhanced load-bearing capacity and reduced environmental impact.",
          ],
          quote:
            "As Khales Project Management delves into the future of high-rise construction, innovative approaches pave the way for safer, more efficient structures.",
          paragraphAfterQuote:
            "We are committed to staying at the forefront of these advancements, ensuring our projects not only reach new heights but stand firmly on foundations engineered for excellence.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Cutting-Edge Foundation Technologies",
          thirdParagraph:
            "Soil-Structure Interaction Studies: Modern geotechnical engineering utilizes sophisticated studies to analyze soil-structure interaction, enabling optimized foundation design based on specific site conditions.",
          listItems: [
            "Self-Compacting Concrete (SCC) Technology for efficient placement",
            "Modular Foundation Systems with prefabricated components",
            "Hybrid Foundation Designs combining various foundation types",
          ],
          fourthParagraph:
            "Advanced Monitoring and Instrumentation: Real-time monitoring of foundation performance is essential for long-term stability. Khales embraces sensor technologies providing continuous data on movements and stresses for proactive measures.",
        },
      },
      {
        id: 4,
        slug: "eco-friendly-materials-modern-interior-design",
        coverImage:
          "https://i.ibb.co/ymSCJMgz/Whats-App-Image-2025-08-19-at-17-26-04-3e992f7c.jpg",
        tags: ["Interior", "Design"],
        title: "Eco-Friendly Materials in Modern Interior Design",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Interior Design Department",
        date: "August 20, 2023",
        description:
          "As we strive to create spaces that marry aesthetics with ethical responsibility...",
        postMeta: {
          title:
            "Eco-Friendly Materials in Modern Interior Design | Khales Design",
          description:
            "Learn about sustainable interior design materials like bamboo, reclaimed wood, recycled materials, and low VOC paints to create beautiful and ethical spaces.",
          keywords: [
            "eco-friendly interior design",
            "sustainable materials",
            "green interior design",
            "reclaimed wood furniture",
            "bamboo flooring",
            "low VOC paint",
            "recycled materials design",
            "upcycled decor",
            "organic cotton textiles",
            "cork flooring benefits",
            "healthy home environment",
            "khales interior design",
            "ethical design choices",
            "sustainable living dubai",
            "holistic design approach",
          ],
        },
        fullContent: {
          subtitle:
            "Exploring beauty and functionality of sustainable materials",
          paragraphs: [
            "As we strive to create spaces that marry aesthetics with ethical responsibility, the integration of sustainable materials becomes pivotal. Journey through the eco-conscious realm of interior design.",
            "Embracing Nature's Bounty: Sustainable design begins with reverence for nature. Choosing materials from renewable resources like bamboo and reclaimed wood infuses spaces with natural warmth.",
          ],
          quote:
            "Embracing sustainable materials in interior design is not merely a trend; it's a commitment to a more harmonious relationship with our planet.",
          paragraphAfterQuote:
            "As designers and homeowners tread the path of sustainable living, each material choice becomes a step towards a greener, more beautiful future.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Sustainable Design Elements",
          thirdParagraph:
            "Low VOC, High Impact: Sustainable design prioritizes indoor air quality. Low Volatile Organic Compound paints ensure spaces are visually appealing while contributing to healthier environments.",
          listItems: [
            "Recycled materials minimize waste while adding artistic touches",
            "Innovative textiles like organic cotton reduce environmental footprint",
            "Cork flooring offers acoustic insulation and eco-friendly alternative",
          ],
          fourthParagraph:
            "Upcycled Wonders: Transforming discarded items into stunning focal points fosters creativity. Holistic Design: Consider Khales for your sustainable interior design journey where beauty meets responsibility.",
        },
      },
      {
        id: 5,
        slug: "effective-stakeholder-communication-project-management",
        coverImage:
          "https://i.ibb.co/7xjnS53y/Whats-App-Image-2025-08-19-at-17-26-03-e5f96ef0.jpg",
        tags: ["Management", "Communication"],
        title: "Effective Stakeholder Communication in Project Management",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Project Management Department",
        date: "September 3, 2023",
        description:
          "In the intricate tapestry of project management, effective communication with stakeholders stands as a linchpin for success...",
        postMeta: {
          title:
            "Effective Stakeholder Communication in Project Management | Khales PM",
          description:
            "Discover key strategies for effective stakeholder communication in construction project management, including tailored plans, clear objectives, and timely updates.",
          keywords: [
            "stakeholder communication",
            "project management communication",
            "construction project success",
            "transparent project management",
            "communication plan project management",
            "stakeholder engagement",
            "khales project management",
            "proactive issue resolution",
            "client communication",
            "project lifecycle management",
            "project updates",
            "decision making process",
            "post-project evaluation",
            "pm software",
            "consistent communication",
          ],
        },
        fullContent: {
          subtitle: "Strategies that shape projects to exceed expectations",
          paragraphs: [
            "In the intricate tapestry of project management, effective communication with stakeholders stands as a linchpin for success. Khales understands that transparency throughout the project lifecycle is paramount.",
            "Our commitment to effective stakeholder communication is ingrained in every project we undertake, creating a management ecosystem where communication drives success.",
          ],
          quote:
            "Our team looks forward to creating a project management ecosystem where strategic communication is the driving force behind successful outcomes.",
          paragraphAfterQuote:
            "The next project will be with you, guided by clear, consistent communication that meets and exceeds expectations.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Key Communication Strategies",
          thirdParagraph:
            "At Khales, we implement proven strategies that ensure project success through effective stakeholder engagement:",
          listItems: [
            "Tailored Communication Plans for different stakeholder groups",
            "Establishing Clear Project Objectives from the outset",
            "Consistent and Timely Updates throughout the project lifecycle",
          ],
          fourthParagraph:
            "Additional approaches include: Utilizing Project Management Software, Proactive Issue Resolution, Engaging Stakeholders in Decision-Making, and Post-Project Evaluation to refine future communications.",
        },
      },
      {
        id: 6,
        slug: "balance-aesthetics-functionality-interior-design",
        coverImage:
          "https://i.ibb.co/LztWgNMp/Whats-App-Image-2025-08-19-at-17-26-03-9c758071.jpg",
        tags: ["Interior", "Design"],
        title:
          "Achieving Balance Between Aesthetics and Functionality in Interior Design",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Interior Design Department",
        date: "September 18, 2023",
        description:
          "In the realm of interior design, striking the delicate balance between aesthetics and functionality is an art form...",
        postMeta: {
          title:
            "Balancing Aesthetics & Functionality in Interior Design | Khales",
          description:
            "Explore strategies for creating harmonious interior designs that perfectly balance beauty and practicality, including smart storage and versatile layouts.",
          keywords: [
            "aesthetics and functionality",
            "interior design balance",
            "form and function design",
            "harmonious design",
            "practical interior design",
            "beautiful interiors",
            "smart storage solutions",
            "versatile spaces",
            "efficient space use",
            "khales interior design dubai",
            "optimizing layouts",
            "purposeful design",
            "elegant interiors",
            "art of interior design",
            "livable spaces",
          ],
        },
        fullContent: {
          subtitle: "Strategies that define harmonious equilibrium",
          paragraphs: [
            "In the realm of interior design, striking the delicate balance between aesthetics and functionality is an art form. Explore the strategies with Khales that define this harmonious equilibrium.",
            "The Intersection of Form and Function: Recognizing that a well-designed space marries form and function. Each element serves a dual purpose - enhancing visual appeal while meeting practical needs.",
          ],
          quote:
            "Khales Project Management strives for a synthesis of aesthetics and functionality, creating spaces that resonate with beauty and purpose.",
          paragraphAfterQuote:
            "Join our pursuit of harmonious design where every element serves a purpose, and every purpose is infused with elegance.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Principles of Balanced Design",
          thirdParagraph:
            "Tailored Design Solutions: Rejecting one-size-fits-all approaches. Crafting solutions to unique needs ensures aesthetic choices complement required functionality.",
          listItems: [
            "Optimizing Layouts for seamless flow and efficient space use",
            "Incorporating Smart Storage Solutions for organization",
            "Creating versatile spaces that adapt to evolving needs",
          ],
          fourthParagraph:
            "At Khales, we believe in spaces that are as practical as they are beautiful. Our designs integrate smart solutions that maintain visual appeal while serving real-world needs for daily living.",
        },
      },
      {
        id: 7,
        slug: "sustainable-architecture-practices",
        coverImage:
          "https://i.ibb.co/KzWLjvKK/Whats-App-Image-2025-08-19-at-17-26-02-d2a9b715.jpg",
        tags: ["Architecture", "Sustainability"],
        title: "Sustainable Architecture Practices",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Architecture Department",
        date: "October 2, 2023",
        description:
          "In the contemporary era, with increasing global focus on environmental sustainability...",
        postMeta: {
          title:
            "Sustainable Architecture Practices: Building a Greener Future | Khales",
          description:
            "An overview of core sustainable architecture practices, including passive design, green materials, energy efficiency, and water conservation methods.",
          keywords: [
            "sustainable architecture",
            "green building practices",
            "passive design strategies",
            "energy-efficient systems",
            "water conservation architecture",
            "recycled building materials",
            "green roofs dubai",
            "biodiverse landscaping",
            "waste reduction construction",
            "life cycle assessment",
            "agile project management sustainability",
            "khales sustainability",
            "eco-friendly architecture",
            "responsible design",
            "building a greener tomorrow",
          ],
        },
        fullContent: {
          subtitle: "Building a greener tomorrow through responsible design",
          paragraphs: [
            "In the contemporary era, with increasing global focus on environmental sustainability, sustainable architecture has evolved into a pivotal force. At Khales, our dedication to weaving sustainability into every aspect of design is unwavering.",
            "Passive Design Strategies represent the bedrock of our sustainable ethos. These maximize natural resources like sunlight and ventilation, optimizing comfort while minimizing energy use.",
          ],
          quote:
            "As we look towards the future, Khales invites you to join our journey towards sustainable architecture.",
          paragraphAfterQuote:
            "Every project is not just a testament to architectural excellence but a declaration to build a greener, more sustainable tomorrow.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Core Sustainable Practices",
          thirdParagraph:
            "Green Building Materials: We meticulously select materials like recycled steel and reclaimed wood to minimize environmental impact.",
          listItems: [
            "Energy-Efficient Systems with solar panels and smart management",
            "Water Conservation through rainwater harvesting",
            "Biodiverse Landscaping with native plants and green roofs",
          ],
          fourthParagraph:
            "Waste Reduction and Recycling: We adopt circular approaches to minimize waste. Life Cycle Assessments evaluate environmental impact from conception to demolition. Combined with Agile Project Management principles, we ensure adaptive planning and efficient resource use.",
        },
      },
      {
        id: 8,
        slug: "importance-of-agile-project-management",
        coverImage:
          "https://i.ibb.co/1Gmvq9cD/Whats-App-Image-2025-08-19-at-17-26-02-f7fd0ec6.jpg",
        tags: ["Management", "Agile"],
        title: "The Importance of Agile Project Management",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Project Management Department",
        date: "October 17, 2023",
        description:
          "In the fast-paced world of construction, agility isn't just a desirable trait; it's a game-changer...",
        postMeta: {
          title:
            "The Importance of Agile Project Management in Construction | Khales",
          description:
            "Discover why Agile project management is a game-changer for the construction industry, focusing on adaptive planning, collaboration, and risk mitigation.",
          keywords: [
            "agile project management",
            "agile construction",
            "adaptive planning",
            "iterative development construction",
            "risk mitigation strategies",
            "client-centric approach",
            "construction collaboration",
            "khales agile pm",
            "efficient resource utilization",
            "fast-paced construction",
            "agile principles",
            "continuous improvement",
            "stakeholder alignment",
            "dynamic project management",
            "construction excellence",
          ],
        },
        fullContent: {
          subtitle: "Building with adaptability and excellence",
          paragraphs: [
            "In the fast-paced world of construction, agility isn't just desirable; it's a game-changer. At Khales, we recognize Agile Project Management's paramount importance in the construction industry.",
            "Adaptive Planning: Construction projects are inherently dynamic. We embrace Agile principles to facilitate planning that evolves with changing requirements and challenges.",
          ],
          quote:
            "As we navigate the construction landscape, Agile Project Management emerges as a cornerstone for success.",
          paragraphAfterQuote:
            "At Khales Project Management, we don't just build structures; we build with agility, adaptability, and excellence.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Agile Principles in Action",
          thirdParagraph:
            "Enhancing Collaboration: Regular team meetings and open communication ensure all stakeholders are aligned, fostering transparency and teamwork.",
          listItems: [
            "Rapid Response to changes and client feedback",
            "Iterative Development for continuous improvement",
            "Efficient Resource Utilization prioritizing value",
          ],
          fourthParagraph:
            "Risk Mitigation: We identify potential issues early. Client-Centric Approach: Regular client involvement ensures results align with vision. Continuous Monitoring enables learning and optimization for future projects.",
        },
      },
      {
        id: 9,
        slug: "ai-on-job-site-reducing-construction-risk",
        coverImage:
          "https://i.ibb.co/cSHpQVB4/Whats-App-Image-2025-08-19-at-17-26-01-7445188c.jpg",
        tags: ["Technology", "Safety"],
        title:
          "AI on the Job Site: How Predictive Tech Is Reducing Construction Risk",
        authorImage: "/assets/Khales Logo K - favicon.png",
        authorName: "Khales Tech Division",
        date: "November 5, 2023",
        description:
          "Smart cameras, digital twins and talking sensors are rewriting the site-safety rulebook.",
        postMeta: {
          title:
            "AI on the Job Site: Reducing Construction Risk with Predictive Tech | Khales",
          description:
            "Learn how AI technologies like computer vision, digital twins, and IoT sensors are being used to predict and reduce risks on construction sites in the UAE.",
          keywords: [
            "AI in construction",
            "predictive technology",
            "construction safety",
            "reducing construction risk",
            "computer vision safety",
            "digital twins construction",
            "IoT sensors construction",
            "site safety management",
            "construction technology uae",
            "khales technology",
            "predictive maintenance",
            "data-driven construction",
            "smart construction sites",
            "AI for site audits",
            "gulf construction projects",
          ],
        },
        fullContent: {
          subtitle: "Why Yesterday's Checks Aren't Enough",
          paragraphs: [
            "Late deliveries, surprise breakdowns and on-site accidents still drain billions of dirhams from Gulf projects each year. Traditional inspections catch many problems only after concrete is poured or—worse—someone gets hurt.",
            "Artificial intelligence flips the timeline. By turning real-time data into early warnings, it allows crews to fix issues before they threaten the programme or the safety record.",
          ],
          quote: "Tech that protects workers also protects the bottom line.",
          paragraphAfterQuote:
            "Projects that roll out even one of these AI tools enjoy tighter budgets, smoother audits and friendlier insurance premiums. Lower incident rates also boost a contractor's pre-qualification score—pure gold when bidding on the next mega-development.",
          socialCounts: [1816, 37, 47000, 15000],
          sectionTitle: "Three Predictive Tools Making the Difference",
          thirdParagraph:
            "These AI-powered solutions are transforming construction site management:",
          listItems: [
            "Computer-vision safety nets: High-res cameras detect risks like missing helmets or unsafe ladder angles, reducing lost-time injuries by ~25%",
            "Digital schedule twins: Living 3D models combining BIM with weather forecasts and delivery trackers that flag conflicts weeks before they appear on Gantt charts",
            "Sensor-based asset health: IoT tags monitor equipment health, cutting downtime by ~33% through predictive maintenance",
          ],
          fourthParagraph:
            "Voice-controlled site dashboards, drone-based progress scans and AI-generated method statements are already in pilot use around the GCC. The message is clear: data-driven sites are no longer futuristic; they are becoming the minimum standard for premium construction. Khales Project Management embeds AI vision, schedule twins and sensor analytics into every project plan—helping you deliver on time, on budget and without surprises.",
        },
      },
    ],
  },
  servicesPage: {
    "project-management": {
      metaTitle: "Project Management Services in Dubai | Khales Group",
      metaDescription:
        "Explore our comprehensive project management services, from 360° oversight and feasibility studies to development planning. We deliver projects on time and within budget.",
      metaKeywords: [
        "project management dubai",
        "construction management uae",
        "feasibility study",
        "development planning",
        "360 project management",
        "client representative service",
      ],
      title: "Project Management Services",
      intro:
        "Our project management services ensure your vision is realized with clarity, efficiency, and accountability. From initial planning to final handover, we provide expert oversight to keep your project on schedule, within budget, and to the highest standards of quality.",
    },
    EngineeringConsultancy: {
      metaTitle: "Engineering Consultancy Services in UAE | Khales Group",
      metaDescription:
        "Discover expert engineering consultancy services including design, site supervision, interior design, and landscaping. We turn creative visions into buildable solutions.",
      metaKeywords: [
        "engineering consultancy uae",
        "engineering design dubai",
        "site supervision services",
        "interior design company",
        "landscape architecture",
        "mep design",
      ],
      title: "Engineering Consultancy Services",
      intro:
        "Our engineering team provides the technical foundation for projects that are safe, compliant, and built to last. We translate creative vision into practical, buildable solutions, ensuring every detail is meticulously planned and executed.",
    },
    subServices: {
      "360-project-management": {
        categorySlug: "project-management",
        path: "/services/ProjectManagement",
        image: "https://i.ibb.co/FL5BsmnZ/BAN-360.png",
        title: "360° Project Management",
        description:
          "A complete, end-to-end solution managing your project from initial concept to final handover.",
      },
      "project-manager-service": {
        categorySlug: "project-management",
        path: "/services/ProjectManager",
        image: "https://i.ibb.co/8JfxX3q/BAN-PM.png",
        title: "Project Manager Service",
        description:
          "Your official representative, overseeing all teams to ensure your project stays on track.",
      },
      "feasibility-study": {
        categorySlug: "project-management",
        path: "/services/Projectfeasability",
        image: "https://i.ibb.co/39sLhVqb/BANNER-STUDY.png",
        title: "Feasibility Study",
        description:
          "Evaluating if your project is achievable, profitable, and aligned with budget and regulations.",
      },
      "development-planning": {
        categorySlug: "project-management",
        path: "/services/development-planning",
        image: "https://i.ibb.co/ymhSpp0t/BAN-DEV.png",
        title: "Development Planning",
        description:
          "Turning a raw plot of land into a viable project with a clear, regulation-aligned plan.",
      },
      "engineering-design": {
        categorySlug: "EngineeringConsultancy",
        path: "/services/EngineeringDesign",
        image: "https://i.ibb.co/rGFt2Dk3/ban-eng-des.png",
        title: "Engineering Design",
        description:
          "Providing all technical documents and calculations to take your project from vision to construction.",
      },
      "engineering-supervision": {
        categorySlug: "EngineeringConsultancy",
        path: "/services/EngineeringSupervision",
        image: "https://i.ibb.co/MkyXq4d1/ban-engsupre.png",
        title: "Engineering Supervision",
        description:
          "Hands-on technical monitoring to ensure work is executed per approved drawings and regulations.",
      },
      "interior-design": {
        categorySlug: "EngineeringConsultancy",
        path: "/services/InteriorDesign",
        image: "https://i.ibb.co/wrzKMJRz/interior.png",
        title: "Interior Design",
        description:
          "Shaping how people live and experience a space with functional and refined interiors.",
      },
      "landscape-design": {
        categorySlug: "EngineeringConsultancy",
        path: "/services/LandscapingDesign",
        image: "https://i.ibb.co/qLpSLzr9/7-Landscape.jpg",
        title: "Landscape Design",
        description:
          "Designing elegant and functional outdoor spaces that balance nature with built features.",
      },
    },
    learnMore: "Learn More →",
  },
  landingPage: {
    metaTitle:
      "Khales | Luxury Villa Design, Engineering & Construction in Dubai & Abu Dhabi",
    metaDescription:
      "Transform your vision into reality with Khales. We specialize in luxury villa design, engineering consultancy, interior design, and full-service construction across the UAE. Partner with us to build your dream home.",
    metaKeywords: [
      "Khales",
      "Luxury villa design Dubai",
      "Engineering consultants UAE",
      "High-end construction Abu Dhabi",
      "Interior Design",
      "Architecture Firm UAE",
      "Project Management",
      "Landscape Design",
      "Khales Projects",
      "Building contractors in Dubai",
    ],
    navLinks: {
      pm: "Project Management",
      eng: "Engineering",
      interior: "Interior Design",
      landscape: "Landscape",
    },
    hero: {
      headline1: "Your Partners in Luxury",
      headline2: "For Design & Construction",
      cta: "Start Your Design",
    },
    projectManagement: {
      title: "Project Management:",
      subtitle: "With Khales, your project is in safe hands.",
      paragraph:
        "At Khales, we manage the entire process to give you peace of mind. We handle all stages, from initial approvals and procedures to daily supervision and on-time delivery. Our mission is to ensure the workflow is seamless, without any hassle on your part.",
    },
    engineering: {
      title: "Engineering Consultancy",
      paragraph:
        "Our team of engineers prepares precise, integrated plans that comply with site requirements, conducting a comprehensive review of every detail to ensure safety, efficiency, and long-term performance.",
      services: [
        {
          imageUrl:
            "https://i.ibb.co/LXThd4n4/Whats-App-Image-2025-07-02-at-18-33-19-1907bd25.jpg",
          title: "Concept Design",
        },
        {
          imageUrl:
            "https://i.ibb.co/JFzxMbPc/Whats-App-Image-2025-07-02-at-18-31-13-bfc6017c.jpg",
          title: "Architecture",
        },
        {
          imageUrl:
            "https://i.ibb.co/XfcMCS36/Whats-App-Image-2025-07-02-at-18-31-13-a18478d0.jpg",
          title: "Structural",
        },
        {
          imageUrl:
            "https://i.ibb.co/674FJfsK/khales-ae-Electrical-plumbing-overlays-HVAC-layout-and-coor-d18c301c-e0f1-48b6-84ef-7e8ecead01b2-0.png",
          title: "MEP",
        },
      ],
    },
    interiorDesign: {
      title: "Interior Design",
      paragraph:
        "We create unique interior designs that reflect your refined taste and meet your daily needs. We translate your vision into a tangible reality, creating spaces that combine elegance and functionality to turn your home into a comfortable and vibrant sanctuary.",
    },
    landscape: {
      title: "Landscape Design",
      paragraph:
        "We create unique outdoor spaces where nature meets art. We design gardens and landscapes that are an extension of your home and lifestyle, focusing on creating a perfect balance between visual beauty and practical comfort, making the best use of the local climate and environment.",
    },
    form: {
      title: "Register Your Interest",
      paragraph:
        "Fill out the form, and a member of our team will contact you shortly to discuss your project.",
      emailLinkText: "info@khales.ae",
      placeholders: {
        name: "Full Name",
        email: "Email Address",
        phone: "Mobile Number (05XXXXXXXX)",
        emirate: "In which emirate is your land plot?",
        budget: "Expected Construction Budget",
      },
      emirates: [
        "Abu Dhabi",
        "Dubai",
        "Sharjah",
        "Ajman",
        "Umm Al Quwain",
        "Ras Al Khaimah",
        "Fujairah",
      ],
      budgets: ["Less than 1.5M AED", "1.5M - 2.5M AED", "More than 2.5M AED"],
      submit: "Submit",
      submitting: "Submitting...",
      errors: {
        name: "Full name is required",
        email: "Email is required",
        emailInvalid: "Email format is invalid",
        phone: "Please enter a valid UAE phone number (e.g., 05XXXXXXXX)",
        emirate: "Please select an emirate",
        budget: "Please select a budget",
      },
      successMessage: "Submitted successfully! We will contact you soon.",
      errorMessage: "An error occurred: Please try again.",
    },
  },
  privacyPolicyPage: {
    metaTitle: "Privacy Policy | Khales Group",
    metaDescription:
      "Read the Khales Project Management Privacy Policy to understand how we collect, use, and safeguard your personal information on our website and services.",
    metaKeywords: [
      "privacy policy",
      "data protection",
      "personal information",
      "khales legal",
      "user data",
    ],
    title: "Privacy Policy",
    lastUpdated: "This Privacy Policy was last updated on September 3, 2025.",
    sections: [
      {
        heading: "Introduction",
        content: `We at Khales Project Management value your privacy and are committed to safeguarding it by adhering to this privacy policy ("Policy"). This Policy outlines how we collect, use, maintain, and disclose your personal information ("Personal Information") on our website ("Website") and related products and services (collectively, "Services"). It also details your options regarding our use of your personal information and how you can access and update it.`,
      },
      {
        heading: "Agreement to Policy",
        content: `This Policy is a legally binding agreement between you ("User", "you" or "your") and Khales Project Management ("Khales", "we", "us" or "our"). By accessing or using our Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. If you do not agree to the terms of this Policy, you must discontinue the use of our Website and Services.`,
      },
      {
        heading: "Collection of Personal Information",
        content: `We collect and process personal information that you voluntarily provide to us when registering on the Website, subscribing to a newsletter, filling out a form, or interacting with our Services. This information may include, but is not limited to:`,
        list: [
          "Name and contact information (such as email address and phone number)",
          "Geolocation data (where applicable)",
          "Device and usage information",
        ],
        extra: `You can choose not to provide us with your Personal Information; however, doing so may prevent you from using certain features of our Website and Services.`,
      },
      {
        heading: "Use of Collected Information",
        content: `We use your Personal Information for the following purposes:`,
        list: [
          "To improve user experience and enhance our Services",
          "To respond to inquiries and support requests",
          "To comply with legal obligations",
          "To run and maintain our Website and Services",
        ],
        extra: `We process your information with your consent or as required to fulfill our contractual obligations to you, comply with legal requirements, or protect legitimate business interests.`,
      },
      {
        heading: "Data Security",
        content: `We implement robust security measures to protect your Personal Information from unauthorized access, alteration, or disclosure. While we take reasonable precautions, please be aware that no transmission of data over the internet can be entirely secure.`,
      },
      {
        heading: "Disclosure of Information",
        content: `We may share your Personal Information with trusted partners and service providers to assist in operating our Website and delivering our Services. These partners are bound by confidentiality obligations and are not permitted to use your data for any other purpose.`,
      },
      {
        heading: "Retention of Information",
        content: `We retain your Personal Information for as long as necessary to fulfill the purposes outlined in this Policy unless a longer retention period is required or permitted by law.`,
      },
      {
        heading: "Your Data Protection Rights",
        content: `You have the right to:`,
        list: [
          "Access, update, or delete your Personal Information",
          "Restrict or object to the processing of your data",
          "Withdraw consent at any time",
        ],
      },
      {
        heading: "Changes to This Policy",
        content: `We may update this Policy periodically to reflect changes in our practices or for legal or regulatory reasons. Any changes will be posted on this page, and your continued use of our Website and Services constitutes your acceptance of the updated Policy.`,
      },
      {
        heading: "Contact Us",
        content: `If you have any questions or concerns about this Policy or your personal data, please contact us at:`,
        contactDetails: ["Email: info@khales.ae", "Phone: +971551299880"],
      },
    ],
  },
  comingSoonPage: {
    metaTitle: "Page Coming Soon | Khales Group",
    metaDescription:
      "This page is currently under construction. Please check back later for updates from Khales Group.",
    title: "Page Coming Soon!",
    description:
      "We are working hard to bring you this page. It's under construction, but it will be worth the wait. Please check back later.",
    buttonText: "Go to Homepage",
  },
  thankYouPage: {
    metaTitle: "Thank You for Contacting Us | Khales Group",
    metaDescription:
      "Thank you for your submission. A member of the Khales Group team will be in touch with you shortly.",
    icon: "", // An icon component can be placed here.
    title: "Thank You!",
    message:
      "Your submission has been received successfully. A member of our team will be in touch with you shortly to discuss your project.",
    buttonText: "Return to Homepage",
  },
  notFoundPage: {
    title: "Page Not Found",
    description:
      "Oops! The page you are looking for does not exist. It might have been moved or deleted.",
    buttonText: "Go to Homepage",
  },
  projectTypes: {
    header: {
      title: "Projects Categories",
      subtitle:
        "From intimate sanctuaries to the cornerstones of community life, we transform ambitious ideas into tangible landmarks.",
    },
    items: [
      {
        title: "Residential",
        highlight: "Projects",
        description:
          "We design and manage projects with one mission: to redefine luxury and transform your vision into the perfect living space. ",
        showcaseSubtitle: "Homes that define generations...",
        linkText: "Explore Residential Worlds",
        slug: "Residential",
      },
      {
        title: "Commercial",
        highlight: "Projects",
        description:
          "We provide project management and engineering consultancy expertise to ensure your commercial project is executed on time and on budget ",
        showcaseSubtitle: "Engineering the landmarks of tomorrow...",
        linkText: "Explore Commercial Destinations",
        slug: "Commercial",
      },
      {
        title: "Luxury",
        highlight: "Villas",
        description:
          "Timeless luxury is our core expertise. We guarantee on time project execution and to deliver perfect living spaces. ",
        showcaseSubtitle: "Crafting your personal sanctuary...",
        linkText: "Discover Exquisite Villas",
        slug: "Luxury-Villas",
      },
    ],
  },

  residentialPage: {
    services: [
      {
        id: "Buildings",
        title: "Buildings",
        src: "https://i.ibb.co/tT0NKPxF/Whats-App-Image-2025-09-14-at-13-45-06-987b91ba.jpg",
      },
      {
        id: "Townhouses",
        title: "Townhouses",
        src: "https://i.ibb.co/BVShpR5x/Whats-App-Image-2025-09-14-at-14-03-22-76644d88.jpg",
      },
      {
        id: "Standalone Villas",
        title: "Standalone Villas",
        src: "https://i.ibb.co/zpG2XvY/Whats-App-Image-2025-09-14-at-13-51-04-99879083.jpg",
      },
      {
        id: "Penthouses",
        title: "Penthouses",
        src: "https://i.ibb.co/RktB3pMj/Whats-App-Image-2025-09-14-at-14-24-29-0ddf6107.jpg",
      },
      {
        id: "Gated Communities",
        title: "Gated Communities",
        src: "https://i.ibb.co/QBxd96n/Whats-App-Image-2025-09-14-at-14-08-44-95d6e3a4.jpg",
      },
      {
        id: "Branded Residences",
        title: "Branded Residences",
        src: "https://i.ibb.co/LzmC3D0V/branded.jpg",
      },
    ],
    servicesSectionContent: {
      title: "Residential  Classes",
      linkText: "All Residential Classes",
    },
    meta: {
      title:
        "Luxury Residential Architecture: Buildings, Mansions, Villas | Khales",
      description:
        "From iconic residential buildings that redefine skylines to exclusive mansions and serene villas, discover our portfolio of luxury living spaces tailored for you.",
    },
    header: {
      tag: "RESIDENTIAL PROJECTS",
      title: "Luxury Residential Projects Across the UAE",
      year: "2020-2024",
      location: "Across the UAE",
      services: "Full-Cycle Design & Build",
      bgImage: "https://i.ibb.co/5gYG32cT/Screenshot-2025-08-19-153006.png",
    },
    gallery: {
      title: "Residential Showcase",
      images: [
        {
          src: "https://i.ibb.co/35xjVNt4/Screenshot-2025-08-19-154138.png",
          title: "Modern Building Exterior with Water Feature",
        },
        {
          src: "https://i.ibb.co/5gJJpQ7F/Screenshot-2025-08-19-154310.png",
          title: "Grand Atrium Lobby",
        },
        {
          src: "https://i.ibb.co/whzNWQgp/Screenshot-2025-08-19-162608.png",
          title: "Open-Plan Living and Kitchen Area",
        },
        {
          src: "https://i.ibb.co/pj4pCr6F/Screenshot-2025-08-19-162543.png",
          title: "Residential Building with Green Terraces",
        },
        {
          src: "https://i.ibb.co/pBbqBsD1/Screenshot-2025-08-19-154236.png",
          title: "Luxurious Lobby with Palm Trees and Chandelier",
        },
        {
          src: "https://i.ibb.co/7NxsWySc/Screenshot-2025-08-19-154348.png",
          title: "Modern Kitchen and Dining Area",
        },
        {
          src: "https://i.ibb.co/4gp06CFY/Screenshot-2025-08-19-154407.png",
          title: "Contemporary Kitchen with Island and View",
        },
      ],
    },
    overview: {
      title: "Homes Engineered for Living",
      text: [
        "Elevating your living experience is our mission. We craft residential spaces that are a perfect blend of luxury, sophistication, and enduring value. With a focus on architectural precision and seamless project management, we handle everything from private villas to grand buildings. Our comprehensive, turnkey service brings your vision to life, from the first design concept to the final handover.",
      ],
      tag: "From Luxury Buildings to Bespoke Residences",
      image:
        "https://i.ibb.co/z3f5Ssw/Whats-App-Image-2025-08-19-at-17-39-07-8327f9de.jpg",
    },
    challenges: {
      title: "Engineered Luxury. Timeless Living.",
      text: "Each home we design is more than a structure, it is a lifestyle investment built to last.",
      solutions: [
        "Bespoke Design Solutions – Residences that reflect your taste, culture, and aspirations.",
        "Cohesive Turnkey Delivery – A complete solution from permits to handover.",
        "Enduring Quality – Premium materials, sustainable choices, and refined finishes.",
      ],
      image:
        "https://i.ibb.co/VWbFLYMr/Whats-App-Image-2025-08-19-at-17-39-07-38659e0b.jpg",
    },
    principles: {
      title: "The Foundations of Home",
      subtitle:
        "Our residential philosophy is built on creating spaces that are not just beautiful, but are deeply connected to the lifestyles of those who inhabit them.",
      cards: [
        {
          icon: "home",
          title: "Lifestyle-Centric Design",
          description:
            "We go beyond architecture to design for your life, creating intuitive layouts and personal touches that make a house feel like a true home.",
        },
        {
          icon: "gem",
          title: "Masterful Craftsmanship",
          description:
            "We are dedicated to a tangible sense of quality, using enduring materials and meticulous techniques that you can see and feel every day.",
        },
        {
          icon: "key",
          title: "A Personal Journey",
          description:
            "Building a home is personal. We treat the process as a collaborative journey, ensuring transparency and a seamless experience from vision to handover.",
        },
      ],
    },
    labels: {
      year: "Year",
      location: "Location",
      services: "Services",
      scrollLeft: "Scroll Left",
      scrollRight: "Scroll Right",
    },
  },
  commercialPage: {
    services: [
      {
        id: "Schools",
        title: "Schools",
        src: "https://i.ibb.co/Dfqz9fPc/Screenshot-2025-09-03-163218.png",
      },
      {
        id: "Hospitals",
        title: "Hospitals",
        src: "https://i.ibb.co/wNXp9qTQ/Screenshot-2025-09-03-163004.png",
      },
      {
        id: "Malls",
        title: "Malls",
        src: "https://i.ibb.co/whcX2LDJ/Screenshot-2025-09-03-163540.png",
      },
      {
        id: "Gyms & Fitness Club",
        title: "Gyms & Fitness Club",
        src: "https://i.ibb.co/yBp8wtWr/Screenshot-2025-09-03-163226.png",
      },
      {
        id: "Airports",
        title: "Airports",
        src: "https://i.ibb.co/Zz2L1Ds4/Screenshot-2025-09-03-163145.png",
      },
      {
        id: "Universites",
        title: "Universites",
        src: "https://i.ibb.co/21JrKcS1/Screenshot-2025-09-03-163157.png",
      },
    ],
    servicesSectionContent: {
      title: "Commercial  Classes",
      linkText: "All Commercial Classes",
    },
    meta: {
      title: "Commercial Project Management & Reinvention | Khales",
      description:
        "Khales specializes in commercial reinvention through expert project management. We transform and deliver commercial projects, from malls to hospitals, on time and on budget.",
    },
    header: {
      tag: "COMMERCIAL PROJECTS",
      title: "Commercial Projects that Define Business Success",
      year: "2018-2024",
      location: "Dubai, Abu Dhabi",
      services: "End-to-End Project Management",
      bgImage: "https://i.ibb.co/WNQVrKTw/Screenshot-2025-08-19-163549.png",
    },
    gallery: {
      title: "Commercial Portfolio",
      images: [
        {
          src: "https://i.ibb.co/hJnXF2nB/Screenshot-2025-08-19-161351.png",
          title: "Commercial Building with Rooftop Pool",
        },
        {
          src: "https://i.ibb.co/xrb1rTT/Screenshot-2025-08-19-161402.png",
          title: "Sports Complex with Tennis Courts",
        },
        {
          src: "https://i.ibb.co/v69Zzfsf/Screenshot-2025-08-19-161428.png",
          title: "Shopping Mall Interior with Palm Trees",
        },
        {
          src: "https://i.ibb.co/WNQVrKTw/Screenshot-2025-08-19-163549.png",
          title: "Modern Commercial Building at Night",
        },
        {
          src: "https://i.ibb.co/39N0kDJ8/Screenshot-2025-08-19-161450.png",
          title: "Restaurant Interior",
        },
        {
          src: "https://i.ibb.co/wrCF8HS2/Screenshot-2025-08-19-161535.png",
          title: "Modern Office Interior with City View",
        },
        {
          src: "https://i.ibb.co/DPrRMcx3/Screenshot-2025-08-19-161550.png",
          title: "Indoor Commercial Walkway with Shops and Palm Trees",
        },
      ],
    },
    overview: {
      title: "Spaces that Empower Business",
      text: [
        "Our commercial projects combine intelligent planning, modern design, and operational efficiency to deliver lasting value. From high-profile corporate offices to vibrant retail destinations, we design and manage projects that strengthen brand presence and profitability. With Khales, every commercial development becomes a benchmark of precision, performance, and prestige.",
      ],
      tag: "We offer premium solutions for mixed-use developments",
      image:
        "https://i.ibb.co/Myqk5sdW/Whats-App-Image-2025-08-19-at-17-59-26-3b3ee446.jpg",
    },
    challenges: {
      title: "Excellence in Commercial Development",
      text: "We deliver commercial spaces that serve both business growth and long-term investment value.",
      solutions: [
        "Future-Ready Designs – Adaptive spaces built for evolving business needs.",
        "Efficient Project Management – Precision planning with cost and time certainty.",
        "Trusted Across Sectors – healthcare, retail, hospitality, and mixed-use projects.",
      ],
      image:
        "https://i.ibb.co/hwfLBB2/Whats-App-Image-2025-08-19-at-17-59-27-9515773e.jpg",
    },
    principles: {
      title: "The Pillars of Commercial Success",
      subtitle:
        "We build more than structures; we create strategic assets designed to deliver performance, value, and a lasting return on investment.",
      cards: [
        {
          icon: "chart",
          title: "Strategic Asset Planning",
          description:
            "Every project begins with a focus on your business goals, ensuring the final space enhances brand presence, operational efficiency, and profitability.",
        },
        {
          icon: "clipboard",
          title: "Precision in Execution",
          description:
            "Our reputation is built on reliability. We employ rigorous project management to deliver on time and on budget, without exception.",
        },
        {
          icon: "building",
          title: "Future-Proof Functionality",
          description:
            "We design adaptable, technologically-integrated spaces that are built not just for today's needs, but for the evolving demands of tomorrow.",
        },
      ],
    },
    labels: {
      year: "Year",
      location: "Location",
      services: "Services",
      scrollLeft: "Scroll Left",
      scrollRight: "Scroll Right",
    },
  },
  luxuryVillaPage: {
    services: [
      {
        id: "Modern Villas",
        title: "Modern Villas",
        src: "https://i.ibb.co/nqwgs127/Whats-App-Image-2025-09-11-at-16-47-17-2a71e142.jpg",
      },
      {
        id: "Organic Villas",
        title: "Organic Villas",
        src: "https://i.ibb.co/pr286yCg/Whats-App-Image-2025-09-11-at-16-45-49-77b61589.jpg",
      },
      {
        id: "Classic Villas",
        title: "Classic Villas",
        src: "https://i.ibb.co/B5Gm7KQN/Whats-App-Image-2025-09-11-at-16-46-01-2bdda072.jpg",
      },
      {
        id: "Arabian Villas",
        title: "Arabian Villas",
        src: "https://i.ibb.co/35cWCpXD/Whats-App-Image-2025-09-11-at-16-45-28-6d5a2cea.jpg",
      },
      {
        id: "Modern Farmhouse Villas",
        title: "Modern Farmhouse Villas",
        src: "https://i.ibb.co/dxFsfJk/Whats-App-Image-2025-09-11-at-16-45-42-0a428d49.jpg",
      },
      {
        id: "Tuscan Villas",
        title: "Tuscan Villas",
        src: "https://i.ibb.co/99ZrrJt3/Whats-App-Image-2025-09-11-at-16-46-23-798a19b6.jpg",
      },
    ],
    servicesSectionContent: {
      title: "Villa Styles",
      linkText: "All Villa Styles",
    },
    meta: {
      title: "Bespoke Luxury Villa Design & Construction | Khales",
      description:
        "Khales specializes in creating bespoke luxury villas that serve as private sanctuaries. Discover our commitment to personalized design, elegance, and seamless indoor-outdoor living.",
    },
    header: {
      tag: "LUXURY VILLA SOLUTIONS",
      title: "The Art of Living in Luxury",
      year: "2019-2024",
      location: "Dubai Hills, Palm Jumeirah",
      services: "Bespoke Design & Turnkey Construction",
      bgImage: "https://i.ibb.co/wrCYmX0L/Screenshot-2025-08-19-153017.png",
    },
    gallery: {
      title: "Villa Design Showcase",
      images: [
        {
          src: "https://i.ibb.co/8DzpbsXX/Screenshot-2025-08-19-161154.png",
          title: "Classical Villa Exterior",
        },
        {
          src: "https://i.ibb.co/KM8mhtK/Screenshot-2025-08-19-161101.png",
          title: "Grand Entrance Hall with Double Staircase",
        },
        {
          src: "https://i.ibb.co/pjtLWqgJ/Screenshot-2025-08-19-163130.png",
          title: "Modern Villa with Reflecting Pool",
        },
        {
          src: "https://i.ibb.co/9H3YHd3B/Screenshot-2025-08-19-161235.png",
          title: "Luxurious Living Room with Chandelier",
        },
        {
          src: "https://i.ibb.co/whZ5JmQv/Screenshot-2025-08-19-163108.png",
          title: "Villa Exterior with Decorative Screen and Water Feature",
        },
        {
          src: "https://i.ibb.co/HTdfXnC7/Screenshot-2025-08-19-161049.png",
          title: "Traditional Courtyard with Water Feature",
        },
        {
          src: "https://i.ibb.co/BRznYLG/Screenshot-2025-08-19-161138.png",
          title: "Elegant Living Area with High Ceilings",
        },
      ],
    },
    overview: {
      title: "Delivering Engineered Designs",
      text: [
        "We deliver structured engineering and designs that meets our client requirement. We do this by focusing on architectural precision and seamless project management, ensuring every detail is expertly handled. Our commitment is to deliver a flawless journey from the initial concept to the final, perfect result, on time and within budget. This comprehensive approach guarantees that we don't just meet expectations, we exceed them, creating a final product that is both functional and aesthetically stunning.",
      ],
      tag: "Creating a fusion of architectural luxury, built to elevate your lifestyle.",
      image:
        "https://i.ibb.co/vvzYx8BF/Whats-App-Image-2025-08-19-at-17-32-12-5ea491e1.jpg",
    },
    challenges: {
      title: "Luxury Villa Solutions",
      text: "We craft your lifestyle, creating a seamless fusion of architectural luxury and personal vision.",
      solutions: [
        "Design Solutions: We specialize in bringing your unique vision to life, crafting a villa that is a perfect reflection of your style.",
        "Enduring Quality: We are committed to building with premium materials and sustainable choices, giving your villa a long-lasting impression of luxury.",
        "Comprehensive Project Oversight: we provide a dedicated Engineer throughout the entire process, ensuring a professional and transparent delivery of your dream home with unmatched attention to detail.",
      ],
      image:
        "https://i.ibb.co/S74Bhv2Y/Whats-App-Image-2025-08-19-at-17-32-12-cbe6f3b9.jpg",
    },
    principles: {
      title: "The Essence of Bespoke Luxury",
      subtitle:
        "Creating a true sanctuary requires a devotion to artistry, exclusivity, and an intimate understanding of personal vision. This is our commitment.",
      cards: [
        {
          icon: "palette",
          title: "Bespoke Artistry",
          description:
            "Your villa is a masterpiece of personal expression. Our design process is an artistic collaboration to create a one-of-a-kind residence.",
        },
        {
          icon: "star",
          title: "Exquisite Materiality",
          description:
            "We source the world's finest and most unique materials, ensuring every surface and finish contributes to an atmosphere of unparalleled elegance.",
        },
        {
          icon: "spa",
          title: "The Private Sanctuary",
          description:
            "Beyond luxury, we focus on creating a sense of peace and privacy, engineering spaces that promote wellness and a seamless connection to nature.",
        },
      ],
    },
    labels: {
      year: "Year",
      location: "Location",
      services: "Services",
      scrollLeft: "Scroll Left",
      scrollRight: "Scroll Right",
    },
  },
  cookieConsent: {
    text: "We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic.",
    learnMore: "Learn more.",
    reject: "Decline",
    accept: "Accept",
    // ... your other content
  },
};
