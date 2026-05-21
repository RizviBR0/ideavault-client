import Image from "next/image";
import Link from "next/link";
import logo from "../assets/footer_logo.svg";

export default function Footer() {
  const platformLinks = [
    { name: "Ideas", href: "/ideas" },
    { name: "Categories", href: "/categories" },
    { name: "Add Idea", href: "/add-idea" },
    { name: "My Ideas", href: "/my-ideas" },
    { name: "My Interactions", href: "/my-interactions" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Instagram", href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#c9e7f4] to-[#ffffff]">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-14">
          <Image
            src={logo}
            alt="IdeaVault"
            width={760}
            height={180}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="grid gap-10 border-b border-slate-300 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-5 text-2xl font-black tracking-[-0.04em] text-[#063f49]">
              IdeaVault
            </h3>
            <p className="max-w-sm text-sm leading-7 text-slate-700">
              Share startup ideas, discover opportunities, and interact with a
              community built for creators, students, and founders.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-black text-slate-950">Platform</h4>
            <div className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-slate-700 transition hover:text-[#063f49]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-black text-slate-950">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-slate-700 transition hover:text-[#063f49]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-black text-slate-950">Contact</h4>
            <div className="space-y-3 text-sm font-semibold text-slate-700">
              <p>Email: support@ideavault.com</p>
              <p>Phone: +880 1700 000000</p>
              <p>Location: Dhaka, Bangladesh</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="text-sm font-bold text-slate-900 transition hover:text-[#063f49]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm font-semibold text-slate-700 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="hover:text-[#063f49]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#063f49]">
              Terms & Conditions
            </Link>
          </div>

          <p>© {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
