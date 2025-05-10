import React, { useEffect, useRef } from "react";

interface TypeWriterEffectProps {
  roles: string[];
}

const TypeWriterEffect: React.FC<TypeWriterEffectProps> = ({ roles }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      const visibleText = isDeleting
        ? currentRole.substring(0, charIndex - 1)
        : currentRole.substring(0, charIndex + 1);

      if (textRef.current) {
        textRef.current.textContent = visibleText;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        timeoutRef.current = setTimeout(typeEffect, 1500);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeoutRef.current = setTimeout(typeEffect, 500);
        return;
      }

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      const speed = isDeleting ? 50 : 100;
      timeoutRef.current = setTimeout(typeEffect, speed);
    };

    timeoutRef.current = setTimeout(typeEffect, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [roles]);

  return (
    <span className="inline-flex items-center">
      <span
        ref={textRef}
        className="font-bold mr-0.5 inline-block transition-all duration-300"
      ></span>
    </span>
  );
};

export default TypeWriterEffect;
