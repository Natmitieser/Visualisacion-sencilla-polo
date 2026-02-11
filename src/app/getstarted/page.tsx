import Image from "next/image";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8 flex justify-center">
          <Image
            src="/polo.png"
            alt="Polo"
            width={200}
            height={200}
            className="w-48 h-48"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
          We&apos;re still building
        </h1>
        <p className="text-xl text-[#6b7280] mb-8">
          You&apos;ll be able to get started with Polo soon. In the meantime, contact us for early access.
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[#005DB4] mb-8">
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Under construction</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-[#005DB4] px-8 py-3 text-base font-semibold text-white hover:bg-[#0047a0] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
