"use client"; // Ensure client-side execution

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CountdownProps = {
  eventDate: string;
};

const CountdownTimer = ({ eventDate }: CountdownProps) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(eventDate).getTime();
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      expired: false,
      days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
      seconds: Math.floor((timeDifference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (timeLeft.expired) {
    return (
      <div className="text-center text-red-600 font-bold text-lg">
        The event has started! 🎉
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
      {Object.entries(timeLeft).map(([key, value]) =>
        key !== "expired" ? (
          <motion.div
            key={key}
            className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <motion.span
              className="text-4xl font-bold text-primary"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {value}
            </motion.span>
            <span className="text-sm uppercase text-gray-600">{key}</span>
          </motion.div>
        ) : null
      )}
    </div>
  );
};

export default CountdownTimer;