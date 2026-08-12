"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { BrandForm } from "./BrandForm";

type ModalContextValue = { open: () => void; close: () => void };

const ModalContext = createContext<ModalContextValue | null>(null);

export function useBrandModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    // Safe no-op fallback so buttons never crash outside the provider.
    return { open: () => {}, close: () => {} };
  }
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="brand-modal-title"
          >
            <div
              className="fixed inset-0 bg-navy-900/70 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              className="relative my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lift sm:p-9"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={close}
                aria-label="Close dialog"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-sand-100 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mb-6 max-w-md pr-12">
                <span className="eyebrow">Become a Partner Brand</span>
                <h2
                  id="brand-modal-title"
                  className="mt-3 text-2xl text-ink sm:text-3xl"
                >
                  Submit your brand for Turkish market fit assessment
                </h2>
                <p className="mt-2 text-body">
                  Share a few details and we&apos;ll review the fit for the
                  Turkish market.
                </p>
              </div>
              <BrandForm compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
