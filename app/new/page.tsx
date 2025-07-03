'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import Image from 'next/image'
import FlipCard from '@/components/flip-card'

const page = () => {

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
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-800 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:18px_32px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>
            <div className='h-screen w-screen flex flex-col items-center justify-center'>

                <div className="max-w-md mx-auto">
                    <div className="backdrop-blur-md bg-white/5 border border-white/5 rounded-2xl p-8 shadow-4xl shadow-white/10 ">
                        <div className="flex flex-col mb-6">
                            <h1 className="text-5xl tracking-tight font-[400] mb-2 font-[family-name:var(--font-playfair-display)] italic text-white" ref={subtitleRef}>
                                Chitru Shrestha
                            </h1>
                        </div>
                        <p
                            ref={paragraphRef}
                            className="text-lg max-w-sm text-gray-300 font-[family-name:var(--font-dm-sans)] mb-6 text-white"
                        >
                            Crafting digital experience with touch of creativity and passion since 2013. I focus on producing high quality products that functional and beautiful.
                            <br /><br />I love building stuffs.
                        </p>
                        {/* <div
                            ref={linkRef}
                            className="flex flex-row gap-4 text-gray-300 text-lg font-[family-name:var(--font-dm-sans)] text-white"
                        >
                            <Link
                                href="mailto:schitru@gmail.com"
                                className="hover:text-teal-400 transition-colors duration-300 border-b border-transparent hover:border-teal-400 "
                            >
                                Work with me
                            </Link>
                        </div> */}
                    </div>
                </div>

                {/* Grid is now outside the max-w-md box and can expand to 2 columns */}
                <div className="w-full max-w-md mx-auto mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="backdrop-blur-md bg-white/10 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer aspect-square">
                            <Link target="_blank" href="https://matinaa.com/" >
                                <div className="flex flex-col">
                                    <h3 className="text-white text-md mt-3 font-[family-name:var(--font-dm-sans)]">
                                        matinaa.com
                                    </h3>
                                    <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">Finance app built out of frustration and love for financial knowledge. Easy to use and beautiful to look at.</p>
                                </div>
                            </Link>
                        </div>
                        <FlipCard />
                        <div className="backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer">
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
    )
}

export default page