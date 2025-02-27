import React, { useState, useEffect } from "react";
import { Data } from "../context/Data.js";

const Card = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [selectedItem]);

  return (
    <div className="overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center mb-5 mt-10">Facilities</h1>
      <div className="carousel mt-10 carousel-end gap-5">
        {Data.map((item) => (
          <div key={item.id} className="carousel-item flex flex-col items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-64 h-40 object-cover rounded-md"
            />
            <p className="mt-2 font-semibold text-lg">{item.name}</p>
            <button
              className="btn btn-primary btn-sm mt-2"
              onClick={() => setSelectedItem(item)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <dialog id="my_modal" className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">{selectedItem.name}</h2>
            <p className="py-4">{selectedItem.description}</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Card;
