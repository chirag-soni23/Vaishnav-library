import React, { useState, useEffect, useRef } from "react";
import { Data } from "../context/Data.js";
import { gsap } from "gsap";

const Card = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const cardsRef = useRef([]); 

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        duration: 0.6, 
        ease: "power3.out", 
      }
    );
  }, []);

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

  const closeModal = () => {
    gsap.to(".modal-box", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => {
        setSelectedItem(null);
      },
    });
  };

  return (
    <div className="overflow-x-hidden px-5">
      <h1 className="text-3xl font-bold text-center mb-5 mt-10">Facilities</h1>
      <div className="carousel mt-10 carousel-end gap-5">
        {Data.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item flex flex-col items-center"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-80 h-44 object-cover rounded-md"
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
        <dialog
          id="my_modal"
          className="modal modal-open transition-all duration-300 ease-in-out opacity-0"
          open
          style={{ opacity: selectedItem ? 1 : 0 }}
        >
          <div className="modal-box">
            <h2 className="text-xl font-bold">{selectedItem.name}</h2>
            <p className="py-4">{selectedItem.description}</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={closeModal}
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
