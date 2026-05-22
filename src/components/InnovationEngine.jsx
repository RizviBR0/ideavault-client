import { FaLightbulb, FaUsers, FaComments, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaLightbulb />,
    title: "Share Ideas",
    description: "Post your startup concepts and get them in front of a community that values innovation.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: <FaUsers />,
    title: "Build Community",
    description: "Connect with like-minded founders, developers, and investors who share your vision.",
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: <FaComments />,
    title: "Get Feedback",
    description: "Receive constructive comments and suggestions to refine your ideas before launch.",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: <FaRocket />,
    title: "Launch Faster",
    description: "Validate concepts early, iterate quickly, and bring your startup to life with confidence.",
    color: "from-rose-400 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    description: "Your ideas are protected. Share freely with our authenticated and moderated platform.",
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    icon: <FaChartLine />,
    title: "Track Engagement",
    description: "Monitor how your ideas perform with likes, comments, and trending analytics.",
    color: "from-cyan-400 to-sky-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
];

const InnovationEngine = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#063f49] dark:text-teal-400 mb-3">
            Why IdeaVault?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            The Innovation Engine
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Everything you need to go from a spark of inspiration to a validated startup concept — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl p-7 ${feature.bg} border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white text-xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationEngine;
