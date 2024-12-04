import type { Metadata } from "next"
import { TonConnectProvider } from "@/providers/TonConnectProvider"
import "@/app/globals.css"
import { Header } from "@/components/Header"

export const metadata: Metadata = {
  title: "TON Escrow",
  description: "TON Escrow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body
        suppressHydrationWarning
        className={"flex flex-col h-dvh subpixel-antialiased"}
      >
        <TonConnectProvider>
          <Header />
          <div className="grow flex bg-background justify-center">
            {children}
          </div>
        </TonConnectProvider>
      </body>
    </html>
  )
}
