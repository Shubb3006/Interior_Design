import React, { useEffect, useState } from "react";
import LeadForm from "./LeadForm";
import { X } from "lucide-react";
const Hero = () => {
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModal]);
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            Design Your Dream Home
          </h1>
          <p className="mt-4 text-base-content/70 text-lg">
            End-to-end interior solutions tailored just for you.
          </p>

          <button
            className="btn btn-primary mt-6"
            onClick={() => setIsModal(true)}
          >
            Book Free Consultation
          </button>
        </div>

        {/* Image */}
        <div className="rounded-lg overflow-hidden shadow">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isModal && (
        <dialog className="modal modal-open">
          {/* Backdrop */}
          <div
            className="modal-backdrop backdrop-blur-sm bg-black/40"
            onClick={() => setIsModal(false)}
          />

          {/* Modal Box */}
          <div className="modal-box max-w-xl bg-base-200 relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModal(false)}
            >
              <X />
            </button>

            <LeadForm />
          </div>
        </dialog>
      )}
    </section>
  );
};

export default Hero;
