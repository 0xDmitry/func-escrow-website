import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-12 my-6 p-6">
      <div className="text-2xl">Select Escrow type</div>
      <div className="flex flex-row gap-6">
        <Link href={"/seller/ton"}>
          <div className="text-xl text-cover bg-foreground rounded-xl p-4">
            TON
          </div>
        </Link>
        <Link href={"/seller/jetton"}>
          <div className="text-xl text-cover bg-foreground rounded-xl p-4">
            Jetton
          </div>
        </Link>
      </div>
    </div>
  )
}
