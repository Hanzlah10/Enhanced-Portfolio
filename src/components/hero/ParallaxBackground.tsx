
import React, { useEffect } from "react";

const ParallaxBackground = () => {
  useEffect(() => {
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
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid pattern with revealing effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-0 dark:opacity-0 animate-fade-in">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className="border dark:border-white/20 border-black/20 transition-opacity duration-1000 ease-in-out"
              style={{ 
                opacity: 0, // Start with invisible grid
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Radial mask for revealing effect - larger center area */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, var(--background) 85%)',
            mixBlendMode: 'normal',
          }}
        ></div>

        {/* Grid that will be revealed in the center - with improved visibility */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }).map((_, i) => {
            // Calculate distance from center (0,0 to 1,1 coordinates)
            const col = i % 12;
            const row = Math.floor(i / 12);
            const centerX = 5.5; // Center of 12 columns
            const centerY = 5.5; // Center of 12 rows
            
            // Distance from center (normalized 0-1)
            const distX = Math.abs(col - centerX) / 6;
            const distY = Math.abs(row - centerY) / 6;
            const dist = Math.sqrt(distX*distX + distY*distY);
            
            // Visibility decreases with distance from center - more gradual fade
            const opacity = Math.max(0, 1 - dist);
            
            return (
              <div 
                key={i} 
                className="border transition-all duration-1000 ease-in-out"
                style={{ 
                  opacity: opacity * (Math.random() * 0.5 + 0.3), // Higher base opacity for better visibility
                  borderColor: `var(--grid-color, rgba(var(--primary-rgb), 0.3))`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      
      {/* Gradient orbs - enhanced visibility */}
      <div 
        className="parallax-element absolute top-1/4 -left-16 w-64 h-64 bg-gradient-to-br from-primary/40 to-purple-700/30 rounded-full filter blur-3xl animate-spin-slow" 
        data-speed="0.05"
      ></div>
      <div 
        className="parallax-element absolute bottom-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-primary/20 rounded-full filter blur-3xl animate-spin-slow" 
        style={{ animationDelay: "2s" }}
        data-speed="0.08"
      ></div>
      <div 
        className="parallax-element absolute top-2/3 left-1/3 w-48 h-48 bg-gradient-to-bl from-purple-500/40 to-indigo-700/20 rounded-full filter blur-3xl animate-spin-slow" 
        style={{ animationDelay: "4s" }}
        data-speed="0.06"
      ></div>
      
      {/* Particles - enhanced visibility */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ParallaxBackground;
