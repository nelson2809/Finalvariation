"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { navItems, categories, services } from "@/lib/data";
import { useBrandModal } from "@/components/brand/ModalProvider";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const megaItems = new Set(["Categories", "What We Do"]);

export function Header() {
  const pathname = usePathname();
  const { open } = useBrandModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const isHome = pathname === "/";
  const solid = scrolled || mobileOpen || !isHome;

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (megaItems.has(label)) setActiveMenu(label);
    else setActiveMenu(null);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-300",
        solid
          ? "border-b border-line/70 bg-white/85 backdrop-blur-md shadow-soft"
          : "border-b border-line/30 bg-white",
      )}
      onMouseLeave={handleLeave}
    >
      <div className="container-px flex h-20 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const hasMega = megaItems.has(item.label);
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter(item.label)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 font-heading text-[0.92rem] font-medium transition-colors",
                    active ? "text-navy" : "text-ink/80 hover:text-navy",
                  )}
                  aria-haspopup={hasMega || undefined}
                  aria-expanded={hasMega ? activeMenu === item.label : undefined}
                >
                  {item.label}
                  {hasMega && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        activeMenu === item.label && "rotate-180",
                      )}
                    />
                  )}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold"
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center xl:flex">
          <button
            onClick={open}
            className="group btn-shine inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-5 py-2.5 font-heading text-[0.92rem] font-medium text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Submit Your Brand
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-sand-100 xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mega menu panel */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className="absolute inset-x-0 top-full hidden xl:block"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => handleEnter(activeMenu)}
          >
            <div className="container-px pt-2">
              <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                {activeMenu === "Categories" ? (
                  <div className="grid grid-cols-2 gap-1 p-2 xl:grid-cols-4">
                    {categories.map((c) => (
                      <Link
                        key={c.name}
                        href="/categories"
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand-100"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-gold group-hover:text-white">
                          <c.icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-heading text-sm font-medium text-ink">
                            {c.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            View focus area
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {services.map((s) => (
                      <Link
                        key={s.title}
                        href="/what-we-do"
                        className="group flex items-start gap-3 rounded-xl p-4 transition-colors hover:bg-sand-100"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-gold group-hover:text-white">
                          <s.icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-heading text-sm font-medium text-ink">
                            {s.title}
                          </span>
                          <span className="mt-0.5 block line-clamp-2 text-xs text-muted">
                            {s.short}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="xl:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-px border-t border-line bg-white pb-6 pt-2">
              <nav className="flex flex-col" aria-label="Mobile">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between border-b border-line/60 py-3.5 font-heading text-base font-medium",
                        active ? "text-navy" : "text-ink/80",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-gold-600" />
                    </Link>
                  );
                })}
              </nav>
              <button
                onClick={open}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-heading font-medium text-ink shadow-soft"
              >
                Submit Your Brand <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
