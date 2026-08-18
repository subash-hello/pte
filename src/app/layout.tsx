import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PTE AI — Master PTE with Artificial Intelligence",
  description:
    "AI-powered PTE Academic preparation platform. Practice Speaking, Writing, Reading & Listening with real-time AI feedback, personalized study plans, and mock tests. Improve your PTE score today.",
  keywords:
    "PTE,PTE Academic,PTE preparation,AI tutor,PTE speaking,PTE writing,PTE reading,PTE listening,PTE score,mock test,AI feedback",
  authors: [{ name: "PTE AI" }],
  openGraph: {
    title: "PTE AI — Master PTE with Artificial Intelligence",
    description:
      "Practice all PTE Academic modules with AI-powered feedback. Get personalized study plans and improve your score.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PTE AI — Master PTE with Artificial Intelligence",
    description:
      "Practice all PTE Academic modules with AI-powered feedback. Get personalized study plans and improve your score.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('settings_theme');
                  var theme = saved === 'dark' ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
                if (typeof window !== 'undefined') {
                  var filterPattern = /hydration-mismatch|bis_skin_checked|did not match|tree hydrated|server rendered HTML|Hydration failed/i;
                  var origError = console.error;
                  var origWarn = console.warn;
                  console.error = function() {
                    var str = '';
                    for (var i = 0; i < arguments.length; i++) {
                      try {
                        str += ' ' + (typeof arguments[i] === 'object' ? JSON.stringify(arguments[i]) : String(arguments[i]));
                      } catch(e) {}
                    }
                    if (filterPattern.test(str)) return;
                    origError.apply(console, arguments);
                  };
                  console.warn = function() {
                    var str = '';
                    for (var i = 0; i < arguments.length; i++) {
                      try {
                        str += ' ' + (typeof arguments[i] === 'object' ? JSON.stringify(arguments[i]) : String(arguments[i]));
                      } catch(e) {}
                    }
                    if (filterPattern.test(str)) return;
                    origWarn.apply(console, arguments);
                  };
                  window.addEventListener('error', function(e) {
                    if (e.message && filterPattern.test(e.message)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                    }
                  }, true);
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <div suppressHydrationWarning className="contents">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
