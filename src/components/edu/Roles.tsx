import { Users, Brain, HandCoins, ArrowUpRight } from "lucide-react";

const roles = [
  {
    icon: Users,
    title: "Volunteer",
    color: "primary",
    perks: ["Mentor 1-on-1", "Lead study groups", "Track child growth"],
    cta: "Start mentoring",
  },
  {
    icon: Brain,
    title: "Expert",
    color: "accent",
    perks: ["Build curriculums", "Train volunteers", "Career guidance"],
    cta: "Share knowledge",
  },
  {
    icon: HandCoins,
    title: "Sponsor",
    color: "warm",
    perks: ["Fund a child's year", "Transparent reports", "Direct impact"],
    cta: "Sponsor a child",
  },
];

export function Roles() {
  return (
    <section id="roles" className="relative px-4 py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-accent/10 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Three Roles. One Mission.
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Choose how you want to <span className="gradient-text">change a life</span>.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roles.map((r, i) => {
            const bg =
              r.color === "warm"
                ? "bg-gradient-warm"
                : r.color === "accent"
                  ? "bg-accent"
                  : "bg-gradient-primary";
            const fg = r.color === "accent" ? "text-accent-foreground" : r.color === "warm" ? "text-warm-foreground" : "text-primary-foreground";
            return (
              <article
                key={r.title}
                className="glass brutal hover-lift group relative overflow-hidden rounded-3xl p-6 animate-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className={`${bg} ${fg} mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow`}>
                  <r.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold">{r.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {r.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className={`${bg} h-1.5 w-1.5 rounded-full`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent"
                >
                  {r.cta} <ArrowUpRight className="h-4 w-4" />
                </a>

                <div className={`${bg} pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-2xl`} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}