// src/components/Home/ActivityCard.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const ActivityCard = ({ title, description, image, link }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>

        {/* Learn More Link */}
        <div className="mt-4">
          <Link href={link} className="text-primary font-semibold hover:text-gold transition">
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;