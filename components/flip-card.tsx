import { useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function FlipCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      rotateX: 180,
      duration: 0.1,
      ease: "power2.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      className="relative aspect-square w-full h-full"
      style={{ perspective: 1000 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full transition-transform duration-100"
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-yellow-500 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 aspect-square transition-colors duration-300 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="absolute bottom-8 text-5xl font-bold tracking-tighter">
            Find me
          </h3>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl p-5 aspect-square"
          style={{
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">My Portfolio</h3>
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            className="text-blue-600 underline mb-2"
          >
            GitHub
          </Link>
          <Link
            href="https://dribbble.com/yourusername"
            target="_blank"
            className="text-pink-500 underline mb-2"
          >
            Dribbble
          </Link>
          <Link
            href="https://yourwebsite.com"
            target="_blank"
            className="text-teal-600 underline"
          >
            Website
          </Link>
        </div>
      </div>
    </div>
  );
} 