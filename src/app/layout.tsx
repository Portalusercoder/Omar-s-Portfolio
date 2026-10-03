import type { Metadata, Viewport } from "next";
import { Newsreader, Playfair_Display } from "next/font/google";
import { Masthead } from "@/components/nav/Masthead";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://omarkhuddose.com"),
  title: {
    default: "The Khuddose — Omar Khuddose",
    template: "%s — The Khuddose",
  },
  description:
    "Omar Khuddose. UI/UX designer based in Dammam, Saudi Arabia. Designing for everyone.",
};

export const viewport: Viewport = {
  themeColor: "#efe6d2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${newsreader.variable} bg-bg antialiased`}
    >
      <body className="h-full overflow-hidden bg-bg font-sans text-fg">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-bg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div className="flex h-[100svh] flex-col overflow-hidden shadow-[inset_0_0_0_1px_var(--fg)]">
          <Masthead />
          <div id="content" className="flex min-h-0 flex-1 flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
