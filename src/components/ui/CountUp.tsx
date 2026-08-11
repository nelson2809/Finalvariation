"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Animated stat counter. Accepts values like "85M+", "4+", "8", "100%".
 * Non-numeric values (e.g. "Bridge", "Top-tier") render unchanged.
 */
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? 1 : 0;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView && match) mv.set(target);
  }, [inView, match, mv, target]);

  useEffect(() => {
    if (!match) return;
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v.toFixed(decimals) + suffix;
      }
    });
  }, [spring, suffix, decimals, match]);

  if (!match || reduce) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {"0" + suffix}
    </span>
  );
}

export { CountUp };
