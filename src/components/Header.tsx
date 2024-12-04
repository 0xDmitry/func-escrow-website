"use client"

import Link from "next/link"
import { TonConnectButton } from "@/components/TonConnectButton"

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between p-6">
      <Link href={"/"}>
        <div className="text-2xl">TON Escrow</div>
      </Link>
      <TonConnectButton />
    </header>
  )
}
