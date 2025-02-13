// app/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";

// Define metadata for the app (title, description, etc.)
export const metadata: Metadata = {
  title: "PWA app task",
  description: "created by nwigiri",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/image.ico" />
        
        {/* Optionally, you can add other meta tags or custom links */}
        <meta name="description" content="A PWA app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
