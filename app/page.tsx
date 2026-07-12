import HeroSection from "@/components/home/HeroSection";
import PopularRestaurants from "@/components/home/PopularRestaurants";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CuisineSection from "@/components/home/CuisineSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CuisineSection />
      <PopularRestaurants />
      <WhyChooseUs />
      <StatisticsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}
