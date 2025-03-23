import ActivityCard from "./ActivityCard";
import { activities } from "@/data/ActivityData";

const ActivitiesGrid = () => {
  return (
    <section id="OurActivities" className="py-16 bg-lightBg">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary">
            Our Main Activities
          </h2>
          <p className="text-gray-600 mt-2">
            Explore the spiritual, educational, and community-driven activities
            we offer.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesGrid;