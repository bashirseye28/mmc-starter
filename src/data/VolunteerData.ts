// src/data/VolunteerData.ts

export type VolunteerRole = {
    id: number;
    title: string;
    description: string;
  };
  
  export const volunteerRoles: VolunteerRole[] = [
    {
      id: 1,
      title: "Event Organiser",
      description: "Assist in organizing and managing MMC events, ensuring smooth operations and community engagement.",
    },
    {
      id: 2,
      title: "Media & Content Creator",
      description: "Help create engaging content, take photos/videos, and manage MMC's social media presence.",
    },
    {
      id: 3,
      title: "Community Outreach",
      description: "Support outreach programs, connect with new members, and assist in charity initiatives.",
    },
    {
      id: 4,
      title: "Teaching Assistant",
      description: "Help in educational programs by mentoring children and adults in Islamic studies and Arabic.",
    },
  ];