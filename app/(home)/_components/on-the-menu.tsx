"use client";

import Link from "next/link";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase/config";
import MenuCard, { type MenuItem } from "./menu-card";
import FullMenuPage from "./full-menu";

const DEEP_RED = "#b20000";

export default function OnTheMenu() {
  const [items, setItems] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(firestore, "menus"),
        orderBy("createdAt", "desc"),
        limit(3)
      );
      const snap = await getDocs(q);
      const data: MenuItem[] = snap.docs.map((d) => {
        const v = d.data() as any;
        return {
          id: d.id,
          name: v.name ?? "",
          description: v.description ?? "",
          image: v.image ?? "",
          price: typeof v.price === "number" ? v.price : Number(v.price ?? 0),
        };
      });
      setItems(data);
    })();
  }, []);

  return (
    <section
      id="menus"
      className="
        min-h-screen
        py-16 sm:py-20 lg:py-24
        px-4 sm:px-6 lg:px-12
        justify-center
        scroll-mt-28 sm:scroll-mt-24
      "
      style={{ backgroundColor: DEEP_RED }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-stretch">
          {/* LEFT: deep-red slab with rounded corners */}
          <div
            className="rounded-3xl text-white flex flex-col justify-center 
                       items-center text-center lg:items-start lg:text-left 
                       p-6 sm:p-8 lg:p-12"
            style={{ backgroundColor: DEEP_RED }}
          >
            <h2 className="font-bree font-extrabold leading-[1.0] tracking-tight text-white">
              <span className="block text-4xl sm:text-5xl md:text-6xl">
                On the
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl mt-1">
                Menu
              </span>
            </h2>

            <div className="mt-6 sm:mt-8 mb-4 sm:mb-6">
              <Link
                href="#full-menu"
                className="inline-flex items-center justify-center rounded-[6px] bg-black px-4 py-2 text-[12px] font-semibold text-white hover:bg-customVeryLightPink hover:text-customRed transition"
              >
                VIEW FULL MENU
              </Link>
            </div>
          </div>

          {/* RIGHT: menu cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:py-28">
            {items
              ? items.map((item) => <MenuCard key={item.id} item={item} />)
              : Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[420px] rounded-[22px] bg-customVeryLightPink"
                  />
                ))}
          </div>
        </div>
      </div>

      <section id="full-menu" className="scroll-mt-24">
        <FullMenuPage />
      </section>
    </section>
  );
}
