
import React, { useRef } from "react";
import { Code, ChevronDown } from "lucide-react";
import TypeWriterEffect from "./hero/TypeWriterEffect";
import ParallaxBackground from "./hero/ParallaxBackground";
import SocialLinks from "./hero/SocialLinks";
import HeroButtons from "./hero/HeroButtons";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const roles = [
    "Full-stack Developer",
    "Angular Specialist",
    "AI/ML Enthusiast",
    "TypeScript Expert",
    "Problem Solver"
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
    >      
      {/* Decorative Elements */}
      <ParallaxBackground />

      {/* Hero content */}
      <div
        ref={heroRef}
        className="container mx-auto px-4 md:px-6 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in"
      >
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block relative transform hover:scale-105 transition-all duration-500 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative px-6 py-2 text-sm font-medium bg-background/80 border border-primary/30 backdrop-blur-sm text-primary rounded-full">
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>I'm a <TypeWriterEffect roles={roles} /><span className="animate-pulse">|</span></span>
              </div>
            </div>
          </div>

          
          

          
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight">
            <span className="block mb-2 animate-fade-in opacity-0" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>Hello, I'm</span>
            <div className="relative inline-block">
              <span className="relative z-10 text-gradient animate-fade-in opacity-0" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>Hanzala Sarguroh</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-indigo-500/20 blur-lg -z-10 opacity-0 group-hover:opacity-100 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}></div>
            </div>
          </h1>
          
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}>
            Crafting elegant digital experiences where code meets creativity.
            I specialize in modern web technologies and AI integration to build
            solutions that make a difference.
          </p>
          
          <HeroButtons />
          <SocialLinks />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#internships" 
          aria-label="Scroll to Internships section"
          className="group p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
        >
          <ChevronDown className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
