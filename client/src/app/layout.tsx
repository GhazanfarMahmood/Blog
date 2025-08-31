import type { Metadata } from "next";
import { DM_Sans,} from "next/font/google";
import "@/styles/globals.css";

// HEADER AND FOOTER
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/provider/theme-provider";

const dmSans = DM_Sans({
  variable : "--font-dm-sans",
  display : "swap",
  weight : ["400", "800"],
  subsets : ["latin"],
})

export const metadata: Metadata = {
  title: "Blog site",
  description: "MERN stack blog site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
            {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}