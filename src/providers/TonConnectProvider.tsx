"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

const manifestUrl =
  "https://func-escrow-website.vercel.app/tonconnect-manifest.json"

export const TonConnectProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    {children}
  </TonConnectUIProvider>
)
