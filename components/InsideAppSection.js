"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stages = [
  ["01 · Better job", "Find work that pays more", "Top picks verified by Wimaan AI, with salaries shown upfront. Browse by role and city, near where you live.", "A better job means more income →", "/Wimo_Four_Separate_Screens/01_Wimo_Introduction.png", "Wimo introduction screen", "/jobs"],
  ["02 · Higher income", "See where your money goes", "Income, spends and upcoming bills in one view. Wimo reads your transactions and shows you what to do better.", "Knowing your money brings stability →", "/Wimo_Four_Separate_Screens/02_Wimo_Understands_You.png", "Wimo understands you screen", "/money"],
  ["03 · Stability", "Borrow only what fits", "Check how much you can borrow, an EMI that fits your budget and tips to improve your CIBIL.", "Stability makes saving possible →", "/Wimo_Four_Separate_Screens/03_Wimo_Job_Matches.png", "Wimo job matches screen", "/loans"],
  ["04 · Saving & investing", "Let your money grow", "See what saving ₹500, ₹1,000 or ₹2,000 a month could add up to. Gold, FD and SIP — explained in simple words.", "For learning only — not investment advice.", "/Wimo_Four_Separate_Screens/04_Wimo_Application_Confirmation.png", "Wimo application confirmation screen", "/invest"]
];

export default function InsideAppSection() {
  const [active, setActive] = useState(0);
  const items = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(Number(entry.target.dataset.stage));
    }), { rootMargin: "-38% 0px -38% 0px", threshold: 0 });
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <section className="inside-app" id="app" aria-labelledby="journey-title">
    <div className="inside-app-inner"><div className="inside-app-heading"><div><span className="inside-app-kicker">Inside the app</span><h2 id="journey-title">Your goals change.<br />Wimo grows with you.</h2></div><p>A better job raises income. More income brings stability. Stability makes saving possible. One app, one companion, every step.</p></div>
      <div className="inside-app-desktop"><div className="inside-app-visual"><div className="inside-app-phone">{stages.map(([,, , ,src,alt], index) => <img key={src} className={active === index ? "active" : ""} src={src} alt={alt} />)}</div></div><ol className="inside-app-stages">{stages.map(([kicker,title,desc,next,, ,href], index) => <li key={kicker} ref={(el) => { items.current[index] = el; }} data-stage={index} className={active === index ? "active" : index < active ? "past" : "future"}><span className="stage-dot" /><span className="inside-app-kicker">{kicker}</span><h3>{title}</h3><p>{desc}</p><Link href={href}>{next}</Link></li>)}</ol></div>
      <div className="inside-app-mobile"><ol>{stages.map(([kicker,title,desc,next,src,alt,href]) => <li key={kicker}><div className="mobile-stage-phone"><img src={src} alt={alt} /></div><span className="inside-app-kicker">{kicker}</span><h3>{title}</h3><p>{desc}</p><Link href={href}>{next}</Link></li>)}</ol><p className="swipe-hint">Swipe to see each step →</p></div>
    </div>
  </section>;
}
