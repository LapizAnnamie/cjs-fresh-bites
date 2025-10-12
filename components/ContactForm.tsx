"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase/config";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const name = (
      formRef.current.elements.namedItem("name") as HTMLInputElement
    )?.value?.trim();
    const email = (
      formRef.current.elements.namedItem("email") as HTMLInputElement
    )?.value?.trim();
    const phone =
      (
        formRef.current.elements.namedItem("phone") as HTMLInputElement | null
      )?.value?.trim() ?? "";
    const message = (
      formRef.current.elements.namedItem("message") as HTMLTextAreaElement
    )?.value?.trim();

    if (!name || !email || !message) {
      toast.error("Please complete all required fields.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, message }),
        }).then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.ok)
            throw new Error(data.error || "Email failed");
        }),
        addDoc(collection(firestore, "contactMessages"), {
          name,
          email,
          phone,
          message,
          createdAt: serverTimestamp(),
        }),
      ]);

      toast.success("Message Sent! Thank you for reaching out!");
      formRef.current.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="w-full text-center">
        <h3 className="bg-customRed text-white font-bold py-2 px-8 rounded-full shadow-md inline-block mb-8">
          GET IN TOUCH
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 text-left max-w-xl mx-auto"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-customRed font-semibold mb-1"
            >
              Full Name :
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-full bg-customRed border-none text-white placeholder-white/90 px-5 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-customRed font-semibold mb-1"
            >
              E-Mail :
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-full bg-customRed border-none text-white placeholder-white/90 px-5 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-customRed font-semibold mb-1"
            >
              Phone Number :
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
              className="w-full rounded-full bg-customRed border-none text-white placeholder-white/90 px-5 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-customRed font-semibold mb-1"
            >
              Message :
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="w-full rounded-2xl bg-customRed border-none text-white placeholder-white/90 px-5 py-3"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full rounded-full bg-customRed text-white font-bold shadow-md hover:bg-customVeryLightPink hover:text-customRed transition py-3"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
