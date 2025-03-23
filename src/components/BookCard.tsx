// import { useState } from "react";
// import Image from "next/image";
// import { X } from "lucide-react";

// const BookCard = ({ book }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
//       {/* Book Thumbnail */}
//       <Image
//         src={book.thumbnailUrl?.startsWith("http") ? book.thumbnailUrl : "/images/default-book.jpg"}
//         alt={book.title}
//         width={180}
//         height={260}
//         className="w-full h-60 object-cover rounded-md shadow-sm"
//       />

//       {/* Book Details */}
//       <h3 className="text-lg font-semibold text-gray-900 mt-3">{book.title}</h3>
//       <p className="text-sm text-gray-600">By {book.author}</p>
//       <span className="text-xs text-gray-500">{book.category} | {book.language}</span>

//       {/* Buttons */}
//       <div className="flex gap-2 mt-3">
//         <button
//           className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Read
//         </button>
//         <a
//           href={book.pdfUrl}
//           download
//           className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-400 transition"
//         >
//           Download
//         </a>
//       </div>

//       {/* ✅ PDF Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] h-[80%] relative p-4">
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <X size={24} />
//             </button>

//             {/* Embedded PDF Viewer */}
//             <iframe
//               src={book.pdfUrl}
//               className="w-full h-full rounded-md"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookCard;