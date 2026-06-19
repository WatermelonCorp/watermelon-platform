import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Stats from "@/components/landing/stats";
import Features from "@/components/landing/features";
import AnimatedBento from "@/components/landing/animated-bento";
import ComponentsBento from "@/components/landing/component-bento";
import TemplateBento from "@/components/landing/template-bento";
import Testimonial from "@/components/landing/testimonial";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="dark overflow-x-hidden min-h-screen bg-neutral-950">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <AnimatedBento />
      <ComponentsBento />
      <TemplateBento />
      <Testimonial />
      <Footer />
    </main>
  );
}
