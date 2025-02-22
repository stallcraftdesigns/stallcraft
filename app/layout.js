import { Syne } from "next/font/google";
import Providers from "./providers";
import "./theme.js";
import Preloader from "./Preloader";
import CookieBanner from "./CookieConsent";

export const metadata = {
  title: "Stall Craft Designs",
  description: "Express the design in a unique manner",
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
        <Preloader />
        <CookieBanner/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
