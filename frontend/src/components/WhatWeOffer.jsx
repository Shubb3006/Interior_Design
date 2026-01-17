import React from "react";
const offers = [
  "Modular Kitchen",
  "Bedroom Interiors",
  "Living Room Design",
  "Full Home Interior",
];

const WhatWeOffer = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What We Offer</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {offers.map((item) => (
            <div key={item} className="card bg-base-200 shadow">
              <div className="card-body items-center text-center">
                <h3 className="font-semibold">{item}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
