export const site = {
  name: "Omar",
  wordmark: "Omar",
  title: "UI/UX designer",
  role: "just another UI/UX designer",
  heroLead: "Hi, I am",
  heroAside: ["Work that", "people", "come back to"],
  heroRole: ["UI/UX product designer"],
  heroDescription:
    "UI/UX designer crafting products, systems, and the quiet details people keep using.",
  city: "Khobar, Saudi Arabia",
  based: "Based in Khobar, Saudi Arabia",
  designing: "Designing for everyone",
  email: "hello@omarkhuddose.com",
  coffee: "Drop by for a coffee",
  intro:
    "I turn your “I have a vague idea” into an interface people can’t stop using.",
  statement: {
    heading: "I don’t design screens. I design experiences.",
    body: "A screen is a surface. An experience is the pause before the tap, the quiet after the task, the feeling that this thing was made by someone who paid attention. That’s the work.",
    link: "Feels like a lot? Let’s chat.",
  },
  mantra: {
    lines: ["WHY", "NOT"],
    body: "Curiosity is the brief I never wait for. I ask the extra question, try the slightly wrong idea, and keep the one that makes people lean in. Safe is forgettable. Curious is how the good work starts.",
    cta: "We're on the same page",
  },
  personal: {
    heading:
      "Coffee, Arabic calligraphy, Football, Road trips, Late nights",
    photos: [
      {
        src: "/omar.jpg",
        alt: "Omar in profile against black",
        offset: "mt-0",
      },
      {
        src: "/life/coffee.svg",
        alt: "A dark still life suggesting late coffee",
        offset: "mt-16 md:mt-28",
      },
      {
        src: "/life/road.svg",
        alt: "A dark road stretching toward a faint horizon",
        offset: "mt-8 md:mt-12",
      },
    ],
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/omarkhuddose" },
    { label: "LinkedIn", href: "https://linkedin.com/in/omarkhuddose" },
    { label: "Behance", href: "https://behance.net/omarkhuddose" },
    { label: "Dribbble", href: "https://dribbble.com/omarkhuddose" },
  ],
};

