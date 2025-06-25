'use client'

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add actual dark mode logic here
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 py-4">
      <div className={`mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'max-w-2xl bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg' 
          : 'max-w-7xl bg-transparent border border-transparent'
      }`}>
        <div className="flex justify-between items-center h-16 px-8 transition-all duration-300">
          {/* Logo on Left */}
          <Link 
            href="/" 
            className="text-xl font-bold text-white font-[family-name:var(--font-playfair-display)] hover:text-teal-400 transition-colors duration-300"
          >
            Chitru
          </Link>

          {/* Navigation in Center */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-[family-name:var(--font-dm-sans)] text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right side - Mobile menu button and Dark/Light toggle */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-300 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/30 backdrop-blur-md border-t border-white/10 rounded-b-full">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-300 font-[family-name:var(--font-dm-sans)] text-sm font-medium rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}