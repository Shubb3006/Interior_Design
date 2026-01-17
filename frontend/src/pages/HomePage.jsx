import React from "react";
import Hero from "../components/Hero";
import PriceEstimator from "../components/PriceEstimator";
import WhatWeOffer from "../components/WhatWeOffer";
import LeadForm from "../components/LeadForm";

const HomePage = () => {
  return (
    <>
      <Hero />
      <PriceEstimator />
      <WhatWeOffer />
      <LeadForm />
    </>
  );
};

export default HomePage;
