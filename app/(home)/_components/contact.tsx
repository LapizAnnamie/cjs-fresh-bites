"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

const QR_SRC = "/qr.png";

export const Contact = () => {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const top = homeSection.getBoundingClientRect().top;
        setIsHome(top >= -200 && top <= 200);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTarget = isHome
    ? () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" })
    : () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      id="contact"
      className="relative flex flex-col lg:flex-row min-h-screen"
    >
      {/* Left: red info column */}
      <div className="bg-customRed text-white w-full lg:w-1/2 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 px-10 lg:px-16 py-16">
          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold">CONTACT US</h2>
            <div>
              <p className="text-lg">We’re here to help you!</p>
              <div className="mt-4 h-[2px] w-24 bg-white/70" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaPhone className="text-3xl" />
                <div>
                  <p className="font-bold">Phone</p>
                  <a href="tel:346-441-9608" className="hover:opacity-90">
                    346-441-9608
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaGlobe className="text-3xl" />
                <div>
                  <p className="font-bold">Website</p>
                  <a
                    href="https://www.cjsfreshbites.com/"
                    className="hover:opacity-90"
                  >
                    www.cjsfreshbites.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-3xl" />
                <div>
                  <p className="font-bold">E-Mail</p>
                  <a
                    href="mailto:info@cjsfreshbites.com"
                    className="hover:opacity-90 underline break-all"
                  >
                    info@cjsfreshbites.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-3xl" />
                <div>
                  <p className="font-bold">Address</p>
                  <p>Houston, Texas</p>
                </div>
              </div>

              <div
                className="mt-8 text-white/90 cursor-pointer hover:text-white"
                onClick={() => (window.location.href = "/admin")}
              >
                © 2025 CJ&apos;S Fresh Bite
              </div>
            </div>
          </div>

          {/* QR (beside on md+, stacks below on mobile) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 sm:py-2 md:py-16">
            <div className="rounded-2xl sm:p-2 flex justify-center items-center">
              <Image
                src={QR_SRC}
                alt="Scan to visit our social media"
                width={280}
                height={280}
                className="h-auto w-[180px] sm:w-[220px] md:w-[280px] object-contain drop-shadow-lg"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: light pink form column */}
      <div className="bg-customVeryLightPink w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 pt-14">
        <ContactForm />
      </div>

      <Button
        type="button"
        onClick={scrollTarget}
        className="fixed bottom-5 right-5 z-40 p-4 bg-customVeryLightPink text-customRed rounded-full shadow-lg hover:bg-customRed hover:text-white transition"
      >
        {isHome ? (
          <FaArrowDown className="text-lg pointer-events-none" />
        ) : (
          <FaArrowUp className="text-lg pointer-events-none" />
        )}
      </Button>
    </section>
  );
};
