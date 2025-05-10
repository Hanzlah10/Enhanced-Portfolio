
import React from "react";
import { Button } from "@/components/ui/button";
import { MousePointer, FileText } from "lucide-react";

const HeroButtons = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fade-in opacity-0" style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}>
      <Button 
        className="group relative overflow-hidden button-glow" 
        size="lg"
        variant="default"
        onClick={() => {
          const projectsSection = document.getElementById('projects');
          projectsSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <MousePointer className="h-4 w-4" />
          Explore My Work
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Button>
      <Button 
        variant="outline" 
        size="lg"
        className="group relative overflow-hidden border-primary/50 hover:border-primary"
        asChild
      >
        <a href="https://hanzala.tech/resume.pdf" target="_blank" rel="noopener noreferrer">
          <span className="relative z-10 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            View Resume
          </span>
          <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
      </Button>
    </div>
  );
};

export default HeroButtons;
