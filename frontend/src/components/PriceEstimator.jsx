import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const PriceEstimator = () => {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState("");
  const [type, setType] = useState("2bhk");
  const [level, setLevel] = useState("basic");

  const pricePerSqft = {
    basic: 1800,
    premium: 2500,
    luxury: 3500,
  };

  const estimate =
    area && pricePerSqft[level] ? Math.round(area * pricePerSqft[level]) : 0;

    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") setIsModal(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [isModal]);

  return (
    <>
      {/* CTA Section */}
      <section className="bg-base-200 py-14">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold">Get an Instant Price Estimate</h2>
          <p className="mt-3 text-base-content/70">
            Know the cost of your dream home in minutes.
          </p>
          <button
            className="btn btn-primary mt-6"
            onClick={() => setOpen(true)}
          >
            Calculate Now
          </button>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <section className="modal modal-open">
          <div
            className="modal-backdrop bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div
            className="modal-box max-w-lg bg-base-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4 text-center">
              Price Estimator
            </h3>

            {/* Area */}
            <input
              type="number"
              placeholder="Total area (sq ft)"
              className="input input-bordered w-full mb-3"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />

            {/* Home Type */}
            <select
              className="select select-bordered w-full mb-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
            </select>

            {/* Interior Level */}
            <select
              className="select select-bordered w-full mb-4"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>

            {/* Result */}
            {estimate > 0 && (
              <div className="bg-base-200 p-4 rounded text-center mb-4">
                <p className="text-sm text-base-content/70">Estimated Cost</p>
                <p className="text-2xl font-bold text-primary">
                  ₹ {estimate.toLocaleString()}
                </p>
              </div>
            )}

            <button className="btn btn-primary w-full">
              Book Free Consultation
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default PriceEstimator;
