"use client";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase/config";
import MenuCard, { type MenuItem } from "./menu-card";

export default function FullMenuPage() {
  const [items, setItems] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(firestore, "menus"),
        orderBy("createdAt", "desc")
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
    <main className="py-16 px-4 sm:px-6 lg:px-12">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items
          ? items.map((item) => <MenuCard key={item.id} item={item} />)
          : Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-[380px] rounded-2xl bg-customVeryLightPink"
              />
            ))}
      </div>
    </main>
  );
}
