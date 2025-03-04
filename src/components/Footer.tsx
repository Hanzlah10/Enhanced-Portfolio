
import React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-8 relative border-t border-border/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* Back to top button with animation */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={scrollToTop}
              aria-label="Back to top"
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 mb-6 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/50"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Footer content */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hanzala Sarguroh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
