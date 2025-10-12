"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import { AdminDashboard } from "@/app/admin/AdminDashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Access granted.");
    } catch (err) {
      toast.error("Invalid email or password.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out.");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    await handleLogin();
  };

  if (authenticated) return <AdminDashboard onLogout={handleLogout} />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-customLightPink">
      <Button
        variant="default"
        className="absolute top-4 left-4 flex items-center gap-2 bg-customLightPink text-customBlack hover:bg-customPink hover:text-white transition font-bree"
        onClick={() => router.push("/#contact")}
      >
        <FaArrowLeft />
        Back
      </Button>

      <div className="bg-customPink shadow-md rounded-lg p-6 w-full max-w-md space-y-4 relative z-10">
        <h2 className="text-xl font-bold text-customWhite text-center font-bree">
          Admin Login
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-customVeryLightPink text-customBlack font-bree"
            required
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-customVeryLightPink text-customBlack font-bree"
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-customLightPink text-customBlack font-bree hover:bg-customBlack hover:text-white"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
