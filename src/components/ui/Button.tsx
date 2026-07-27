import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "group btn-shine inline-flex items-center justify-center gap-2 font-heading font-medium rounded-full " +
  "transition-all duration-300 ease-out will-change-transform " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-soft hover:bg-navy-600 hover:-translate-y-0.5 hover:shadow-lift",
  gold:
    "bg-gold text-ink shadow-soft hover:bg-gold-600 hover:text-white hover:-translate-y-0.5 hover:shadow-gold",
  outline:
    "border border-line text-ink bg-white/60 hover:border-gold hover:text-navy hover:-translate-y-0.5 hover:shadow-soft",
  ghost: "text-ink hover:text-navy hover:bg-sand-100",
  white:
    "bg-white text-navy shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    const isExternal = /^https?:|^mailto:|^tel:/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
