// dictionaries/en.js

import { projectsData as allProjects } from "@/components/Property Page/ProjectData";

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
    paragraph: "At Khales Project Management, we turn ideas into reality...",
    button: "Learn More",
  },
  services: {
    header: {
      title: "Our Integrated Engineering & Management Services",
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
    title: "Our Featured Projects",
    tabs: ["Featured", "Commercial", "Interior Design", "Villas"],
    projectsData: allProjects,
  },
  whyUs: {
    label: "Why Choose Khales",
    title: "Building Beyond a Blueprint",
    features: [
      {
        title: "Quality You Can Measure",
        description: "We apply clear standards at every stage...",
      },
      {
        title: "Design with Purpose and Precision",
        description: "Every space is tailored to meet real needs...",
      },
      {
        title: "Clear Process and Reliable Delivery",
        description: "Our approach is transparent and deadline-driven...",
      },
    ],
  },
  testimonials: {
    title: "Feedback from Clients & Partners",
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
      title: "Development Planning Strategy",
      description1:
        "Before design or construction begins, every project needs a plan. Our Development Planning service helps landowners, investors, and private clients understand what’s possible on a site, based on regulations, project goals, market potential, and technical requirements.",
      description2:
        "Khales guides you through zoning laws, land use restrictions, authority procedures, and development options, turning a raw plot into a viable project direction. This service helps avoid delays, wasted costs, or design mistakes by making sure your vision is feasible and aligned from the start.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
    process: {
      title: "Our Planning Process",
      steps: [
        {
          stepName: "Site Review & Initial Assessment",
          content:
            "We visit or study the site and gather data on size, location, zoning, utility access, topography, and authority requirements.",
        },
        {
          stepName: "Regulatory & Municipality Check",
          content:
            "We verify allowable FAR (floor area ratio), height limits, setbacks, building types, and special conditions based on local codes.",
        },
        {
          stepName: "Project Concept Direction",
          content:
            "We suggest development types (villa, residential block, mixed-use, etc.) that fit both the land and your goals.",
        },
        {
          stepName: "Time & Cost Planning (Optional)",
          content:
            "We can provide preliminary project timelines and rough cost bands to guide future planning and budgeting.",
        },
        {
          stepName: "Authority Strategy",
          content:
            "We advise on submission routes, timelines, and which approvals will be needed — helping you avoid process surprises later on.",
        },
        {
          stepName: "Summary Report & Recommendation",
          content:
            "We deliver a clear document summarizing your land’s potential, next steps, and how to move into design and execution.",
        },
      ],
    },
    faq: {
      title: "FAQs on Development Planning",
      questions: [
        {
          question: "What is development planning?",
          answer:
            "Development planning involves creating a strategic roadmap for your project, from initial concept to long-term performance, ensuring it meets market demands and regulatory requirements.",
        },
        {
          question: "Do you work on projects across all seven emirates?",
          answer:
            "Yes, we provide building contracting services in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
        },
        {
          question: "How do you ensure my project aligns with market trends?",
          answer:
            "We conduct tailored market research to analyze current trends, demands, and opportunities, ensuring your project meets investor and resident expectations.",
        },
        {
          question: "Can you handle both small and large-scale projects?",
          answer:
            "Absolutely. Whether it’s a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
        },
        {
          question: "Do you offer sustainable development solutions?",
          answer:
            "Yes, sustainability is a core part of our planning process. We integrate eco-friendly designs and energy-efficient systems into every project.",
        },
        {
          question: "How long does the development planning process take?",
          answer:
            "The timeline depends on the project’s complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
        },
        {
          question: "Do you provide facility management planning?",
          answer:
            "Yes, we integrate facility management planning from the start, ensuring your project’s long-term performance and connecting you with leading property management companies.",
        },
        {
          question: "Can you work within my budget?",
          answer:
            "We create plans that align with your budget without compromising on quality. During the consultation, we discuss your financial parameters and tailor our solutions accordingly.",
        },
        {
          question: "What makes your building contracting services stand out?",
          answer:
            "Our commitment to precision, innovation, and excellence sets us apart. We combine award-winning expertise with a client-centric approach to deliver exceptional results.",
        },
        {
          question: "How can I get started with Khales Building Contracting?",
          answer:
            "Simply contact us for a consultation. We’ll discuss your vision, provide a customized plan, and guide you through the process of creating your dream project.",
        },
        {
          question: "Is this only for large developments?",
          answer:
            "No — this is helpful for any landowner, whether you’re building one villa or planning a full investment project.",
        },
        {
          question: "Can you help us compare multiple land plots?",
          answer:
            "Yes. We can provide basic development potential comparisons so you can decide which plot is more suitable.",
        },
        {
          question: "Do you also help with concept design after this?",
          answer:
            "Yes. After the development plan is clear, we can proceed with full design, approvals, and project management.",
        },
        {
          question: "How long does a development plan take?",
          answer:
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
      title: "Building Engineering Design",
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
      title: "Our Engineering Design Process",
      steps: [
        {
          stepName: "Design Coordination & Review",
          content:
            "We start by studying the approved architectural design and identifying all engineering requirements based on the site, scale, and scope.",
        },
        {
          stepName: "Structural & MEP Design",
          content:
            "We produce detailed structural calculations, electrical and plumbing plans, HVAC layouts, and load analysis, customized to your project.",
        },
        {
          stepName: "Code Compliance & Authority Requirements",
          content:
            "We design according to UAE municipal standards and ensure all drawings meet submission and approval criteria.",
        },
        {
          stepName: "Cross-Discipline Integration",
          content:
            "We coordinate with other consultants to ensure that all technical systems align with design, function, and construction constraints.",
        },
        {
          stepName: "Final Issued for Construction (IFC) Drawings",
          content:
            "We submit finalized engineering drawings for contractor use, ready for site implementation.",
        },
      ],
    },
    faq: {
      title: "FAQs on Engineering Design",
      questions: [
        {
          question:
            "What’s the difference between architecture and engineering design?",
          answer:
            "Architecture defines how a space looks and functions. Engineering design ensures the structure and systems behind it are buildable, safe, and compliant.",
        },
        {
          question:
            "Do you only offer engineering for projects designed by Khales?",
          answer:
            "No. We can provide engineering design for external architectural concepts as well — ensuring your project moves forward technically and legally.",
        },
        {
          question: "Will you also submit drawings for authority approval?",
          answer:
            "Yes. Our designs follow local municipality standards and are prepared specifically for UAE approval processes.",
        },
        {
          question:
            "What types of projects do you provide engineering design for?",
          answer:
            "We work across villas, residential buildings, commercial projects, and mixed-use developments of various scales.",
        },
      ],
    },
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
  }, // ... (inside the export const dictionary = { ... })

  privacyPolicyPage: {
    // For Metadata
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

    // For the Page Component
    title: "Privacy Policy",
    lastUpdated: "This Privacy Policy was last updated on March 26, 2025.",
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
    // For Metadata
    metaTitle: "Page Coming Soon | Khales Group",
    metaDescription:
      "This page is currently under construction. Please check back later for updates from Khales Group.",

    // For the Component
    title: "Page Coming Soon!",
    description:
      "We are working hard to bring you this page. It's under construction, but it will be worth the wait. Please check back later.",
    buttonText: "Go to Homepage",
  },
  thankYouPage: {
    // For Metadata
    metaTitle: "Thank You for Contacting Us | Khales Group",
    metaDescription:
      "Thank you for your submission. A member of the Khales Group team will be in touch with you shortly.",

    // For the Page Component
    icon: "", // or an SVG component name
    title: "Thank You!",
    message:
      "Your submission has been received successfully. A member of our team will be in touch with you shortly to discuss your project.",
    buttonText: "Return to Homepage",
  },
};
