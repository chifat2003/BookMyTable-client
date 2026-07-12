import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurMission from "@/components/about/OurMission";
import OurTeam from "@/components/about/OurTeam";
import OurValues from "@/components/about/OurValues";
import StatisticsSection from "@/components/home/StatisticsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export const metadata: Metadata = {
  title: "About Us — BookMyTable",
  description: "Learn about the team and mission behind BookMyTable.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurMission />
      <OurValues />
      <StatisticsSection />
      <OurTeam />
      <TestimonialsSection />
    </main>
  );
}
