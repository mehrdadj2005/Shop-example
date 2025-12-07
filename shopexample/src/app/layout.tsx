import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "shoes",
  description: "Shoes Example",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://nznequsmxqcgxaxodbxa.supabase.co/storage/v1/object/public/icons/logo.svg"
        />
      </head>
      <body className={` antialiased bg-primary !select-none `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
