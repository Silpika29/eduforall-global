import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Globe2,
  GraduationCap,
  Heart,
  LogOut,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CHILDREN } from "@/lib/children-data";
import { ThemeToggle } from "@/components/edu/ThemeToggle";

type Role = "volunteer" | "expert" | "sponsor";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — EduForAll" },
      { name: "description", content: "See your impact, your children, and your next steps on EduForAll." },
      { property: "og:title", content: "EduForAll Dashboard" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeRole, setActiveRole] = useState<Role>("volunteer");

  useEffect(() => {
    let mounted = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/auth" });
    });

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      const userId = data.session.user.id;
      setEmail(data.session.user.email ?? null);

      const [{ data: profile }, { data: roleRows }] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userId),
      ]);

      if (!mounted) return;
      setFullName(profile?.full_name ?? null);
      const userRoles = (roleRows ?? []).map((r) => r.role as Role);
      setRoles(userRoles);
      if (userRoles[0]) setActiveRole(userRoles[0]);
      setLoading(false);
    })();

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">Loading your impact…</div>
    );
  }

  const displayName = fullName || email?.split("@")[0] || "Friend";
  const availableRoles: Role[] = roles.length ? roles : ["volunteer"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <span className="bg-gradient-primary inline-flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-glow">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">EduForAll</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={signOut}
              className="brutal-sm hover-lift inline-flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Welcome back
            </span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Hello, <span className="gradient-text">{displayName}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every minute you give changes a life. Here's what's happening today.
            </p>
          </div>

          {availableRoles.length > 1 && (
            <div className="brutal-sm flex gap-1 rounded-xl bg-secondary p-1">
              {availableRoles.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRole(r)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    activeRole === r ? "bg-background brutal-sm" : "text-muted-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          {activeRole === "volunteer" && <VolunteerView />}
          {activeRole === "expert" && <ExpertView />}
          {activeRole === "sponsor" && <SponsorView />}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, accent = "primary" }: { icon: typeof Heart; value: string; label: string; accent?: "primary" | "warm" | "accent" }) {
  const bg = accent === "warm" ? "bg-gradient-warm" : accent === "accent" ? "bg-accent" : "bg-gradient-primary";
  return (
    <div className="glass brutal hover-lift rounded-2xl p-4">
      <div className={`${bg} mb-3 grid h-10 w-10 place-items-center rounded-xl text-primary-foreground`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function VolunteerView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Heart} value="3" label="Children mentored" />
        <StatCard icon={BookOpen} value="42" label="Lessons delivered" accent="warm" />
        <StatCard icon={Globe2} value="2" label="Countries" accent="accent" />
        <StatCard icon={Award} value="180h" label="Time given" />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Your students</h2>
          <span className="text-xs text-muted-foreground">Tap a card to open their journey</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {CHILDREN.map((c) => (
            <Link
              key={c.id}
              to="/children/$childId"
              params={{ childId: c.id }}
              className="glass brutal hover-lift block rounded-2xl p-4"
            >
              <div className="font-display text-lg font-bold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.place}</div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="bg-gradient-primary h-full rounded-full" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="mt-2 text-xs">Next: {c.recentLessons[0].title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ExpertView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Sparkles} value="12" label="Lessons authored" />
        <StatCard icon={Users} value="2,340" label="Students reached" accent="warm" />
        <StatCard icon={TrendingUp} value="94%" label="Avg. completion" accent="accent" />
        <StatCard icon={BookOpen} value="5" label="Languages translated" />
      </div>

      <section className="glass brutal rounded-3xl p-5">
        <h2 className="font-display text-xl font-bold">Today's curriculum requests</h2>
        <p className="mt-1 text-sm text-muted-foreground">AI-matched to your expertise.</p>
        <ul className="mt-4 space-y-2 text-sm">
          {[
            "Design a 4-week math foundations track for Grade 3 (Spanish)",
            "Record a 5-minute intro to coding for ages 11-13",
            "Review Aisha's reading curriculum (Swahili → English)",
          ].map((t) => (
            <li key={t} className="brutal-sm flex items-center justify-between rounded-xl bg-secondary px-3 py-2.5">
              <span>{t}</span>
              <button className="bg-foreground text-background rounded-lg px-3 py-1 text-xs font-semibold">Accept</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SponsorView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Heart} value="$420" label="Donated this year" />
        <StatCard icon={Users} value="2" label="Children sponsored" accent="warm" />
        <StatCard icon={BookOpen} value="86%" label="Funds to learning" accent="accent" />
        <StatCard icon={Award} value="12" label="Milestones funded" />
      </div>

      <section className="glass brutal rounded-3xl p-5">
        <h2 className="font-display text-xl font-bold">Where your money went</h2>
        <p className="mt-1 text-sm text-muted-foreground">Radically transparent. Always.</p>
        <div className="mt-4 space-y-3 text-sm">
          {[
            { label: "Lessons & mentor stipends", pct: 64, color: "bg-gradient-primary" },
            { label: "Books, tablets, internet", pct: 22, color: "bg-gradient-warm" },
            { label: "Local hub operations", pct: 10, color: "bg-accent" },
            { label: "Platform & security", pct: 4, color: "bg-foreground" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-xs">
                <span>{row.label}</span>
                <span className="font-semibold">{row.pct}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                <div className={`${row.color} h-full rounded-full transition-all`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Your sponsored children</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {CHILDREN.slice(0, 2).map((c) => (
            <Link
              key={c.id}
              to="/children/$childId"
              params={{ childId: c.id }}
              className="glass brutal hover-lift block rounded-2xl p-4"
            >
              <div className="font-display text-lg font-bold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.place}</div>
              <div className="mt-2 text-xs">Latest milestone: {c.goals.find((g) => g.done)?.label ?? "In progress"}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}