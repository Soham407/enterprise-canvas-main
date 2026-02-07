import type { Metadata } from "next";
import { Public_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";

const publicSans = Public_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "FacilityPro | Enterprise Cloud ERP",
  description: "Next-generation facility management and ERP solution for modern enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${publicSans.variable} ${outfit.variable} font-sans antialiased selection:bg-primary/10 selection:text-primary tracking-[0.01em]`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster position="top-right" closeButton richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
