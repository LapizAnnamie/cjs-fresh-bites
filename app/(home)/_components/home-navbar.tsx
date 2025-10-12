"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { FaBars, FaTimes } from "react-icons/fa";

export const HomeNavbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const sectionIds = ["home", "about", "menus", "testimonials", "contact"];
    let lastId = activeSection;
    let timeout: NodeJS.Timeout;

    const handleScrollSpy = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section) {
            const top = section.getBoundingClientRect().top;
            if (top <= 100 && top >= -300) {
              if (lastId !== id) {
                lastId = id;
                setActiveSection(id);
                if (window.location.hash !== `#${id}`) {
                  window.history.replaceState(null, "", `/#${id}`);
                }
              }
              break;
            }
          }
        }
      }, 200);
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [activeSection]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-customVeryLightPink shadow-sm z-50 py-2 sm:py-3">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4">
        {/* Logo + Name */}
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bree font-bold text-customPink focus:outline-none"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
          />
          <span className="ml-2 text-customRed whitespace-nowrap">
            CJ&apos;s Fresh Bites
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-2 sm:space-x-4 text-sm sm:text-base font-bree text-customBlack">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About Us" },
            { id: "menus", label: "Menus" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={clsx(
                "relative px-3 sm:px-4 py-1 sm:py-2 rounded-md transition-all duration-300",
                activeSection === id
                  ? "bg-customLightPink text-customWBlack shadow-inner"
                  : "hover:text-customPink"
              )}
            >
              {label}
              {activeSection === id && (
                <span className="absolute inset-0 border-2 border-customPink rounded-md animate-in fade-in zoom-in" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-customPink text-xl sm:text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 px-4 flex flex-col gap-2 font-bree text-base text-customBlack pb-4">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About Us" },
            { id: "menus", label: "Menus" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={clsx(
                "w-full text-left px-4 py-2 rounded-md transition",
                activeSection === id
                  ? "bg-customLightPink text-customWBlack"
                  : "hover:text-customPink"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
