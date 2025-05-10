
import React, { useEffect, useRef, useState } from "react";
import {
  Code2,
  Database,
  Server,
  Braces,
  Laptop,
  PenTool,
  Brain,
  Smartphone,
  Package,
  Code,
  Flame,
  GitBranch,
  Sparkles,
  Atom
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hiddenSkills, setHiddenSkills] = useState<number[]>([]);
  const reappearTimersRef = useRef<Record<number, NodeJS.Timeout>>({});

  const skills: Skill[] = [
    { name: "Angular", icon: <Code2 className="h-6 w-6" /> },
    { name: "TypeScript", icon: <Braces className="h-6 w-6" /> },
    { name: "Ngrx", icon: <GitBranch className="h-6 w-6" /> },
    { name: "JavaScript", icon: <Code className="h-6 w-6" /> },
    { name: "Python", icon: <Code2 className="h-6 w-6" /> },
    { name: "Node.js", icon: <Server className="h-6 w-6" /> },
    { name: "TailwindCSS", icon: <PenTool className="h-6 w-6" /> },
    { name: "Prompt Engineering", icon: <Brain className="h-6 w-6" /> },
    { name: "AI/ML", icon: <Brain className="h-6 w-6" /> },
    { name: "Ionic", icon: <Smartphone className="h-6 w-6" /> },
    { name: "PrimeNG", icon: <Package className="h-6 w-6" /> },
    { name: "SQL", icon: <Database className="h-6 w-6" /> },
    { name: "Firebase", icon: <Flame className="h-6 w-6" /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Initial animation when the section enters the viewport
            const skillElements = entry.target.querySelectorAll(".skill-item");
            
            skillElements.forEach((skill, index) => {
              setTimeout(() => {
                skill.classList.add("opacity-100", "translate-y-0");
                skill.classList.remove("opacity-0", "translate-y-8");
              }, index * 100);
            });
            
            setHiddenSkills([]);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
      
      // Clear all timers on unmount
      Object.values(reappearTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  // Function to handle skill hover with predictable reappearance
  const handleSkillHover = (name: string | null, index: number) => {
    setActiveSkill(name);
    
    // If hovering in, nothing else to do for hidden state
    if (name !== null) return;
    
    // If hovering out, hide the skill and set a timer to make it reappear
    setHiddenSkills(prev => [...prev, index]);
    
    // Clear any existing timer for this index
    if (reappearTimersRef.current[index]) {
      clearTimeout(reappearTimersRef.current[index]);
    }
    
    // Set a new timer for reappearance after 2.5 seconds
    reappearTimersRef.current[index] = setTimeout(() => {
      setHiddenSkills(prev => prev.filter(i => i !== index));
      
      const skillElement = document.querySelector(`.skill-item[data-index="${index}"]`);
      if (skillElement) {
        skillElement.classList.add("opacity-100", "translate-y-0");
        skillElement.classList.remove("opacity-0", "translate-y-8");
      }
    }, 2500); // 2.5 seconds
  };

  const skillDescriptions: Record<string, string> = {
    // "React.js": "Building dynamic user interfaces with the React library",
    "Angular": "Building complex SPA applications with Angular framework",
    "TypeScript": "Developing type-safe, scalable applications",
    "Ngrx": "State management for Angular applications",
    "JavaScript": "Core web development language",
    "Python": "Backend development and data analysis",
    "Node.js": "Server-side JavaScript runtime",
    "TailwindCSS": "Utility-first CSS framework for rapid UI development",
    "Prompt Engineering": "Crafting effective prompts for AI models",
    "AI/ML": "Implementing artificial intelligence solutions",
    "Ionic": "Cross-platform mobile app development",
    "PrimeNG": "Rich UI component library for Angular",
    "SQL": "Database design and management",
    "Firebase": "Google's platform for web and mobile applications",
  };

  return (
    <section
      id="skills"
      className="relative py-12 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 relative">
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-primary">
            {/* <Sparkles className="h-10 w-10 animate-pulse opacity-50" /> */}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block text-center">
            <span className="text-gradient">Skills</span> & Expertise
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of technologies and frameworks I've mastered throughout my journey as a developer.
          </p>
        </div>
        
        {/* Skills grid with improved mobile layout */}
        <div className="relative mb-8">
          {activeSkill && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
              <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-primary/20 shadow-lg animate-scale-in">
                <p className="text-primary font-medium">{activeSkill}</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {skillDescriptions[activeSkill] || ""}
                </p>
              </div>
            </div>
          )}
          
          <div
            ref={skillsRef}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 relative"
          >
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                data-index={index}
                className={cn(
                  "skill-item relative flex flex-col items-center justify-center p-3 md:p-6 rounded-xl glass-card hoverable-card opacity-0 translate-y-8 transition-all duration-700",
                  activeSkill === skill.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "",
                  hiddenSkills.includes(index) ? "opacity-0 translate-y-8" : "",
                  index % 2 === 0 ? "hover:shadow-neon" : ""
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
                onMouseEnter={() => handleSkillHover(skill.name, index)}
                onMouseLeave={() => handleSkillHover(null, index)}
              >
                <div className={cn(
                  "p-2 md:p-3 rounded-xl mb-2 md:mb-4 text-primary group-hover:scale-110 transition-all duration-500",
                  activeSkill === skill.name ? "bg-primary/20" : "bg-secondary/50"
                )}>
                  {skill.icon}
                </div>
                <h3 className="font-medium text-foreground text-sm md:text-base">{skill.name}</h3>
                
                {/* Interactive highlight effect */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/60 via-purple-500/60 to-indigo-500/60 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity duration-700"></div>
                
                {/* Connection lines between skills (visible on hover) */}
                <div className="absolute inset-0 -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-primary/40 to-transparent"
                      style={{
                        width: '100px',
                        transformOrigin: '0 0',
                        transform: `rotate(${i * 120}deg)`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
