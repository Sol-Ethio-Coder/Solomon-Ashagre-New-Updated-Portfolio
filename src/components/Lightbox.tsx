import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = { src: string; alt: string; title: string; caption?: string; onClose: () => void };

// Full-screen image viewer: Esc or a click outside closes it, and the page behind does not scroll.
export default function Lightbox({ src, alt, title, caption, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} aria-hidden />

      <motion.figure
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close certificate"
          className="absolute -top-3 right-0 z-10 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-white/60 sm:-right-3 sm:-top-3 sm:translate-y-0"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="rounded-2xl bg-gradient-to-br from-[#f3d27a] via-[#c8962e] to-[#f3d27a] p-1 shadow-[0_30px_100px_-20px_rgba(231,184,75,0.5)]">
          <img src={src} alt={alt} className="max-h-[74vh] w-auto rounded-xl object-contain" />
        </div>

        <figcaption className="mt-5 text-center">
          <p className="text-lg font-semibold text-white">{title}</p>
          {caption && <p className="mt-1 text-sm text-white/70">{caption}</p>}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
