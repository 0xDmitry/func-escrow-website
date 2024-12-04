"use client"

import { useState } from "react"
import { Address, OpenedContract, toNano } from "@ton/core"
import { useTonConnect } from "@/hooks/useTonConnect"
import { useTonClientAdapter } from "@/hooks/useTonClientAdapter"
import { Escrow } from "@/contracts/escrow/Escrow"

export default function Home() {
  const clientAdapter = useTonClientAdapter()
  const { sender } = useTonConnect()

  const [escrowAddress, setEscrowAddress] = useState("")

  return (
    <div className="container mx-auto flex flex-col items-center gap-12 my-6 p-6">
      <div className="text-2xl">Guarantor actions</div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4">
          <label htmlFor="escrow" className="text-lg">
            Escrow address:
          </label>
          <input
            className="text-cover p-2 w-80"
            type="text"
            id="escrow"
            name="escrow"
            onChange={(event) => {
              setEscrowAddress(event.target.value)
            }}
          />
        </div>
        <div className="flex flex-row gap-6">
          <button
            className="text-xl text-cover bg-foreground rounded-xl p-4"
            onClick={() => {
              if (!clientAdapter) {
                return
              }

              const contract = new Escrow(Address.parse(escrowAddress))
              const escrow = clientAdapter.open(
                contract
              ) as OpenedContract<Escrow>
              escrow.sendApprove(sender, toNano("0.05"), BigInt(Date.now()))
            }}
          >
            Approve
          </button>
          <button
            className="text-xl text-cover bg-foreground rounded-xl p-4"
            onClick={() => {
              if (!clientAdapter) {
                return
              }

              const contract = new Escrow(Address.parse(escrowAddress))
              const escrow = clientAdapter.open(
                contract
              ) as OpenedContract<Escrow>
              escrow.sendRefund(sender, toNano("0.05"), BigInt(Date.now()))
            }}
          >
            Refund
          </button>
          <button
            className="text-xl text-cover bg-foreground rounded-xl p-4"
            onClick={() => {
              if (!clientAdapter) {
                return
              }

              const contract = new Escrow(Address.parse(escrowAddress))
              const escrow = clientAdapter.open(
                contract
              ) as OpenedContract<Escrow>
              escrow.sendCollectRoyalties(
                sender,
                toNano("0.05"),
                BigInt(Date.now())
              )
            }}
          >
            Collect Royalties
          </button>
        </div>
      </div>
    </div>
  )
}
