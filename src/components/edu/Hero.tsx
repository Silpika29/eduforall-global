import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-globe.jpg";

export function Hero() {
  return (
    <section className="bg-gradient-hero relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* floating orbs */}
      <div className="bg-gradient-primary absolute -left-20 top-32 h-72 w-72 rounded-full opacity-30 blur-3xl animate-pulse-glow" />
      <div className="bg-gradient-warm absolute -right-20 bottom-10 h-80 w-80 rounded-full opacity-25 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="glass brutal-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-warm" />
            <span>AI + Humanity for Global Literacy</span>
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Every child deserves <br />
            <span className="gradient-text">a chance to learn.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            EduForAll connects <span className="font-semibold text-foreground">volunteers, experts, and sponsors</span> with
            underprivileged children — bringing mentorship, education, and emotional support to every corner of the world,
            powered by AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#roles"
              className="bg-gradient-primary brutal hover-lift inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              <HeartHandshake className="h-4 w-4" />
              Become a Volunteer
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#cta"
              className="bg-gradient-warm brutal hover-lift inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-warm-foreground"
            >
              Sponsor a Child
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { v: "127+", l: "Countries" },
              { v: "48K", l: "Children" },
              { v: "$2.1M", l: "Raised" },
            ].map((s) => (
              <div key={s.l} className="glass brutal-sm rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold gradient-text">{s.v}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="brutal shadow-glow relative overflow-hidden rounded-3xl">
            <img
              src={heroImage}
              alt="Holographic globe surrounded by floating books and education symbols"
              width={1536}
              height={1024}
              className="h-auto w-full"
            />
          </div>
          {/* floating chips */}
          <div className="glass brutal-sm absolute -left-4 top-10 hidden rounded-2xl px-4 py-3 sm:block animate-float">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Live</div>
            <div className="mt-0.5 font-display text-sm font-bold">Aisha · Reading +12%</div>
          </div>
          <div className="glass brutal-sm absolute -right-4 bottom-10 hidden rounded-2xl px-4 py-3 sm:block animate-float-slow">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Mentor</div>
            <div className="mt-0.5 font-display text-sm font-bold">"Let's try fractions today!"</div>
          </div>
        </div>
      </div>
    </section>
  );
}