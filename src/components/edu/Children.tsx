import { MapPin, Sparkles, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { CHILDREN } from "@/lib/children-data";

export function Children() {
  return (
    <section id="children" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Real children · Real impact
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Meet the kids whose lives <span className="gradient-text">you can change today</span>.
            </h2>
          </div>
          <a href="#cta" className="brutal-sm hover-lift bg-foreground text-background inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold">
            See all children →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CHILDREN.map((c, i) => {
            const bg =
              c.accent === "warm"
                ? "bg-gradient-warm"
                : c.accent === "accent"
                  ? "bg-accent"
                  : "bg-gradient-primary";
            return (
              <article
                key={c.name}
                className="glass brutal hover-lift overflow-hidden rounded-3xl animate-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className={`${bg} relative flex items-center justify-between p-5`}>
                  <div>
                    <div className="font-display text-2xl font-bold text-primary-foreground">{c.name}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-primary-foreground/85">
                      <MapPin className="h-3 w-3" /> {c.place} · Age {c.age}
                    </div>
                  </div>
                  <div className="brutal-sm grid h-14 w-14 place-items-center rounded-2xl bg-background text-foreground">
                    <span className="font-display text-lg font-bold">{c.progress}%</span>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Level</div>
                    <div className="font-medium">{c.level}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Interests</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {c.interests.map((t) => (
                        <span key={t} className="brutal-sm rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span><span className="font-semibold">Dream:</span> {c.goal}</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-warm" />
                    <span><span className="font-semibold">AI suggests:</span> {c.need}</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className={`${bg} h-full rounded-full transition-all`} style={{ width: `${c.progress}%` }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/children/$childId"
                      params={{ childId: c.id }}
                      className="brutal-sm hover-lift bg-foreground text-background rounded-xl py-2 text-center text-xs font-semibold"
                    >
                      Sponsor
                    </Link>
                    <Link
                      to="/children/$childId"
                      params={{ childId: c.id }}
                      className="brutal-sm hover-lift bg-background rounded-xl py-2 text-center text-xs font-semibold"
                    >
                      Meet {c.name}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}