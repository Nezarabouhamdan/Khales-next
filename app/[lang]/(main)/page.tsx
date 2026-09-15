"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import HeroSequence from "@/app/components/HeroSequence";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import SiteFooter from "@/app/components/SiteFooter";
import type { Locale } from "@/i18n-config";
import enDictionary from "@/dictionaries/en";
import arDictionary from "@/dictionaries/ar";

export default function Home() {
  const { lang = "en" } = useParams<{ lang: Locale }>() ?? {};
  const dictionary = lang === "ar" ? arDictionary : enDictionary;
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const year = new Date().getFullYear();

  // Initial loader simulation - purely cosmetic (not tied to any real
  // asset/data readiness), so its total on-screen time is just these two
  // numbers: 10 steps * 40ms to count up, then a 100ms hold at 100%, for
  // ~500ms before the reveal fade starts.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 100);
          return 100;
        }
        return prev + 10;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#f7f7f7] flex flex-col justify-between p-8 md:p-16 select-none"
          >
            <div className="flex justify-between items-center text-xs tracking-widest text-neutral-400">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/logo-light.png"
                alt="Khales"
                width={280}
                height={150}
                className="w-40 md:w-56 h-auto invert"
              />
            </div>
            <div className="flex justify-between items-end text-xs tracking-widest text-neutral-400">
              <span>&copy;{year} Khales</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 bg-[#f7f7f7] text-neutral-900">
        {/* HERO + REVEAL SEQUENCE */}
        <HeroSequence
          lang={lang}
          navigation={dictionary.navigation}
          content={dictionary.homePage.hero}
          worldwideContent={dictionary.homePage.worldwide}
          interiorShowcaseContent={dictionary.homePage.interiorShowcase}
          aboutTeamContent={dictionary.homePage.aboutTeam}
          teamGridContent={dictionary.homePage.teamGrid}
          projectsSectionContent={dictionary.homePage.projectsSection}
          servicesSectionContent={dictionary.homePage.servicesSection}
        />

        {/* FINAL CTA */}
        <CTAHeroSection lang={lang} content={dictionary.shared.cta} />

        {/* FOOTER */}
        <SiteFooter lang={lang} content={dictionary.footer} />
      </main>
    </>
  );
}
