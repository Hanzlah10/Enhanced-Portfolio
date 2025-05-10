import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db, doc, getDoc } from "@/lib/firebase";
import { Project } from "../types";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        // console.log("Fetching project with ID:", id);
        const projectRef = doc(db, "projects", id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          // console.log("Project data:", projectSnap.data());
          setProject({ id: projectSnap.id, ...projectSnap.data() } as Project);
        } else {
          console.log("No project found with ID:", id);
          const sampleProjects = generateSampleProjects();
          const sampleProject = sampleProjects.find(p => p.id === id);
          
          if (sampleProject) {
            // console.log("Found project in sample data:", sampleProject);
            setProject(sampleProject);
          } else {
            setError("Project not found.");
            toast({
              title: "Project not found",
              description: "The requested project could not be found.",
              variant: "destructive",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details.");
        toast({
          title: "Error",
          description: "Failed to load project details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, toast]);

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
  };

  const handleDragEnd = (clientX: number) => {
    setDragEnd(clientX);
    
    if (!project?.Images) return;
    
    const diff = dragStart - clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % project.Images.length);
      } else {
        setCurrentImageIndex((prev) => (prev === 0 ? project.Images.length - 1 : prev - 1));
      }
    }
  };

  const nextImage = () => {
    if (!project?.Images) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.Images.length);
  };

  const prevImage = () => {
    if (!project?.Images) return;
    setCurrentImageIndex((prev) => (prev === 0 ? project.Images.length - 1 : prev - 1));
  };

  const navigateToProjects = () => {
    navigate('/#projects');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project]);

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
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <Button
                variant="outline"
                className="group"
                onClick={navigateToProjects}
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="relative p-8 rounded-lg glass-card">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <div className="mt-4 text-sm text-muted-foreground">Loading project details...</div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-destructive bg-destructive/10 p-6 rounded-lg glass-card max-w-lg mx-auto">
                <p>{error}</p>
                <Link to="/">
                  <Button variant="outline" className="mt-4">
                    Return to Home
                  </Button>
                </Link>
              </div>
            ) : project ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="animate-fade-in"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-6">
                    {project.Images && project.Images.length > 0 ? (
                      <div 
                        className="relative rounded-xl overflow-hidden glass-card border border-border/50"
                        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
                        onMouseDown={(e) => handleDragStart(e.clientX)}
                        onMouseUp={(e) => handleDragEnd(e.clientX)}
                        ref={carouselRef}
                      >
                        <div className="aspect-video bg-muted/30 relative overflow-hidden cursor-grab active:cursor-grabbing">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={currentImageIndex}
                              src={project.Images[currentImageIndex]}
                              alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                              className="w-full h-full object-contain"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.1}
                              onDragEnd={(e, info) => {
                                if (info.offset.x > 100) {
                                  prevImage();
                                } else if (info.offset.x < -100) {
                                  nextImage();
                                }
                              }}
                            />
                          </AnimatePresence>

                          {project.Images.length > 1 && (
                            <>
                              <motion.button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 text-foreground hover:bg-background/90 transition-colors"
                                aria-label="Previous image"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ChevronLeft className="h-6 w-6" />
                              </motion.button>
                              <motion.button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 text-foreground hover:bg-background/90 transition-colors"
                                aria-label="Next image"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ChevronRight className="h-6 w-6" />
                              </motion.button>
                            </>
                          )}

                          {project.Images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm">
                              {project.Images.map((_, index) => (
                                <motion.div
                                  key={index}
                                  className={cn(
                                    "h-1 rounded-full transition-all duration-300",
                                    currentImageIndex === index 
                                      ? "bg-primary w-6" 
                                      : "bg-white/40 w-3 hover:bg-white/60"
                                  )}
                                  onClick={() => setCurrentImageIndex(index)}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {project.Images.length > 1 && (
                          <div className="p-4 hidden md:block">
                            <div className="flex space-x-3 overflow-x-auto p-1 no-scrollbar">
                              {project.Images.map((image, index) => (
                                <motion.button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={cn(
                                    "flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all",
                                    currentImageIndex === index
                                      ? "border-primary scale-105"
                                      : "border-transparent opacity-70 hover:opacity-100"
                                  )}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted/30 rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">No images available</p>
                      </div>
                    )}

                    <div className="space-y-6">
                      <motion.div 
                        className="glass-card border border-border/50 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {project.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="lg:hidden">
                      <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.name}</h1>
                      <p className="text-lg text-muted-foreground mb-4">{project.tagline}</p>
                      
                      <div className="flex space-x-4 mb-6">
                        {project.github_link && (
                          <Button asChild variant="outline" className="flex-1">
                            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {project.live_link && (
                          <Button asChild className="flex-1">
                            <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    <motion.div 
                      className="glass-card border border-border/50 rounded-xl sticky top-24"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="p-6 border-b border-border/50 hidden lg:block">
                        <h1 className="text-2xl font-bold">{project.name}</h1>
                        <p className="text-muted-foreground mt-2">{project.tagline}</p>
                      </div>

                      <div className="p-6 space-y-6">
                        <div>
                          <div className="flex items-center mb-3 text-sm font-medium text-muted-foreground">
                            <Code className="mr-2 h-4 w-4" />
                            Technologies
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies && project.technologies.map((tech) => (
                              <motion.span
                                key={tech}
                                className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium backdrop-blur-sm"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3 pt-2 hidden lg:block">
                          {project.github_link && (
                            <Button asChild variant="outline" className="w-full justify-start">
                              <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View Source Code
                              </a>
                            </Button>
                          )}
                          {project.live_link && (
                            <Button asChild className="w-full justify-start">
                              <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Live Site
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  className="mt-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-8 text-center">More Projects</h2>
                  <div className="flex justify-center">
                    <Button asChild>
                      <Link to="/#projects">View All Projects</Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ProjectDetail;
