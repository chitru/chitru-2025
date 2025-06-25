'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

interface CircularButtonProps {
  text?: string;
  size?: number;
  onClick?: () => void;
  className?: string;
}

export default function CircularButton({
  text = "Contact Me",
  size = 200,
  onClick,
  className = "",
}: CircularButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const textElement = textRef.current;
    const arrow = arrowRef.current;
    const border = borderRef.current;
    const dot = dotRef.current;

    // Set initial states
    gsap.set(textElement, {
      rotation: 0,
    });

    gsap.set(arrow, {
      scale: 0.8,
      opacity: 0.7,
    });

    // Continuous border shine animation
    if (border && dot) {
      gsap.to(dot, {
        rotation: 360,
        duration: 3,
        ease: "none",
        repeat: -1,
      });
    }

    // Hover animations
    const handleMouseEnter = () => {
      // Rotate text clockwise
      gsap.to(textElement, {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
      });

      // Scale and brighten arrow
      gsap.to(arrow, {
        scale: 1.1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Add subtle button scale
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });

      // Intensify border shine on hover
      if (border) {
        gsap.to(border, {
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      // Stop text rotation
      gsap.killTweensOf(textElement);
      gsap.to(textElement, {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset arrow
      gsap.to(arrow, {
        scale: 0.8,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reset button scale
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reduce border shine
      if (border) {
        gsap.to(border, {
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Click animation
    const handleClick = () => {
      // Quick scale down and up for click feedback
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      // Arrow bounce effect
      gsap.to(arrow, {
        x: 5,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      if (onClick) onClick();
    };

    // Add event listeners
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, [onClick]);

  // Calculate text positioning for perfect circle
  const radius = size / 2 - 20; // Leave some space for padding
  const characters = text.split('');
  const angleStep = (2 * Math.PI) / characters.length;

  return (
    <div
      ref={buttonRef}
      className={`relative cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Shining border effect */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, rgba(20, 184, 166, 0.1) 30deg, rgba(20, 184, 166, 0.3) 60deg, rgba(20, 184, 166, 0.1) 90deg, transparent 120deg, transparent 360deg)`,
          padding: '2px',
        }}
      >
        {/* Moving dot */}
        <div
          ref={dotRef}
          className="absolute top-0 left-1/2 w-1 h-1 bg-teal-400 rounded-full shadow-lg"
          style={{
            transform: 'translateX(-50%)',
            boxShadow: '0 0 8px rgba(20, 184, 166, 0.6)',
          }}
        />
      </div>

      {/* Circular background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300" />
      
      {/* Rotating text around the circle */}
      <div
        ref={textRef}
        className="absolute inset-0"
        style={{
          width: size,
          height: size,
        }}
      >
        {characters.map((char, index) => {
          const angle = index * angleStep - Math.PI / 2; // Start from top
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          return (
            <span
              key={index}
              className="absolute text-white font-bold text-sm select-none"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 90}deg)`,
                transformOrigin: 'center',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      {/* Center arrow */}
      <div
        ref={arrowRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <ArrowRight 
          size={size * 0.15} 
          className="text-white drop-shadow-lg" 
        />
      </div>

      {/* Optional: Add a subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-sm" />
    </div>
  );
} 