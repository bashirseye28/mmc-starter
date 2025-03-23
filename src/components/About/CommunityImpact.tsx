const communityStats = [
    {
      value: "5000+",
      label: "Lives Touched",
    },
    {
      value: "300+",
      label: "Active Volunteers",
    },
    {
      value: "150+",
      label: "Events Organized",
    },
    {
      value: "20+",
      label: "Years of Service",
    },
  ];
  
  const CommunityImpact = () => {
    return (
      <section id="impact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          {/* Section Heading */}
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Our Impact & Achievements
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Through dedication and faith, we’ve made a meaningful impact in our community.
          </p>
  
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default CommunityImpact;