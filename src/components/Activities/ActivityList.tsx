// "use client";
// import { useState } from "react";
// import ActivityCard from "@/components/Home/ActivityCard";
// import ActivityFilters from "./ActivityFilters";

// const activities = [
//   { id: 1, title: "Weekly Daahira", category: "Spiritual", description: "Regular gatherings for prayers, teachings, and bonding.", image: "/images/gathering.png", path: "/activities/weekly-daahira" },
//   { id: 2, title: "Kureel (Xassida Chanting)", category: "Spiritual", description: "Reciting Sheikh Ahmadou Bamba’s Xassidas collectively.", image: "/images/kurel.svg", path: "/activities/kureel" },
//   { id: 3, title: "Madrassah (Religious Education)", category: "Educational", description: "Islamic learning for children and adults.", image: "/images/madrassah.svg", path: "/activities/madrassah" },
//   { id: 4, title: "KST - Community Centre Project", category: "Community", description: "MMC's project to acquire our community hall.", image: "/images/kst.svg", path: "/activities/kst" },
//   { id: 5, title: "Daahira Soxna Diarra", category: "Charity", description: "Women's faith & charity group supporting the community.", image: "/images/soxna.png", path: "/activities/daahira-soxna" },
//   { id: 6, title: "Ahlu Baay Faal", category: "Brotherhood", description: "A support group offering guidance and social support.", image: "/images/baayfaal.png", path: "/activities/ahlu-baay-faal" },
// ];

// const ActivityList = () => {
//   const [filteredCategory, setFilteredCategory] = useState("All");

//   const filteredActivities =
//     filteredCategory === "All"
//       ? activities
//       : activities.filter((activity) => activity.category === filteredCategory);

//   return (
//     <section className="py-16 bg-gray-100">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-primary text-center">📌 Our Activities</h2>
//         <p className="text-gray-600 mt-2 text-center">Explore the various programs and projects we offer.</p>

//         {/* Activity Filters */}
//         <ActivityFilters onFilterChange={setFilteredCategory} />

//         {/* Activities Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//           {filteredActivities.map((activity) => (
//             <ActivityCard key={activity.id} {...activity} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ActivityList;