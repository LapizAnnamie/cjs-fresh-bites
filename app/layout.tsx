import { Inter, Bree_Serif } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const bree = Bree_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bree",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bree.variable} relative bg-customVeryLightPink`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="food-truck-theme"
        >
          <Toaster
            position="bottom-center"
            toastOptions={{
              unstyled: false,
              classNames: {
                closeButton: "bg-lime-400",
                loading: "bg-blue-500 text-white",
                success: "bg-green-500 text-white font-bold",
                error: "bg-red-500 text-white font-bold",
                warning: "bg-yellow-400 text-black",
                info: "bg-blue-400 text-white",
              },
            }}
          />

          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
