import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault - Share & Discover Startup Ideas",
  description: "IdeaVault is a platform where innovators share startup ideas, explore concepts posted by others, and engage through comments and discussions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${raleway.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider>
          <Navbar />
          {children}

          <Footer />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
