"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaLightbulb, FaMoon, FaSun } from "react-icons/fa";
import { FiUser, FiPlusSquare, FiList, FiActivity, FiLogOut } from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";
import { authClient } from "@/lib/auth-client";
import { Dropdown, Avatar, Label } from "@heroui/react";

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const links = user
    ? [
        { name: "Home", href: "/" },
        { name: "Ideas", href: "/ideas" },
        { name: "Add Idea", href: "/add-idea" },
        { name: "My Ideas", href: "/my-ideas" },
        { name: "My Interactions", href: "/my-interactions" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Ideas", href: "/ideas" },
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

          {user ? (
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger className="rounded-full">
                <div className="flex items-center gap-3 cursor-pointer select-none focus:outline-none rounded-full">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {user.name}
                  </span>
                  <Avatar className="transition-transform cursor-pointer w-10 h-10 border border-[var(--border)] shadow-sm bg-[#063f49] text-white font-bold select-none">
                    {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                    <Avatar.Fallback>{user.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover className="border border-[var(--border)] bg-[var(--bg-secondary)] shadow-xl rounded-2xl min-w-[240px] p-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-primary)]/50">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm" className="w-8 h-8 border border-[var(--border)] bg-[#063f49] text-white font-bold shadow-sm">
                      {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                      <Avatar.Fallback>{user.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm leading-4 font-bold text-[var(--text-primary)]">{user.name}</p>
                      <p className="text-xs leading-none text-[var(--text-muted)] truncate max-w-[150px]">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu aria-label="Profile Actions" className="p-1.5 flex flex-col gap-1">
                  <Dropdown.Item key="profile" textValue="Profile" as={Link} href="/profile" className="rounded-xl hover:bg-[var(--bg-primary)]">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-[var(--text-primary)] font-semibold text-sm">Profile</Label>
                      <FiUser className="size-4 text-[var(--text-secondary)]" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" textValue="Logout" variant="danger" onClick={handleSignOut} className="rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-red-600 dark:text-red-400 font-semibold text-sm">Log Out</Label>
                      <FiLogOut className="size-4 text-red-600 dark:text-red-400" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full bg-[var(--accent-dark)] px-8 py-3 text-sm font-bold text-white transition hover:bg-black"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full border border-[var(--accent-dark)] px-8 py-3 text-sm font-bold text-[var(--accent-dark)] transition hover:bg-[var(--accent-dark)] hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow transition"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {user && (
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger className="rounded-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full focus:outline-none cursor-pointer">
                  <Avatar className="transition-transform cursor-pointer w-9 h-9 border border-[var(--border)] shadow-sm bg-[#063f49] text-white font-bold select-none">
                    {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                    <Avatar.Fallback className="text-xs">{user.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover className="border border-[var(--border)] bg-[var(--bg-secondary)] shadow-xl rounded-2xl min-w-[240px] p-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-primary)]/50">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm" className="w-8 h-8 border border-[var(--border)] bg-[#063f49] text-white font-bold shadow-sm">
                      {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                      <Avatar.Fallback>{user.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm leading-4 font-bold text-[var(--text-primary)]">{user.name}</p>
                      <p className="text-xs leading-none text-[var(--text-muted)] truncate max-w-[150px]">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu aria-label="Profile Actions" className="p-1.5 flex flex-col gap-1">
                  <Dropdown.Item key="profile" textValue="Profile" as={Link} href="/profile" onClick={() => setOpenMenu(false)} className="rounded-xl hover:bg-[var(--bg-primary)]">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-[var(--text-primary)] font-semibold text-sm">Profile</Label>
                      <FiUser className="size-4 text-[var(--text-secondary)]" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item key="add-idea" textValue="Add Idea" as={Link} href="/add-idea" onClick={() => setOpenMenu(false)} className="rounded-xl hover:bg-[var(--bg-primary)]">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-[var(--text-primary)] font-semibold text-sm">Add Idea</Label>
                      <FiPlusSquare className="size-4 text-[var(--text-secondary)]" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item key="my-ideas" textValue="My Ideas" as={Link} href="/my-ideas" onClick={() => setOpenMenu(false)} className="rounded-xl hover:bg-[var(--bg-primary)]">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-[var(--text-primary)] font-semibold text-sm">My Ideas</Label>
                      <FiList className="size-4 text-[var(--text-secondary)]" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item key="my-interactions" textValue="My Interactions" as={Link} href="/my-interactions" onClick={() => setOpenMenu(false)} className="rounded-xl hover:bg-[var(--bg-primary)]">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-[var(--text-primary)] font-semibold text-sm">My Interactions</Label>
                      <FiActivity className="size-4 text-[var(--text-secondary)]" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" textValue="Logout" variant="danger" onClick={() => { handleSignOut(); setOpenMenu(false); }} className="rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400">
                    <div className="flex w-full items-center justify-between gap-2 py-1 px-1">
                      <Label className="cursor-pointer text-red-600 dark:text-red-400 font-semibold text-sm">Log Out</Label>
                      <FiLogOut className="size-4 text-red-600 dark:text-red-400" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
            aria-label="Toggle menu"
          >
            {openMenu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {openMenu && (
        <div className="border-t border-sky-100 bg-[#eaf8ff] dark:bg-[var(--bg-secondary)] px-5 pb-6 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenMenu(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                  isActive(link.href)
                    ? "bg-white dark:bg-[var(--bg-card)] text-[var(--accent-dark)]"
                    : "text-[var(--text-secondary)] hover:bg-white dark:hover:bg-[var(--bg-card)]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!user && (
              <Link
                href="/login"
                onClick={() => setOpenMenu(false)}
                className="mt-3 rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white"
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
