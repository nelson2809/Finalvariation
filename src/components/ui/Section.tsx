import { cn } from "@/lib/utils";

type Bg = "white" | "sand" | "cloud" | "navy";

const backgrounds: Record<Bg, string> = {
  white: "bg-white",
  sand: "bg-sand",
  cloud: "bg-cloud",
  navy: "bg-navy-900 text-white",
};

export function Section({
  id,
  bg = "white",
  className,
  children,
}: {
  id?: string;
  bg?: Bg;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 sm:py-24 lg:py-36",
        backgrounds[bg],
        className,
      )}
    >
      <div className="container-px">{children}</div>
    </section>
  );
}
