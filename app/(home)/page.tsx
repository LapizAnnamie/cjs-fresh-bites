"use client";

import { HomeHero } from "./_components/home-hero";
import { HomeNavbar } from "./_components/home-navbar";
import AboutCFB from "./_components/about-cfb";
import { Contact } from "./_components/contact";
import { Testimonial } from "./_components/testimonials";
import OnTheMenu from "./_components/on-the-menu";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <HomeNavbar />

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex flex-col">
        <div className="relative z-10">
          <HomeHero />
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <AboutCFB />
      </section>

      {/* Testimonials Section */}
      <section id="menus">
        <OnTheMenu />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonial />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default HomePage;
