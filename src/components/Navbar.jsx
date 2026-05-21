"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";

export default function Navbar({ isLoggedIn = false, user = {}, onLogout }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const links = [
    { name: "Home", href: "/", private: false },
    { name: "Ideas", href: "/ideas", private: false },
    { name: "Add Idea", href: "/add-idea", private: true },
    { name: "My Ideas", href: "/my-ideas", private: true },
    { name: "My Interactions", href: "/my-interactions", private: true },
  ];

  const visibleLinks = links.filter((link) => !link.private || isLoggedIn);

  const isActive = (href) => pathname === href;

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex justify-center items-center gap-12">
          <Link href="/" className="flex items-center gap-1.5">
            <FaLightbulb className="text-xl text-[#063f49]" />
            <span className="text-2xl font-black tracking-[-0.04em] text-[#063f49]">
              IdeaVault
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "text-black hover:underline"
                    : "text-slate-800 hover:underline"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-[#063f49]"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-3 rounded-full bg-black py-2 pl-2 pr-5 text-sm font-bold text-white transition hover:bg-[#063f49]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#063f49]">
                  {user?.name?.charAt(0) || "U"}
                </span>
                {user?.name || "Profile"}
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-4 w-56 rounded-3xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                  <Link
                    href="/profile"
                    onClick={() => setOpenProfile(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Profile Management
                  </Link>

                  <button
                    onClick={onLogout}
                    className="mt-1 w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {openMenu ? "✕" : "☰"}
        </button>
      </nav>

      {openMenu && (
        <div className="border-t border-sky-100 bg-[#eaf8ff] px-5 pb-6 lg:hidden">
          <div className="flex flex-col gap-2">
            {visibleLinks.map((link) => (
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

            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setOpenMenu(false)}
                className="mt-3 rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white"
              >
                Login/Register
              </Link>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpenMenu(false)}
                  className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#063f49]"
                >
                  Profile Management
                </Link>

                <button
                  onClick={onLogout}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
