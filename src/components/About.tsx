
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  User, 
  Calendar, 
  MapPin, 
  Mail, 
  Sparkles, 
  Monitor,
  Lightbulb,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-[0.01] pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-primary/10"></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <User className="h-6 w-6" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about me, my background, and what drives my passion for development.
          </p>
        </div>
        
        <div ref={aboutRef} className="grid md:grid-cols-12 gap-10 items-center opacity-0">
          {/* Profile Image */}
          <div className="md:col-span-5 relative">
            <div className="relative group">
              {/* Image frame with gradient border */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/40 via-purple-500/40 to-indigo-500/40 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white/10 glass-card">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Hanzala Sarguroh"
                  className="w-full h-full object-cover"
                />
                
                {/* Decorative accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Full-stack Developer
                  </span>
                </div>
              </div>
            </div>
            
            {/* Floating achievement badges */}
            <div className="absolute -top-10 -right-10 p-3 rounded-xl glass-card border border-primary/20 hidden md:block animate-float">
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl font-bold">4+</span>
                <span className="text-xs text-muted-foreground">Years<br/>Experience</span>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 p-3 rounded-xl glass-card border border-primary/20 hidden md:block animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl font-bold">50+</span>
                <span className="text-xs text-muted-foreground">Projects<br/>Completed</span>
              </div>
            </div>
          </div>
          
          {/* Bio information */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                I'm <span className="text-gradient">Hanzala Sarguroh</span>, a passionate Full-stack Developer
              </h3>
              <p className="text-muted-foreground">
                I specialize in creating elegant, efficient, and user-friendly digital experiences. With expertise in both frontend and backend technologies, I build complete web applications that deliver real value to users and businesses alike.
              </p>
              <p className="text-muted-foreground">
                My journey in development began over 4 years ago, and since then, I've worked on a diverse range of projects, from complex enterprise applications to creative personal websites. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.
              </p>
            </div>
            
            {/* Personal info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {[
                { icon: <User className="h-4 w-4" />, label: "Name", value: "Hanzala Sarguroh" },
                { icon: <Calendar className="h-4 w-4" />, label: "Experience", value: "4+ Years" },
                { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "Mumbai, India" },
                { icon: <Mail className="h-4 w-4" />, label: "Email", value: "hanzala@example.com" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Core values */}
            <div className="space-y-4 pt-4">
              <h4 className="text-lg font-semibold">What drives me</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    icon: <Monitor className="h-5 w-5" />, 
                    title: "Technical Excellence", 
                    description: "I strive for clean, efficient code that follows best practices."
                  },
                  { 
                    icon: <Lightbulb className="h-5 w-5" />, 
                    title: "Creative Solutions", 
                    description: "I approach problems with creativity and innovative thinking."
                  },
                  { 
                    icon: <Rocket className="h-5 w-5" />, 
                    title: "Continuous Growth", 
                    description: "I'm always learning and improving my skills."
                  },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl bg-card/40 border border-border/50 hover:bg-card/70 transition-colors hover:border-primary/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                      {item.icon}
                    </div>
                    <h5 className="font-medium mb-1">{item.title}</h5>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="pt-6">
              <Button className="gap-2 button-glow">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
