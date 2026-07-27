"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Wrapper classes — set the height/aspect here. */
  className?: string;
  imgClassName?: string;
  /** Parallax travel in px (higher = more movement). */
  strength?: number;
  /** Zoom the image slightly as it scrolls into view. */
  zoom?: boolean;
  rounded?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Optional overlay gradient on top of the image. */
  overlay?: boolean;
};

/**
 * Scroll-linked parallax image. The inner layer is over-sized so the
 * vertical travel never exposes an empty edge.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 60,
  zoom = false,
  rounded = true,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  overlay = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [strength, -strength],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !zoom ? [1, 1] : [1.08, 1.18],
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        rounded && "rounded-3xl",
        className,
      )}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent" />
      )}
    </div>
  );
}
