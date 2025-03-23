export type Testimonial = {
    id: number;
    name: string;
    role: string;
    message: string;
    image: string;
  };
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Taalibe Bamba",
      role: "Community Member",
      message:
        "MMC has truly transformed my spiritual journey. The weekly Daahira gatherings provide me with knowledge, faith, and a sense of belonging.",
      image: "/images/me.png",
    },
    {
      id: 2,
      name: "Dongo Daara",
      role: "Volunteer",
      message:
        "Being part of MMC’s volunteer team has been an enriching experience. I feel blessed to contribute to the community and learn from others.",
      image: "/images/me.png",
    },
    {
      id: 3,
      name: "Yaay Fall",
      role: "Student",
      message:
        "The Madrassah programme at MMC has helped me learn Arabic and understand my faith better. The teachers are supportive and inspiring.",
      image: "/images/me.png",
    },
  ];