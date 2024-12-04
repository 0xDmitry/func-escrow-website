import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-12 my-6 p-6">
      <div className="text-2xl">Select your role</div>
      <div className="flex flex-row gap-6">
        <Link href={"/seller"}>
          <div className="text-xl text-cover bg-foreground rounded-xl p-4">
            Seller
          </div>
        </Link>
        <Link href={"/guarantor"}>
          <div className="text-xl text-cover bg-foreground rounded-xl p-4">
            Guarantor
          </div>
        </Link>
      </div>
    </div>
  )
}
