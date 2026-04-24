import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/edu/Navbar";
import { Hero } from "@/components/edu/Hero";
import { Mission } from "@/components/edu/Mission";
import { Roles } from "@/components/edu/Roles";
import { Children } from "@/components/edu/Children";
import { AIFeatures } from "@/components/edu/AIFeatures";
import { Impact } from "@/components/edu/Impact";
import { HowItWorks } from "@/components/edu/HowItWorks";
import { CTA } from "@/components/edu/CTA";
import { Footer } from "@/components/edu/Footer";
import { AIChat } from "@/components/edu/AIChat";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Roles />
        <Children />
        <AIFeatures />
        <Impact />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}
