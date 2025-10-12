"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/#home");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4 text-center">
      <Image
        src="/assets/error.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:hidden"
      />
      <h2 className="text-xl font-semibold text-customPink">
        Something went wrong!
      </h2>
      <p className="text-sm text-customBlack max-w-md">{error.message}</p>
      <div className="flex gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Button onClick={handleGoBack} variant="secondary">
          Go Home
        </Button>
      </div>
    </div>
  );
}
