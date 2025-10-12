"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUtensils } from "react-icons/fa";

const LEFT_FOOD_IMAGE = "/hero-dish.png";
const CHEF_ILLUSTRATION = "/cjs-fresh-bite.png";

export const HomeHero = () => {
  return (
    <section className="relative w-full min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh]">
        {/* LEFT: Photo with overlay CTA */}
        <div className="relative h-[60vh] md:h-[70vh] lg:h-auto flex items-center justify-center">
          {/* Background image */}
          <Image
            src={LEFT_FOOD_IMAGE}
            alt="Signature Meals"
            fill
            priority
            className="object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* VIEW MENU button - perfectly centered on all screens */}
          <div className="relative z-10 flex justify-center">
            <Link
              href="/#menus"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-customRed text-white text-lg font-semibold shadow-md hover:opacity-95 transition hover:bg-customVeryLightPink hover:text-customRed hover:shadow-lg"
            >
              VIEW MENU <FaUtensils />
            </Link>
          </div>
        </div>

        {/* RIGHT: Solid red panel with headline, tagline, chef */}
        <div className="relative bg-customRed text-white flex items-center justify-center overflow-visible min-h-[60vh] md:min-h-[70vh] lg:min-h-0">
          <div
            className="
      relative z-10 w-full px-6 sm:px-10 lg:px-12 py-12 lg:py-0 text-left
      md:pr-48 lg:pr-64 xl:pr-80 2xl:pr-[22rem]
    "
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow">
              CJ&apos;s
              <br />
              <span className="mt-2 inline-block">Fresh Bites</span>
            </h1>

            <p className="mt-8 italic text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">
              One Bite,
              <br />
              Eternal Delight
            </p>
          </div>

          {/* Chef illustration */}
          <div
            className="
              pointer-events-none absolute bottom-0 right-0
              w-[240px] sm:w-[320px]
              md:w-[clamp(260px,40vw,760px)]
            "
          >
            <Image
              src={CHEF_ILLUSTRATION}
              alt="Chef"
              width={1400}
              height={1600}
              priority
              sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 320px"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
