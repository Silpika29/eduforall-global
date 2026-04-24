import { Globe2, BookOpen, Heart } from "lucide-react";

const items = [
  {
    icon: Globe2,
    title: "Global Reach",
    text: "Bridging classrooms across continents with real-time translation in 40+ languages.",
  },
  {
    icon: BookOpen,
    title: "Quality Learning",
    text: "Personalized AI learning paths tailored to each child's pace, interests, and goals.",
  },
  {
    icon: Heart,
    title: "Emotional Support",
    text: "Caring mentors and a community that lifts every child beyond academics.",
  },
];

export function Mission() {
  return (
    <section id="mission" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Education is a <span className="gradient-text">human right</span>, not a privilege.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We believe that with the right tools, the right people, and the right heart — we can rewrite the future for
            every child currently locked out of opportunity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="glass brutal hover-lift animate-fade-up rounded-2xl p-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-gradient-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-glow">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}