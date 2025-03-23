import { 
  faSeedling, 
  faBookOpen, 
  faMosque, 
  faHandsHelping, 
  faStar, 
  faInfinity 
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// ✅ Define TypeScript Type for Jaayante Tiers
export type JaayanteTier = {
  icon: IconDefinition; // Ensure proper type for FontAwesome icons
  title: string; // ✅ Fix: Remove priceIds reference
  amount: number;
  impact: string;
  image: string;
  slug: string;
};

// ✅ Jaayante Tiers Data
export const jaayanteTiers: JaayanteTier[] = [
  {
    icon: faSeedling,
    title: "Sindiidi",
    amount: 200,
    impact: "Your generous contribution will help lay the foundation for KST, ensuring a strong beginning.",
    image: "/images/jaayante.png",
    slug: "sindiidi",
  },
  {
    icon: faBookOpen,
    title: "Wakaana",
    amount: 500,
    impact: "Supporting educational programs and learning facilities for future generations.",
    image: "/images/jaayante.png",
    slug: "wakaana",
  },
  {
    icon: faMosque,
    title: "Jaalibatu",
    amount: 1000,
    impact: "Helping build dedicated prayer spaces and expanding worship facilities at KST.",
    image: "/images/jaayante.png",
    slug: "jaalibatu",
  },
  {
    icon: faHandsHelping,
    title: "Mawaahibu",
    amount: 2500,
    impact: "Contributing to the development of essential infrastructure and community services.",
    image: "/images/jaayante.png",
    slug: "mawaahibu",
  },
  {
    icon: faStar,
    title: "Midaadi",
    amount: 5000,
    impact: "Your generous contribution will play a vital role in building KST—a permanent center for faith, education, and community service.",
    image: "/images/jaayante.png",
    slug: "midaadi",
  },
  {
    icon: faInfinity,
    title: "Fathul Fattah",
    amount: 10000,
    impact: "A legacy donation ensuring long-term sustainability and future growth of the KST project.",
    image: "/images/jaayante.png",
    slug: "fathul-fattah",
  },
];
