import React, { useState } from "react";
import library1 from "../assets/library1.jpg";
import library2 from "../assets/library2.jpg";
import library3 from "../assets/library3.jpg";
import library4 from "../assets/library4.jpg";
import library5 from "../assets/library5.jpg";
import library6 from "../assets/library6.jpg";

const libraryImages = [
  { id: 1, src: library1 },
  { id: 2, src: library2 },
  { id: 3, src: library3 },
  { id: 4, src: library4 },
  { id: 5, src: library5 },
  { id: 6, src: library6 }
];

const Images = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMoreImages = () => {
    setVisibleCount(libraryImages.length);
  };

  const showLessImages = () => {
    setVisibleCount(3);
  };

  return (
    <>
       <h1 className="text-3xl font-bold text-center mb-5 mt-10">About Our Library</h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-base-100 shadow-xl">
        {libraryImages.slice(0, visibleCount).map((img) => (
          <figure key={img.id} className="w-full h-auto">
            <img
              src={img.src}
              alt={`Library ${img.id}`}
              className="w-full h-60 object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
          </figure>
        ))}
      </div>
      <div className="text-center mt-6">
        {visibleCount < libraryImages.length ? (
          <button onClick={showMoreImages} className="btn btn-primary">
            Show More
          </button>
        ) : (
          <button onClick={showLessImages} className="btn btn-secondary">
            Show Less
          </button>
        )}
      </div>
    </>
  );
};

export default Images;
