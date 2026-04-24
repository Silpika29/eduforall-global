import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-4 pb-10 pt-16">
      <div className="glass brutal mx-auto max-w-6xl rounded-3xl p-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-primary inline-flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">EduForAll</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A futuristic platform connecting volunteers, experts, and sponsors to bring education to every child on
              Earth.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} className="brutal-sm hover-lift glass grid h-9 w-9 place-items-center rounded-xl" href="#">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#roles" className="hover:text-foreground">Roles</a></li>
              <li><a href="#children" className="hover:text-foreground">Children</a></li>
              <li><a href="#ai" className="hover:text-foreground">AI Features</a></li>
              <li><a href="#impact" className="hover:text-foreground">Impact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground">Annual report</a></li>
              <li><a className="hover:text-foreground">Press kit</a></li>
              <li><a className="hover:text-foreground">Contact us</a></li>
              <li><a className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} EduForAll · Education is a human right.</span>
          <span>Built with ❤️ for the world's children.</span>
        </div>
      </div>
    </footer>
  );
}