"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What is IdeaVault?",
    answer: "IdeaVault is a platform where aspiring entrepreneurs and innovators can share, discover, and collaborate on startup ideas. It provides a structured space to post concepts, receive community feedback, and refine your vision before building.",
  },
  {
    question: "Is IdeaVault free to use?",
    answer: "Yes! IdeaVault is completely free for all users. You can create an account, post unlimited ideas, browse the community feed, leave comments, and interact with other founders at no cost.",
  },
  {
    question: "How do I submit a startup idea?",
    answer: "After logging in, navigate to the 'Add Idea' page from the navbar. Fill in the form with your idea title, category, budget, target audience, problem statement, solution, and optional image. Hit submit and your idea goes live!",
  },
  {
    question: "Can I edit or delete my ideas after posting?",
    answer: "Absolutely. Visit the 'My Ideas' page to see all your submitted ideas. From there you can edit any idea details or delete ideas you no longer want to share with the community.",
  },
  {
    question: "How does the trending section work?",
    answer: "The trending section on the home page showcases the top 6 ideas based on community engagement and likes. The more interaction your idea receives, the higher it ranks in the trending feed.",
  },
  {
    question: "Is my idea safe on IdeaVault?",
    answer: "We take idea safety seriously. All users must be authenticated to interact with the platform. While ideas are shared publicly for feedback, IdeaVault timestamps all submissions providing a record of when your idea was first published.",
  },
];

const StartupFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#063f49] dark:text-teal-400 mb-3">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Got Questions?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Everything you need to know about IdeaVault before getting started.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-(--bg-card) overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`text-lg text-[#063f49] dark:text-teal-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StartupFAQ;
