import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder, NexaAI",
    avatar: "A",
    rating: 5,
    quote: "IdeaVault gave me the confidence to share my AI startup concept. Within a week, I received feedback that completely reshaped my approach.",
  },
  {
    name: "Sarah Chen",
    role: "Co-founder, EduSpark",
    avatar: "S",
    rating: 5,
    quote: "The community here is incredible. I posted a rough idea and got actionable suggestions from people who actually understand the edtech space.",
  },
  {
    name: "David Okonkwo",
    role: "CEO, PayBridge",
    avatar: "D",
    rating: 4,
    quote: "I validated three fintech concepts on IdeaVault before committing to one. It saved me months of building the wrong product.",
  },
  {
    name: "Lina Rossi",
    role: "Founder, GreenLoop",
    avatar: "L",
    rating: 5,
    quote: "As a solo founder, IdeaVault became my sounding board. The feedback loop here is faster than any accelerator I have been part of.",
  },
  {
    name: "Takeshi Yamada",
    role: "CTO, CloudNest",
    avatar: "T",
    rating: 5,
    quote: "The platform is beautifully simple. Post an idea, get real opinions, iterate. No noise, just value from real founders.",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Founder, HealthPulse",
    avatar: "F",
    rating: 4,
    quote: "IdeaVault helped me discover that my healthtech idea already had a passionate audience. I launched with 200 waitlist signups from here.",
  },
];

const avatarColors = [
  "from-amber-400 to-orange-500",
  "from-blue-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-violet-400 to-purple-500",
  "from-cyan-400 to-sky-500",
];

const FounderTestimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#063f49] dark:text-teal-400 mb-3">
            What Founders Say
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Trusted by Innovators
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Hear from founders who turned their raw ideas into real startups using IdeaVault.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative rounded-2xl p-7 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={`text-sm ${
                      idx < t.rating
                        ? "text-amber-400"
                        : "text-slate-200 dark:text-slate-700"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-white font-bold text-sm shadow-md`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderTestimonials;
