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
            <div className="h-full absolute inset-0 -z-10 w-full bg-slate-800 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:18px_32px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>
            <div className='sm:h-auto md:h-screen flex flex-col sm:flex-row items-center justify-center gap-4 p-5'>

                <div className="">
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
                            <br /><br />I love building stuffs.<br/>I'm a full stack sfotware engineer with a passion for building beautiful and functional products.
                        </p>
                        <div
                            ref={linkRef}
                            className="flex flex-row gap-4 text-gray-300 text-lg font-[family-name:var(--font-dm-sans)] text-white"
                        >
                            <Link
                                href="mailto:schitru@gmail.com"
                                className="hover:text-teal-400 transition-colors duration-300 border-b border-transparent hover:border-teal-400 "
                            >
                                Work with me
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Grid is now outside the max-w-md box and can expand to 2 columns */}
                <div className="max-w-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer">
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
                                <h3 className="text-white">RealEstate</h3>
                                <p className="text-white text-sm mt-3 font-[family-name:var(--font-dm-sans)]">
                                    A realestate app built with Next.js, Tailwind CSS, and TypeScript.
                                </p>
                            </Link>
                        </div>
                        <div className="backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-5 shadow-2xl shadow-white/10 relative aspect-square hover:bg-white/10 transition-colors duration-300 hover:cursor-pointer">
                            <Link target="_blank" href="https://www.10xdev.co" >
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
    )
}

export default page