"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TestimonialSection } from "@/app/admin/TestimonialSection";
import { MessagesSection } from "@/app/admin/MessagesSection";
import MenusCRUD from "./MenuCRUD";

interface Testimonial {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  rating: number;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showOnlyUnapproved, setShowOnlyUnapproved] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchTestimonials();
    fetchMessages();
  }, []);

  const fetchTestimonials = async () => {
    const q = query(
      collection(firestore, "testimonials"),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      const testimonial = doc.data() as Omit<Testimonial, "id">;
      return { ...testimonial, id: doc.id };
    });
    setTestimonials(data);
  };

  const fetchMessages = async () => {
    const q = query(
      collection(firestore, "contactMessages"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      const message = doc.data() as Omit<ContactMessage, "id">;
      return { ...message, id: doc.id };
    });
    setMessages(data);
  };

  const handleToggleApprove = async (id: string, currentStatus: boolean) => {
    await updateDoc(doc(firestore, "testimonials", id), {
      approved: !currentStatus,
    });
    toast.success(`Testimonial ${!currentStatus ? "approved" : "disapproved"}`);
    fetchTestimonials();
  };

  const handleDeleteTestimonial = async (id: string) => {
    await deleteDoc(doc(firestore, "testimonials", id));
    toast.success("Testimonial deleted");
    fetchTestimonials();
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteDoc(doc(firestore, "contactMessages", id));
    toast.success("Message deleted");
    fetchMessages();
  };

  return (
    <div className="container max-w-8xl w-full px-4 sm:px-6 lg:px-12 py-4 bg-customVeryLightPink">
      <div className="flex justify-end mb-6">
        <Button
          onClick={onLogout}
          size="sm"
          className="bg-customBlack text-white hover:bg-customRed hover:text-white"
        >
          Logout
        </Button>
      </div>
      <TestimonialSection
        testimonials={testimonials}
        showOnlyUnapproved={showOnlyUnapproved}
        setShowOnlyUnapproved={setShowOnlyUnapproved}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onToggleApprove={handleToggleApprove}
        onDelete={handleDeleteTestimonial}
      />
      <MessagesSection messages={messages} onDelete={handleDeleteMessage} />
      <MenusCRUD />
    </div>
  );
}
