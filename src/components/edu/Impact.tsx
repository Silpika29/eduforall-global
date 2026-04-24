import { ShieldCheck, BarChart3, Receipt } from "lucide-react";

export function Impact() {
  const allocations = [
    { label: "Direct child support", pct: 72, bg: "bg-gradient-primary" },
    { label: "Mentor & expert programs", pct: 18, bg: "bg-accent" },
    { label: "Tech & platform", pct: 8, bg: "bg-gradient-warm" },
    { label: "Operations", pct: 2, bg: "bg-foreground" },
  ];

  return (
    <section id="impact" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Radical transparency
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Every dollar, <span className="gradient-text">tracked to a child</span>.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="glass brutal hover-lift rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Where your money goes
              </h3>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Last 30 days</span>
            </div>
            <div className="mt-6 space-y-5">
              {allocations.map((a) => (
                <div key={a.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{a.label}</span>
                    <span className="font-display font-bold">{a.pct}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary brutal-sm">
                    <div className={`${a.bg} h-full`} style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass brutal hover-lift rounded-3xl p-6">
              <ShieldCheck className="h-7 w-7 text-accent" />
              <h3 className="mt-3 font-display text-lg font-bold">Verified Impact</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Every donation is logged on-chain and tied to verified outcomes.
              </p>
            </div>
            <div className="bg-gradient-primary brutal hover-lift rounded-3xl p-6 text-primary-foreground shadow-glow">
              <Receipt className="h-7 w-7" />
              <h3 className="mt-3 font-display text-lg font-bold">Live impact reports</h3>
              <p className="mt-1 text-sm text-primary-foreground/85">
                Get monthly photo & progress updates from the children you support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}