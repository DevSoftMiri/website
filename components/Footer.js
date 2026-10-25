import Link from "next/link";

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-grid" data-reveal data-reveal-stagger>
      <div className="footer-intro"><Link className="brand footer-brand" href="/"><img className="brand-logo" src="/wimaan-logo.png" alt="Wimaan" /><span>Wimaan</span></Link><p>Wimaan is an Indian AI company building technology for economic mobility — helping people find better work, earn more and make smarter money decisions.</p><a className="play-badge" href="https://play.google.com/store/apps/details?id=in.wimaan.twa" target="_blank" rel="noreferrer">▶ <span><small>GET IT ON</small>Google Play</span></a></div>
      <div><h3>For you</h3><Link href="#meet-wimo">Meet Wimo</Link><Link href="#career-calculator">Earn more</Link><Link href="#inside-app">Inside the app</Link><a href="https://play.google.com/store/apps/details?id=in.wimaan.twa" target="_blank" rel="noreferrer">Download app</a></div>
      <div><h3>For business</h3><Link href="/about">Overview</Link><Link href="/about">AI Hiring</Link><Link href="/about">Voice AI</Link><Link href="/about">AI Video Studio</Link><Link href="/about">Conversational AI</Link></div>
      <div><h3>Company</h3><Link href="/contact">Contact</Link><Link className="footer-muted-link" href="/privacy">Privacy Policy</Link><Link className="footer-muted-link" href="/terms">Terms of Service</Link></div>
    </div>
    <div className="footer-watermark" data-reveal aria-hidden="true">wimaan</div>
    <div className="footer-bottom"><span>© 2026 Wimaan. Built in India.</span><span>Wimo shares information to help you decide. Wimaan is not a lender or investment adviser.</span></div>
  </footer>;
}
