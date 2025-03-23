import Image from "next/image";
import Link from "next/link";

type ActivityProps = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

const ActivityCard = ({ title, description, image, link }: ActivityProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Optimized Image */}
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="rounded-t-xl object-cover w-full h-full"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>

        {/* 🛑 ADDING THIS SECTION TO ENSURE THE BUTTON SHOWS */}
        <div className="mt-4">
          <Link href={link}>
            <button className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-gold transition">
              Learn More →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;