"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jaayanteTiers } from "@/data/jaayanteTiers";
import { useRouter } from "next/navigation";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: index * 0.3, ease: "easeOut" },
  }),
};

const KstDonationTiers = () => {
  const router = useRouter();

  const handleDonateRedirect = (slug: string) => {
    router.push(`/donate/jaayante/${slug}`);
  };

  return (
    <section id="donation-tiers" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        <motion.div className="mb-12" initial="hidden" animate="visible" viewport={{ once: true }}>
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">Jaayante</span>{" "}
            <span className="text-primary">Donation Tiers</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            Choose a Jaayante Tier and contribute to the legacy of Keur Serigne Touba.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jaayanteTiers.map((tier, index) => (
            <motion.div
              key={tier.slug}
              className="relative bg-cover bg-center bg-no-repeat p-6 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all text-center overflow-hidden max-w-[280px] mx-auto"
              style={{ backgroundImage: `url(${tier.image})` }}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
              <div className="relative z-10">
                <div className="text-gold text-3xl mb-3">
                  <FontAwesomeIcon icon={tier.icon} />
                </div>
                <h3 className="text-2xl font-semibold text-white font-heading">{tier.title}</h3>
                <p className="text-lg text-gold font-bold mt-2">£{tier.amount}</p>
                <p className="text-white font-body mt-3">{tier.impact}</p>
                <button
                  className="mt-6 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-md w-full"
                  onClick={() => handleDonateRedirect(tier.slug)}
                >
                  Donate Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KstDonationTiers;