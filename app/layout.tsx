import React from "react";
import "./globals.css";
import { Roboto } from "next/font/google";
import { headers } from "next/headers";

const roboto = Roboto({ weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"] });

export const metadata = {
  title: "Recipe Blender",
  description: "A website to help you cook some delicious meals when you have seemingly random ingredients.",
  authors: [{ name: "Kijana Richmond", url: "https://kijana.dev" }],
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: "Food & Drink",
  keywords: ["food", "recipes", "ingredients", "cooking", "meal", "mixer"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers()
  const csrfToken = headersList.get('x-csrf-token')
  
  return (
    <html lang="en">
      <head>
        <meta name="csrf-token" content={csrfToken || ''} />
      </head>
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  );
}