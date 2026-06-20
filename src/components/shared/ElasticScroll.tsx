import * as React from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function ElasticScroll({ children }: { children: React.ReactNode }) {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 220, damping: 30 });
  
  const overscrollRef = React.useRef(0);
  const isWheelingRef = React.useRef<number | null>(null);
  const touchStartY = React.useRef(0);

  // Wheel events
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop >= maxScroll - 1;
      
      const delta = e.deltaY;
      
      // If we are at the top and scrolling up
      if (isAtTop && delta < 0) {
        e.preventDefault();
        overscrollRef.current -= delta * 0.4;
      }
      // If we are at the bottom and scrolling down
      else if (isAtBottom && delta > 0) {
        e.preventDefault();
        overscrollRef.current -= delta * 0.4;
      }
      // If we are currently in an overscrolled state and scrolling back
      else if (overscrollRef.current > 0 && delta > 0) {
        e.preventDefault();
        overscrollRef.current = Math.max(0, overscrollRef.current - delta * 0.5);
      }
      else if (overscrollRef.current < 0 && delta < 0) {
        e.preventDefault();
        overscrollRef.current = Math.min(0, overscrollRef.current - delta * 0.5);
      }
      else {
        // Normal native scroll - do not block
        overscrollRef.current = 0;
        y.set(0);
        return;
      }

      // Apply rubber band
      const limit = 80;
      const current = overscrollRef.current;
      const sign = Math.sign(current);
      const absVal = Math.abs(current);
      const damped = sign * (limit * (1 - Math.exp(-absVal / 180)));
      y.set(damped);
      
      if (isWheelingRef.current) {
        window.clearTimeout(isWheelingRef.current);
      }
      
      isWheelingRef.current = window.setTimeout(() => {
        overscrollRef.current = 0;
        y.set(0);
      }, 100);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (isWheelingRef.current) window.clearTimeout(isWheelingRef.current);
    };
  }, [y]);

  // Touch events for mobile
  React.useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      const clientY = e.touches[0].clientY;
      const deltaY = clientY - touchStartY.current;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop >= maxScroll - 1;
      
      if (isAtTop && deltaY > 0) {
        e.preventDefault();
        overscrollRef.current += deltaY * 0.5;
      } else if (isAtBottom && deltaY < 0) {
        e.preventDefault();
        overscrollRef.current += deltaY * 0.5;
      } else if (overscrollRef.current > 0 && deltaY < 0) {
        e.preventDefault();
        overscrollRef.current = Math.max(0, overscrollRef.current + deltaY * 0.6);
      } else if (overscrollRef.current < 0 && deltaY > 0) {
        e.preventDefault();
        overscrollRef.current = Math.min(0, overscrollRef.current + deltaY * 0.6);
      } else {
        overscrollRef.current = 0;
        y.set(0);
        touchStartY.current = clientY;
        return;
      }
      
      const limit = 100;
      const current = overscrollRef.current;
      const sign = Math.sign(current);
      const absVal = Math.abs(current);
      const damped = sign * (limit * (1 - Math.exp(-absVal / 180)));
      y.set(damped);
      
      touchStartY.current = clientY;
    };

    const handleTouchEnd = () => {
      overscrollRef.current = 0;
      y.set(0);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [y]);

  return (
    <motion.div style={{ y: springY }} className="w-full h-full origin-top">
      {children}
    </motion.div>
  );
}
