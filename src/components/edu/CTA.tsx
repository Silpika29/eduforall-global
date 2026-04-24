import { Heart, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="bg-gradient-hero brutal shadow-glow relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12">
          <div className="bg-gradient-warm absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl animate-pulse-glow" />
          <div className="bg-gradient-primary absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-30 blur-3xl animate-pulse-glow" />

          <Sparkles className="bg-gradient-warm text-warm-foreground brutal-sm relative z-10 mx-auto mb-5 inline-flex h-12 w-12 rounded-2xl p-3" />

          <h2 className="relative z-10 text-3xl font-bold sm:text-5xl">
            One child. <span className="gradient-text">One future.</span> One you.
          </h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-muted-foreground">
            Join 48,000+ humans rewriting what's possible for the next generation. Start today — your first step takes
            less than a minute.
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
            <a className="bg-gradient-primary brutal hover-lift inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-primary-foreground">
              <Heart className="h-4 w-4" /> Sponsor a Child — $25/mo
            </a>
            <a className="brutal hover-lift glass inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold">
              Volunteer your time
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}