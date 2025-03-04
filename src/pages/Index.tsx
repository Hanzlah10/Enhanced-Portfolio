
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { incrementViews } from "@/lib/firebase";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Only increment view count on actual page loads (not SPA navigation)
    if (window.performance) {
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        // Check if this is a "reload" type navigation
        const navType = (navigationEntries[0] as PerformanceNavigationTiming).type;
        
        if (navType === 'reload' || navType === 'navigate') {
          // Only increment on actual page loads or direct navigation
          const incrementPageViews = async () => {
            try {
              const success = await incrementViews();
              if (success) {
                console.log("View count incremented successfully");
              } else {
                console.error("Failed to increment view count");
              }
            } catch (error) {
              console.error("Error incrementing view count:", error);
            }
          };
          
          incrementPageViews();
        }
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
