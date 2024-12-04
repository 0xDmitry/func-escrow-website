"use client"

import { useState } from "react"
import {
  Address,
  beginCell,
  Cell,
  contractAddress,
  StateInit,
  storeStateInit,
  toNano,
} from "@ton/core"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { escrowConfigToCell } from "@/contracts/escrow/Escrow"
import { hex as escrowCodeHex } from "@/contracts/escrow/Escrow.compiled.json"

export default function DeployEscrow({ isJetton }: { isJetton: boolean }) {
  const [tonConnectUI] = useTonConnectUI()

  const [price, setPrice] = useState("")
  const [jettonMasterAddress, setJettonMasterAddress] = useState("")
  const [jettonWalletCode, setJettonWalletCode] = useState("")
  const [royaltyNumerator, setRoyaltyNumerator] = useState("")
  const [royaltyDenominator, setRoyaltyDenominator] = useState("")
  const [sellerAddress, setSellerAddress] = useState("")
  const [buyerAddress, setBuyerAddress] = useState("")
  const [guarantorAddress, setGuarantorAddress] = useState("")
  const [escrowAddress, setEscrowAddress] = useState("")

  return (
    <div className="container mx-auto flex flex-col items-center gap-12 my-6 p-6">
      {!escrowAddress && (
        <>
          <div className="text-2xl">{`Deploy ${
            isJetton ? "Jetton" : "TON"
          } Escrow contract`}</div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label htmlFor="price" className="text-lg">
                Price:
              </label>
              <input
                className="text-cover p-2 w-80"
                type="number"
                id="price"
                name="price"
                onChange={(event) => {
                  setPrice(event.target.value)
                }}
              />
            </div>
            {isJetton && (
              <div className="flex flex-col gap-4">
                <label htmlFor="jetton_master" className="text-lg">
                  Jetton master address:
                </label>
                <input
                  className="text-cover p-2 w-80"
                  type="text"
                  id="jetton_master"
                  name="jetton_master"
                  onChange={(event) => {
                    setJettonMasterAddress(event.target.value)
                  }}
                />
              </div>
            )}
            {isJetton && (
              <div className="flex flex-col gap-4">
                <label htmlFor="jetton_wallet_code" className="text-lg">
                  Jetton wallet code:
                </label>
                <input
                  className="text-cover p-2 w-80"
                  type="text"
                  id="jetton_wallet_code"
                  name="jetton_wallet_code"
                  onChange={(event) => {
                    setJettonWalletCode(event.target.value)
                  }}
                />
              </div>
            )}
            <div className="flex flex-col gap-4">
              <label htmlFor="royalty_numerator" className="text-lg">
                Royalty numerator:
              </label>
              <input
                className="text-cover p-2 w-80"
                type="text"
                id="royalty_numerator"
                name="royalty_numerator"
                onChange={(event) => {
                  setRoyaltyNumerator(event.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="royalty_denominator" className="text-lg">
                Royalty denominator:
              </label>
              <input
                className="text-cover p-2 w-80"
                type="text"
                id="royalty_denominator"
                name="royalty_denominator"
                onChange={(event) => {
                  setRoyaltyDenominator(event.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="seller" className="text-lg">
                Seller address:
              </label>
              <input
                className="text-cover p-2 w-80"
                type="text"
                id="seller"
                name="seller"
                onChange={(event) => {
                  setSellerAddress(event.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="buyer" className="text-lg">
                Buyer address:
              </label>
              <input
                className="text-cover p-2 w-80"
                type="text"
                id="buyer"
                name="buyer"
                onChange={(event) => {
                  setBuyerAddress(event.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="guarantor" className="text-lg">
                Guarantor address:
              </label>
              <input
                className="text-cover p-2 w-80"
                type="text"
                id="guarantor"
                name="guarantor"
                onChange={(event) => {
                  setGuarantorAddress(event.target.value)
                }}
              />
            </div>
            <button
              className="text-xl text-cover bg-foreground rounded-xl p-4"
              onClick={async () => {
                const code = Cell.fromBoc(Buffer.from(escrowCodeHex, "hex"))[0]
                const data = escrowConfigToCell({
                  price: toNano(price),
                  jetton_master: jettonMasterAddress
                    ? Address.parseFriendly(jettonMasterAddress).address
                    : null,
                  jetton_wallet_code: jettonWalletCode
                    ? Cell.fromBoc(Buffer.from(jettonWalletCode, "hex"))[0]
                    : beginCell().endCell(),
                  royalty_numerator: Number(royaltyNumerator),
                  royalty_denominator: Number(royaltyDenominator),
                  seller: Address.parseFriendly(sellerAddress).address,
                  buyer: Address.parseFriendly(buyerAddress).address,
                  guarantor: Address.parseFriendly(guarantorAddress).address,
                })
                const init: StateInit = { code, data }
                const stateInit = beginCell()
                  .store(storeStateInit(init))
                  .endCell()
                const address = contractAddress(0, init)

                await tonConnectUI.sendTransaction({
                  validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
                  messages: [
                    {
                      address: address.toRawString(),
                      amount: "5000000",
                      stateInit: stateInit.toBoc().toString("base64"),
                    },
                  ],
                })
                setEscrowAddress(address.toString())
              }}
            >
              Deploy
            </button>
          </div>
        </>
      )}
      {escrowAddress && (
        <>
          <div className="text-2xl">Deployed Escrow address:</div>
          <div className="text-xl">{escrowAddress}</div>
        </>
      )}
    </div>
  )
}
