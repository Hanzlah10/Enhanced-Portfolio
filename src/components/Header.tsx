
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ViewCounter from "./ViewCounter";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-sm",
        isScrolled
          ? "py-3 bg-background/80 border-b border-border/50 shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a
          href="#"
          className="relative group"
          aria-label="Hanzala Sarguroh"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-500/20 to-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">HS</span>
            <span className={cn(
              "hidden md:inline-block text-sm font-medium transition-all duration-500 border-l border-border/50 pl-2 ml-2",
              isScrolled ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0 overflow-hidden"
            )}>
              Hanzala Sarguroh
            </span>
          </div>
        </a>

        <div className="flex items-center space-x-4">
          {/* View Counter in header */}
          <ViewCounter />
          
          <a
            href="https://github.com/Hanzlah10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/hanzala-sarguroh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:hanzalasarguroh@gmail.com"
            className="text-foreground/70 hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          
          <ThemeToggle />
        </div>
      </div>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </header>
  );
};

export default Header;
