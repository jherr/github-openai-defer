import ClientProvider from "../src/client";

import "./globals.css";
import "./layout.css";

export const metadata = {
  title: "Github README Generator",
  description: "Make READMEs for your Github profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClientProvider>
  );
}
