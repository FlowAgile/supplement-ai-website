import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgt MnYtMnptLTQgMHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-100">
                Now accepting pilot shops
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Stop Leaving Money
              <br />
              <span className="text-accent-400">on the Table.</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
              AI-powered supplement writing that generates professional,
              OEM-referenced supplement requests in minutes — not hours.
              Built specifically for independent collision repair shops.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold px-8 py-3.5 rounded-lg text-lg transition-colors text-center"
              >
                See a Live Demo
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors text-center"
              >
                Join the Pilot Program
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <p className="text-3xl font-bold text-accent-400">47s</p>
                <p className="text-sm text-blue-200 mt-1">Avg. generation time</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-400">10+</p>
                <p className="text-sm text-blue-200 mt-1">Line items caught</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-400">OEM</p>
                <p className="text-sm text-blue-200 mt-1">Referenced docs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              You know the pain.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every teardown reveals hidden damage. Every supplement takes hours
              to write. And every adjuster pushback costs you money you earned.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hours per supplement
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Writing a proper supplement with justifications, OEM references,
                and photo documentation takes 1-3 hours. Multiply that by 20-40
                supplements a month.
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                $100K+ lost annually
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Skipped supplements, weak documentation, and caving to adjuster
                pushback costs the average shop six figures a year in revenue
                they earned but never collected.
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Adjuster pushback wins
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Without proper OEM references and I-CAR citations, adjusters
                deny legitimate operations. Most shops don&apos;t have time to fight
                back with the documentation needed to win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How TeardownAI Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps. Professional supplement in under a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Describe the damage
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enter the vehicle info, insurance details, and describe the
                additional damage you found during teardown — in your own words.
                No special formatting needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI writes the supplement
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your description, identifies commonly missed
                operations, and generates a professional supplement with OEM
                procedure references and I-CAR citations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Submit and get paid
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download the formatted document, attach your photos, and submit
                to the insurer. If they push back, our AI writes the rebuttal
                letter too.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              See Real Examples
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Every Supplement Includes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "OEM Procedure References",
                desc: "Every operation is backed by manufacturer-specific repair procedures. Toyota, Honda, Ford, GM — we cite the exact documents.",
              },
              {
                title: "I-CAR Standard Citations",
                desc: "Industry-recognized standards and best practices cited throughout. Gives adjusters no room to argue with documentation.",
              },
              {
                title: "Missed Operation Detection",
                desc: "AI cross-references your damage description against commonly missed items for that vehicle and damage type. Catches what you might forget.",
              },
              {
                title: "ADAS Calibration Requirements",
                desc: "Automatically identifies which ADAS systems need calibration based on the vehicle year, make, model, and repair area.",
              },
              {
                title: "Adjuster Pushback Responses",
                desc: "If the adjuster denies line items, paste their denial and get a professional rebuttal letter with specific citations in minutes.",
              },
              {
                title: "Professional Formatting",
                desc: "Clean, organized documents formatted the way insurance companies expect them. Download as PDF, ready to submit.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border border-gray-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Before vs. After TeardownAI
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-red-200 rounded-xl p-8">
              <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
                Without TeardownAI
              </p>
              <ul className="space-y-3">
                {[
                  "1-3 hours writing each supplement",
                  "Missing billable operations you forget to include",
                  "Weak justifications that adjusters deny",
                  "No OEM references — arguing from memory",
                  "Skipping supplements because it's not worth the time",
                  "Caving to pushback because you can't find the documentation",
                  "$100K+ in uncaptured revenue annually",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-xl p-8">
              <p className="text-green-600 font-bold text-sm uppercase tracking-wider mb-4">
                With TeardownAI
              </p>
              <ul className="space-y-3">
                {[
                  "Professional supplement in under 1 minute",
                  "AI catches commonly missed operations for every repair type",
                  "Every line item justified with specific documentation",
                  "OEM procedures and I-CAR standards cited automatically",
                  "Never skip a supplement again — it takes seconds to submit",
                  "AI writes adjuster pushback rebuttals with citations",
                  "Capture the revenue you've already earned",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Pays for itself with a single supplement. No contracts, cancel
              anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pilot */}
            <div className="border-2 border-brand-200 bg-brand-50 rounded-2xl p-8">
              <div className="inline-block bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                LIMITED SPOTS
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Pilot</h3>
              <p className="text-gray-600 mt-2 text-sm">
                For our founding shops
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">Free</span>
                <span className="text-gray-500 ml-2">for 30 days</span>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Up to 15 supplements",
                  "Full OEM references",
                  "Adjuster pushback responses",
                  "Direct feedback line to founders",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block mt-8 text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Apply for Pilot
              </Link>
            </div>

            {/* Starter */}
            <div className="border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
              <p className="text-gray-600 mt-2 text-sm">
                For shops doing 20-30 supplements/month
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">$500</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Up to 30 supplements/month",
                  "Full OEM references",
                  "Adjuster pushback responses",
                  "Email support",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block mt-8 text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Growth */}
            <div className="border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900">Growth</h3>
              <p className="text-gray-600 mt-2 text-sm">
                For busy shops and small MSOs
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">$800</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Up to 60 supplements/month",
                  "Full OEM references",
                  "Unlimited pushback responses",
                  "Priority support",
                  "$25/supplement over limit",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block mt-8 text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to capture the revenue you&apos;re leaving behind?
          </h2>
          <p className="text-lg text-blue-200 mb-8">
            We&apos;re accepting a limited number of pilot shops. Get free access
            for 30 days and see the difference professional, AI-powered
            supplements make to your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              See the Demo First
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Apply for the Pilot
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
