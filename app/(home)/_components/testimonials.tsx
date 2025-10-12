"use client";

import TestimonialForm from "@/components/TestimonialForm";
import Testimonials from "@/components/Testimonials";

export const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="relative flex flex-col items-center min-h-screen py-8 px-4 sm:px-6 lg:px-12 bg-customVeryLightPink"
    >
      {/* Headline like the mock */}
      <h2 className="text-center font-bree font-extrabold leading-tight mt-12">
        <span className="block text-4xl sm:text-5xl md:text-[56px] text-black">
          From Our <span className="text-customRed">Community</span>
        </span>
      </h2>

      {/* Form */}
      <div className="w-full max-w-3xl mt-8">
        <TestimonialForm />
      </div>

      {/* Cards */}
      <div className="w-full max-w-6xl mt-10">
        <Testimonials />
      </div>
    </section>
  );
};
