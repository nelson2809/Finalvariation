import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* Intrinsic pixel size of the source artwork — lets Next.js reserve the
   correct space so the header doesn't shift while the image loads. */
const LOGO_W = 682;
const LOGO_H = 227;

/**
 * Agonis Partners logo lockup.
 *
 * `light` swaps to the reversed artwork (navy → white, gold retained) for use
 * on dark backgrounds such as the footer.
 */
export function Logo({
  light = false,
  className,
  priority = false,
}: {
  light?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Agonis Partners — home"
      className={cn(
        "inline-flex shrink-0 items-center rounded-md transition-opacity duration-300 hover:opacity-85",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        light ? "focus-visible:ring-offset-navy-900" : "focus-visible:ring-offset-white",
        className,
      )}
    >
      <Image
        src={light ? "/agonis-logo-light.png" : "/agonis-logo.png"}
        alt="Agonis Partners — Import &amp; Distribution"
        width={LOGO_W}
        height={LOGO_H}
        priority={priority}
        sizes="200px"
        className="h-10 w-auto sm:h-12 lg:h-[3.35rem]"
      />
    </Link>
  );
}

/**
 * The "A" monogram on its own — for tight spaces where the full wordmark
 * would be unreadable.
 */
export function LogoMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/agonis-mark.png"
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      style={{ width: size, height: size }}
      className={cn("object-contain", className)}
    />
  );
}
