"use client";

import { useState } from "react";
import Image from "next/image";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

const SOFT_PINK = "#ffdcdc";
const DEEP_RED = "#b20000";

export default function MenuCard({ item }: { item: MenuItem }) {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden rounded-[22px] shadow-md ring-1 ring-black/5 flex flex-col"
        style={{
          backgroundColor: SOFT_PINK,
          minHeight: "420px",
        }}
      >
        {/* image */}
        <div
          className="relative w-full h-[300px] overflow-hidden rounded-t-[22px] cursor-pointer group"
          onClick={() => setShowFull(true)}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority={false}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 520px"
          />
        </div>

        {/* body */}
        <div className="relative flex-1 px-6 pb-10 pt-14">
          {/* centered price pill that sits on the image edge */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div
              className="rounded-full px-6 py-2 text-white font-extrabold text-[18px] shadow-md outline outline-[6px]"
              style={{ backgroundColor: DEEP_RED, outlineColor: SOFT_PINK }}
            >
              ${item.price.toFixed(2)}
            </div>
          </div>

          <h3 className="text-[22px] font-extrabold text-black text-center">
            {item.name}
          </h3>
          <p className="mt-2 text-center text-[14px] text-neutral-700 leading-snug max-w-[35ch] mx-auto">
            {item.description}
          </p>
        </div>
      </div>

      {/* Fullscreen preview modal */}
      {showFull && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowFull(false)}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={1000}
            height={800}
            className="max-h-[90vh] w-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
