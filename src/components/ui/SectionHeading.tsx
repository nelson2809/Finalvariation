import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/** Consistent eyebrow + heading + lead block used across sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: Props) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          <span className="gold-rule" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl sm:text-4xl lg:text-[2.7rem] leading-[1.1]",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-steel-200" : "text-body",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
