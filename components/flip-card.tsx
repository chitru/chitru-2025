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
          <h3 className="absolute bottom-8 left-8 text-5xl font-bold tracking-tighter">
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Find me on</h3>
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/chitru"
              target="_blank"
              className="text-black mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </Link>

            <Link
              href="https://x.com/chitrushr"
              target="_blank"
              className="text-pink-500 underline mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 50 50"
              >
                <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
              </svg>
            </Link>
            <Link href="mailto:schitru@gmail.com" className="text-black mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