export const nav = [
  { number: "01", label: "Work", href: "/work" },
  { number: "02", label: "About", href: "/about" },
  { number: "03", label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
] as const;

export const services = [
  {
    title: "Product Design",
    items: ["UX research", "UI design", "Prototyping"],
    preview: "/services/product-design.jpg",
  },
  {
    title: "Design Systems",
    items: ["Tokens", "Components", "Documentation"],
    preview: "/work/bayt.svg",
  },
  {
    title: "Web Design and Development",
    items: ["Marketing sites", "Product web", "Front-end craft"],
    preview: "/work/noor.svg",
  },
  {
    title: "Branding and Visual Identity",
    items: ["Direction", "Type and color", "Launch kits"],
    preview: "/work/diwan.svg",
  },
  {
    title: "Motion and Micro-interactions",
    items: ["Onboarding", "Feedback", "Delight that earns its place"],
    preview: "/work/souq.svg",
  },
  {
    title: "Arabic/RTL and Bilingual Design",
    items: ["RTL systems", "Arabic type", "Two-language products"],
    preview: "/work/quiet-ledger.svg",
  },
];

export const formOptions = {
  services: [
    "Product Design",
    "Design Systems",
    "Web Design and Development",
    "Branding and Visual Identity",
    "Motion and Micro-interactions",
    "Arabic/RTL and Bilingual Design",
  ],
  budgets: ["8k–20k SAR", "20k–40k SAR", "40k–80k SAR", "80k+ SAR"],
  delivery: ["in 2 months", "in 6 months", "in 9 months", "next year"],
  sources: [
    "friends or family",
    "social media",
    "AI",
    "web search",
    "former client",
  ],
};

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  year: string;
  role: string;
  timeline: string;
  cover: string;
  problem: string;
  process: string[];
  screens: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "efficiency-center",
    title: "Efficiency Center",
    tags: ["Web Design", "UI Design", "Art Direction"],
    year: "2026",
    role: "Main website",
    timeline: "10 weeks",
    cover: "/work/efficiency-center.jpg",
    problem:
      "The studio’s work was quieter than the site that held it. Objects sat in still rooms. The website talked like a brochure and the photographs had to shout over it.",
    process: [
      "Built a work wall that lets the objects speak first.",
      "Kept type small and the grid strict, so a comb and a laptop could share a page.",
      "Put the ask in one hard orange square. No more hunting for the letter.",
    ],
    screens: [
      "/work/efficiency-center.jpg",
      "/work/quiet-ledger.svg",
      "/work/bayt.svg",
    ],
    featured: true,
  },
  {
    slug: "quiet-ledger",
    title: "Quiet Ledger",
    tags: ["UX Research", "UI Design", "Prototyping"],
    year: "2025",
    role: "Product design",
    timeline: "12 weeks",
    cover: "/work/quiet-ledger.svg",
    problem:
      "A savings product that explained itself in charts nobody wanted to read. People opened it, blinked, and left.",
    process: [
      "Sat with first-time savers in Khobar and mapped the exact moment trust broke.",
      "Threw out the dashboard-first model. Built around one next action.",
      "Prototyped the empty state as the real product, not a leftover.",
    ],
    screens: ["/work/quiet-ledger.svg", "/work/bayt.svg", "/work/noor.svg"],
    featured: true,
  },
  {
    slug: "bayt",
    title: "Bayt",
    tags: ["Design Systems", "UI Design"],
    year: "2025",
    role: "Systems and interface",
    timeline: "16 weeks",
    cover: "/work/bayt.svg",
    problem:
      "Three teams, three greys, and a housing product that felt rented from someone else’s kit.",
    process: [
      "Wrote a small language: type, space, Arabic-first components.",
      "Shipped the system inside a live listing flow, not a museum file.",
      "Left the next team a set of rules they could actually hold.",
    ],
    screens: ["/work/bayt.svg", "/work/quiet-ledger.svg", "/work/diwan.svg"],
    featured: true,
  },
  {
    slug: "noor-transit",
    title: "Noor Transit",
    tags: ["Product Design", "Web Design"],
    year: "2024",
    role: "UX and visual design",
    timeline: "10 weeks",
    cover: "/work/noor.svg",
    problem:
      "A city mobility brief that started as “make the map prettier” and was actually a wayfinding problem.",
    process: [
      "Rode the routes. Timed the waits. Noted where people looked at their phones.",
      "Designed for one-handed, half-lit, already-late.",
      "Kept the map, killed the chrome.",
    ],
    screens: ["/work/noor.svg", "/work/sahl.svg", "/work/bayt.svg"],
    featured: true,
  },
  {
    slug: "diwan",
    title: "Diwan",
    tags: ["Branding", "Arabic/RTL", "UI Design"],
    year: "2024",
    role: "Direction and product",
    timeline: "14 weeks",
    cover: "/work/diwan.svg",
    problem:
      "A cultural platform that treated Arabic as a translation pass, not the home language.",
    process: [
      "Started in Arabic. Let English follow the reading, not the other way around.",
      "Built a bilingual grid that doesn’t collapse when the copy gets longer.",
      "Gave calligraphy room without turning the product into a poster.",
    ],
    screens: ["/work/diwan.svg", "/work/souq.svg", "/work/quiet-ledger.svg"],
    featured: true,
  },
  {
    slug: "sahl-health",
    title: "Sahl Health",
    tags: ["UX Research", "Product Design"],
    year: "2024",
    role: "Product design",
    timeline: "18 weeks",
    cover: "/work/sahl.svg",
    problem:
      "Clinic software written for administrators, used by tired people in waiting rooms.",
    process: [
      "Shadowed reception for two mornings. The real flow was verbal, not digital.",
      "Cut the form in half. Moved the rest to after the appointment.",
      "Designed confirmation as relief, not a receipt.",
    ],
    screens: ["/work/sahl.svg", "/work/noor.svg", "/work/bayt.svg"],
    featured: false,
  },
  {
    slug: "souq-night",
    title: "Souq Night",
    tags: ["UI Design", "Motion"],
    year: "2023",
    role: "Interface and motion",
    timeline: "8 weeks",
    cover: "/work/souq.svg",
    problem:
      "A night market app that looked like a grocery list and felt like homework.",
    process: [
      "Designed for dusk. Darker type, warmer light, fewer decisions.",
      "Used motion only to point at the stall you already wanted.",
      "Kept checkout short enough to finish while standing.",
    ],
    screens: ["/work/souq.svg", "/work/diwan.svg", "/work/quiet-ledger.svg"],
    featured: false,
  },
];

