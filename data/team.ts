export type TeamMember = {
  role: { en: string; ar: string };
  image: string;
};

// Placeholder headshots + role titles only (no invented personal names) -
// swap in Khales's actual team photos/names before this ships.
export const teamMembers: TeamMember[] = [
  {
    role: { en: "Founder, Principal Architect", ar: "المؤسس، كبير المهندسين المعماريين" },
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: { en: "Head of the Bureau", ar: "رئيس المكتب" },
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: { en: "Design & Implementation Lead", ar: "مسؤول التصميم والتنفيذ" },
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: { en: "Interiors Department Lead", ar: "رئيس قسم التصميم الداخلي" },
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: { en: "Detailed Design, Architecture", ar: "التصميم التفصيلي، الهندسة المعمارية" },
    image:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=800&q=80",
  },
];
