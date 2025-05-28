import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Internships from "@/components/Internships";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { incrementViews } from "@/lib/firebase";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Set grid colors based on theme
    const setGridColors = () => {
      const root = document.documentElement;
      if (root.classList.contains("dark")) {
        root.style.setProperty("--grid-color", "rgba(147, 51, 234, 0.6)"); // More vibrant purple for dark mode
      } else {
        root.style.setProperty("--grid-color", "rgba(79, 70, 229, 0.5)"); // More visible indigo for light mode
      }
    };

    // Call on initial load
    setGridColors();

    // Set up mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setGridColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Only increment view count on actual page loads (not SPA navigation)
    if (window.performance) {
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        // Check if this is a "reload" type navigation
        const navType = (navigationEntries[0] as PerformanceNavigationTiming)
          .type;

        if (navType === "reload" || navType === "navigate") {
          // Only increment on actual page loads or direct navigation
          const incrementPageViews = async () => {
            try {
              const success = await incrementViews();
              if (success) {
                // console.log("View count incremented successfully");
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
           <Internships /> 
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
