"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const links = [["Product", "#product"], ["How it works", "#how-it-works"], ["For employers", "/about"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={compact ? "site-header compact" : "site-header"}><div className="nav-wrap">
    <Link className="brand" href="/"><img className="brand-logo" src="/wimaan-logo.png" alt="Wimaan" /><span>Wimaan</span></Link>
    <nav className={open ? "main-nav open" : "main-nav"} aria-label="Main navigation">
      {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="nav-download" href="https://play.google.com/store/apps/details?id=in.wimaan.twa" target="_blank">Download app <span>↗</span></Link>
    </nav>
    <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
  </div></header>;
}
