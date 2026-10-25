"use client";
import { useEffect, useRef, useState } from "react";

const memory = [["work", "Work", "Driver"], ["city", "City", "Noida"], ["income", "Income", "₹24,000 / month"], ["goal", "Goal", "₹30,000 / month"], ["distance", "Distance", "Within 10 km"], ["spends", "Monthly spends", "~₹19,000"], ["need", "Money needed", "₹50,000"], ["saves", "Left to save", "~₹2,000 / month"]];
const scenarios = [
  { kind: "JOBS", label: "Find jobs near me", messages: [
    { type: "user", lang: "hi", text: "मैं नोएडा में ड्राइवर हूँ, ₹24,000 कमाता हूँ। घर के पास ₹30,000 वाली नौकरी चाहिए।", uses: ["work", "city", "income", "goal"] },
    { type: "assistant", lang: "hi", text: "समझ गया। आपके काम, शहर और सैलरी के हिसाब से 10 km के अंदर ढूँढ रहा हूँ।", uses: ["work", "city", "income", "goal", "distance"] },
    { type: "jobs", uses: ["work", "city", "goal", "distance"] },
    { type: "action", text: "Apply Now", uses: ["work"] }
  ]},
  { kind: "LOANS", label: "Can I get a loan?", messages: [
    { type: "user", text: "Can I afford a ₹50,000 loan? I spend about ₹19,000 a month.", uses: ["spends", "need"] },
    { type: "assistant", text: "With your ₹24,000 income and spends, an EMI under ₹2,500 a month may be comfortable. Here’s what to check first.", uses: ["income", "spends", "need"] },
    { type: "loan", uses: ["income", "spends", "need"] },
    { type: "note", text: "Wimo explains options. Wimaan is not a lender.", uses: [] }
  ]},
  { kind: "SAVINGS", label: "How much can I save?", messages: [
    { type: "user", lang: "hi", text: "हर महीने ₹2,000 बचते हैं। कहाँ रखूँ?", uses: ["saves"] },
    { type: "assistant", lang: "hi", text: "पहले 3 महीने के खर्च जितना इमरजेंसी फंड बनाइए। फिर सोना, FD या SIP — मैं आसान शब्दों में समझाऊँगा।", uses: ["saves", "income"] },
    { type: "save", uses: ["saves"] },
    { type: "note", text: "For learning only — not investment advice.", uses: [] }
  ]}
];

export default function MeetWimoIntro() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.3 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setShown(0);
      return undefined;
    }
    setShown(reduced.current ? scenarios[active].messages.length : 1);
    if (reduced.current) return undefined;
    let timer;
    let next = 1;
    timer = setInterval(() => {
      next += 1;
      setShown((current) => { if (current >= scenarios[active].messages.length) { clearInterval(timer); return current; } return current + 1; });
    }, 1250);
    return () => clearInterval(timer);
  }, [active, inView]);

  const scenario = scenarios[active];
  const visible = scenario.messages.slice(0, shown);
  const last = visible[visible.length - 1];
  const used = new Set(last?.uses || []);
  const select = (index) => { setShown(0); setActive(index); };

  return <section className="meet-wimo-intro" id="meet-wimo" ref={sectionRef}>
    <div className="meet-wimo-heading" data-reveal data-reveal-stagger><div className="meet-wimo-kicker"><span>W</span> MEET WIMO</div><h2>Your ambitions deserve an intelligent companion.</h2><p>Wimo isn&apos;t a search box. It remembers your work, income and goals — so every answer, about jobs, loans or savings, starts from your life.</p></div>
    <div className="meet-wimo-body">
      <div className="meet-wimo-questions" data-reveal><span>Pick a question</span>{scenarios.map((item, index) => <button key={item.kind} className={active === index ? "active" : ""} onClick={() => select(index)}><small>{item.kind}</small>{item.label}</button>)}<em>ⓘ Illustrative conversation · example jobs and figures</em></div>
      <div className="wimo-live-phone" data-reveal><div className="wimo-phone-top"><b><span>W</span> Ask Wimo</b><i>● Online</i></div><div className="wimo-chat" aria-live="polite">{visible.map((message, index) => <Message key={`${active}-${index}`} message={message} index={index} />)}{shown > 0 && shown < scenario.messages.length && <div className="wimo-typing" aria-label="Wimo is typing"><span/><span/><span/></div>}</div><div className="wimo-input">Ask anything <b>↑</b></div></div>
      <div className="wimo-memory" data-reveal><h3>What Wimo remembers</h3><p>Builds as you talk — and carries across jobs, loans and savings.</p>{memory.map(([key, label, value]) => <div className={used.has(key) ? "memory-row used" : "memory-row"} key={key}><span>{label}</span><b>{value}</b></div>)}<small>●　Used in this answer</small></div>
    </div>
  </section>;
}

function Message({ message, index }) {
  const style = { "--message-delay": `${index * 80}ms` };
  if (message.type === "user") return <div className="wimo-user wimo-message" style={style} lang={message.lang}>{message.text}</div>;
  if (message.type === "assistant") return <div className="wimo-reply wimo-message" style={style} lang={message.lang}>{message.text}</div>;
  if (message.type === "jobs") return <div className="wimo-job-results wimo-message" style={style}><JobCard title="Car Driver · Full-time" meta="Sector 62, Noida · 4 km" salary="~₹30,000/mo"/><JobCard title="Corporate Cab Driver" meta="Greater Noida · 8 km" salary="~₹32,000/mo"/></div>;
  if (message.type === "loan") return <div className="wimo-loan-card wimo-message" style={style}><b>₹50k</b><b>≤₹2,500</b><b>3 tips</b><small>Eligibility　　 EMI / mo　　 CIBIL</small></div>;
  if (message.type === "save") return <div className="wimo-save-card wimo-message" style={style}><b>Emergency fund</b><span>Start with 3 months of expenses</span><b>Gold · FD · SIP</b></div>;
  return <div className="wimo-note wimo-message" style={style}>{message.text}</div>;
}

function JobCard({ title, meta, salary }) { return <div className="wimo-job-card"><b>{title}</b><small>Verified by ◆ <strong>Wimaan AI</strong></small><span>{meta}</span><em>{salary}</em></div>; }
