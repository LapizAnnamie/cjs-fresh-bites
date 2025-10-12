"use client";

import Image from "next/image";
import MatterOfTaste from "./matter-of-taste";

type AboutCFBProps = {
  logoSrc?: string;
  dishSrc?: string;
};

const DEFAULT_LOGO = "/logo.png";
const DEFAULT_DISH = "/lumpia.jpg";

export default function AboutCFB({
  logoSrc = DEFAULT_LOGO,
  dishSrc = DEFAULT_DISH,
}: AboutCFBProps) {
  return (
    <section
      id="about"
      className="relative w-full bg-customVeryLightPink min-h-screen "
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:items-start">
          {/* LEFT: logo + dish photo (stack) */}
          <div className="flex flex-col items-center md:items-start">
            {/* Logo */}
            <div className="w-[180px] sm:w-[200px] md:w-[240px] mb-6 md:mb-8 md:ml-24 flex justify-center">
              <Image
                src={logoSrc}
                alt="CJ's Fresh Bites Logo"
                width={320}
                height={320}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Dish photo */}
            <div className="rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
              <Image
                src={dishSrc}
                alt="Golden Crispy Lumpia"
                width={420}
                height={320}
                className="w-[260px] sm:w-[300px] md:w-[380px] h-auto object-cover"
              />
            </div>
          </div>

          {/* RIGHT: text content */}
          <div className="text-neutral-900 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mt-10 sm:mt-14 md:mt-20">
              About <span className="text-customRed">CFB</span>
            </h2>

            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5 leading-relaxed text-lg sm:text-xl indent-8 text-justify">
              <p>
                Welcome to <strong>CJ&apos;s Fresh Bites!</strong> We&apos;re a
                family-owned food trailer, bringing the crispy, savory flavors
                of the Philippines to the heart of Houston, Texas. We believe
                great food is more than just a meal—it&apos;s a story, a memory,
                and a taste of home.
              </p>

              <p>
                Our star dish, the <strong>Golden Crispy Lumpia</strong>, is
                made with love and a traditional recipe. Each lumpia is
                hand-rolled and fried to a perfect golden crisp, filled with a
                delicious blend of seasoned ground meat and fresh vegetables.
                It&apos;s the perfect bite of crunchy, savory goodness that we
                can&apos;t wait to share with you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MatterOfTaste />
    </section>
  );
}
