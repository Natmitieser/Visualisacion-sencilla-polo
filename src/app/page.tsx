import Image from "next/image";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-[#e5e7eb] py-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Polo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">
                Polo
              </span>
              <span className="text-xs font-semibold text-[#005DB4] bg-[#f0f7ff] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                Pilot
              </span>
            </div>
            <nav className="flex items-center gap-4 md:gap-8">
              <a
                href="/docs"
                className="hidden md:block text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
              >
                Docs
              </a>
              <a
                href="/demo"
                className="hidden md:block text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
              >
                Demo
              </a>
              <a
                href="#how"
                className="hidden md:block text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
              >
                How it works
              </a>
              <LoginButton
                className="rounded-lg bg-[#005DB4] px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0047a0] transition-colors"
                text="Login"
              />
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#005DB4]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Now accepting pilot partners</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                Stellar embedded wallets,{" "}
                <span className="text-[#005DB4]">
                  ready in minutes
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-xl">
                Your users login with Google, we handle everything else. Automatic wallet creation and USDC trustline.
              </p>

              {/* Mini stats */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">&lt;2s</div>
                  <div className="text-xs sm:text-sm text-[#6b7280] mt-1">Setup time</div>
                </div>
                <div className="h-10 w-px bg-[#e5e7eb]"></div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">100%</div>
                  <div className="text-xs sm:text-sm text-[#6b7280] mt-1">API uptime</div>
                </div>
                <div className="h-10 w-px bg-[#e5e7eb]"></div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">Web3</div>
                  <div className="text-xs sm:text-sm text-[#6b7280] mt-1">Web2 UX</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <LoginButton
                  className="rounded-lg bg-[#005DB4] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-[#0047a0] transition-colors text-center shadow-lg shadow-[#005DB4]/20"
                  text="Get Started with Google"
                />
                <a
                  href="/demo"
                  className="rounded-lg bg-[#f0f7ff] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#005DB4] hover:bg-[#e0f0ff] transition-colors text-center border-2 border-[#005DB4]"
                >
                  Ver Demo Interactiva
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#6b7280]">
                💡 Free during pilot — you only cover network fees
              </p>
            </div>

            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="relative w-full max-w-md lg:max-w-lg overflow-hidden">
                {/* Subtle background decoration */}
                <div className="absolute -top-8 -right-4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#f0f7ff] rounded-full blur-3xl opacity-60"></div>
                <Image
                  src="/polo.png"
                  alt="Polo"
                  width={500}
                  height={500}
                  className="relative w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Demo Banner */}
        <section className="py-8 sm:py-12 bg-linear-to-r from-[#005DB4] to-[#0047a0]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Personaliza el modal de autenticación en tiempo real
                </h3>
                <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
                  Prueba nuestra demo interactiva y descubre cómo Polo integra billeteras embebidas en la red Stellar. Configura colores, métodos de autenticación y ve los cambios al instante.
                </p>
              </div>
              <a
                href="/demo"
                className="shrink-0 rounded-lg bg-white px-6 py-3 text-sm sm:text-base font-semibold text-[#005DB4] hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
              >
                Explorar Demo
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-12 sm:py-16 lg:py-24 bg-[#f0f7ff]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                Why developers choose Polo
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6b7280]">
                Built for teams who want to ship fast
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#005DB4]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  Web2 → Web3 onboarding
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3 sm:mb-4">
                  Your users login with Google and we handle the rest.
                </p>
                <span className="text-xs sm:text-sm text-[#005DB4] font-medium">No seed phrases →</span>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#005DB4]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  USDC ready from day one
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3 sm:mb-4">
                  Pre-configured with USDC trustline. Start sending payments immediately.
                </p>
                <span className="text-xs sm:text-sm text-[#005DB4] font-medium">Real stablecoin payments →</span>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#005DB4]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  Multi-tenant by design
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3 sm:mb-4">
                  Isolated environments per client with dedicated analytics.
                </p>
                <span className="text-xs sm:text-sm text-[#005DB4] font-medium">Built for B2B scale →</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-12 sm:py-16 lg:py-24 bg-white" id="how">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 sm:mb-4">
                From zero to production in minutes
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6b7280]">
                Here&apos;s the whole flow
              </p>
            </div>

            <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4] text-xl sm:text-2xl font-bold text-white shadow-lg">
                  1
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2">
                  Install & configure
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3">
                  Install SDK and set your API keys.
                </p>
                <div className="inline-block bg-[#f0f7ff] px-3 py-1 rounded text-xs font-mono text-[#005DB4]">
                  ~5 minutes
                </div>
              </div>

              <div className="relative">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4] text-xl sm:text-2xl font-bold text-white shadow-lg">
                  2
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2">
                  User logs in
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3">
                  User clicks &quot;Sign in with Google&quot; — that&apos;s it.
                </p>
                <div className="inline-block bg-[#f0f7ff] px-3 py-1 rounded text-xs font-mono text-[#005DB4]">
                  ~3 seconds
                </div>
              </div>

              <div className="relative">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4] text-xl sm:text-2xl font-bold text-white shadow-lg">
                  3
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2">
                  We create & fund wallet
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3">
                  Keypair generation and account activation.
                </p>
                <div className="inline-block bg-[#f0f7ff] px-3 py-1 rounded text-xs font-mono text-[#005DB4]">
                  ~2 seconds
                </div>
              </div>

              <div className="relative">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4] text-xl sm:text-2xl font-bold text-white shadow-lg">
                  4
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2">
                  Ready to transact
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3">
                  USDC enabled. Start sending payments.
                </p>
                <div className="inline-block bg-[#f0f7ff] px-3 py-1 rounded text-xs font-mono text-[#005DB4]">
                  immediately
                </div>
              </div>
            </div>

            {/* Code snippet example */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-[#1a1a1a] rounded-xl p-6 overflow-x-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs text-gray-400">Example integration</span>
                </div>
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{`import { Polo } from 'polo-sdk';

const polo = new Polo({
  apiKey: process.env.POLO_API_KEY,
  tenant: 'my-app'
});

// User clicks "Sign in with Google"
const wallet = await polo.auth.loginWithGoogle();

// That's it - wallet is ready for USDC
console.log(wallet.address); // G...
console.log(wallet.usdcEnabled); // true`}</code>
                </pre>
              </div>
              <p className="text-center text-sm text-[#6b7280] mt-4">
                Check the <a href="/docs" className="text-[#005DB4] hover:underline font-medium">full docs</a> for React, Vue, and Node.js examples
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 sm:mb-4">
                Real teams, real use cases
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6b7280]">
                See what you can build
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-all">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4]">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  Creator marketplaces
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3 sm:mb-4">
                  Pay creators in USDC. Instant settlement, no intermediaries.
                </p>
                <div className="text-xs sm:text-sm text-[#6b7280]">
                  <span className="font-medium text-[#1a1a1a]">Example:</span> Freelance platform
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-all">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4]">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  Neobanks & fintech
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3 sm:mb-4">
                  Build remittance apps or savings accounts. Users never see blockchain.
                </p>
                <div className="text-xs sm:text-sm text-[#6b7280]">
                  <span className="font-medium text-[#1a1a1a]">Example:</span> Remittance app
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-all">
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#005DB4]">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  Loyalty & rewards
                </h3>
                <p className="text-sm sm:text-base text-[#6b7280] mb-3 sm:mb-4">
                  Let customers earn real USDC instead of closed-loop points.
                </p>
                <div className="text-xs sm:text-sm text-[#6b7280]">
                  <span className="font-medium text-[#1a1a1a]">Example:</span> E-commerce cashback
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ */}
        <section className="py-12 sm:py-16 lg:py-24 bg-[#f0f7ff]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 sm:mb-4">
                Questions we get a lot
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <details className="group bg-white rounded-xl p-4 sm:p-6 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-base sm:text-lg text-[#1a1a1a]">
                  Do my users need to buy XLM first?
                  <svg className="h-5 w-5 text-[#005DB4] group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6b7280] leading-relaxed">
                  Nope. We handle the XLM funding automatically. Your users just login with Google.
                </p>
              </details>

              <details className="group bg-white rounded-xl p-4 sm:p-6 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-base sm:text-lg text-[#1a1a1a]">
                  Can power users connect their own wallet?
                  <svg className="h-5 w-5 text-[#005DB4] group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6b7280] leading-relaxed">
                  Absolutely. You can offer both: embedded wallets and &quot;Connect Wallet&quot; for Freighter, Albedo, etc.
                </p>
              </details>

              <details className="group bg-white rounded-xl p-4 sm:p-6 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-base sm:text-lg text-[#1a1a1a]">
                  Can I test on testnet before going live?
                  <svg className="h-5 w-5 text-[#005DB4] group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6b7280] leading-relaxed">
                  Yes! Just set <code className="bg-[#f0f7ff] px-2 py-1 rounded text-xs sm:text-sm font-mono">network: &apos;testnet&apos;</code> in your config.
                </p>
              </details>

              <details className="group bg-white rounded-xl p-4 sm:p-6 border-2 border-[#e5e7eb] hover:border-[#005DB4] transition-colors">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-base sm:text-lg text-[#1a1a1a]">
                  What happens if Polo goes down?
                  <svg className="h-5 w-5 text-[#005DB4] group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6b7280] leading-relaxed">
                  Your wallets are real Stellar accounts on-chain. You can export the keys if needed. No vendor lock-in.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 lg:py-32 bg-white" id="acceso">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-[#f0f7ff] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 text-center border-2 border-[#005DB4]">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#005DB4] mb-4 sm:mb-6">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Limited pilot spots available</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-3 sm:mb-4">
                Ready to ship faster?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#6b7280] mb-6 sm:mb-10 max-w-2xl mx-auto">
                Email us at <a href="mailto:aleregex@gmail.com" className="text-[#005DB4] hover:underline font-semibold">aleregex@gmail.com</a>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="mailto:aleregex@gmail.com"
                  className="w-full sm:w-auto rounded-lg bg-[#005DB4] px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white hover:bg-[#0047a0] transition-colors text-center shadow-lg"
                >
                  Request pilot access
                </a>
                <a
                  href="/docs"
                  className="w-full sm:w-auto rounded-lg bg-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#005DB4] hover:bg-gray-50 transition-colors text-center border-2 border-[#e5e7eb]"
                >
                  Read the docs
                </a>
              </div>
              <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-[#6b7280]">
                ⚡ Free during pilot • 🔒 Testnet support
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] bg-[#f0f7ff]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="Polo"
                  width={48}
                  height={48}
                />
                <span className="text-2xl font-bold text-[#1a1a1a]">
                  Polo
                </span>
              </div>
              <p className="text-[#6b7280] mb-6 max-w-md">
                Embedded Stellar wallets for the modern web. Built for developers who want Web3 payments with Web2 UX.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://x.com/aleregex" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/aleregex" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/docs" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/demo" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                    Demo Interactiva
                  </a>
                </li>
                <li>
                  <a href="#how" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                    Stellar Network ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
                Connect
              </h3>
              <ul className="space-y-3">

                <li>
                  <a href="/getstarted" className="text-[#6b7280] hover:text-[#005DB4] transition-colors">
                    Request access
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
            <p className="text-sm text-[#6b7280] text-center">
              © {new Date().getFullYear()} Polo. Built with ❤️ for the Stellar ecosystem.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
