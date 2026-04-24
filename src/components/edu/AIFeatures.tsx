import { Bot, Languages, LineChart, Trophy, Compass, AlertTriangle, MessagesSquare, Map } from "lucide-react";
import childrenImg from "@/assets/children-learning.jpg";

const features = [
  { icon: Bot, title: "AI Mentor Chat", text: "24/7 friendly tutor that adapts to each child." },
  { icon: Languages, title: "Real-time Translate", text: "Mentor in any language across 40+ tongues." },
  { icon: LineChart, title: "Skill Analysis", text: "AI detects strengths and gaps weekly." },
  { icon: Compass, title: "Career Guidance", text: "Personalised paths based on interests." },
  { icon: Trophy, title: "Gamified Rewards", text: "Badges, streaks, and quests keep kids learning." },
  { icon: Map, title: "Literacy Heatmap", text: "Live global view of where help is needed most." },
  { icon: AlertTriangle, title: "Emergency Support", text: "One-tap SOS for urgent child needs." },
  { icon: MessagesSquare, title: "Community Forum", text: "Connect mentors, experts, and families." },
];

export function AIFeatures() {
  return (
    <section id="ai" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="glass brutal-sm inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Smart by design
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              AI that <span className="gradient-text">amplifies</span> human kindness.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From real-time translation to career guidance, our AI gives every volunteer superpowers — and every child a
              learning companion that never sleeps.
            </p>

            <div className="brutal shadow-glow mt-8 overflow-hidden rounded-3xl">
              <img
                src={childrenImg}
                alt="Children smiling while learning with a glowing tablet"
                width={1280}
                height={896}
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass brutal-sm hover-lift rounded-2xl p-5 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="bg-gradient-primary text-primary-foreground mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}