"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import FlipCard from "@/components/flip-card";
import { ExternalLink } from "lucide-react";

const Page = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);
  const project4Ref = useRef<HTMLDivElement>(null);
  const project5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack,
      });
    };

    window.addEventListener("error", handleError);

    try {
      if (!introRef.current) return;

      gsap.set(introRef.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(project1Ref.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(project2Ref.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(project3Ref.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(project4Ref.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(project5Ref.current, {
        y: 30,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(introRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(project1Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(project2Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(project3Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(project4Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(project5Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } catch (error) {
      console.error("GSAP animation error:", error);
      // Fallback: show elements without animation
      if (introRef.current) introRef.current.style.opacity = "1";
    }

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);
  return (
    <div>
      <div className="h-full absolute inset-0 -z-10 w-full bg-slate-800 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:18px_32px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="sm:h-auto md:h-screen flex flex-col sm:flex-row items-center justify-center gap-4 p-5">
        <div className="shadow-2xl shadow-white/10" ref={introRef}>
          <div className="backdrop-blur-md bg-white/5 border border-white/5 rounded-2xl p-8 shadow-4xl shadow-white/10 ">
            <div className="flex flex-col mb-6">
              <h1 className="text-5xl tracking-tight font-[400] mb-2 font-[family-name:var(--font-playfair-display)] italic text-white">
                Chitru Shrestha
              </h1>
            </div>
            <p className="text-lg max-w-sm text-gray-300 font-[family-name:var(--font-dm-sans)] mb-6 text-white">
              Crafting digital experience with touch of creativity and passion
              since 2013. I focus on producing high quality products that
              functional and beautiful.
              <br />
              <br />
              I&apos;m a full stack sfotware engineer with a passion for
              building beautiful and functional products.
            </p>
            <div className="flex flex-row gap-4 text-gray-300 text-lg font-[family-name:var(--font-dm-sans)] text-white">
              <Link
                href="mailto:schitru@gmail.com"
                className="flex flex-row gap-2 items-center hover:text-teal-400 transition-colors duration-300 border-b border-transparent hover:border-teal-400 "
              >
                Work with me <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Grid is now outside the max-w-md box and can expand to 2 columns */}
        <div className="">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 grid-rows-2">
            <div
              className="max-w-[200px] backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer"
              ref={project1Ref}
            >
              <Link target="_blank" href="https://matinaa.com/">
                <div className="flex flex-col">
                  <h3 className="text-white text-md mt-3 font-[family-name:var(--font-dm-sans)]">
                    matinaa.com
                  </h3>
                  <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">
                    WIP: Finance AI app built out of frustration and love for
                    financial knowledge.
                  </p>
                </div>
              </Link>
            </div>
            <div ref={project2Ref} className="max-w-[200px]">
              <FlipCard />
            </div>
            <div
              className="max-w-[200px] backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer"
              ref={project3Ref}
            >
              <Link target="_blank" href="https://nuggetsof.fun">
                <h3 className="text-white">nuggetsof.fun</h3>
                <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">
                  Collection of random apps that I build for fun.
                </p>
              </Link>
            </div>
            <div
              className="max-w-[200px] backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer"
              ref={project4Ref}
            >
              <Link target="_blank" href="https://www.smallappbuilder.com/">
                <h3 className="text-white"> Small App Builder</h3>
                <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">
                  A platform for building small apps for small businesses.
                </p>
              </Link>
            </div>
            <div
              className="max-w-[200px] backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer"
              ref={project5Ref}
            >
              <Link target="_blank" href="https://www.10xdev.co">
                <h3 className="text-white"> 10xdev.co</h3>
                <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">
                  Frontend development on subscription based SaaS platform.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
