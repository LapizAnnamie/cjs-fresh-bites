"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/config";

type Testimonial = {
  id: string;
  name: string;
  message: string;
  rating?: number; // NEW
};

const StarsRow = ({ rating = 0 }: { rating?: number }) => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1 mt-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={i <= full ? "#ffd700" : "#c9c9c9"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.173L12 18.897l-7.336 3.873 1.402-8.173L.132 9.21l8.2-1.192L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const q = query(
        collection(firestore, "testimonials"),
        where("approved", "==", true),
        orderBy("timestamp", "desc")
      );
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Testimonial, "id">),
      }));
      setTestimonials(data as Testimonial[]);
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return (
      <p className="text-center text-black/60 font-bree">
        No testimonials yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="relative bg-customRed text-white rounded-[28px] p-6 sm:p-7 shadow-md"
        >
          {/* Quote decoration in the bottom-right */}
          <svg
            className="absolute bottom-5 right-5 opacity-80"
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="#ffdcdc"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.17 13.1c1.3 0 2.35 1.06 2.35 2.36S8.47 17.82 7.17 17.82 4.82 16.76 4.82 15.46c0-2.6 1.36-4.67 4.07-6.21l.62 1.26c-1.64.86-2.43 2-2.39 2.59h.05zm8.66 0c1.3 0 2.35 1.06 2.35 2.36s-1.05 2.36-2.35 2.36-2.35-1.06-2.35-2.36c0-2.6 1.36-4.67 4.07-6.21l.62 1.26c-1.64.86-2.43 2-2.39 2.59h.05z" />
          </svg>

          {/* Message */}
          <p className="text-[17px] leading-7 font-medium">{t.message}</p>

          {/* Stars */}
          <StarsRow rating={t.rating} />

          {/* Name */}
          <p className="mt-4 font-semibold">{t.name}</p>
        </div>
      ))}
    </div>
  );
}
