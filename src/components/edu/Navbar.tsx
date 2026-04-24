import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Mission", href: "#mission" },
  { label: "Roles", href: "#roles" },
  { label: "Children", href: "#children" },
  { label: "AI Features", href: "#ai" },
  { label: "Impact", href: "#impact" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="glass brutal-sm mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display font-bold">
          <span className="bg-gradient-primary inline-flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-glow">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">EduForAll</span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/auth"
            className="hover-lift hidden rounded-xl px-3 py-2 text-sm font-semibold text-foreground sm:inline-block"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="bg-gradient-primary brutal-sm hover-lift hidden rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground sm:inline-block"
          >
            Join
          </Link>
        </div>
      </nav>
    </header>
  );
}