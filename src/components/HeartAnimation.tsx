import React, { memo, useMemo } from "react";
import { cn } from "@/utils";
import "./HeartAnimation.css";

const HeartAnimation: React.FC = memo(() => {
  // Generate random properties for each heart
  const hearts = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      opacity: Math.random() * 0.7 + 0.3,
      scale: Math.random() * 0.4 + 0.3,
      x: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: -Math.random() * 15,
      color: Math.random() > 0.5 ? 'text-red-400' : 'text-pink-400'
    }));
  }, []);

  return (
    <div className="hearts-container pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={cn(
            "heart absolute -top-4",
            heart.color
          )}
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
            transform: `scale(${heart.scale})`,
            animation: `float ${heart.duration}s linear ${heart.delay}s infinite`
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
});

export default HeartAnimation; 