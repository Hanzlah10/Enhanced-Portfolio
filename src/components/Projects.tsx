
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { db, collection, getDocs } from "../lib/firebase";
import { Project } from "../types";
import { 
  Loader2,
  Code,
  ArrowRight,
  Github,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // For mobile, limit to 3 projects initially
      if (mobile && !showMore) {
        setVisibleProjects(projects.slice(0, 3));
      } else {
        setVisibleProjects(projects);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects, showMore]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // console.log("Fetching projects...");
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        
        if (projectsSnapshot.empty) {
          // console.log("No projects found in the collection");
          // Fallback to sample projects
          const sampleProjects = generateSampleProjects();
          // console.log("Sample projects:", sampleProjects);
          setProjects(sampleProjects);
          
          // For mobile, limit initially to 3 projects
          if (window.innerWidth < 768) {
            setVisibleProjects(sampleProjects.slice(0, 3));
          } else {
            setVisibleProjects(sampleProjects);
          }
          
          toast({
            title: "Using sample projects",
            description: "No projects found in database. Displaying sample projects instead.",
            variant: "default",
          });
        } else {
          const projectsList = projectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
          
          // console.log("Fetched projects:", projectsList);
          setProjects(projectsList);
          
          // For mobile, limit initially to 3 projects
          if (window.innerWidth < 768) {
            setVisibleProjects(projectsList.slice(0, 3));
          } else {
            setVisibleProjects(projectsList);
          }
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        
        // Use sample projects as fallback
        const sampleProjects = generateSampleProjects();
        // console.log("Using sample projects due to error:", sampleProjects);
        setProjects(sampleProjects);
        
        // For mobile, limit initially to 3 projects
        if (window.innerWidth < 768) {
          setVisibleProjects(sampleProjects.slice(0, 3));
        } else {
          setVisibleProjects(sampleProjects);
        }
        
        toast({
          title: "Connection error",
          description: "Failed to fetch projects from database. Using sample data instead.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  // Handle showing more projects
  const handleShowMore = () => {
    setShowMore(true);
    setVisibleProjects(projects);
  };

  // Sample projects generator function
  const generateSampleProjects = (): Project[] => {
    return [
      {
        id: "00001",
        name: "GeminoAI Chrome Extension",
        tagline: "Your all-in-one AI assistant extension for smarter browsing, seamless communication, and effortless learning.",
        description: "GeminoAI is a smart Chrome extension that simplifies web browsing with generative AI. It offers multilingual support, AI-powered research, summarization, content generation, and more. All-in-one—GeminoAI enhances your online productivity!",
        technologies: ["JavaScript", "Chrome Extension API", "OpenAI API", "React"],
        github_link: "https://github.com/Hanzlah10/GeminoAI-ChromeExtension",
        live_link: "https://chromewebstore.google.com/detail/geminoai/abcdefghijklmnop",
        Images: ["https://via.placeholder.com/800x600/1a1a2e/ffffff?text=GeminoAI+Extension"],
      },
      {
        id: "0001",
        name: "E-Commerce Platform",
        tagline: "Effortless Shopping, Tailored for You",
        description: "A comprehensive e-commerce platform with product categories, shopping cart, user authentication, and payment processing. Features responsive design and admin dashboard.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
        github_link: "https://github.com/Hanzlah10/eCommerce",
        live_link: "https://e-commerce-brown-five-37.vercel.app/",
        Images: ["https://via.placeholder.com/800x600/2d2d44/ffffff?text=E-Commerce+Platform"],
      },
      {
        id: "00010",
        name: "TaskFlow",
        tagline: "Streamline Your Workflow",
        description: "TaskFlow is a sleek and intuitive task-tracker web application that helps users organize their work with ease. Complete with drag-and-drop functionality, priority settings, deadline reminders, and progress tracking. TaskFlow offers a premium user experience with a pleasing UI and robust functionality.",
        technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Redux", "React DnD", "Jest", "Storybook"],
        github_link: "https://github.com/Hanzlah10/TaskFlow",
        live_link: "https://taskflow-app.vercel.app",
        Images: ["https://via.placeholder.com/800x600/3f3f5f/ffffff?text=TaskFlow+App"],
      },
      {
        id: "0002",
        name: "RealWorld Angular",
        tagline: "Empowering Voices: A Dynamic Platform for Writers",
        description: "A Medium.com clone built with Angular, featuring article creation, commenting, user profiles, and authentication.",
        technologies: ["Angular", "TypeScript", "RxJS"],
        github_link: "https://github.com/Hanzlah10/RealWorld-Angular",
        live_link: "https://realworld-angular-demo.vercel.app",
        Images: ["https://via.placeholder.com/800x600/4a4a6a/ffffff?text=RealWorld+Angular"],
      },
      {
        id: "0003",
        name: "Pediatric Pneumonia Classification",
        tagline: "AI-Powered Medical Diagnosis",
        description: "I developed an advanced AI system designed to assist medical professionals in diagnosing pneumonia in pediatric patients. Using deep learning and computer vision techniques, my solution analyzes chest X-rays to detect signs of pneumonia with high accuracy, helping doctors provide faster care to young patients, ensuring their lungs stay healthy and strong!",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Scikit-Learn"],
        github_link: "https://github.com/Hanzlah10/Pediatric-Pneumonia-Classification-from-Chest-X-rays",
        live_link: "",
        Images: ["https://via.placeholder.com/800x600/5a5a7a/ffffff?text=Pneumonia+Detection"],
      },
      {
        id: "0004",
        name: "Blog Website",
        tagline: "Write, Manage, Publish: Your Blog, Your Way",
        description: "I built an impressive blog website with a sleek and intuitive interface. This platform enables users to create accounts, write blog posts with rich text formatting, categorize content, manage drafts, and publish when ready. It features comment sections, social sharing, and a responsive design that adapts to any device, allowing bloggers to easily create, manage, and share their content with the world.",
        technologies: ["Angular", "Firebase", "NgRx", "SCSS"],
        github_link: "https://github.com/Hanzlah10/blog-webapp",
        live_link: "https://ng-blog-app-242303.web.app/",
        Images: ["https://via.placeholder.com/800x600/6a6a8a/ffffff?text=Blog+Website"],
      },
    ];
  };

  return (
    <section id="projects" className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            <span className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              SHOWCASING MY WORK
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my work that showcases my skills and passion for building innovative digital solutions.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((index) => (
                <motion.div 
                  key={index}
                  className="glass-card border border-border/50 rounded-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="aspect-video bg-muted/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/20 to-transparent animate-pulse-slow" 
                      style={{ 
                        backgroundSize: "200% 100%", 
                        animation: "gradientMove 1.5s infinite linear" 
                      }}>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-7 bg-muted/30 rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-muted/20 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-muted/20 rounded-md w-5/6 animate-pulse"></div>
                    <div className="flex gap-2 pt-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-16 bg-muted/20 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-5 bg-muted/30 rounded-md w-1/3 animate-pulse mt-4"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive bg-destructive/10 p-6 rounded-lg glass-card max-w-lg mx-auto">
            <p>{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {visibleProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
                
                {/* Show More Button - Only on mobile when needed */}
                {isMobile && !showMore && projects.length > 3 && (
                  <div className="flex justify-center mt-12">
                    <Button 
                      onClick={handleShowMore} 
                      className="px-8 py-2 h-auto gap-2 button-glow"
                    >
                      View More Projects
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-8 glass-card rounded-lg">
                <p className="text-muted-foreground">No projects available to display.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Project Card */}
      <div className="h-full flex flex-col glass-card border border-border/50 overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          {project.Images && project.Images.length > 0 ? (
            <img 
              src={project.Images[0]} 
              alt={project.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No image available</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Quick actions overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex gap-2">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
                  aria-label="GitHub repository"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
                  aria-label="Live demo"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3 mb-4">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.tagline}
            </p>
          </div>
          
          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-secondary/40 text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies && project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-secondary/40 text-secondary-foreground">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
          
          <Link 
            to={`/project/${project.id}`} 
            className="mt-auto inline-flex items-center text-sm font-medium text-primary hover:underline gap-1 group-hover:gap-2 transition-all"
          >
            View Details
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
