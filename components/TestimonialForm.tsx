"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase/config";

const Star = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = 22,
}: {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  size?: number;
}) => (
  <button
    type="button"
    aria-label={filled ? "Selected star" : "Unselected star"}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="p-1"
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#ffd700" : "#c9c9c9"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.173L12 18.897l-7.336 3.873 1.402-8.173L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  </button>
);

export default function TestimonialForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const name = (
      formRef.current.elements.namedItem("name") as HTMLInputElement
    )?.value?.trim();
    const message = (
      formRef.current.elements.namedItem("message") as HTMLTextAreaElement
    )?.value?.trim();

    if (!name || !message) return;
    if (rating < 1 || rating > 5) {
      toast.error("Please select a star rating (1–5).");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(firestore, "testimonials"), {
        name,
        message,
        rating,
        timestamp: serverTimestamp(),
        approved: false,
      });

      toast.success("Thanks! Your testimonial was submitted for approval.");
      formRef.current.reset();
      setRating(0);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full"
    >
      {/* Red rounded container like the mock */}
      <div className="bg-customRed text-white rounded-[28px] px-6 sm:px-8 py-6 shadow-md max-w-xl mx-auto">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Name:
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Your Name"
              className="rounded-full bg-white text-black px-4 py-5 h-[44px] border-none"
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">
              Comment:
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Your Testimonial"
              className="rounded-[18px] bg-white text-black px-4 py-3 border-none"
            />
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                filled={(hover || rating) >= i}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>

          {/* Submit pill */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-customRed font-extrabold text-lg h-[44px] shadow-md hover:bg-customVeryLightPink"
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
