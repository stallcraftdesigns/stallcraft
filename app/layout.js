import { Syne } from "next/font/google";
import Providers from "./providers";
import "./theme.js";
import Preloader from "./Preloader";
import CookieBanner from "./CookieConsent";
import ScrollToTop from "./ScrollToTop";
import TopBar from "./TopBar";

export const metadata = {
  title: "StallCraft Designs",
  description: "Experience the art of Exhibition",
  icon: "/favicon.ico"
};

// Load the Syne font
const syneFont = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="541x461"/>
      </head>
      <body
        className={syneFont.variable}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <Providers>
          <Preloader />
          <TopBar />
          {children}
          <CookieBanner/>
          <ScrollToTop/>
        </Providers>
      </body>
    </html>
  );
}
