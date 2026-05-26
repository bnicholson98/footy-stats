import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Footy-Stats",
  description: "Football statistics for Europe's top leagues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-gray-800">
          <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              ⚽ Footy-Stats
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}