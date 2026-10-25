import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Wimaan — Earn more, live better",
  description: "Wimo is Wimaan's personal AI companion for India's workforce.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
