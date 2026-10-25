"use client";
import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    if (!nodes.length) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => requestAnimationFrame(() => entry.target.classList.toggle("is-revealed", entry.isIntersecting))), { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
