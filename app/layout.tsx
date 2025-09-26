import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI App - WebML & TensorFlow.js",
  description: "Next.js app with WebML and TensorFlow.js integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
