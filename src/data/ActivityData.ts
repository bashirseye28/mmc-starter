// src/data/ActivityData.ts
export type Activity = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

export const activities: Activity[] = [
  {
    id: 1,
    title: "Weekly Daahira",
    description: "A space for collective worship, Qasida recitations, and discussions on Islamic teachings to strengthen faith and unity.",
    image: "/images/gathering.png",
    link: "/activities/daahira",
  },
  {
    id: 2,
    title: "Kureel Qasida",
    description: "Preserving the Murid tradition through rhythmic group recitations of Sheikh Ahmadou Bamba’s poetic works.",
    image: "/images/kurel.png",
    link: "/activities/kureel",
  },
  {
    id: 3,
    title: "Madrassah",
    description: "Islamic learning for children and adults, covering Qur’anic studies, Arabic, Hadith, and Muridiyya teachings.",
    image: "/images/madrassah.jpeg",
    link: "/activities/madrassah",
  },
  {
    id: 4,
    title: "Keur Serigne Touba (KST) – Islamic Centre Project",
    description: "A fundraising initiative to establish a dedicated MMC community centre for worship, education, and social activities.",
    image: "/images/kst.webp",
    link: "/activities/kst",
  },
  {
    id: 5,
    title: "Daahira Soxna Diarra",
    description: "A women-led initiative focusing on spiritual empowerment, charity work, and supporting families in need.",
    image: "/images/soxna.png",
    link: "/activities/daahira-soxna-diarra",
  },
  {
    id: 6,
    title: "Ahlu Baay Faal",
    description: "A group dedicated to selfless service, mentorship, and strengthening brotherhood through faith and action.",
    image: "/images/baayfaal.png",
    link: "/activities/baay-faal",
  },
];