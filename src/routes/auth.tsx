import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or join — EduForAll" },
      { name: "description", content: "Join EduForAll as a Volunteer, Expert, or Sponsor and help bring education to every child." },
      { property: "og:title", content: "Join EduForAll" },
      { property: "og:description", content: "Sign in to mentor, teach, or sponsor a child today." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup";
type Role = "volunteer" | "expert" | "sponsor";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("volunteer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: "/dashboard" });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName },
          },
        });
        if (err) throw err;
        if (data.user) {
          await supabase.from("user_roles").insert({ user_id: data.user.id, role });
        }
        if (!data.session) {
          setInfo("Account created! Check your email to confirm, then sign in.");
          setMode("signin");
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
        <Link to="/" className="mb-8 flex items-center gap-2 font-display font-bold">
          <span className="bg-gradient-primary inline-flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-glow">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">EduForAll</span>
        </Link>

        <div className="glass brutal rounded-3xl p-6">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setInfo(null);
                }}
                className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                  mode === m ? "bg-background brutal-sm" : "text-muted-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Join us"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-2xl font-bold">
            {mode === "signin" ? "Welcome back 👋" : "Change a child's life ✨"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to continue your impact." : "Tell us how you'd like to help."}
          </p>

          <form onSubmit={submit} className="mt-5 space-y-3">
            {mode === "signup" && (
              <>
                <input
                  required
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-secondary px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <div>
                  <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    I want to join as
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["volunteer", "expert", "sponsor"] as Role[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`brutal-sm rounded-xl px-2 py-2 text-xs font-semibold capitalize transition-colors ${
                          role === r ? "bg-foreground text-background" : "bg-secondary"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-secondary px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              required
              type="password"
              minLength={6}
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-secondary px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            {error && <div className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive">{error}</div>}
            {info && <div className="rounded-xl bg-accent/10 p-3 text-xs">{info}</div>}

            <button
              type="submit"
              disabled={loading}
              className="brutal-sm hover-lift bg-gradient-primary flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create my account"}
            </button>
          </form>
        </div>

        <Link to="/" className="mt-6 text-center text-xs text-muted-foreground hover:text-foreground">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}