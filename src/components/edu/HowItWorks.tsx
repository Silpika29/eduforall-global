const steps = [
  { n: "01", t: "Sign up & pick a role", d: "Volunteer, expert, or sponsor — onboard in under 2 minutes." },
  { n: "02", t: "Match with a child", d: "Our AI pairs you based on skills, language, and timezone." },
  { n: "03", t: "Show up & uplift", d: "Mentor, teach, or fund. Track real progress every week." },
  { n: "04", t: "Watch them fly", d: "Receive reports, celebrate milestones, change a destiny." },
];

export function HowItWorks() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Four steps from <span className="gradient-text">heart to impact</span>.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="glass brutal hover-lift relative rounded-2xl p-6 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="font-display gradient-text text-5xl font-bold leading-none">{s.n}</span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}