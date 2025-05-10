import React, { useEffect, useRef } from "react";
import { Briefcase, Calendar, Code, Globe, Lightbulb, ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Internships = () => {
  const internshipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="internships" className="relative py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-primary/5 to-transparent rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-primary/5 to-transparent rounded-full filter blur-3xl opacity-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-primary/10 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 rounded-full bg-primary/5 animate-float" style={{ animationDelay: "1s" }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full grid grid-cols-6 gap-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border-t border-l border-primary/10"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block text-balance">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="h-1 w-2/5 mb-4 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <p className="text-muted-foreground max-w-2xl">
            Where I've applied my skills and gained valuable industry experience.
          </p>
        </div>

        <div ref={internshipsRef} className="max-w-4xl mx-auto">
          <Card className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out group hover:shadow-xl dark:hover:shadow-primary/20 hover:shadow-primary/5 relative overflow-hidden">
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            
            {/* Highly optimized responsive Remote tag positioning */}
            <div className="hidden md:block absolute top-4 right-4 z-10">
              <span className="inline-flex items-center px-3 py-1 text-xs md:text-sm bg-primary/20 text-primary rounded-full font-medium">
                Remote
              </span>
            </div>
            
            {/* Mobile-friendly tag positioning - below company name */}
            <div className="md:hidden absolute top-16 right-4 z-10">
              <span className="inline-flex items-center px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full font-medium">
                Remote
              </span>
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center mb-3 space-x-4">
                <div className="w-14 h-14 rounded-xl p-3 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10 shadow-inner">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    Radiantx Technologies
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    April 2025 – Present
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center mb-4">
                <div className="h-10 w-1.5 bg-primary/20 rounded-full mr-4"></div>
                <div className="font-medium text-lg flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Full Stack Developer
                </div>
              </div>
              
              <div className="pl-6 border-l border-primary/10 space-y-1 mb-6">
                <div className="group/item hover:bg-secondary/40 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Built cross-platform apps and websites using Angular + Ionic, ensuring responsive and consistent UI across devices.
                    </p>
                  </div>
                </div>
                
                <div className="group/item hover:bg-secondary/40 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Developed reusable components aligned with Figma designs.
                    </p>
                  </div>
                </div>
                <div className="group/item hover:bg-secondary/40 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                    Integrated Node.js + Sequelize APIs for secure, real-time data flow between frontend and backend.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-border/30 pt-4 flex flex-wrap gap-2">
              {["Angular", "Ionic", "TypeScript", "REST API", "Figma", "Responsive Design","Node.js","Sequelize"].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-secondary/50 border border-primary/10 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
              
              <div className="ml-auto">
                {/* <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <span>View details</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button> */}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Internships;