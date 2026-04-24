import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Heart, MapPin, Sparkles, Target } from "lucide-react";
import { CHILDREN, getChild, type ChildProfile } from "@/lib/children-data";
import { Navbar } from "@/components/edu/Navbar";
import { Footer } from "@/components/edu/Footer";

export const Route = createFileRoute("/children/$childId")({
  loader: ({ params }): { child: ChildProfile } => {
    const child = getChild(params.childId);
    if (!child) throw notFound();
    return { child };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.child.name} from ${loaderData.child.place} — EduForAll` },
            { name: "description", content: `Help ${loaderData.child.name} (${loaderData.child.age}) reach their dream: ${loaderData.child.goal}.` },
            { property: "og:title", content: `Sponsor ${loaderData.child.name} — EduForAll` },
            { property: "og:description", content: loaderData.child.story },
          ],
        }
      : {},
  component: ChildPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Child not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">Back home</Link>
      </div>
    </div>
  ),
});

function ChildPage() {
  const { child } = Route.useLoaderData();
  const others = CHILDREN.filter((c) => c.id !== child.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-28">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to all children
        </Link>

        <header className="glass brutal mt-4 overflow-hidden rounded-3xl">
          <div className="bg-gradient-primary p-6 text-primary-foreground sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-foreground/70">{child.level}</div>
                <h1 className="font-display mt-1 text-4xl font-bold sm:text-5xl">{child.name}</h1>
                <div className="mt-2 flex items-center gap-1 text-sm text-primary-foreground/85">
                  <MapPin className="h-4 w-4" /> {child.place} · Age {child.age}
                </div>
              </div>
              <div className="brutal-sm grid h-20 w-20 place-items-center rounded-2xl bg-background text-foreground">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold leading-none">{child.progress}%</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">progress</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            <p className="text-base leading-relaxed">{child.story}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="brutal-sm flex items-start gap-3 rounded-2xl bg-secondary/60 p-4">
                <Target className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Dream</div>
                  <div className="font-semibold">{child.goal}</div>
                </div>
              </div>
              <div className="brutal-sm flex items-start gap-3 rounded-2xl bg-secondary/60 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-warm" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">AI suggests</div>
                  <div className="font-semibold">{child.need}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Interests</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {child.interests.map((t: string) => (
                  <span key={t} className="brutal-sm rounded-full bg-secondary px-3 py-1 text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/auth" className="brutal-sm hover-lift bg-gradient-primary inline-flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-primary-foreground">
                <Heart className="h-4 w-4" /> Sponsor {child.name}
              </Link>
              <Link to="/auth" className="brutal-sm hover-lift bg-foreground text-background inline-flex items-center justify-center rounded-xl py-3 text-sm font-semibold">
                Become their mentor
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass brutal rounded-3xl p-6">
            <h2 className="font-display text-xl font-bold">Recent lessons</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {child.recentLessons.map((l: { title: string; date: string; mentor: string }) => (
                <li key={l.title} className="brutal-sm rounded-xl bg-secondary/60 p-3">
                  <div className="font-semibold">{l.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{l.date} · with {l.mentor}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass brutal rounded-3xl p-6">
            <h2 className="font-display text-xl font-bold">Goals this year</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {child.goals.map((g: { label: string; done: boolean }) => (
                <li key={g.label} className="flex items-start gap-2">
                  {g.done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className={g.done ? "line-through text-muted-foreground" : ""}>{g.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-bold">Other children waiting</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {others.map((c) => (
              <Link
                key={c.id}
                to="/children/$childId"
                params={{ childId: c.id }}
                className="glass brutal hover-lift flex items-center justify-between rounded-2xl p-4"
              >
                <div>
                  <div className="font-display font-bold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.place}</div>
                </div>
                <span className="text-xs font-semibold">View →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}