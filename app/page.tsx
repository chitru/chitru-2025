'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "@/components/splittext";
import Link from "next/link";
import Image from "next/image";
import Balatro from "@/components/balatro";

export default function Home() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Add global error handler to catch the 'j' variable error
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack
      });
    };

    window.addEventListener('error', handleError);

    try {
      if (!paragraphRef.current || !linkRef.current || !subtitleRef.current) return;

      // Set initial states
      gsap.set([paragraphRef.current, linkRef.current, subtitleRef.current], {
        y: 30,
        opacity: 0,
      });

      // Create a single timeline for smooth sequencing
      const tl = gsap.timeline({ delay: 0.8 }); // Wait for SplitText to complete

      // Animate subtitle (Software Engineer)
      tl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        // Animate paragraph
        .to(paragraphRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3") // Slight overlap for smooth flow
        // Animate link
        .to(linkRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3"); // Slight overlap for smooth flow
    } catch (error) {
      console.error('GSAP animation error:', error);
      // Fallback: show elements without animation
      if (paragraphRef.current) paragraphRef.current.style.opacity = '1';
      if (linkRef.current) linkRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
    }

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="bg-black h-screen w-screen">
      <div className="absolute inset-0 z-0 h-screen w-screen">
        {/* Temporarily disabled to debug 'j' variable error */}
        {/* <Balatro
            isRotate={false}
            mouseInteraction={false}
            pixelFilter={700}
          /> */}
      </div>

      <div className="relative z-10 h-screen w-screen flex flex-col items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl shadow-white/10 max-w-md mx-auto">
          <div className="flex flex-col mb-6">
            {/* Temporarily disabled to debug 'j' variable error */}
            {/* <SplitText
                text="Chitru Shrestha"
                delay={100}
                duration={1}
                ease="elastic.out(1, 0.9)"
                splitType="words"
                className="text-5xl tracking-tight font-[400] text-white mb-2 font-[family-name:var(--font-playfair-display)] italic"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              /> */}
            <h1 className="text-5xl tracking-tight font-[400] text-white mb-2 font-[family-name:var(--font-playfair-display)] italic">
              Chitru Shrestha
            </h1>
            <p
              ref={subtitleRef}
              className="text-gray-300 text-xs font-[family-name:var(--font-dm-sans)] italic"
            >
              Software Engineer
            </p>
          </div>
          <p
            ref={paragraphRef}
            className="text-lg max-w-sm text-gray-300 font-[family-name:var(--font-dm-sans)] mb-6"
          >
            Crafting digital experience with touch of creativity and passion since 2013. I focus on producing high quality products that functional and beautiful.
            <br /><br />I love building stuffs.
          </p>
          <div
            ref={linkRef}
            className="flex flex-row gap-4 text-gray-300 text-lg font-[family-name:var(--font-dm-sans)]"
          >
            <Link
              href="mailto:schitru@gmail.com"
              className="hover:text-teal-400 transition-colors duration-300 border-b border-transparent hover:border-teal-400 "
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Grid is now outside the max-w-md box and can expand to 2 columns */}
        <div className="w-full max-w-2xl mx-auto mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 shadow-2xl shadow-white/10 hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer aspect-square">
              <Link target="_blank" href="https://matinaa.com/" >
                <div className="flex flex-col">
                  <h3 className="text-white text-md mt-3 font-bold font-[family-name:var(--font-dm-sans)]">
                    matinaa.com
                  </h3>
                  <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">Finance app built out of frustration and love for financial knowledge. Easy to use and beautiful to look at.</p>
                </div>
              </Link>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer">
              <Link target="_blank" href="https://www.10xdev.co" >
                <div className="flex flex-col">
                  <Image src="/dddepth-203.jpg" alt="Chitru Shrestha" width={100} height={100} className="rounded-2xl w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)] absolute bottom-8 left-8 bg-black/70 rounded-xs px-2">
                  10xdev.co
                </h3>
              </Link>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer">
              <Link target="_blank" href="https://www.10xdev.co" >
                <div className="flex flex-col">
                  <Image src="/dddepth-203.jpg" alt="Chitru Shrestha" width={100} height={100} className="rounded-2xl w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)] absolute bottom-8 left-8 bg-black/70 rounded-xs px-2">
                  10xdev.co
                </h3>
              </Link>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer">
              <Link target="_blank" href="https://www.10xdev.co" >
                <div className="flex flex-col">
                  <Image src="/dddepth-203.jpg" alt="Chitru Shrestha" width={100} height={100} className="rounded-2xl w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)] absolute bottom-8 left-8 bg-black/70 rounded-xs px-2">
                  10xdev.co
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
