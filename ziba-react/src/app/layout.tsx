import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "./context/user.context";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <UserContextProvider>
        <body className={montserrat.className}>{children}</body>
      </UserContextProvider>
    </html>
  );
}
