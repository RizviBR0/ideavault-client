"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaLightbulb, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/ideas" },
    { name: "Add Idea", href: "/add-idea" },
    { name: "My Ideas", href: "/my-ideas" },
    { name: "My Interactions", href: "/my-interactions" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex justify-center items-center gap-12">
          <Link href="/" className="flex items-center gap-1.5">
            <FaLightbulb className="text-xl text-[var(--accent-dark)]" />
            <span className="text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
              IdeaVault
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "text-[var(--accent-dark)] hover:underline"
                    : "text-[var(--text-secondary)] hover:underline"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow transition hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <Link
            href="/login"
            className="rounded-full bg-[var(--accent-dark)] px-8 py-3 text-sm font-bold text-white transition hover:bg-black"
          >
            Login
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow transition"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {openMenu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {openMenu && (
        <div className="border-t border-sky-100 bg-[#eaf8ff] px-5 pb-6 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenMenu(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                  isActive(link.href)
                    ? "bg-white text-[#063f49]"
                    : "text-slate-800 hover:bg-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpenMenu(false)}
              className="mt-3 rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white"
            >
              Login/Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
