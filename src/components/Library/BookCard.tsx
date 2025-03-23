// "use client";

// import Image from "next/image";

// interface BookCardProps {
//   book: {
//     id: string;
//     title: string;
//     author: string;
//     category: string;
//     language: string;
//     pdfUrl: string;
//     thumbnailUrl: string;
//     onRead: () => void;
//   };
// }

// const BookCard: React.FC<BookCardProps> = ({ book }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition">
      
//       {/* ✅ Book Cover Image */}
//       <Image
//         src={`/images/library/${book.thumbnailUrl}`}
//         alt={book.title}
//         width={300}
//         height={400}
//         className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition"
//       />

//       {/* ✅ Book Details */}
//       <h3 className="text-xl font-bold text-primary mt-4">{book.title}</h3>
//       <p className="text-darkText italic">By {book.author}</p>
//       <p className="text-sm bg-lightBg px-2 py-1 rounded-md inline-block text-darkText">
//         {book.category} | {book.language}
//       </p>

//       {/* ✅ Buttons */}
//       <div className="mt-5 flex gap-3">
//         <button
//           className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
//           onClick={book.onRead}
//         >
//           Read
//         </button>
//         <a
//           href={book.pdfUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="px-4 py-2 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
//         >
//           Download
//         </a>
//       </div>
//     </div>
//   );
// };

// export default BookCard;