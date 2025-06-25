'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface TiltedCardProps {
  imageSrc: string;
  altText: string;
  captionText: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
}

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.2,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    // Initial state
    gsap.set(card, {
      transformStyle: "preserve-3d",
      perspective: "1000px",
    });

    gsap.set(image, {
      transformStyle: "preserve-3d",
    });

    if (overlay) {
      gsap.set(overlay, {
        opacity: 0,
        scale: 0.9,
      });
    }

    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
      
      // Scale animation
      gsap.to(card, {
        scale: scaleOnHover,
        duration: 0.3,
        ease: "power2.out",
      });

      // Show overlay
      if (overlay && displayOverlayContent) {
        gsap.to(overlay, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      
      // Reset scale
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reset rotation
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Hide overlay
      if (overlay && displayOverlayContent) {
        gsap.to(overlay, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !image) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -rotateAmplitude;
      const rotateY = (mouseX / (rect.width / 2)) * rotateAmplitude;

      gsap.to(image, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Add event listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotateAmplitude, scaleOnHover, displayOverlayContent]);

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer group"
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {/* Main Image Container */}
      <div
        ref={imageRef}
        className="relative w-full h-full overflow-hidden rounded-lg shadow-lg"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay Content */}
        {displayOverlayContent && (
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg"
          >
            <div className="text-center text-white p-4">
              {overlayContent || (
                <p className="text-lg font-semibold">{captionText}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {captionText && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-300 font-medium">{captionText}</p>
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Hover to tilt
        </div>
      )}

      {/* Mobile Warning */}
      {showMobileWarning && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-white text-sm text-center px-4">
            Tilt effect works best on desktop
          </p>
        </div>
      )}
    </div>
  );
} 