export const playground = [
  {
    title: "Cursor field",
    note: "A type field that leans toward the pointer.",
    cover: "/work/quiet-ledger.svg",
  },
  {
    title: "RTL toggle study",
    note: "One layout, two directions, no broken grid.",
    cover: "/work/diwan.svg",
  },
  {
    title: "Scroll stories",
    note: "A page that tells you when to slow down.",
    cover: "/work/noor.svg",
  },
  {
    title: "Haptic UI",
    note: "Tiny feedback for decisions that matter.",
    cover: "/work/bayt.svg",
  },
  {
    title: "Dark room type",
    note: "How far can contrast fall before meaning goes with it.",
    cover: "/work/sahl.svg",
  },
  {
    title: "Stamp studies",
    note: "Marks for a designer who still likes paper.",
    cover: "/work/souq.svg",
  },
];

export const posts = [
  {
    slug: "design-in-two-directions",
    title: "Design in two directions",
    date: "March 2026",
    excerpt:
      "Arabic is not a toggle. If the product is bilingual, the thinking has to be too.",
    body: "Most bilingual products are English products with a mirror. The grid snaps, the type shrinks, and someone calls it localization. I start the other way. I write the longest Arabic string first, then I see what English is allowed to do. The interface should feel at home in Khobar before it feels clever in a deck.",
  },
  {
    slug: "screens-are-not-the-work",
    title: "Screens are not the work",
    date: "January 2026",
    excerpt:
      "Figma is a workshop. The work is what happens in someone’s hand on a Tuesday.",
    body: "I like a clean file. I like a tight component. I like them less than a person finishing a task without thinking about me. If the screen is beautiful and the moment is clumsy, the screen lost. That’s the standard I keep walking back to.",
  },
  {
    slug: "why-not-as-a-method",
    title: "Why not, as a method",
    date: "November 2025",
    excerpt:
      "Curiosity is not a mood board. It’s a way to get out of the first idea.",
    body: "The first idea is usually the one the brief already implied. “Why not” is how I stay in the room long enough to find the second one. Sometimes the second one is worse. Sometimes it’s the product. Either way, I would rather show a brave miss than a polite default.",
  },
];

export const testimonials = [
  {
    quote:
      "Omar made the product feel inevitable. We stopped arguing about screens and started arguing about the moment we wanted people to have.",
    name: "Lina Al-Faisal",
    company: "Quiet Ledger",
  },
  {
    quote:
      "He treats Arabic as a first language, not a checkbox. The bilingual system still holds after two new teams touched it.",
    name: "Hassan Farid",
    company: "Bayt",
  },
  {
    quote:
      "The work is quiet and the thinking is not. He asked better questions than we walked in with.",
    name: "Mariam Noor",
    company: "Noor Transit",
  },
  {
    quote:
      "We hired a designer and got a director. The interface is the least of what changed.",
    name: "Yusuf Rahman",
    company: "Diwan",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
