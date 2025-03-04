
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getViews } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ViewCounter = () => {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasIncremented, setHasIncremented] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // Get current views without incrementing
        const currentViews = await getViews();
        setViews(currentViews);
        setLoading(false);
        setHasIncremented(true);
      } catch (error) {
        console.error("Error with view counter:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch view counter",
        });
        setLoading(false);
      }
    };

    fetchViews();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 bg-secondary/20 px-3 py-1 rounded-full text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span className="text-sm font-medium animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className={cn(
        "flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm transition-all hover:bg-primary/10",
        hasIncremented && "border-primary/50 bg-primary/10"
      )}
      initial={{ scale: 1 }}
      animate={{ 
        scale: hasIncremented ? [1, 1.05, 1] : 1
      }}
      transition={{ duration: 0.5 }}
    >
      <Eye className={cn("h-4 w-4", hasIncremented && "text-primary")} />
      <span className={cn(
        "text-sm font-medium transition-all duration-500",
        hasIncremented && "text-primary"
      )}>
        {views?.toLocaleString() || 0}
      </span>
    </motion.div>
  );
};

export default ViewCounter;
