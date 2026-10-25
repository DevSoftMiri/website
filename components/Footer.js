import Link from "next/link";
export default function Footer() {
  return <footer className="site-footer"><div className="footer-grid">
    <div><Link className="brand footer-brand" href="/"><img className="brand-logo" src="/wimaan-logo.png" alt="Wimaan" /><span>Wimaan</span></Link><p>Your AI companion for earning more and living better.</p></div>
    <div><h3>Explore</h3><Link href="/jobs">Jobs</Link><Link href="/money">Money</Link><Link href="/loans">Loans</Link><Link href="/invest">Invest</Link></div>
    <div><h3>Company</h3><Link href="/about">About Wimaan</Link><Link href="/contact">Contact</Link><a href="mailto:hello@wimaan.com">hello@wimaan.com</a></div>
    <div><h3>Get the app</h3><p>Available on Android</p><a className="play-badge" href="https://play.google.com/store/apps/details?id=in.wimaan.twa" target="_blank" rel="noreferrer">▶ <span><small>GET IT ON</small>Google Play</span></a></div>
  </div><div className="footer-bottom"><span>© 2026 Wimaan Technologies</span><span>Made for India · Built with care</span></div></footer>;
}
