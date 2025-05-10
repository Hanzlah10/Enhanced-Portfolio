
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const SocialLinks = () => {
  return (
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
  );
};

export default SocialLinks;
