
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MousePointer, Code, ChevronDown, FileText } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const roles = [
    "Full-stack Developer",
    "Angular Specialist",
    "AI/ML Enthusiast",
    "TypeScript Expert",
    "Problem Solver"
  ];

  useEffect(() => {
    // Text animation for roles
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        currentText = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (textRef.current) {
        textRef.current.textContent = currentText;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end
        typeSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }
      
      setTimeout(typeEffect, typeSpeed);
    };
    
    typeEffect();
    
    // Parallax effect for decorative elements
    const handleParallax = () => {
      const elements = document.querySelectorAll('.parallax-element');
      elements.forEach(element => {
        const el = element as HTMLElement;
        const speed = parseFloat(el.dataset.speed || '0.1');
        const xPos = window.scrollY * speed;
        const yPos = window.scrollY * (speed * 0.5);
        el.style.transform = `translate3d(${xPos}px, ${-yPos}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
    >      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.03]">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
        
        {/* Floating gradient orbs */}
        <div 
          className="parallax-element absolute top-1/4 -left-16 w-64 h-64 bg-gradient-to-br from-primary/30 to-purple-700/20 rounded-full filter blur-3xl animate-spin-slow" 
          data-speed="0.05"
        ></div>
        <div 
          className="parallax-element absolute bottom-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-primary/10 rounded-full filter blur-3xl animate-spin-slow" 
          style={{ animationDelay: "2s" }}
          data-speed="0.08"
        ></div>
        <div 
          className="parallax-element absolute top-2/3 left-1/3 w-48 h-48 bg-gradient-to-bl from-purple-500/30 to-indigo-700/10 rounded-full filter blur-3xl animate-spin-slow" 
          style={{ animationDelay: "4s" }}
          data-speed="0.06"
        ></div>
        
        {/* Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

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
                <span>I'm a <span ref={textRef} className="font-bold">Full-stack Developer</span><span className="animate-pulse">|</span></span>
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
          
          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in opacity-0" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
            <a 
              href="https://github.com/Hanzlah10" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative p-3 text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-secondary/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <Github className="h-6 w-6 relative z-10" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/hanzala-sarguroh/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative p-3 text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-secondary/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <Linkedin className="h-6 w-6 relative z-10" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="mailto:hanzalasarguroh@gmail.com" 
              className="group relative p-3 text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-secondary/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <Mail className="h-6 w-6 relative z-10" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#skills" 
          aria-label="Scroll to Skills section"
          className="group p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
        >
          <ChevronDown className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
