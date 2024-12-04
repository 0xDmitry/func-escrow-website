"use client"

import { TonConnectButton as TonConnectUIButton } from "@tonconnect/ui-react"

export const TonConnectButton = () => {
  return (
    <TonConnectUIButton className="[&_button]:max-sm:max-w-44 [&_button]:bg-foreground [&_button_*]:text-black [&_button_*]:fill-black" />
  )
}
