"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this sends to Airtable or your email via a form service
    setSubmitted(true);
  }

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Get Started
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed">
              We&apos;re accepting a limited number of shops into our pilot
              program. Free for 30 days — no credit card required.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-white border border-green-200 rounded-xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                We got it!
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                Thanks for your interest. We&apos;ll reach out within 24 hours
                to get you set up. In the meantime, check out the{" "}
                <a href="/demo" className="text-brand-600 font-semibold hover:underline">
                  live demo
                </a>{" "}
                to see what SupplementAI can do.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Apply for the Pilot Program
              </h2>
              <p className="text-gray-600 mb-8">
                Tell us about your shop and we&apos;ll get you set up.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="Mike Reynolds"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="Precision Collision Center"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="mike@precisioncollision.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Estimating Software
                  </label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                  >
                    <option value="">Select your estimating platform</option>
                    <option value="ccc">CCC ONE</option>
                    <option value="mitchell">Mitchell Cloud</option>
                    <option value="audatex">Audatex</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Approx. supplements per month
                  </label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="10-20">10-20</option>
                    <option value="20-40">20-40</option>
                    <option value="40+">40+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    What&apos;s your biggest pain with supplements today?
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
                    placeholder="Tell us what frustrates you most about the supplement process..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-lg text-lg transition-colors"
                >
                  Apply for Free Pilot Access
                </button>

                <p className="text-xs text-gray-500 text-center">
                  No credit card required. We&apos;ll contact you within 24
                  hours.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
