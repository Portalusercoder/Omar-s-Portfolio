import type { Metadata, Viewport } from "next";
import { Newsreader, Outfit, Playfair_Display } from "next/font/google";
import { StudioShell } from "@/components/studio/StudioShell";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omarkhuddose.com"),
  title: {
    default: "Omar",
    template: "%s — Omar",
  },
  description:
    "Omar. UI/UX designer based in Khobar, Saudi Arabia. Designing for everyone.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${newsreader.variable} ${outfit.variable} bg-[#000000] antialiased`}
    >
      <body className="studio bg-[#000000] font-sans text-[#ffffff]">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-[#000000] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <StudioShell>
          <div id="content" className="flex flex-1 flex-col">
            {children}
          </div>
        </StudioShell>
      </body>
    </html>
  );
}
