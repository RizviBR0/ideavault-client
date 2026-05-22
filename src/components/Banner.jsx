"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import Image from "next/image";

const slides = [
  {
    id: 1,
    subtitle: "YOUR IDEAS, SAFELY STORED.",
    heading: "Share & Discover\nStartup Ideas",
    description:
      "A platform where innovators share startup ideas, explore concepts posted by others, and engage through meaningful discussions.",
    cta: "Explore Ideas",
    image: slider1,
    gradient:
      "linear-gradient(180deg, #c9e7f4 0%, #dbeefe 25%, #eef6ff 55%, #f8fbff 80%, #ffffff 100%)",
    darkGradient:
      "linear-gradient(180deg, #0d2438 0%, #0f1c2b 25%, #0f1521 55%, #0f111d 80%, var(--bg-primary) 100%)",
  },
  {
    id: 2,
    subtitle: "INNOVATE WITHOUT LIMITS.",
    heading: "Turn Ideas\nInto Reality",
    description:
      "Unlock your creative potential. Brainstorm, validate, and refine your startup concepts with a community that believes in building the future.",
    cta: "Get Started",
    image: slider2,
    gradient:
      "linear-gradient(180deg, #ddd0f5 0%, #e8def8 25%, #f1ecfb 55%, #f9f7fd 80%, #ffffff 100%)",
    darkGradient:
      "linear-gradient(180deg, #231835 0%, #1c152a 25%, #15111e 55%, #100f1c 80%, var(--bg-primary) 100%)",
  },
  {
    id: 3,
    subtitle: "STRONGER TOGETHER.",
    heading: "Build Together,\nGrow Together",
    description:
      "Connect with like-minded entrepreneurs, share feedback, and collaborate on the next big thing. Your vault of ideas starts here.",
    cta: "Join Community",
    image: slider3,
    gradient:
      "linear-gradient(180deg, #f8d9b0 0%, #fde8d0 25%, #fef1e3 55%, #fff9f2 80%, #ffffff 100%)",
    darkGradient:
      "linear-gradient(180deg, #3a210d 0%, #2a190f 25%, #1c1311 55%, #120e18 80%, var(--bg-primary) 100%)",
  },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-160 overflow-hidden md:min-h-190 lg:min-h-215"
      style={{
        background:
          theme === "dark" ? activeSlide.darkGradient : activeSlide.gradient,
      }}
    >
      <div className="relative z-10 mx-auto flex min-h-160 max-w-7xl flex-col items-center px-5 pt-16 text-center md:min-h-190 md:pt-20 lg:min-h-215 lg:pt-28">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-slate-800 dark:text-slate-300 md:text-sm">
          {activeSlide.subtitle}
        </p>

        <h1 className="whitespace-pre-line text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#063f49] dark:text-teal-200 md:text-6xl lg:text-7xl">
          {activeSlide.heading}
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
          {activeSlide.description}
        </p>

        <button className="mt-8 rounded-full bg-black dark:bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-[#063f49] dark:hover:bg-teal-500">
          {activeSlide.cta}
        </button>

        <div className="mt-6 flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-[#063f49] dark:bg-teal-400"
                  : "w-2.5 bg-slate-400/60 dark:bg-slate-600/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
        <Image
          width={800}
          height={600}
          src={activeSlide.image}
          alt={activeSlide.heading.replace("\n", " ")}
          className="w-full max-w-200 translate-y-2 object-contain px-2 transition-all duration-700 ease-in-out sm:px-6 md:translate-y-4"
        />
      </div>
    </section>
  );
}
